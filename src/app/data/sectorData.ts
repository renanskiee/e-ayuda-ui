// Shared data for all sectors - Sample beneficiary and application data

export const barangays = [
  'Pacol',
  'Santa Cruz',
  'San Rafael',
  'San Antonio',
  'Malaking Ilog',
  'Poblacion',
  'San Isidro',
  'Bagumbayan'
];

// Senior Citizen Applications
export const seniorCitizenApplications = [
  { id: "SC-101", applicantName: "Maria Santos", age: 68, gender: "Female", barangay: "Pacol", assistanceType: "Pension Support", submissionDate: "Mar 12 2026", status: "Pending", amount: 3000, medicalCondition: "Hypertension" },
  { id: "SC-102", applicantName: "Pedro Garcia", age: 72, gender: "Male", barangay: "Santa Cruz", assistanceType: "Medical Assistance", submissionDate: "Mar 11 2026", status: "Pending", amount: 5000, medicalCondition: "Diabetes" },
  { id: "SC-103", applicantName: "Rosa Dela Cruz", age: 65, gender: "Female", barangay: "San Rafael", assistanceType: "Pension Support", submissionDate: "Mar 10 2026", status: "Under Review", amount: 3000, medicalCondition: "None" },
  { id: "SC-104", applicantName: "Juan Reyes", age: 70, gender: "Male", barangay: "San Antonio", assistanceType: "Medical Assistance", submissionDate: "Mar 9 2026", status: "Pending", amount: 4500, medicalCondition: "Arthritis" },
  { id: "SC-105", applicantName: "Carmen Lopez", age: 75, gender: "Female", barangay: "Malaking Ilog", assistanceType: "Pension Support", submissionDate: "Mar 8 2026", status: "Pending", amount: 3000, medicalCondition: "None" },
  { id: "SC-106", applicantName: "Antonio Cruz", age: 69, gender: "Male", barangay: "Poblacion", assistanceType: "Medical Assistance", submissionDate: "Mar 7 2026", status: "Under Review", amount: 6000, medicalCondition: "Heart Disease" },
  { id: "SC-107", applicantName: "Luz Mendoza", age: 67, gender: "Female", barangay: "San Isidro", assistanceType: "Pension Support", submissionDate: "Mar 6 2026", status: "Pending", amount: 3000, medicalCondition: "None" },
  { id: "SC-108", applicantName: "Roberto Flores", age: 71, gender: "Male", barangay: "Bagumbayan", assistanceType: "Medical Assistance", submissionDate: "Mar 5 2026", status: "Pending", amount: 5500, medicalCondition: "COPD" },
  { id: "SC-109", applicantName: "Elena Ramos", age: 73, gender: "Female", barangay: "Pacol", assistanceType: "Pension Support", submissionDate: "Mar 4 2026", status: "Pending", amount: 3000, medicalCondition: "None" },
  { id: "SC-110", applicantName: "Diego Castillo", age: 68, gender: "Male", barangay: "Santa Cruz", assistanceType: "Medical Assistance", submissionDate: "Mar 3 2026", status: "Under Review", amount: 4000, medicalCondition: "Hypertension" }
];

