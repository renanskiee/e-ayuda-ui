Create a **complete sector dashboard interface** for the **Disaster-Affected Families Sector** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This dashboard is used by **MSWDO staff assigned to the Disaster-Affected Families sector** to evaluate assistance applications from residents affected by disasters, manage beneficiary records, monitor sector funds, and record emergency assistance transactions.

---

LOGIN ROUTING BEHAVIOR

The system uses a **universal login page**.

If the user selects:

Role: MSWDO Sector Staff
Sector: Disaster-Affected Families Sector

After clicking **Login**, the system must automatically redirect to the **Disaster-Affected Families Sector Dashboard**.

This dashboard should display **only applications, beneficiaries, and transactions related to disaster assistance cases**.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Sector Label: Disaster-Affected Families Sector
Notification Icon
User Profile
Logout Button

Sidebar Navigation Menu

Dashboard
Received Applications
Evaluation Queue
Approved Beneficiaries
Sector Beneficiary Records
Fund Monitoring
Transaction History
Sector Reports

Use a **modern municipal government dashboard style with analytics cards, charts, and tables**.

---

DASHBOARD SUMMARY SECTION

Cards showing sector statistics.

Applications Received: 20
Pending Evaluation: 3
Approved Beneficiaries: 15
Rejected Applications: 2

---

APPLICATION ANALYTICS CHARTS

Chart 1: Applications by Barangay

Pacol – 6
Santa Cruz – 5
San Rafael – 4
San Antonio – 3
Malaking Ilog – 2

Chart 2: Disaster Assistance Requests by Month

January – 3
February – 4
March – 5
April – 4
May – 4

---

SECTOR FUND TRANSPARENCY PANEL

Add a card showing the **allocated emergency assistance fund for disaster-affected families**.

Fields

Total Sector Budget: ₱220,000
Total Disbursed: ₱150,000
Remaining Budget: ₱70,000

Add a **progress bar visualization**.

Example:

68% of funds utilized.

Include button:

View Fund Transactions

This ensures **transparency in emergency assistance funds**.

---

RECEIVED APPLICATIONS TABLE

Display applications forwarded by barangay BSWDO related to disaster incidents.

Columns

Application ID
Applicant Name
Barangay
Disaster Type
Assistance Type
Submission Date
Status
Actions

Sample Data

DF-601 | Juan Lopez | Pacol | House Fire | Emergency Financial Assistance | Mar 12 2026 | Pending | View / Evaluate
DF-602 | Rosa Castillo | Santa Cruz | Flood Damage | Relief Assistance | Mar 11 2026 | Pending | View / Evaluate
DF-603 | Mario Santos | San Rafael | Typhoon Damage | Housing Repair Support | Mar 10 2026 | Pending | View / Evaluate

Add filters

Search by Name
Filter by Barangay
Filter by Disaster Type

---

APPLICATION EVALUATION PANEL

When clicking **Evaluate**, open a detailed evaluation interface.

Sections

Applicant Information

Full Name
Gender
Age
Address
Barangay
Contact Number

Disaster Details

Type of Disaster
Date of Incident
Damage Description

Assistance Request

Type of Assistance
Requested Amount
Reason for Request

Uploaded Documents

Barangay Disaster Certification
Damage Photos
Valid ID

---

EVALUATION FORM

Eligibility Verified (checkbox)

Documents Complete (checkbox)

Recommendation Options

Approve Application
Reject Application
Request Additional Documents

Evaluation Notes text area.

If approved, the application status becomes:

Recommended for MSWDO Head Approval.

The application is automatically forwarded to the **MSWDO Head Dashboard**.

---

DISASTER SECTOR BENEFICIARY DATABASE

This section stores **residents who received disaster-related assistance**.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
Disaster Type
Assistance Received
Date Approved
Status
Actions

Example Data

DF-1001 | Juan Lopez | Male | 47 | Pacol | House Fire | Emergency Financial Assistance | Mar 12 2026 | Active | View / Edit
DF-1002 | Rosa Castillo | Female | 52 | Santa Cruz | Flood Damage | Relief Assistance | Mar 10 2026 | Active | View / Edit
DF-1003 | Mario Santos | Male | 44 | San Rafael | Typhoon Damage | Housing Repair Support | Mar 8 2026 | Active | View / Edit

Add search and filtering tools.

---

RESIDENT PROFILE PAGE

When clicking **View or Edit**, open a detailed resident profile.

Sections

Personal Information

Full Name
Gender
Birthdate
Address
Contact Number
Barangay

Disaster Case Information

Type of Disaster
Date of Incident
Damage Description

Assistance Details

Assistance Program
Date Approved

Assistance History

Emergency Financial Assistance – ₱5,000 – March 2026
Relief Assistance – ₱3,000 – January 2026

Buttons

Edit Information
Save Changes

Sector staff can **update resident information when necessary**.

All updates must be recorded in the **transaction history log**.

---

TRANSACTION HISTORY TABLE

Display assistance disbursement records handled by the disaster sector.

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

Example Data

TRX-1001 | Juan Lopez | Pacol | Emergency Financial Assistance | ₱5,000 | Mar 13 2026 | Disaster Sector Staff
TRX-1002 | Rosa Castillo | Santa Cruz | Relief Assistance | ₱3,000 | Mar 11 2026 | Disaster Sector Staff
TRX-1003 | Mario Santos | San Rafael | Housing Repair Support | ₱4,500 | Mar 9 2026 | Disaster Sector Staff

Add filters

Filter by Date
Filter by Barangay
Filter by Assistance Type

---

SECTOR STAFF TASKS

Staff must be able to perform the following actions within the dashboard:

Evaluate assistance applications
Update resident information
Record assistance transactions
Monitor remaining sector funds
Generate sector reports

Action buttons appearing in tables

View
Edit
Evaluate
Record Transaction
Generate Report

---

UI STYLE

Follow the same **municipal government dashboard design style used across the system**.

Design characteristics

White background
Blue accent colors
Rounded cards
Clean charts and tables
Minimalist icons
Professional typography

The interface should resemble a **real operational LGU social welfare assistance management platform used by MSWDO staff**.
