// Supabase-powered Application Store
// This replaces the localStorage version with cloud database

import { supabase, isSupabaseConfigured } from './supabaseClient';
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
  private realtimeChannel: any = null;
  private localApplications: Application[] = [];

  constructor() {
    if (!isSupabaseConfigured) {
      console.warn('📊 Application Store Mode: LOCALSTORAGE (Supabase not configured)');
      this.initLocalStorage();
    } else {
      console.log('📊 Application Store Mode: SUPABASE');
      this.initializeRealtime();
    }
  }

  // Initialize localStorage fallback
  private initLocalStorage() {
    const stored = localStorage.getItem('applications');
    if (stored) {
      try {
        this.localApplications = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        this.localApplications = [];
      }
    }
  }

  private saveLocal() {
    localStorage.setItem('applications', JSON.stringify(this.localApplications));
    this.notifyListeners();
  }

  // Initialize real-time subscriptions
  private initializeRealtime() {
    if (!supabase) return;

    this.realtimeChannel = supabase
      .channel('applications_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'applications'
        },
        (payload) => {
          console.log('Real-time update:', payload);
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

  // Convert database snake_case to app camelCase
  private dbToApp(dbRow: any): Application {
    return {
      id: dbRow.id,
      applicantName: dbRow.applicant_name,
      mobileNumber: dbRow.mobile_number,
      barangay: dbRow.barangay,
      sector: dbRow.sector,
      assistanceType: dbRow.assistance_type,
      requestedAmount: parseFloat(dbRow.requested_amount),
      recommendedAmount: parseFloat(dbRow.recommended_amount || 0),
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

  // Convert app camelCase to database snake_case
  private appToDb(app: Partial<Application>): any {
    const dbObj: any = {};

    if (app.id) dbObj.id = app.id;
    if (app.applicantName) dbObj.applicant_name = app.applicantName;
    if (app.mobileNumber !== undefined) dbObj.mobile_number = app.mobileNumber;
    if (app.barangay) dbObj.barangay = app.barangay;
    if (app.sector) dbObj.sector = app.sector;
    if (app.assistanceType) dbObj.assistance_type = app.assistanceType;
    if (app.requestedAmount !== undefined) dbObj.requested_amount = app.requestedAmount;
    if (app.recommendedAmount !== undefined) dbObj.recommended_amount = app.recommendedAmount;
    if (app.status) dbObj.status = app.status;
    if (app.dateReceived) dbObj.date_received = app.dateReceived;
    if (app.dateEvaluated) dbObj.date_evaluated = app.dateEvaluated;
    if (app.dateApproved) dbObj.date_approved = app.dateApproved;
    if (app.dateFunded) dbObj.date_funded = app.dateFunded;
    if (app.dateScheduled) dbObj.date_scheduled = app.dateScheduled;
    if (app.dateDisbursed) dbObj.date_disbursed = app.dateDisbursed;
    if (app.evaluatedBy) dbObj.evaluated_by = app.evaluatedBy;
    if (app.approvedBy) dbObj.approved_by = app.approvedBy;
    if (app.fundedBy) dbObj.funded_by = app.fundedBy;
    if (app.disbursedBy) dbObj.disbursed_by = app.disbursedBy;
    if (app.qrCode) dbObj.qr_code = app.qrCode;
    if (app.qrCodeImage) dbObj.qr_code_image = app.qrCodeImage;
    if (app.payoutSchedule) dbObj.payout_schedule = app.payoutSchedule;
    if (app.referenceNumber) dbObj.reference_number = app.referenceNumber;
    if (app.notes) dbObj.notes = app.notes;
    if (app.rejectionReason) dbObj.rejection_reason = app.rejectionReason;

    return dbObj;
  }

  async getAll(): Promise<Application[]> {
    // localStorage fallback
    if (!isSupabaseConfigured) {
      return [...this.localApplications];
    }

    const { data, error} = await supabase!
      .from('applications')
      .select('*')
      .order('date_received', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      return [];
    }

    return (data || []).map(row => this.dbToApp(row));
  }

  async getById(id: string): Promise<Application | undefined> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching application:', error);
      return undefined;
    }

    return data ? this.dbToApp(data) : undefined;
  }

  async getByStatus(status: Application['status']): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('status', status)
      .order('date_received', { ascending: false });

    if (error) {
      console.error('Error fetching applications by status:', error);
      return [];
    }

    return (data || []).map(row => this.dbToApp(row));
  }

  async getBySector(sector: string): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('sector', sector)
      .order('date_received', { ascending: false });

    if (error) {
      console.error('Error fetching applications by sector:', error);
      return [];
    }

    return (data || []).map(row => this.dbToApp(row));
  }

  async evaluateApplication(id: string, evaluatedBy: string, recommendedAmount: number, notes?: string): Promise<boolean> {
    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Under Evaluation',
        date_evaluated: new Date().toISOString().split('T')[0],
        evaluated_by: evaluatedBy,
        recommended_amount: recommendedAmount,
        notes: notes
      })
      .eq('id', id)
      .eq('status', 'Received');

    if (error) {
      console.error('Error evaluating application:', error);
      return false;
    }

    return true;
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

    if (error) {
      console.error('Error recommending application:', error);
      return false;
    }

    return true;
  }

  async approveApplication(id: string, approvedBy: string): Promise<boolean> {
    // First, get the application
    const app = await this.getById(id);
    if (!app || app.status !== 'Recommended') {
      console.error('Application not found or not in Recommended status');
      return false;
    }

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

    // Update in database
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

    if (error) {
      console.error('Error approving application:', error);
      return false;
    }

    // Send SMS notification
    if (app.mobileNumber) {
      await sendApprovalNotification(
        app.mobileNumber,
        app.applicantName,
        app.recommendedAmount,
        referenceNumber
      );
    }

    return true;
  }

  async rejectApplication(id: string, reason: string): Promise<boolean> {
    // Get application first for SMS
    const app = await this.getById(id);
    if (!app) return false;

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Rejected',
        rejection_reason: reason
      })
      .eq('id', id);

    if (error) {
      console.error('Error rejecting application:', error);
      return false;
    }

    // Send SMS notification
    if (app.mobileNumber) {
      await sendRejectionNotification(app.mobileNumber, app.applicantName, reason);
    }

    return true;
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
      .eq('id', id)
      .eq('status', 'Approved');

    if (error) {
      console.error('Error funding application:', error);
      return false;
    }

    return true;
  }

  async scheduleApplication(id: string, schedule: string): Promise<boolean> {
    // Get application first for SMS
    const app = await this.getById(id);
    if (!app || app.status !== 'Funded') return false;

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Scheduled',
        date_scheduled: new Date().toISOString().split('T')[0],
        payout_schedule: schedule
      })
      .eq('id', id);

    if (error) {
      console.error('Error scheduling application:', error);
      return false;
    }

    // Send SMS notification
    if (app.mobileNumber && app.referenceNumber) {
      await sendPayoutScheduleNotification(
        app.mobileNumber,
        app.applicantName,
        app.recommendedAmount,
        schedule,
        app.referenceNumber
      );
    }

    return true;
  }

  async disburseApplication(id: string, disbursedBy: string): Promise<boolean> {
    // Get application first for SMS
    const app = await this.getById(id);
    if (!app || (app.status !== 'Scheduled' && app.status !== 'Funded')) return false;

    const dateDisbursed = new Date().toISOString().split('T')[0];

    const { error } = await supabase
      .from('applications')
      .update({
        status: 'Paid',
        date_disbursed: dateDisbursed,
        disbursed_by: disbursedBy
      })
      .eq('id', id);

    if (error) {
      console.error('Error disbursing application:', error);
      return false;
    }

    // Send SMS notification
    if (app.mobileNumber) {
      await sendPayoutCompletedNotification(
        app.mobileNumber,
        app.applicantName,
        app.recommendedAmount,
        dateDisbursed
      );
    }

    return true;
  }

  async addApplication(application: Omit<Application, 'id'>): Promise<string> {
    // Generate new ID
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true });

    const newId = `AICS-${year}-${((count || 0) + 1).toString().padStart(3, '0')}`;

    const newApp: Application = {
      ...application,
      id: newId,
      status: 'Received',
      dateReceived: new Date().toISOString().split('T')[0]
    };

    const { error } = await supabase
      .from('applications')
      .insert([this.appToDb(newApp)]);

    if (error) {
      console.error('Error adding application:', error);
      throw error;
    }

    return newId;
  }

  async getStatsByStatus() {
    const { data, error } = await supabase
      .from('applications')
      .select('status');

    if (error) {
      console.error('Error getting stats:', error);
      return {
        received: 0,
        underEvaluation: 0,
        recommended: 0,
        approved: 0,
        funded: 0,
        scheduled: 0,
        paid: 0,
        rejected: 0
      };
    }

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

    (data || []).forEach((app: any) => {
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