// PWD Applications
export const pwdApplications = [
  { id: "PWD-201", applicantName: "Anna Cruz", age: 34, gender: "Female", barangay: "Pacol", disabilityType: "Visual Impairment", assistanceType: "Assistive Device", submissionDate: "Mar 12 2026", status: "Pending", amount: 8000 },
  { id: "PWD-202", applicantName: "Mark Santos", age: 28, gender: "Male", barangay: "Santa Cruz", disabilityType: "Physical Disability", assistanceType: "Mobility Aid", submissionDate: "Mar 11 2026", status: "Pending", amount: 15000 },
  { id: "PWD-203", applicantName: "Lisa Garcia", age: 42, gender: "Female", barangay: "San Rafael", disabilityType: "Hearing Impairment", assistanceType: "Hearing Aid", submissionDate: "Mar 10 2026", status: "Under Review", amount: 12000 },
  { id: "PWD-204", applicantName: "John Reyes", age: 31, gender: "Male", barangay: "San Antonio", disabilityType: "Physical Disability", assistanceType: "Wheelchair", submissionDate: "Mar 9 2026", status: "Pending", amount: 18000 },
  { id: "PWD-205", applicantName: "Maria Lopez", age: 45, gender: "Female", barangay: "Malaking Ilog", disabilityType: "Visual Impairment", assistanceType: "Assistive Device", submissionDate: "Mar 8 2026", status: "Pending", amount: 10000 },
  { id: "PWD-206", applicantName: "Carlos Mendoza", age: 29, gender: "Male", barangay: "Poblacion", disabilityType: "Physical Disability", assistanceType: "Crutches", submissionDate: "Mar 7 2026", status: "Under Review", amount: 5000 },
  { id: "PWD-207", applicantName: "Sofia Flores", age: 38, gender: "Female", barangay: "San Isidro", disabilityType: "Intellectual Disability", assistanceType: "Therapy Support", submissionDate: "Mar 6 2026", status: "Pending", amount: 7000 },
  { id: "PWD-208", applicantName: "Miguel Torres", age: 52, gender: "Male", barangay: "Bagumbayan", disabilityType: "Physical Disability", assistanceType: "Mobility Aid", submissionDate: "Mar 5 2026", status: "Pending", amount: 14000 },
  { id: "PWD-209", applicantName: "Grace Ramos", age: 26, gender: "Female", barangay: "Pacol", disabilityType: "Speech Impairment", assistanceType: "Speech Therapy", submissionDate: "Mar 4 2026", status: "Pending", amount: 6000 },
  { id: "PWD-210", applicantName: "Daniel Castro", age: 35, gender: "Male", barangay: "Santa Cruz", disabilityType: "Visual Impairment", assistanceType: "Assistive Device", submissionDate: "Mar 3 2026", status: "Under Review", amount: 9000 }
];

// Solo Parent Applications
export const soloParentApplications = [
  { id: "SP-301", applicantName: "Jennifer Cruz", age: 32, gender: "Female", barangay: "Pacol", numberOfChildren: 2, assistanceType: "Livelihood Support", submissionDate: "Mar 12 2026", status: "Pending", amount: 10000 },
  { id: "SP-302", applicantName: "Robert Santos", age: 38, gender: "Male", barangay: "Santa Cruz", numberOfChildren: 3, assistanceType: "Educational Assistance", submissionDate: "Mar 11 2026", status: "Pending", amount: 8000 },
  { id: "SP-303", applicantName: "Michelle Garcia", age: 29, gender: "Female", barangay: "San Rafael", numberOfChildren: 1, assistanceType: "Livelihood Support", submissionDate: "Mar 10 2026", status: "Under Review", amount: 12000 },
  { id: "SP-304", applicantName: "Carlos Reyes", age: 35, gender: "Male", barangay: "San Antonio", numberOfChildren: 2, assistanceType: "Educational Assistance", submissionDate: "Mar 9 2026", status: "Pending", amount: 7000 },
  { id: "SP-305", applicantName: "Angela Lopez", age: 31, gender: "Female", barangay: "Malaking Ilog", numberOfChildren: 4, assistanceType: "Food Assistance", submissionDate: "Mar 8 2026", status: "Pending", amount: 5000 },
  { id: "SP-306", applicantName: "Mario Mendoza", age: 42, gender: "Male", barangay: "Poblacion", numberOfChildren: 2, assistanceType: "Livelihood Support", submissionDate: "Mar 7 2026", status: "Under Review", amount: 11000 },
  { id: "SP-307", applicantName: "Diana Flores", age: 27, gender: "Female", barangay: "San Isidro", numberOfChildren: 1, assistanceType: "Educational Assistance", submissionDate: "Mar 6 2026", status: "Pending", amount: 6000 },
  { id: "SP-308", applicantName: "Ricardo Torres", age: 40, gender: "Male", barangay: "Bagumbayan", numberOfChildren: 3, assistanceType: "Livelihood Support", submissionDate: "Mar 5 2026", status: "Pending", amount: 13000 },
  { id: "SP-309", applicantName: "Patricia Ramos", age: 33, gender: "Female", barangay: "Pacol", numberOfChildren: 2, assistanceType: "Medical Assistance", submissionDate: "Mar 4 2026", status: "Pending", amount: 9000 },
  { id: "SP-310", applicantName: "Fernando Castro", age: 36, gender: "Male", barangay: "Santa Cruz", numberOfChildren: 1, assistanceType: "Educational Assistance", submissionDate: "Mar 3 2026", status: "Under Review", amount: 5500 }
];

