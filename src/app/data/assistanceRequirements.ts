// Document requirements for each assistance type
export interface DocumentRequirement {
  id: string;
  name: string;
  required: boolean;
  description?: string;
}

export const assistanceRequirements: Record<string, DocumentRequirement[]> = {
  'Financial Assistance': [
    { id: 'valid-id', name: 'Valid ID of Applicant', required: true },
    { id: 'barangay-cert', name: 'Barangay Certificate/Indigency', required: true },
    { id: 'income-proof', name: 'Proof of Income or No Income Certificate', required: true },
    { id: 'letter-request', name: 'Letter of Request/Application', required: true },
    { id: 'case-study', name: 'Case Study Report (if required by MSWDO)', required: false },
  ],
  'Medical Assistance': [
    { id: 'valid-id', name: 'Valid ID of Applicant/Patient', required: true },
    { id: 'barangay-indigency', name: 'Barangay Indigency Certificate', required: true },
    { id: 'medical-cert', name: 'Medical Certificate', required: true },
    { id: 'prescription', name: "Prescription/Doctor's Request", required: true },
    { id: 'hospital-bill', name: 'Hospital Bill or Statement of Account', required: true },
    { id: 'lab-results', name: 'Laboratory Request/Results (if applicable)', required: false },
  ],
  'Educational Assistance': [
    { id: 'valid-id', name: 'Valid ID of Student/Parent', required: true },
    { id: 'enrollment-cert', name: 'Certificate of Enrollment/Registration', required: true },
    { id: 'school-id', name: 'School ID', required: true },
    { id: 'report-card', name: 'Report Card or Certificate of Grades', required: true },
    { id: 'barangay-indigency', name: 'Barangay Indigency Certificate', required: true },
    { id: 'tuition-proof', name: 'Proof of Tuition or School Expenses', required: true },
  ],
  'Food Assistance': [
    { id: 'valid-id', name: 'Valid ID', required: true },
    { id: 'barangay-cert', name: 'Barangay Certificate/Indigency', required: true },
    { id: 'family-composition', name: 'Family Composition Certificate', required: true },
    { id: 'income-proof', name: 'Proof of Low Income/No Income', required: true },
    { id: 'disaster-cert', name: 'Disaster or Emergency Certification (if applicable)', required: false },
  ],
  'Livelihood Assistance': [
    { id: 'valid-id', name: 'Valid ID', required: true },
    { id: 'barangay-clearance', name: 'Barangay Clearance/Indigency', required: true },
    { id: 'business-proposal', name: 'Business Proposal or Livelihood Plan', required: true },
    { id: 'existing-business', name: 'Proof of Existing Small Business (if any)', required: false },
    { id: 'residency-cert', name: 'Certificate of Residency', required: true },
  ],
  'Skills Training': [
    { id: 'valid-id', name: 'Valid ID', required: true },
    { id: 'barangay-cert', name: 'Barangay Certificate', required: true },
    { id: 'resume', name: 'Resume/Bio-data', required: true },
    { id: 'unemployment-cert', name: 'Certificate of Unemployment (if applicable)', required: false },
    { id: 'training-form', name: 'Training Application Form', required: true },
  ],
  'Emergency Assistance': [
    { id: 'valid-id', name: 'Valid ID', required: true },
    { id: 'barangay-cert', name: 'Barangay Certificate', required: true },
    { id: 'incident-report', name: 'Incident Report/Police Report (if applicable)', required: false },
    { id: 'disaster-cert', name: 'Disaster Certification', required: true },
    { id: 'emergency-cert', name: 'Medical or Death Certificate (depending on emergency type)', required: false },
    { id: 'damage-proof', name: 'Photos or Proof of Incident/Damage', required: true },
  ],
};

export const getRequiredDocuments = (assistanceType: string): DocumentRequirement[] => {
  return assistanceRequirements[assistanceType] || [];
};
