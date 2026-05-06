Create a **complete sector dashboard interface** for the **Senior Citizen Sector** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This dashboard is used by **MSWDO sector staff assigned to the Senior Citizen sector** to process assistance applications, manage resident records, monitor sector funds, and record assistance transactions.

---

LOGIN ROUTING BEHAVIOR

The system has a universal login page.

If the user selects:

Role: MSWDO Sector Staff
Sector: Senior Citizen Sector

After clicking **Login**, the system must automatically redirect to the **Senior Citizen Sector Dashboard**.

This dashboard must only display **applications, residents, and transactions belonging to the Senior Citizen sector**.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Sector Label: Senior Citizen Sector
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

Use a **clean government dashboard design** with cards, charts, and data tables.

---

DASHBOARD SUMMARY SECTION

Display overview statistics for the sector.

Cards

Applications Received: 65
Pending Evaluation: 8
Approved Beneficiaries: 52
Rejected Applications: 5

---

APPLICATION ANALYTICS CHARTS

Chart 1: Applications by Barangay

Pacol – 18
Santa Cruz – 14
San Rafael – 12
San Antonio – 9
Malaking Ilog – 7

Chart 2: Monthly Assistance Requests

January – 12
February – 10
March – 14
April – 16
May – 13

---

SECTOR FUND TRANSPARENCY PANEL

Add a card showing how much budget is allocated to the Senior Citizen sector.

Fields

Total Sector Budget: ₱300,000
Total Disbursed: ₱214,500
Remaining Budget: ₱85,500

Include a **progress bar visualization** showing fund usage.

Example:

72% of funds utilized

Add a button:

View Fund Transactions

This section helps maintain **financial transparency**.

---

RECEIVED APPLICATIONS TABLE

This section shows applications forwarded from barangay BSWDO.

Table Columns

Application ID
Applicant Name
Age
Barangay
Assistance Type
Submission Date
Status
Actions

Sample Data

SC-101 | Pedro Garcia | 72 | Pacol | Medical Assistance | Mar 12 2026 | Pending | View / Evaluate
SC-102 | Elena Cruz | 69 | Santa Cruz | Financial Assistance | Mar 11 2026 | Pending | View / Evaluate
SC-103 | Ramon Reyes | 75 | San Rafael | Burial Assistance | Mar 10 2026 | Pending | View / Evaluate

Add filters above the table:

Search by Name
Filter by Barangay
Filter by Status

---

APPLICATION EVALUATION PANEL

When clicking **Evaluate**, open a detailed review interface.

Sections

Applicant Information

Full Name
Age
Gender
Address
Barangay
Contact Number

Assistance Request Details

Type of Assistance
Requested Amount
Reason for Request

Uploaded Documents

Valid ID
Barangay Certification
Medical Documents

---

EVALUATION FORM

Eligibility Verified (checkbox)

Documents Complete (checkbox)

Recommendation Options

Approve Application
Reject Application
Request Additional Documents

Evaluation Notes text area.

If the staff chooses **Approve**, the application status becomes:

Recommended for MSWDO Head Approval

The application is automatically forwarded to the **MSWDO Head Dashboard**.

---

SECTOR BENEFICIARY DATABASE

Each sector must maintain a table of **all residents belonging to that sector**.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
Sector Category
Assistance Received
Date Approved
Status
Actions

Example Data

SC-1001 | Pedro Garcia | Male | 72 | Pacol | Senior Citizen | Medical Assistance | Mar 12 2026 | Active | View / Edit
SC-1002 | Elena Cruz | Female | 69 | Santa Cruz | Senior Citizen | Financial Assistance | Mar 10 2026 | Active | View / Edit
SC-1003 | Ramon Reyes | Male | 75 | San Rafael | Senior Citizen | Burial Assistance | Mar 8 2026 | Active | View / Edit

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

Sector Details

Sector Category: Senior Citizen
Application ID
Assistance Program

Assistance History

Medical Assistance – ₱5,000 – March 2026
Financial Assistance – ₱3,000 – January 2026

Buttons

Edit Information
Save Changes

Sector staff can **update resident information when necessary**.

All updates must be recorded in the **transaction log**.

---

TRANSACTION HISTORY TABLE

This section records all assistance disbursements handled by the sector.

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

Example Data

TRX-501 | Pedro Garcia | Pacol | Medical Assistance | ₱5,000 | Mar 14 2026 | Senior Sector Staff
TRX-502 | Elena Cruz | Santa Cruz | Financial Assistance | ₱3,000 | Mar 11 2026 | Senior Sector Staff
TRX-503 | Ramon Reyes | San Rafael | Burial Assistance | ₱4,000 | Mar 9 2026 | Senior Sector Staff

Add filters:

Filter by Date
Filter by Barangay
Filter by Assistance Type

---

SECTOR STAFF TASKS

Sector staff must be able to perform the following actions:

Evaluate assistance applications
Update resident information
Record assistance transactions
Monitor remaining sector funds
Generate sector reports

Action buttons that appear in tables

View
Edit
Evaluate
Record Transaction
Generate Report

---

UI STYLE

Use the same **municipal government dashboard style** used in the system.

Design characteristics

White background
Blue accent colors
Rounded cards
Clean charts and tables
Minimalist icons
Professional typography

The interface should look like a **real operational LGU assistance management system used by MSWDO staff**.
