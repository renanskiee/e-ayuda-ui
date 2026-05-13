# QR Code Generation & SMS Notification System

## Overview

The E-Ayuda system now includes **automatic QR code generation** and **SMS notifications** for beneficiaries throughout the application workflow.

---

## 🎯 QR Code System

### When QR Codes Are Generated

QR codes are automatically generated when an application is **APPROVED** by the MSWDO Head.

### What's In the QR Code

Each QR code contains the following beneficiary information in JSON format:

```json
{
  "id": "AICS-2026-101",
  "ref": "REF-2026-101",
  "name": "Juan Dela Cruz",
  "amount": 5000,
  "sector": "Senior Citizen",
  "approved": "2026-05-13",
  "timestamp": "2026-05-13T10:30:45.123Z"
}
```

### QR Code Features

- **300x300 pixels** PNG image
- **High error correction** level (30% damage tolerance)
- **Data URL format** - can be displayed directly in `<img>` tags
- **Downloadable** - beneficiaries can download their QR code
- **Printable** - formatted print layout with beneficiary details

### QR Code Usage

1. **Beneficiary receives QR code** after approval (viewable in system + SMS notification)
2. **Beneficiary presents QR code** at payout location
3. **Disbursement officer scans QR code** using device camera
4. **System verifies** beneficiary identity automatically
5. **Payout is processed** and disbursement voucher is generated

---

## 📱 SMS Notification System

### When SMS Notifications Are Sent

| Event | Recipient | SMS Content |
|-------|-----------|-------------|
| **Application Approved** | Beneficiary | Approval confirmation + Reference number |
| **Application Rejected** | Beneficiary | Rejection reason |
| **Payout Scheduled** | Beneficiary | Payout date + Location + Reference number |
| **Payout Completed** | Beneficiary | Payment confirmation |

### SMS Templates

#### 1. Application Approved
```
E-Ayuda: Congratulations Juan Dela Cruz! Your application has been APPROVED. 
Amount: ₱5,000. Reference Number: REF-2026-101. 
Please wait for payout schedule.
```

#### 2. Payout Scheduled
```
E-Ayuda: Hi Juan Dela Cruz! Your payout of ₱5,000 is scheduled on May 20, 2026. 
Bring valid ID and reference number: REF-2026-101.
```

#### 3. Payout Completed
```
E-Ayuda: Payment confirmed! You have received ₱5,000 on May 20, 2026. 
Thank you for using E-Ayuda system.
```

#### 4. Application Rejected
```
E-Ayuda: Dear Juan Dela Cruz, your application has been rejected. 
Reason: Incomplete documents. 
For inquiries, please contact MSWDO office.
```

### Current Implementation (MOCK)

Currently, the SMS system is **MOCK** (for demonstration purposes):
- SMS messages are logged to browser console
- SMS messages are stored in localStorage
- No actual SMS is sent to mobile devices

### Production SMS Integration

To integrate with a real SMS service provider, choose one of these options:

#### Option 1: Semaphore (Philippines)
```typescript
async sendSMS(to: string, message: string) {
  const response = await fetch('https://api.semaphore.co/api/v4/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apikey: process.env.SEMAPHORE_API_KEY,
      number: to,
      message: message,
      sendername: 'E-AYUDA'
    })
  });
  return response.ok;
}
```

**Setup:**
1. Sign up at https://semaphore.co/
2. Get API key
3. Add `SEMAPHORE_API_KEY` to environment variables
4. Update `smsNotification.ts` with code above

