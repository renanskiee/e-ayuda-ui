# 🚀 Backend Migration Guide - E-Ayuda System

## **Recommended: Supabase (Fastest & Simplest)**

---

## ✅ **Why Supabase?**

| Feature | Benefit |
|---------|---------|
| **Zero Server Code** | No Node.js/Express needed |
| **PostgreSQL Database** | Production-ready, powerful SQL |
| **Real-time Subscriptions** | Perfect for your sync requirements |
| **Built-in Auth** | Role-based access control ready |
| **File Storage** | For document uploads |
| **Free Tier** | 500MB DB + 1GB storage |
| **Quick Setup** | 15-30 minutes total |

---

## 📋 **Migration Steps**

### **STEP 1: Create Supabase Project (5 minutes)**

1. Go to https://supabase.com
2. Sign up / Login
3. Click "New Project"
4. Fill in:
   - Name: `e-ayuda-system`
   - Database Password: (save this!)
   - Region: Southeast Asia (closest to Philippines)
5. Wait 2 minutes for project creation
6. Copy your project URL and API key

---

### **STEP 2: Install Supabase Client (1 minute)**

```bash
cd /workspaces/default/code
pnpm add @supabase/supabase-js
```

---

### **STEP 3: Create Database Tables (5 minutes)**

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste and run this SQL:

```sql
-- Applications table
CREATE TABLE applications (
  id TEXT PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  mobile_number TEXT,
  barangay TEXT NOT NULL,
  sector TEXT NOT NULL,
  assistance_type TEXT NOT NULL,
  requested_amount DECIMAL NOT NULL,
  recommended_amount DECIMAL,
  status TEXT NOT NULL DEFAULT 'Received',
  
  -- Dates
  date_received DATE NOT NULL,
  date_evaluated DATE,
  date_approved DATE,
  date_funded DATE,
  date_scheduled DATE,
  date_disbursed DATE,
  
  -- Processed by
  evaluated_by TEXT,
  approved_by TEXT,
  funded_by TEXT,
  disbursed_by TEXT,
  
  -- QR & Reference
  qr_code TEXT,
  qr_code_image TEXT,
  reference_number TEXT,
  
  -- Schedule & Notes
  payout_schedule DATE,
  notes TEXT,
  rejection_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SMS log table
CREATE TABLE sms_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_number TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Programs table
CREATE TABLE programs (
  id TEXT PRIMARY KEY,
  program_name TEXT NOT NULL,
  target_sector TEXT NOT NULL,
  budget_allocation DECIMAL NOT NULL,
  status TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Real-time (IMPORTANT for live updates!)
ALTER PUBLICATION supabase_realtime ADD TABLE applications;

-- Add indexes for performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_sector ON applications(sector);
CREATE INDEX idx_applications_date_received ON applications(date_received);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### **STEP 4: Create Supabase Client (2 minutes)**

Create new file: `/src/app/utils/supabaseClient.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### **STEP 5: Update applicationStore.ts (15 minutes)**

Replace `/src/app/utils/applicationStore.ts` with Supabase version:

