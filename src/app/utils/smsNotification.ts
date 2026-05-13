// SMS Notification utility for beneficiary alerts
// This is a mock implementation. In production, integrate with SMS gateway like Twilio, Semaphore, or Movider

export interface SMSMessage {
  to: string; // Mobile number (e.g., +639171234567)
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
}

// Mock SMS log storage
class SMSNotificationService {
  private smsLog: SMSMessage[] = [];

  constructor() {
    // Load SMS log from localStorage
    const stored = localStorage.getItem('smsLog');
    if (stored) {
      this.smsLog = JSON.parse(stored);
    }
  }

  private save() {
    localStorage.setItem('smsLog', JSON.stringify(this.smsLog));
  }

  /**
   * Send SMS notification (MOCK - logs to console and localStorage)
   * In production, replace with actual SMS API call
   */
  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      const smsMessage: SMSMessage = {
        to,
        message,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      // MOCK: Log to console (in production, call SMS API here)
      console.log('📱 SMS SENT:', smsMessage);

      // Store in log
      this.smsLog.push(smsMessage);
      this.save();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return true;
    } catch (error) {
      console.error('SMS sending failed:', error);

      // Log failed attempt
      this.smsLog.push({
        to,
        message,
        timestamp: new Date().toISOString(),
        status: 'failed'
      });
      this.save();

      return false;
    }
  }

  /**
   * Get all SMS logs
   */
  getSMSLog(): SMSMessage[] {
    return [...this.smsLog];
  }

  /**
   * Clear SMS log
   */
  clearLog() {
    this.smsLog = [];
    localStorage.removeItem('smsLog');
  }
}

export const smsService = new SMSNotificationService();

// Pre-defined SMS templates
export const SMSTemplates = {
  /**
   * Application approved notification
   */
  applicationApproved: (name: string, amount: number, refNumber: string) =>
    `E-Ayuda: Congratulations ${name}! Your application has been APPROVED. Amount: ₱${amount.toLocaleString()}. Reference Number: ${refNumber}. Please wait for payout schedule.`,

  /**
   * Payout scheduled notification
   */
  payoutScheduled: (name: string, amount: number, date: string, refNumber: string) =>
    `E-Ayuda: Hi ${name}! Your payout of ₱${amount.toLocaleString()} is scheduled on ${date}. Bring valid ID and reference number: ${refNumber}.`,

  /**
   * Payout ready notification
   */
  payoutReady: (name: string, amount: number, location: string, refNumber: string) =>
    `E-Ayuda: Hi ${name}! Your payout of ₱${amount.toLocaleString()} is ready for release. Proceed to ${location}. Reference: ${refNumber}.`,

  /**
   * Payout completed notification
   */
  payoutCompleted: (name: string, amount: number, date: string) =>
    `E-Ayuda: Payment confirmed! You have received ₱${amount.toLocaleString()} on ${date}. Thank you for using E-Ayuda system.`,

  /**
   * Application rejected notification
   */
  applicationRejected: (name: string, reason: string) =>
    `E-Ayuda: Dear ${name}, your application has been rejected. Reason: ${reason}. For inquiries, please contact MSWDO office.`,

  /**
   * Document missing notification
   */
  documentsMissing: (name: string, documents: string) =>
    `E-Ayuda: Hi ${name}, your application is incomplete. Missing: ${documents}. Please submit requirements to proceed.`
};

/**
 * Send application approved SMS
 */
export const sendApprovalNotification = async (
  mobileNumber: string,
  beneficiaryName: string,
  amount: number,
  referenceNumber: string
): Promise<boolean> => {
  const message = SMSTemplates.applicationApproved(beneficiaryName, amount, referenceNumber);
  return await smsService.sendSMS(mobileNumber, message);
};

/**
 * Send payout scheduled SMS
 */
export const sendPayoutScheduleNotification = async (
  mobileNumber: string,
  beneficiaryName: string,
  amount: number,
  scheduleDate: string,
  referenceNumber: string
): Promise<boolean> => {
  const message = SMSTemplates.payoutScheduled(beneficiaryName, amount, scheduleDate, referenceNumber);
  return await smsService.sendSMS(mobileNumber, message);
};

/**
 * Send payout ready SMS
 */
export const sendPayoutReadyNotification = async (
  mobileNumber: string,
  beneficiaryName: string,
  amount: number,
  location: string,
  referenceNumber: string
): Promise<boolean> => {
  const message = SMSTemplates.payoutReady(beneficiaryName, amount, location, referenceNumber);
  return await smsService.sendSMS(mobileNumber, message);
};

/**
 * Send payout completed SMS
 */
export const sendPayoutCompletedNotification = async (
  mobileNumber: string,
  beneficiaryName: string,
  amount: number,
  date: string
): Promise<boolean> => {
  const message = SMSTemplates.payoutCompleted(beneficiaryName, amount, date);
  return await smsService.sendSMS(mobileNumber, message);
};

/**
 * Send rejection SMS
 */
export const sendRejectionNotification = async (
  mobileNumber: string,
  beneficiaryName: string,
  reason: string
): Promise<boolean> => {
  const message = SMSTemplates.applicationRejected(beneficiaryName, reason);
  return await smsService.sendSMS(mobileNumber, message);
};

/**
 * PRODUCTION INTEGRATION GUIDE:
 *
 * To integrate with a real SMS service:
 *
 * 1. For Twilio:
 *    - Install: npm install twilio
 *    - Replace sendSMS() with Twilio API call
 *    - Add credentials to environment variables
 *
 * 2. For Semaphore (Philippines):
 *    - API: https://semaphore.co/docs
 *    - Use fetch() to call their API endpoint
 *    - Add API key to environment variables
 *
 * 3. For Movider (Philippines):
 *    - API: https://movider.co/sms-api/
 *    - Use fetch() to call their API endpoint
 *    - Add API key to environment variables
 *
 * Example Semaphore integration:
 *
 * async sendSMS(to: string, message: string) {
 *   const response = await fetch('https://api.semaphore.co/api/v4/messages', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       apikey: process.env.SEMAPHORE_API_KEY,
 *       number: to,
 *       message: message,
 *       sendername: 'E-AYUDA'
 *     })
 *   });
 *   return response.ok;
 * }
 */