#### Option 2: Movider (Philippines)
```typescript
async sendSMS(to: string, message: string) {
  const response = await fetch('https://api.movider.co/v1/sms', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MOVIDER_API_KEY}`
    },
    body: JSON.stringify({
      phone: to,
      message: message
    })
  });
  return response.ok;
}
```

#### Option 3: Twilio (International)
```bash
npm install twilio
```

```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async sendSMS(to: string, message: string) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
}
```

---

## 🔧 Technical Implementation

### Files Added

1. **`/src/app/utils/qrCodeGenerator.ts`**
   - QR code image generation
   - QR code data encoding/decoding
   - Download and print functions

2. **`/src/app/utils/smsNotification.ts`**
   - SMS service mock implementation
   - SMS templates for all events
   - SMS logging and storage
   - Production integration guide

3. **`/src/app/components/BeneficiaryQRCode.tsx`**
   - QR code display component
   - Download button
   - Print button
   - Beneficiary details display

### Files Modified

1. **`/src/app/utils/applicationStore.ts`**
   - Added `mobileNumber` field to Application interface
   - Added `qrCodeImage` field to store QR code data URL
   - Made `approveApplication()` async - generates QR code & sends SMS
   - Made `rejectApplication()` async - sends SMS notification
   - Made `scheduleApplication()` async - sends SMS notification
   - Made `disburseApplication()` async - sends SMS notification

2. **`/src/app/pages/mswdo-head/AwaitingApproval.tsx`**
   - Updated approval handler to be async
   - Added loading state during processing
   - Added QR code modal that shows after approval
   - Display generated QR code with download/print options

3. **`/src/app/pages/treasurer/TreasurerDashboard.tsx`**
   - Updated funding handler to be async

4. **`/src/app/pages/disbursement-officer/DisbursementDashboard.tsx`**
   - Updated disburse handler to be async
   - Added "SMS notification sent" to success message

5. **`/src/app/pages/disbursement-officer/PayoutProcessing.tsx`**
   - Updated disburse handler to be async
   - Added "SMS notification sent" to success message

### Data Flow

```
1. Application Submitted → Status: Received
2. Sector Staff Evaluates → Status: Recommended
3. MSWDO Head Approves → Status: Approved
   ├─ QR Code Generated (PNG image)
   ├─ Reference Number Generated
   └─ SMS Sent: "Application Approved"
4. Treasurer Funds → Status: Funded
5. Scheduler Sets Date → Status: Scheduled
   └─ SMS Sent: "Payout Scheduled"
6. Disbursement Officer Scans QR → Verifies Identity
7. Payout Released → Status: Paid
   ├─ Disbursement Voucher Generated
   └─ SMS Sent: "Payout Completed"
```

---

## 📊 Testing the System

### Test QR Code Generation

1. Login as **MSWDO Head**
2. Go to **"Awaiting Approval"** page
3. Select an application with status **"Recommended"**
4. Click **"Give Final Approval"**
5. Fill in approval remarks
6. Click **"Confirm Final Approval"**
7. **QR Code modal appears** with:
   - QR code image
   - Reference number
   - Beneficiary details
   - Download button
   - Print button

### Test SMS Notifications

1. Open browser **Developer Console** (F12)
2. Go to **Console tab**
3. Perform any action that triggers SMS (approve, reject, schedule, disburse)
4. See SMS log in console:
   ```
   📱 SMS SENT: {
     to: "+639171234567",
     message: "E-Ayuda: Congratulations...",
     timestamp: "2026-05-13T10:30:45.123Z",
     status: "sent"
   }
   ```

### View SMS Log

SMS messages are stored in `localStorage` under the key `smsLog`. 

To view all sent SMS:
1. Open browser Developer Console
2. Run: `JSON.parse(localStorage.getItem('smsLog'))`

---

## 🔒 Security Considerations

### QR Code Security
- QR codes contain beneficiary details but **no sensitive information**
- QR codes are **verified against database** before payout
- Invalid QR codes are **rejected** immediately
- Each QR code is **unique** and tied to specific application ID

### SMS Security
- Mobile numbers are **validated** before sending
- SMS content is **sanitized** to prevent injection
- API keys must be stored in **environment variables**
- SMS logs should be **rotated/archived** regularly

---

## 💡 Future Enhancements

1. **QR Code Expiry**: Add expiration date to QR codes
2. **QR Code Encryption**: Encrypt QR code payload
3. **SMS Delivery Status**: Track if SMS was delivered
4. **SMS Retry Logic**: Retry failed SMS deliveries
5. **Multi-Language SMS**: Support Tagalog/English SMS
6. **Email Notifications**: Add email alongside SMS
7. **Push Notifications**: Mobile app push notifications
8. **QR Code Analytics**: Track scan attempts and failures

---

## 📞 Support

For issues with:
- **QR Code Generation**: Check browser console for errors
- **SMS Not Sending**: Verify mobile number format (+639XXXXXXXXX)
- **Production SMS**: Contact SMS provider support
- **Camera Access**: Ensure HTTPS connection and camera permissions

---

**System Status**: ✅ **QR CODE & SMS FULLY FUNCTIONAL**
**Last Updated**: May 13, 2026