```typescript
import { supabase } from './supabaseClient';
import { generateQRCodeImage, generateQRReference, generateReferenceNumber, type BeneficiaryQRData } from './qrCodeGenerator';
import { sendApprovalNotification, sendPayoutScheduleNotification, sendPayoutCompletedNotification, sendRejectionNotification } from './smsNotification';

export interface Application {
  id: string;
  applicantName: string;
  mobileNumber?: string;
  barangay: string;
  sector: string;
  assistanceType: string;
  requestedAmount: number;
  recommendedAmount: number;
  status: 'Received' | 'Under Evaluation' | 'Recommended' | 'Approved' | 'Funded' | 'Scheduled' | 'Disbursed' | 'Paid' | 'Rejected';
  dateReceived: string;
  dateEvaluated?: string;
  dateApproved?: string;
  dateFunded?: string;
  dateScheduled?: string;
  dateDisbursed?: string;
  evaluatedBy?: string;
  approvedBy?: string;
  fundedBy?: string;
  disbursedBy?: string;
  qrCode?: string;
  qrCodeImage?: string;
  payoutSchedule?: string;
  referenceNumber?: string;
  notes?: string;
  rejectionReason?: string;
}

class ApplicationStore {
  private listeners: Array<() => void> = [];

  // Real-time subscription
  constructor() {
    // Subscribe to real-time changes
    supabase
      .channel('applications_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'applications' },
        () => {
          this.notifyListeners();
        }
      )
      .subscribe();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Convert snake_case from DB to camelCase for app
  private dbToApp(dbRow: any): Application {
    return {
      id: dbRow.id,
      applicantName: dbRow.applicant_name,
      mobileNumber: dbRow.mobile_number,
      barangay: dbRow.barangay,
      sector: dbRow.sector,
      assistanceType: dbRow.assistance_type,
      requestedAmount: dbRow.requested_amount,
      recommendedAmount: dbRow.recommended_amount,
      status: dbRow.status,
      dateReceived: dbRow.date_received,
      dateEvaluated: dbRow.date_evaluated,
      dateApproved: dbRow.date_approved,
      dateFunded: dbRow.date_funded,
      dateScheduled: dbRow.date_scheduled,
      dateDisbursed: dbRow.date_disbursed,
      evaluatedBy: dbRow.evaluated_by,
      approvedBy: dbRow.approved_by,
      fundedBy: dbRow.funded_by,
      disbursedBy: dbRow.disbursed_by,
      qrCode: dbRow.qr_code,
      qrCodeImage: dbRow.qr_code_image,
      payoutSchedule: dbRow.payout_schedule,
      referenceNumber: dbRow.reference_number,
      notes: dbRow.notes,
      rejectionReason: dbRow.rejection_reason,
    };
  }

  // Convert camelCase from app to snake_case for DB
  private appToDb(app: Partial<Application>) {
    return {
      id: app.id,
      applicant_name: app.applicantName,
      mobile_number: app.mobileNumber,
      barangay: app.barangay,
      sector: app.sector,
      assistance_type: app.assistanceType,
      requested_amount: app.requestedAmount,
      recommended_amount: app.recommendedAmount,
      status: app.status,
      date_received: app.dateReceived,
      date_evaluated: app.dateEvaluated,
      date_approved: app.dateApproved,
      date_funded: app.dateFunded,
      date_scheduled: app.dateScheduled,
      date_disbursed: app.dateDisbursed,
      evaluated_by: app.evaluatedBy,
      approved_by: app.approvedBy,
      funded_by: app.fundedBy,
      disbursed_by: app.disbursedBy,
      qr_code: app.qrCode,
      qr_code_image: app.qrCodeImage,
      payout_schedule: app.payoutSchedule,
      reference_number: app.referenceNumber,
      notes: app.notes,
      rejection_reason: app.rejectionReason,
    };
  }

  async getAll(): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('date_received', { ascending: false });

    if (error) throw error;
    return data.map(row => this.dbToApp(row));
  }

  async getById(id: string): Promise<Application | null> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.dbToApp(data);
  }

  async getByStatus(status: Application['status']): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('status', status)
      .order('date_received', { ascending: false });

    if (error) throw error;
    return data.map(row => this.dbToApp(row));
  }

  async getBySector(sector: string): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('sector', sector)
      .order('date_received', { ascending: false });

    if (error) throw error;
    return data.map(row => this.dbToApp(row));
  }

  async recommendApplication(id: string, evaluatedBy: string, recommendedAmount: number, notes?: string): Promise<boolean> {
    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Recommended',
        date_evaluated: new Date().toISOString().split('T')[0],
        evaluated_by: evaluatedBy,
        recommended_amount: recommendedAmount,
        notes: notes
      })
      .eq('id', id);

    return !error;
  }

  async approveApplication(id: string, approvedBy: string): Promise<boolean> {
    const app = await this.getById(id);
    if (!app || app.status !== 'Recommended') return false;

    const dateApproved = new Date().toISOString().split('T')[0];
    const qrCode = generateQRReference(id);
    const referenceNumber = generateReferenceNumber(id);

    // Generate QR code image
    let qrCodeImage = '';
    try {
      const qrData: BeneficiaryQRData = {
        applicationId: app.id,
        beneficiaryName: app.applicantName,
        referenceNumber: referenceNumber,
        amount: app.recommendedAmount,
        sector: app.sector,
        dateApproved: dateApproved
      };
      qrCodeImage = await generateQRCodeImage(qrData);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Approved',
        date_approved: dateApproved,
        approved_by: approvedBy,
        qr_code: qrCode,
        qr_code_image: qrCodeImage,
        reference_number: referenceNumber
      })
      .eq('id', id);

    // Send SMS notification
    if (!error && app.mobileNumber) {
      await sendApprovalNotification(
        app.mobileNumber,
        app.applicantName,
        app.recommendedAmount,
        referenceNumber
      );
    }

    return !error;
  }

  async rejectApplication(id: string, reason: string): Promise<boolean> {
    const app = await this.getById(id);
    if (!app) return false;

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Rejected',
        rejection_reason: reason
      })
      .eq('id', id);

    // Send SMS notification
    if (!error && app.mobileNumber) {
      await sendRejectionNotification(app.mobileNumber, app.applicantName, reason);
    }

    return !error;
  }

  async fundApplication(id: string, fundedBy: string, payoutSchedule: string): Promise<boolean> {
    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Funded',
        date_funded: new Date().toISOString().split('T')[0],
        funded_by: fundedBy,
        payout_schedule: payoutSchedule
      })
      .eq('id', id);

    return !error;
  }

  async scheduleApplication(id: string, schedule: string): Promise<boolean> {
    const app = await this.getById(id);
    if (!app) return false;

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Scheduled',
        date_scheduled: new Date().toISOString().split('T')[0],
        payout_schedule: schedule
      })
      .eq('id', id);

    // Send SMS notification
    if (!error && app.mobileNumber && app.referenceNumber) {
      await sendPayoutScheduleNotification(
        app.mobileNumber,
        app.applicantName,
        app.recommendedAmount,
        schedule,
        app.referenceNumber
      );
    }

    return !error;
  }

  async disburseApplication(id: string, disbursedBy: string): Promise<boolean> {
    const app = await this.getById(id);
    if (!app) return false;

    const dateDisbursed = new Date().toISOString().split('T')[0];

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Paid',
        date_disbursed: dateDisbursed,
        disbursed_by: disbursedBy
      })
      .eq('id', id);

    // Send SMS notification
    if (!error && app.mobileNumber) {
      await sendPayoutCompletedNotification(
        app.mobileNumber,
        app.applicantName,
        app.recommendedAmount,
        dateDisbursed
      );
    }

    return !error;
  }

  async addApplication(application: Omit<Application, 'id'>): Promise<string> {
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true });

    const newId = `AICS-${year}-${((count || 0) + 1).toString().padStart(3, '0')}`;

    const newApp = {
      ...application,
      id: newId,
      status: 'Received',
      dateReceived: new Date().toISOString().split('T')[0]
    };

    const { error } = await supabase
      .from('applications')
      .insert([this.appToDb(newApp)]);

    if (error) throw error;
    return newId;
  }

  async getStatsByStatus() {
    const { data, error } = await supabase
      .from('applications')
      .select('status');

    if (error) throw error;

    const stats = {
      received: 0,
      underEvaluation: 0,
      recommended: 0,
      approved: 0,
      funded: 0,
      scheduled: 0,
      paid: 0,
      rejected: 0
    };

    data.forEach((app: any) => {
      if (app.status === 'Received') stats.received++;
      if (app.status === 'Under Evaluation') stats.underEvaluation++;
      if (app.status === 'Recommended') stats.recommended++;
      if (app.status === 'Approved') stats.approved++;
      if (app.status === 'Funded') stats.funded++;
      if (app.status === 'Scheduled') stats.scheduled++;
      if (app.status === 'Paid') stats.paid++;
      if (app.status === 'Rejected') stats.rejected++;
    });

    return stats;
  }
}

export const applicationStore = new ApplicationStore();
```

