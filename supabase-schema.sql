-- =====================================================
-- E-AYUDA MANAGEMENT SYSTEM - SUPABASE DATABASE SCHEMA
-- =====================================================
-- Municipal Social Welfare and Development Office
-- Complete Database Schema for Cloud Deployment
--
-- INSTRUCTIONS:
-- 1. Open Supabase SQL Editor: https://app.supabase.com/project/dkmlrlqkjwhzynqdpfmf/sql
-- 2. Copy ALL content of this file
-- 3. Paste into SQL Editor
-- 4. Click "RUN" or press Ctrl+Enter
-- 5. Wait for: "Success. No rows returned"
-- =====================================================

-- ========================================
-- 1. APPLICATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  mobile_number TEXT,
  barangay TEXT NOT NULL,
  sector TEXT NOT NULL,
  assistance_type TEXT NOT NULL,
  requested_amount DECIMAL(10,2) NOT NULL,
  recommended_amount DECIMAL(10,2),
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_status CHECK (
    status IN ('Received', 'Under Evaluation', 'Recommended', 'Approved', 'Funded', 'Scheduled', 'Disbursed', 'Paid', 'Rejected')
  )
);

-- ========================================
-- 2. SMS LOG TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS sms_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_number TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL,
  application_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 3. PROGRAMS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY,
  program_name TEXT NOT NULL,
  target_sector TEXT NOT NULL,
  budget_allocation DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  start_date DATE,
  end_date DATE,
  description TEXT,
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 4. USERS TABLE (Optional - for future authentication)
-- ========================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  sector TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 5. INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_sector ON applications(sector);
CREATE INDEX IF NOT EXISTS idx_applications_date_received ON applications(date_received DESC);
CREATE INDEX IF NOT EXISTS idx_applications_barangay ON applications(barangay);
CREATE INDEX IF NOT EXISTS idx_applications_reference ON applications(reference_number);
CREATE INDEX IF NOT EXISTS idx_applications_sector_status ON applications(sector, status);
CREATE INDEX IF NOT EXISTS idx_sms_log_timestamp ON sms_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sms_log_application ON sms_log(application_id);
CREATE INDEX IF NOT EXISTS idx_programs_sector ON programs(target_sector);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_users_staff_id ON users(staff_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ========================================
-- 6. AUTO-UPDATE TIMESTAMP FUNCTION
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for auto-updating updated_at
DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 7. ENABLE REAL-TIME (IMPORTANT!)
-- ========================================
-- This allows automatic updates across all connected clients
ALTER PUBLICATION supabase_realtime ADD TABLE applications;
ALTER PUBLICATION supabase_realtime ADD TABLE sms_log;
ALTER PUBLICATION supabase_realtime ADD TABLE programs;
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- ========================================
-- 8. ROW LEVEL SECURITY
-- ========================================
-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (you can add auth-based policies later)
DROP POLICY IF EXISTS "Allow all operations on applications" ON applications;
CREATE POLICY "Allow all operations on applications"
  ON applications FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on sms_log" ON sms_log;
CREATE POLICY "Allow all operations on sms_log"
  ON sms_log FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on programs" ON programs;
CREATE POLICY "Allow all operations on programs"
  ON programs FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on users" ON users;
CREATE POLICY "Allow all operations on users"
  ON users FOR ALL
  USING (true)
  WITH CHECK (true);

-- ========================================
-- 9. INSERT SAMPLE DATA (Optional - for testing)
-- ========================================
-- Uncomment the lines below if you want to insert test data

/*
INSERT INTO applications (
  id, applicant_name, mobile_number, barangay, sector, assistance_type,
  requested_amount, recommended_amount, status, date_received
) VALUES
  ('AICS-2026-001', 'Teresa Gonzales', '+639171111111', 'Pacol', 'Senior Citizen', 'Medical Assistance', 3500, 3500, 'Received', '2026-05-13'),
  ('AICS-2026-002', 'Mario Reyes', '+639172222222', 'Santa Cruz', 'PWD', 'Assistive Device', 8000, 8000, 'Received', '2026-05-13'),
  ('AICS-2026-003', 'Luisa Castillo', '+639173333333', 'San Rafael', 'Solo Parent', 'Livelihood Support', 10000, 10000, 'Received', '2026-05-13');

INSERT INTO programs (
  id, program_name, target_sector, budget_allocation, status, start_date, description
) VALUES
  ('PROG-2026-001', 'Medical Assistance Program', 'Senior Citizen', 500000.00, 'Active', '2026-01-01', 'Financial assistance for medical expenses'),
  ('PROG-2026-002', 'PWD Assistive Device Program', 'PWD', 300000.00, 'Active', '2026-01-01', 'Provision of assistive devices'),
  ('PROG-2026-003', 'Solo Parent Livelihood Program', 'Solo Parent', 400000.00, 'Active', '2026-01-01', 'Livelihood support for solo parents');

INSERT INTO users (
  staff_id, email, full_name, role, sector
) VALUES
  ('bswd-11223', 'bswdo.staff@lgu.gov.ph', 'BSWDO Staff', 'bswdo', NULL),
  ('head-001', 'mswdo.head@lgu.gov.ph', 'MSWDO Head', 'mswdo-head', NULL),
  ('sector-sc-001', 'sector.sc@lgu.gov.ph', 'Senior Citizen Focal', 'mswdo-sector', 'senior-citizen'),
  ('sector-pwd-001', 'sector.pwd@lgu.gov.ph', 'PWD Focal', 'mswdo-sector', 'pwd'),
  ('tres-001', 'treasurer@lgu.gov.ph', 'Municipal Treasurer', 'treasurer', NULL),
  ('disb-001', 'disbursement@lgu.gov.ph', 'Disbursement Officer', 'disbursement-officer', NULL);
*/

-- ========================================
-- 10. VERIFICATION QUERIES
-- ========================================
-- Check all tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('applications', 'sms_log', 'programs', 'users')
ORDER BY table_name;

-- Check real-time is enabled
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;

-- ========================================
-- SCHEMA CREATED SUCCESSFULLY!
-- ========================================
-- Next steps:
-- 1. ✅ Verify tables were created (check query results above)
-- 2. ✅ Go to Table Editor: https://app.supabase.com/project/dkmlrlqkjwhzynqdpfmf/editor
-- 3. ✅ Restart your dev server to load environment variables
-- 4. ✅ Open browser console - should see "SUPABASE" mode
-- 5. ✅ Test the application end-to-end
-- ========================================