// Women Applications
export const womenApplications = [
  { id: "WOM-401", applicantName: "Sarah Cruz", age: 28, barangay: "Pacol", programCategory: "Skills Training", assistanceType: "Livelihood Training", submissionDate: "Mar 12 2026", status: "Pending", amount: 7000 },
  { id: "WOM-402", applicantName: "Linda Santos", age: 35, barangay: "Santa Cruz", programCategory: "Gender-Based Violence Support", assistanceType: "Crisis Intervention", submissionDate: "Mar 11 2026", status: "Pending", amount: 5000 },
  { id: "WOM-403", applicantName: "Mary Garcia", age: 42, barangay: "San Rafael", programCategory: "Skills Training", assistanceType: "Entrepreneurship Program", submissionDate: "Mar 10 2026", status: "Under Review", amount: 15000 },
  { id: "WOM-404", applicantName: "Christine Reyes", age: 31, barangay: "San Antonio", programCategory: "Health and Wellness", assistanceType: "Medical Support", submissionDate: "Mar 9 2026", status: "Pending", amount: 8000 },
  { id: "WOM-405", applicantName: "Elizabeth Lopez", age: 26, barangay: "Malaking Ilog", programCategory: "Skills Training", assistanceType: "Vocational Training", submissionDate: "Mar 8 2026", status: "Pending", amount: 9000 },
  { id: "WOM-406", applicantName: "Catherine Mendoza", age: 38, barangay: "Poblacion", programCategory: "Gender-Based Violence Support", assistanceType: "Legal Assistance", submissionDate: "Mar 7 2026", status: "Under Review", amount: 6000 },
  { id: "WOM-407", applicantName: "Jessica Flores", age: 29, barangay: "San Isidro", programCategory: "Skills Training", assistanceType: "Livelihood Training", submissionDate: "Mar 6 2026", status: "Pending", amount: 7500 },
  { id: "WOM-408", applicantName: "Rachel Torres", age: 33, barangay: "Bagumbayan", programCategory: "Health and Wellness", assistanceType: "Maternal Care", submissionDate: "Mar 5 2026", status: "Pending", amount: 10000 },
  { id: "WOM-409", applicantName: "Amanda Ramos", age: 27, barangay: "Pacol", programCategory: "Skills Training", assistanceType: "Digital Literacy", submissionDate: "Mar 4 2026", status: "Pending", amount: 5500 },
  { id: "WOM-410", applicantName: "Nicole Castro", age: 40, barangay: "Santa Cruz", programCategory: "Gender-Based Violence Support", assistanceType: "Counseling Support", submissionDate: "Mar 3 2026", status: "Under Review", amount: 4500 }
];