---

### **STEP 6: Migrate Existing Data (5 minutes)**

Create a migration script: `/src/scripts/migrateToSupabase.ts`

```typescript
import { supabase } from '../app/utils/supabaseClient';

async function migrateData() {
  // Get data from localStorage
  const localData = localStorage.getItem('applications');
  if (!localData) {
    console.log('No data to migrate');
    return;
  }

  const applications = JSON.parse(localData);

  // Convert to snake_case for Supabase
  const supabaseData = applications.map((app: any) => ({
    id: app.id,
    applicant_name: app.applicantName,
    mobile_number: app.mobileNumber,
    barangay: app.barangay,
    sector: app.sector,
    assistance_type: app.assistanceType,
    requested_amount: app.requestedAmount,
    recommended_amount: app.recommendedAmount,
    status: app.status,
    date_received: app.dateReceived,
    date_evaluated: app.dateEvaluated,
    date_approved: app.dateApproved,
    date_funded: app.dateFunded,
    date_scheduled: app.dateScheduled,
    date_disbursed: app.dateDisbursed,
    evaluated_by: app.evaluatedBy,
    approved_by: app.approvedBy,
    funded_by: app.fundedBy,
    disbursed_by: app.disbursedBy,
    qr_code: app.qrCode,
    qr_code_image: app.qrCodeImage,
    payout_schedule: app.payoutSchedule,
    reference_number: app.referenceNumber,
    notes: app.notes,
    rejection_reason: app.rejectionReason
  }));

  // Insert into Supabase
  const { data, error } = await supabase
    .from('applications')
    .insert(supabaseData);

  if (error) {
    console.error('Migration error:', error);
  } else {
    console.log('✅ Migration successful!', data);
    console.log(`Migrated ${applications.length} applications`);
  }
}

// Run migration
migrateData();
```

