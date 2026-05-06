// Resident/Applicant Interface
export interface Resident {
  id: string;
  fullName: string;
  gender: string;
  birthdate: string;
  age: number;
  address: string;
  contactNumber: string;
  barangay: string;
  sector: string;
  documents?: ResidentDocument[];
  dateRegistered?: string;
  registeredBy?: string;
}

// Resident Document Interface
export interface ResidentDocument {
  id: string;
  type: string;
  fileName: string;
  fileUrl: string;
  uploadedDate: string;
}

// Application Interface
export interface Application {
  id: string;
  residentId: string;
  applicantName: string;
  barangay: string;
  assistanceType: string;
  reason: string;
  sector: string;
  submissionDate: string;
  status: string;
  documents: ApplicationDocument[];
  validatedBy?: string;
  forwardedDate?: string;
  returnedReason?: string;
  returnedDate?: string;
  returnedBy?: string;
}

// Application Document Interface
export interface ApplicationDocument {
  id: string;
  type: string;
  fileName: string;
  fileUrl: string;
  uploadedDate: string;
}

// Notification Interface
export interface Notification {
  id: string;
  type: 'new' | 'validation' | 'forwarded' | 'approved' | 'returned' | 'rejected' | 'info';
  message: string;
  date: string;
  time: string;
  read: boolean;
  applicationId?: string;
  details?: string;
}

// Mock Residents Data
export const mockResidents: Resident[] = [
  {
    id: "RES-2024-001",
    fullName: "Maria Santos",
    gender: "Female",
    birthdate: "1985-03-15",
    age: 41,
    address: "Zone 1, Barangay San Jose",
    contactNumber: "09171234567",
    barangay: "San Jose",
    sector: "Solo Parent",
    documents: [
      {
        id: "DOC-2024-001",
        type: "Valid ID",
        fileName: "Maria_Santos_ID.jpg",
        fileUrl: "https://example.com/documents/Maria_Santos_ID.jpg",
        uploadedDate: "2024-03-08"
      }
    ],
    dateRegistered: "2024-03-08",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-002",
    fullName: "Juan Dela Cruz",
    gender: "Male",
    birthdate: "1960-07-22",
    age: 65,
    address: "Zone 2, Barangay San Jose",
    contactNumber: "09187654321",
    barangay: "San Jose",
    sector: "Senior Citizen",
    documents: [
      {
        id: "DOC-2024-002",
        type: "Senior Citizen ID",
        fileName: "Juan_Dela_Cruz_Senior_ID.jpg",
        fileUrl: "https://example.com/documents/Juan_Dela_Cruz_Senior_ID.jpg",
        uploadedDate: "2024-03-07"
      }
    ],
    dateRegistered: "2024-03-07",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-003",
    fullName: "Ana Reyes",
    gender: "Female",
    birthdate: "1992-11-08",
    age: 33,
    address: "Zone 3, Barangay San Jose",
    contactNumber: "09195551234",
    barangay: "San Jose",
    sector: "PWD",
    documents: [
      {
        id: "DOC-2024-003",
        type: "PWD ID",
        fileName: "Ana_Reyes_PWD_ID.jpg",
        fileUrl: "https://example.com/documents/Ana_Reyes_PWD_ID.jpg",
        uploadedDate: "2024-03-05"
      }
    ],
    dateRegistered: "2024-03-05",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-004",
    fullName: "Rosa Garcia",
    gender: "Female",
    birthdate: "1988-05-20",
    age: 37,
    address: "Zone 1, Barangay San Jose",
    contactNumber: "09201112233",
    barangay: "San Jose",
    sector: "Women",
    documents: [
      {
        id: "DOC-2024-004",
        type: "Valid ID",
        fileName: "Rosa_Garcia_ID.jpg",
        fileUrl: "https://example.com/documents/Rosa_Garcia_ID.jpg",
        uploadedDate: "2024-03-04"
      }
    ],
    dateRegistered: "2024-03-04",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-005",
    fullName: "Pedro Martinez",
    gender: "Male",
    birthdate: "2005-09-12",
    age: 20,
    address: "Zone 2, Barangay San Jose",
    contactNumber: "09185556677",
    barangay: "San Jose",
    sector: "Youth",
    documents: [
      {
        id: "DOC-2024-005",
        type: "Valid ID",
        fileName: "Pedro_Martinez_ID.jpg",
        fileUrl: "https://example.com/documents/Pedro_Martinez_ID.jpg",
        uploadedDate: "2024-03-09"
      }
    ],
    dateRegistered: "2024-03-09",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-006",
    fullName: "Elena Lopez",
    gender: "Female",
    birthdate: "1995-12-03",
    age: 30,
    address: "Zone 4, Barangay San Jose",
    contactNumber: "09173334455",
    barangay: "San Jose",
    sector: "Disaster Affected",
    documents: [
      {
        id: "DOC-2024-006",
        type: "Valid ID",
        fileName: "Elena_Lopez_ID.jpg",
        fileUrl: "https://example.com/documents/Elena_Lopez_ID.jpg",
        uploadedDate: "2024-03-08"
      }
    ],
    dateRegistered: "2024-03-08",
    registeredBy: "BSWDO Staff"
  }
];

