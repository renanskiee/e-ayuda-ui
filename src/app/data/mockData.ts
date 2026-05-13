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
    fullName: "Maria Clara Santos",
    gender: "Female",
    birthdate: "15/03/1985",
    age: 41,
    address: "123 Rizal Street, Zone 1, San Jose, San Pablo City",
    contactNumber: "09171234567",
    barangay: "San Jose",
    sector: "Solo Parent",
    documents: [
      {
        id: "DOC-2024-001",
        type: "Barangay ID",
        fileName: "Maria_Santos_Barangay_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      },
      {
        id: "DOC-2024-002",
        type: "Valid ID",
        fileName: "Maria_Santos_Valid_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      }
    ],
    dateRegistered: "2024-05-08",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-002",
    fullName: "Roberto Dela Cruz",
    gender: "Male",
    birthdate: "22/07/1958",
    age: 67,
    address: "456 Bonifacio Ave, Zone 2, San Jose, San Pablo City",
    contactNumber: "09187654321",
    barangay: "San Jose",
    sector: "Senior Citizen",
    documents: [
      {
        id: "DOC-2024-003",
        type: "Senior Citizen ID",
        fileName: "Roberto_Senior_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-07"
      }
    ],
    dateRegistered: "2024-05-07",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-003",
    fullName: "Ana Marie Reyes",
    gender: "Female",
    birthdate: "08/11/1990",
    age: 35,
    address: "789 Luna Street, Zone 3, San Jose, San Pablo City",
    contactNumber: "09195551234",
    barangay: "San Jose",
    sector: "PWD",
    documents: [
      {
        id: "DOC-2024-004",
        type: "PWD ID",
        fileName: "Ana_PWD_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-05"
      }
    ],
    dateRegistered: "2024-05-05",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-004",
    fullName: "Carmen Lopez Garcia",
    gender: "Female",
    birthdate: "20/05/1988",
    age: 38,
    address: "321 Mabini Road, Zone 1, San Jose, San Pablo City",
    contactNumber: "09201112233",
    barangay: "San Jose",
    sector: "Women",
    documents: [
      {
        id: "DOC-2024-005",
        type: "Barangay ID",
        fileName: "Carmen_Barangay_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-04"
      }
    ],
    dateRegistered: "2024-05-04",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-005",
    fullName: "Miguel Antonio Martinez",
    gender: "Male",
    birthdate: "12/09/2004",
    age: 21,
    address: "555 Del Pilar Street, Zone 2, San Jose, San Pablo City",
    contactNumber: "09185556677",
    barangay: "San Jose",
    sector: "Youth/Children",
    documents: [
      {
        id: "DOC-2024-006",
        type: "Valid ID",
        fileName: "Miguel_Valid_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-09"
      }
    ],
    dateRegistered: "2024-05-09",
    registeredBy: "BSWDO Staff"
  },
  {
    id: "RES-2024-006",
    fullName: "Josefa Trinidad Ramos",
    gender: "Female",
    birthdate: "03/12/1995",
    age: 30,
    address: "888 Quezon Boulevard, Zone 4, San Jose, San Pablo City",
    contactNumber: "09173334455",
    barangay: "San Jose",
    sector: "ECCD",
    documents: [
      {
        id: "DOC-2024-007",
        type: "Barangay ID",
        fileName: "Josefa_Barangay_ID.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      }
    ],
    dateRegistered: "2024-05-08",
    registeredBy: "BSWDO Staff"
  }
];

// Mock Applications Data
export const mockApplications: Application[] = [
  {
    id: "APP-2024-001",
    residentId: "RES-2024-001",
    applicantName: "Maria Clara Santos",
    barangay: "San Jose",
    assistanceType: "Educational Assistance",
    reason: "School supplies and tuition fee support for 2 children enrolled in elementary school",
    sector: "Solo Parent",
    submissionDate: "2024-05-08",
    status: "Pending Validation",
    documents: [
      {
        id: "DOC-APP-001",
        type: "Certificate of Enrollment",
        fileName: "Enrollment_Certificate.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      },
      {
        id: "DOC-APP-002",
        type: "Birth Certificate",
        fileName: "Children_Birth_Cert.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      }
    ]
  },
  {
    id: "APP-2024-002",
    residentId: "RES-2024-002",
    applicantName: "Roberto Dela Cruz",
    barangay: "San Jose",
    assistanceType: "Medical Assistance",
    reason: "Maintenance medicine for hypertension and diabetes management",
    sector: "Senior Citizen",
    submissionDate: "2024-05-07",
    status: "Validated by Barangay",
    documents: [
      {
        id: "DOC-APP-003",
        type: "Medical Certificate",
        fileName: "Medical_Certificate.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-07"
      },
      {
        id: "DOC-APP-004",
        type: "Prescription",
        fileName: "Medical_Prescription.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-07"
      }
    ],
    validatedBy: "BSWDO Staff"
  },
  {
    id: "APP-2024-003",
    residentId: "RES-2024-003",
    applicantName: "Ana Marie Reyes",
    barangay: "San Jose",
    assistanceType: "Livelihood Assistance",
    reason: "Capital for small sari-sari store to provide sustainable income",
    sector: "PWD",
    submissionDate: "2024-05-05",
    status: "Forwarded to Municipal MSWDO",
    documents: [
      {
        id: "DOC-APP-005",
        type: "Business Proposal",
        fileName: "Business_Proposal.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-05"
      },
      {
        id: "DOC-APP-006",
        type: "Barangay Clearance",
        fileName: "Barangay_Clearance.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-05"
      }
    ],
    validatedBy: "BSWDO Staff",
    forwardedDate: "2024-05-06"
  },
  {
    id: "APP-2024-004",
    residentId: "RES-2024-004",
    applicantName: "Carmen Lopez Garcia",
    barangay: "San Jose",
    assistanceType: "Food Assistance",
    reason: "Food packs and groceries for family of 6 members",
    sector: "Women",
    submissionDate: "2024-05-04",
    status: "Approved by MSWDO",
    documents: [
      {
        id: "DOC-APP-007",
        type: "Barangay Certificate",
        fileName: "Barangay_Certificate.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-04"
      }
    ],
    validatedBy: "BSWDO Staff",
    forwardedDate: "2024-05-05"
  },
  {
    id: "APP-2024-005",
    residentId: "RES-2024-005",
    applicantName: "Miguel Antonio Martinez",
    barangay: "San Jose",
    assistanceType: "Skills Training",
    reason: "Vocational training program for computer literacy and digital skills",
    sector: "Youth/Children",
    submissionDate: "2024-05-09",
    status: "Pending Validation",
    documents: [
      {
        id: "DOC-APP-008",
        type: "Birth Certificate",
        fileName: "Birth_Certificate.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-09"
      }
    ]
  },
  {
    id: "APP-2024-006",
    residentId: "RES-2024-006",
    applicantName: "Josefa Trinidad Ramos",
    barangay: "San Jose",
    assistanceType: "Educational Assistance",
    reason: "Day care supplies and materials for early childhood education",
    sector: "ECCD",
    submissionDate: "2024-05-08",
    status: "Validated by Barangay",
    documents: [
      {
        id: "DOC-APP-009",
        type: "Day Care Enrollment",
        fileName: "Daycare_Enrollment.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      },
      {
        id: "DOC-APP-010",
        type: "Proof of Residency",
        fileName: "Proof_Residency.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-08"
      }
    ],
    validatedBy: "BSWDO Staff"
  },
  {
    id: "APP-2024-007",
    residentId: "RES-2024-001",
    applicantName: "Maria Clara Santos",
    barangay: "San Jose",
    assistanceType: "Medical Assistance",
    reason: "Medical expenses for dental treatment and medications",
    sector: "Solo Parent",
    submissionDate: "2024-05-10",
    status: "Returned for Completion",
    documents: [
      {
        id: "DOC-APP-011",
        type: "Medical Certificate",
        fileName: "Dental_Certificate.pdf",
        fileUrl: "#",
        uploadedDate: "2024-05-10"
      }
    ],
    validatedBy: "BSWDO Staff",
    forwardedDate: "2024-05-10",
    returnedReason: "Missing required documents: Barangay Clearance, Income Certificate, and Dental Estimate. Please upload these documents to complete your application.",
    returnedDate: "2024-05-11",
    returnedBy: "MSWDO Sector Staff"
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "NOT-001",
    type: "returned",
    message: "Application APP-2024-007 returned by MSWDO - Missing documents",
    date: "2024-05-11",
    time: "11:15 AM",
    read: false,
    applicationId: "APP-2024-007",
    details: "Please upload Barangay Clearance, Income Certificate, and Dental Estimate"
  },
  {
    id: "NOT-002",
    type: "approved",
    message: "Request APP-2024-004 has been approved by MSWDO",
    date: "2024-05-11",
    time: "10:30 AM",
    read: false,
    applicationId: "APP-2024-004"
  },
  {
    id: "NOT-003",
    type: "new",
    message: "New application submitted by Miguel Antonio Martinez",
    date: "2024-05-09",
    time: "02:15 PM",
    read: false,
    applicationId: "APP-2024-005"
  },
  {
    id: "NOT-004",
    type: "forwarded",
    message: "Application APP-2024-003 successfully forwarded to MSWDO",
    date: "2024-05-06",
    time: "11:45 AM",
    read: true,
    applicationId: "APP-2024-003"
  },
  {
    id: "NOT-005",
    type: "validation",
    message: "Application APP-2024-001 requires validation",
    date: "2024-05-08",
    time: "09:20 AM",
    read: true,
    applicationId: "APP-2024-001"
  },
  {
    id: "NOT-006",
    type: "info",
    message: "New assistance program available for Senior Citizens",
    date: "2024-05-07",
    time: "03:30 PM",
    read: true
  }
];

// Chart Data
export interface ChartData {
  name: string;
  value: number;
  id?: string;
}

export const applicationsBySector: ChartData[] = [
  { name: "Senior Citizen", value: 28, id: "sector-senior" },
  { name: "PWD", value: 22, id: "sector-pwd" },
  { name: "Solo Parent", value: 35, id: "sector-solo" },
  { name: "Women", value: 26, id: "sector-women" },
  { name: "Youth/Children", value: 18, id: "sector-youth" },
  { name: "ECCD", value: 15, id: "sector-eccd" }
];

export const applicationsByMonth: ChartData[] = [
  { name: "Jan", value: 42, id: "month-jan" },
  { name: "Feb", value: 48, id: "month-feb" },
  { name: "Mar", value: 55, id: "month-mar" },
  { name: "Apr", value: 51, id: "month-apr" },
  { name: "May", value: 38, id: "month-may" }
];