Run in browser console after app loads:
```javascript
// Import and run migration
import('./scripts/migrateToSupabase').then(m => m.default());
```

---

### **STEP 7: Update Components to Use Async (10 minutes)**

Update sector pages to handle async operations:

```typescript
// Example: EvaluationQueue.tsx
const handleSubmitEvaluation = async () => { // Add async
  if (!evaluationForm.decision) {
    alert('Please select a decision');
    return;
  }

  if (!selectedApplication) return;

  const currentUser = localStorage.getItem('username') || 'sector-sc-001';

  if (evaluationForm.decision === 'recommend') {
    const recommendedAmount = parseFloat(evaluationForm.recommendedAmount);

    if (isNaN(recommendedAmount) || recommendedAmount <= 0) {
      alert('Please enter a valid recommended amount');
      return;
    }

    // Add await for Supabase call
    const success = await applicationStore.recommendApplication(
      selectedApplication.id,
      currentUser,
      recommendedAmount,
      evaluationForm.assessmentNotes
    );

    if (success) {
      alert(`Application ${selectedApplication.id} has been recommended for approval!`);
      setShowEvaluationModal(false);
      setSelectedApplication(null);
    } else {
      alert('Failed to process application. Please try again.');
    }
  }
};
```

Update all pages:
- Add `async` to handler functions
- Add `await` before `applicationStore` method calls
- Same pattern for all pages (MSWDO Head, Treasurer, Disbursement)

---

## ✅ **Benefits You Get**

### Before (localStorage):
```javascript
❌ Data lost on browser clear
❌ No multi-user support
❌ No data backup
❌ Limited to 10MB
❌ Manual sync needed
```

### After (Supabase):
```javascript
✅ Data persisted in cloud
✅ Multi-user real-time sync
✅ Automatic backups
✅ Unlimited storage (in free tier: 500MB)
✅ Real-time updates automatically
✅ Production-ready
✅ Can add authentication easily
✅ Row-level security
✅ Audit logs included
```

---

## 🔐 **Add Authentication (Optional, +10 minutes)**

```typescript
// Login function
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

// Signup function
export async function signup(email: string, password: string, metadata: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: metadata.role, // 'sector-staff', 'mswdo-head', 'treasurer', 'disbursement'
        sector: metadata.sector
      }
    }
  });
  
  if (error) throw error;
  return data;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

---

## 📊 **Performance Comparison**

| Operation | localStorage | Supabase |
|-----------|-------------|----------|
| **Read All** | 5ms | 50-100ms |
| **Write** | 1ms | 50-150ms |
| **Real-time Updates** | Manual | Automatic ✅ |
| **Multi-user** | ❌ No | ✅ Yes |
| **Backup** | ❌ No | ✅ Automatic |
| **Query Performance** | Limited | SQL queries ✅ |

---

## 🚀 **Deployment**

Once migrated to Supabase:

1. **Build frontend**:
```bash
pnpm build
```

2. **Deploy to**:
   - **Vercel** (Recommended) - https://vercel.com
   - **Netlify** - https://netlify.com
   - **Cloudflare Pages** - https://pages.cloudflare.com

3. **Add environment variables** in deployment platform:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 💰 **Cost Estimate**

### Free Tier (Enough to start):
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- 50,000 monthly active users

### Paid Tier (When you scale):
- $25/month (Pro plan)
- Unlimited everything
- Point-in-time recovery
- Daily backups

---

## 🎯 **Alternative: Quick & Dirty (No Backend)**

If you want to deploy NOW without backend:

1. Keep using localStorage
2. Add export/import functionality:

```typescript
// Export all data
export function exportData() {
  const apps = localStorage.getItem('applications');
  const blob = new Blob([apps || '[]'], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `e-ayuda-backup-${new Date().toISOString()}.json`;
  link.click();
}

// Import data
export function importData(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target?.result as string;
    localStorage.setItem('applications', data);
    window.location.reload();
  };
  reader.readAsText(file);
}
```

But this is **NOT recommended** for production!

---

## 📞 **Need Help?**

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Example projects: https://github.com/supabase/supabase/tree/master/examples

---

## 🎉 **Summary**

**Fastest Path**: Supabase (30 minutes total)
**Best for**: Production-ready, multi-user, real-time
**Cost**: Free to start, $25/month when you scale

**Total Migration Time**: ~30 minutes
**Difficulty**: Easy (mostly copy-paste)
**Result**: Production-ready backend ✅

---

**Next Steps**:
1. Create Supabase account
2. Run SQL to create tables
3. Update applicationStore.ts
4. Test with one page first
5. Roll out to all pages
6. Deploy!

**Status**: Ready to implement
**Recommended**: ✅ **Use Supabase**