// Mock Applications Data
export const mockApplications: Application[] = [
  {
    id: "APP-2024-001",
    residentId: "RES-2024-001",
    applicantName: "Maria Santos",
    barangay: "San Jose",
    assistanceType: "Educational Assistance",
    reason: "School supplies and tuition fee support for 2 children",
    sector: "Solo Parent",
    submissionDate: "2024-03-08",
    status: "Pending Validation",
    documents: [
      {
        id: "DOC-2024-007",
        type: "Certificate of Enrollment",
        fileName: "Maria_Santos_Enrollment.jpg",
        fileUrl: "https://example.com/documents/Maria_Santos_Enrollment.jpg",
        uploadedDate: "2024-03-08"
      },
      {
        id: "DOC-2024-008",
        type: "Birth Certificate",
        fileName: "Maria_Santos_Birth_Certificate.jpg",
        fileUrl: "https://example.com/documents/Maria_Santos_Birth_Certificate.jpg",
        uploadedDate: "2024-03-08"
      }
    ]
  },
  {
    id: "APP-2024-002",
    residentId: "RES-2024-002",
    applicantName: "Juan Dela Cruz",
    barangay: "San Jose",
    assistanceType: "Medical Assistance",
    reason: "Maintenance medicine for hypertension and diabetes",
    sector: "Senior Citizen",
    submissionDate: "2024-03-07",
    status: "Validated by Barangay",
    documents: [
      {
        id: "DOC-2024-009",
        type: "Medical Certificate",
        fileName: "Juan_Dela_Cruz_Medical_Certificate.jpg",
        fileUrl: "https://example.com/documents/Juan_Dela_Cruz_Medical_Certificate.jpg",
        uploadedDate: "2024-03-07"
      },
      {
        id: "DOC-2024-010",
        type: "Prescription",
        fileName: "Juan_Dela_Cruz_Prescription.jpg",
        fileUrl: "https://example.com/documents/Juan_Dela_Cruz_Prescription.jpg",
        uploadedDate: "2024-03-07"
      }
    ],
    validatedBy: "BSWDO Staff"
  },
  {
    id: "APP-2024-003",
    residentId: "RES-2024-003",
    applicantName: "Ana Reyes",
    barangay: "San Jose",
    assistanceType: "Livelihood Assistance",
    reason: "Capital for small sari-sari store business",
    sector: "PWD",
    submissionDate: "2024-03-05",
    status: "Forwarded to Municipal MSWDO",
    documents: [
      {
        id: "DOC-2024-011",
        type: "Business Proposal",
        fileName: "Ana_Reyes_Business_Proposal.jpg",
        fileUrl: "https://example.com/documents/Ana_Reyes_Business_Proposal.jpg",
        uploadedDate: "2024-03-05"
      },
      {
        id: "DOC-2024-012",
        type: "Barangay Clearance",
        fileName: "Ana_Reyes_Barangay_Clearance.jpg",
        fileUrl: "https://example.com/documents/Ana_Reyes_Barangay_Clearance.jpg",
        uploadedDate: "2024-03-05"
      }
    ],
    validatedBy: "BSWDO Staff",
    forwardedDate: "2024-03-06"
  },
  {
    id: "APP-2024-004",
    residentId: "RES-2024-004",
    applicantName: "Rosa Garcia",
    barangay: "San Jose",
    assistanceType: "Food Assistance",
    reason: "Food packs for family of 6 members",
    sector: "Women",
    submissionDate: "2024-03-04",
    status: "Approved by MSWDO",
    documents: [
      {
        id: "DOC-2024-013",
        type: "Barangay Certificate",
        fileName: "Rosa_Garcia_Barangay_Certificate.jpg",
        fileUrl: "https://example.com/documents/Rosa_Garcia_Barangay_Certificate.jpg",
        uploadedDate: "2024-03-04"
      }
    ],
    validatedBy: "BSWDO Staff",
    forwardedDate: "2024-03-05"
  },
  {
    id: "APP-2024-005",
    residentId: "RES-2024-005",
    applicantName: "Pedro Martinez",
    barangay: "San Jose",
    assistanceType: "Skills Training",
    reason: "Vocational training for computer literacy",
    sector: "Youth",
    submissionDate: "2024-03-09",
    status: "Pending Validation",
    documents: [
      {
        id: "DOC-2024-014",
        type: "Birth Certificate",
        fileName: "Pedro_Martinez_Birth_Certificate.jpg",
        fileUrl: "https://example.com/documents/Pedro_Martinez_Birth_Certificate.jpg",
        uploadedDate: "2024-03-09"
      }
    ]
  },
  {
    id: "APP-2024-006",
    residentId: "RES-2024-006",
    applicantName: "Elena Lopez",
    barangay: "San Jose",
    assistanceType: "Financial Assistance",
    reason: "Emergency financial support for house repair after storm",
    sector: "Disaster Affected",
    submissionDate: "2024-03-08",
    status: "Validated by Barangay",
    documents: [
      {
        id: "DOC-2024-015",
        type: "Photos of Damage",
        fileName: "Elena_Lopez_Damage_Photos.jpg",
        fileUrl: "https://example.com/documents/Elena_Lopez_Damage_Photos.jpg",
        uploadedDate: "2024-03-08"
      },
      {
        id: "DOC-2024-016",
        type: "Barangay Certificate",
        fileName: "Elena_Lopez_Barangay_Certificate.jpg",
        fileUrl: "https://example.com/documents/Elena_Lopez_Barangay_Certificate.jpg",
        uploadedDate: "2024-03-08"
      }
    ],
    validatedBy: "BSWDO Staff"
  },
  {
    id: "APP-2024-007",
    residentId: "RES-2024-001",
    applicantName: "Maria Santos",
    barangay: "San Jose",
    assistanceType: "Medical Assistance",
    reason: "Medical expenses for minor surgery",
    sector: "Solo Parent",
    submissionDate: "2024-03-10",
    status: "Returned for Completion",
    documents: [
      {
        id: "DOC-2024-017",
        type: "Medical Certificate",
        fileName: "Maria_Santos_Medical_Certificate.jpg",
        fileUrl: "https://example.com/documents/Maria_Santos_Medical_Certificate.jpg",
        uploadedDate: "2024-03-10"
      }
    ],
    validatedBy: "BSWDO Staff",
    forwardedDate: "2024-03-10",
    returnedReason: "Missing required documents: Barangay Clearance, Income Certificate, and Hospital Estimate. Please upload these documents to complete your application.",
    returnedDate: "2024-03-11",
    returnedBy: "MSWDO Sector Staff"
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "NOT-001",
    type: "returned",
    message: "Application APP-2024-007 returned by MSWDO - Missing documents",
    date: "2024-03-11",
    time: "11:15 AM",
    read: false,
    applicationId: "APP-2024-007",
    details: "Please upload Barangay Clearance, Income Certificate, and Hospital Estimate"
  },
  {
    id: "NOT-002",
    type: "new",
    message: "New application submitted by Pedro Martinez",
    date: "2024-03-09",
    time: "10:30 AM",
    read: false,
    applicationId: "APP-2024-005"
  },
  {
    id: "NOT-003",
    type: "validation",
    message: "Application APP-2024-001 requires validation",
    date: "2024-03-08",
    time: "02:15 PM",
    read: false,
    applicationId: "APP-2024-001"
  },
  {
    id: "NOT-004",
    type: "forwarded",
    message: "Application APP-2024-003 successfully forwarded to MSWDO",
    date: "2024-03-06",
    time: "11:45 AM",
    read: true,
    applicationId: "APP-2024-003"
  },
  {
    id: "NOT-005",
    type: "approved",
    message: "Application APP-2024-004 approved by MSWDO",
    date: "2024-03-06",
    time: "09:20 AM",
    read: true,
    applicationId: "APP-2024-004"
  }
];

// Chart Data
export interface ChartData {
  name: string;
  value: number;
  id?: string;
}

export const applicationsBySector: ChartData[] = [
  { name: "Senior Citizen", value: 25, id: "sector-senior" },
  { name: "PWD", value: 18, id: "sector-pwd" },
  { name: "Solo Parent", value: 32, id: "sector-solo" },
  { name: "Women", value: 22, id: "sector-women" },
  { name: "Youth", value: 15, id: "sector-youth" },
  { name: "Disaster Affected", value: 12, id: "sector-disaster" }
];

export const applicationsByMonth: ChartData[] = [
  { name: "Jan", value: 45, id: "month-jan" },
  { name: "Feb", value: 52, id: "month-feb" },
  { name: "Mar", value: 38, id: "month-mar" }
];