// Youth/Children Applications
export const youthApplications = [
  { id: "YC-501", applicantName: "Mark Dela Cruz", age: 16, barangay: "Pacol", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 12 2026", status: "Pending", amount: 4000, gradeLevel: "Grade 10" },
  { id: "YC-502", applicantName: "Jenny Santos", age: 10, barangay: "Santa Cruz", schoolName: "San Pascual Elementary School", programCategory: "Scholarship Support", submissionDate: "Mar 11 2026", status: "Pending", amount: 3000, gradeLevel: "Grade 5" },
  { id: "YC-503", applicantName: "Ryan Flores", age: 15, barangay: "San Rafael", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 10 2026", status: "Under Review", amount: 3500, gradeLevel: "Grade 9" },
  { id: "YC-504", applicantName: "Maria Garcia", age: 12, barangay: "San Antonio", schoolName: "San Pascual Elementary School", programCategory: "Scholarship Support", submissionDate: "Mar 9 2026", status: "Pending", amount: 2500, gradeLevel: "Grade 6" },
  { id: "YC-505", applicantName: "Carlos Reyes", age: 17, barangay: "Malaking Ilog", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 8 2026", status: "Pending", amount: 4500, gradeLevel: "Grade 11" },
  { id: "YC-506", applicantName: "Sofia Lopez", age: 11, barangay: "Poblacion", schoolName: "San Pascual Elementary School", programCategory: "School Supplies Support", submissionDate: "Mar 7 2026", status: "Under Review", amount: 2000, gradeLevel: "Grade 5" },
  { id: "YC-507", applicantName: "Daniel Mendoza", age: 14, barangay: "San Isidro", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 6 2026", status: "Pending", amount: 3800, gradeLevel: "Grade 8" },
  { id: "YC-508", applicantName: "Isabella Torres", age: 9, barangay: "Bagumbayan", schoolName: "San Pascual Elementary School", programCategory: "Scholarship Support", submissionDate: "Mar 5 2026", status: "Pending", amount: 2800, gradeLevel: "Grade 4" },
  { id: "YC-509", applicantName: "Gabriel Ramos", age: 16, barangay: "Pacol", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 4 2026", status: "Pending", amount: 4200, gradeLevel: "Grade 10" },
  { id: "YC-510", applicantName: "Olivia Castro", age: 13, barangay: "Santa Cruz", schoolName: "San Pascual Elementary School", programCategory: "Scholarship Support", submissionDate: "Mar 3 2026", status: "Under Review", amount: 3200, gradeLevel: "Grade 7" }
];

// Disaster-Affected Families Applications
export const disasterApplications = [
  { id: "DF-601", applicantName: "Juan Lopez", age: 47, gender: "Male", barangay: "Pacol", disasterType: "House Fire", assistanceType: "Emergency Financial Assistance", submissionDate: "Mar 12 2026", status: "Pending", amount: 5000, dateOfIncident: "Mar 10 2026" },
  { id: "DF-602", applicantName: "Rosa Castillo", age: 52, gender: "Female", barangay: "Santa Cruz", disasterType: "Flood Damage", assistanceType: "Relief Assistance", submissionDate: "Mar 11 2026", status: "Pending", amount: 4000, dateOfIncident: "Mar 9 2026" },
  { id: "DF-603", applicantName: "Mario Santos", age: 39, gender: "Male", barangay: "San Rafael", disasterType: "Typhoon Damage", assistanceType: "Housing Repair Support", submissionDate: "Mar 10 2026", status: "Under Review", amount: 15000, dateOfIncident: "Mar 8 2026" },
  { id: "DF-604", applicantName: "Teresa Garcia", age: 44, gender: "Female", barangay: "San Antonio", disasterType: "House Fire", assistanceType: "Emergency Financial Assistance", submissionDate: "Mar 9 2026", status: "Pending", amount: 6000, dateOfIncident: "Mar 7 2026" },
  { id: "DF-605", applicantName: "Ramon Reyes", age: 50, gender: "Male", barangay: "Malaking Ilog", disasterType: "Flood Damage", assistanceType: "Relief Assistance", submissionDate: "Mar 8 2026", status: "Pending", amount: 3500, dateOfIncident: "Mar 6 2026" },
  { id: "DF-606", applicantName: "Gloria Mendoza", age: 41, gender: "Female", barangay: "Poblacion", disasterType: "Typhoon Damage", assistanceType: "Housing Repair Support", submissionDate: "Mar 7 2026", status: "Under Review", amount: 18000, dateOfIncident: "Mar 5 2026" },
  { id: "DF-607", applicantName: "Vicente Flores", age: 55, gender: "Male", barangay: "San Isidro", disasterType: "House Fire", assistanceType: "Emergency Financial Assistance", submissionDate: "Mar 6 2026", status: "Pending", amount: 5500, dateOfIncident: "Mar 4 2026" },
  { id: "DF-608", applicantName: "Lourdes Torres", age: 48, gender: "Female", barangay: "Bagumbayan", disasterType: "Flood Damage", assistanceType: "Relief Assistance", submissionDate: "Mar 5 2026", status: "Pending", amount: 4500, dateOfIncident: "Mar 3 2026" },
  { id: "DF-609", applicantName: "Eduardo Ramos", age: 43, gender: "Male", barangay: "Pacol", disasterType: "Typhoon Damage", assistanceType: "Housing Repair Support", submissionDate: "Mar 4 2026", status: "Pending", amount: 12000, dateOfIncident: "Mar 2 2026" },
  { id: "DF-610", applicantName: "Angelina Castro", age: 36, gender: "Female", barangay: "Santa Cruz", disasterType: "House Fire", assistanceType: "Emergency Financial Assistance", submissionDate: "Mar 3 2026", status: "Under Review", amount: 7000, dateOfIncident: "Mar 1 2026" }
];
