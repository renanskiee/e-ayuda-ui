Create a **complete sector dashboard interface** for the **PWD (Persons with Disabilities) Sector** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This dashboard is used by **MSWDO staff assigned to the PWD sector** to evaluate assistance applications, manage resident beneficiary records, track assistance transactions, and monitor sector funds.

---

LOGIN ROUTING BEHAVIOR

The system uses a **universal login page**.

If the user selects:

Role: MSWDO Sector Staff
Sector: PWD Sector

After clicking **Login**, the system must automatically redirect the user to the **PWD Sector Dashboard**.

This dashboard should display **only applications, beneficiaries, and transactions related to the PWD sector**.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Sector Label: PWD Sector
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

The UI should follow a **clean government dashboard style** with tables, cards, and charts.

---

DASHBOARD SUMMARY SECTION

Cards showing sector statistics.

Applications Received: 54
Pending Evaluation: 6
Approved Beneficiaries: 41
Rejected Applications: 4

---

APPLICATION ANALYTICS CHARTS

Chart 1: Applications by Barangay

Pacol – 15
Santa Cruz – 12
San Rafael – 10
San Antonio – 9
Malaking Ilog – 8

Chart 2: Monthly Assistance Requests

January – 10
February – 11
March – 13
April – 12
May – 8

---

SECTOR FUND TRANSPARENCY PANEL

Display a card showing the sector budget allocation.

Fields

Total Sector Budget: ₱250,000
Total Disbursed: ₱178,000
Remaining Budget: ₱72,000

Include a **progress bar showing fund usage**.

Example:

71% of funds utilized.

Add button:

View Fund Transactions

This section allows staff to **monitor remaining sector funds for transparency**.

---

RECEIVED APPLICATIONS TABLE

This table displays applications forwarded from barangay BSWDO offices.

Columns

Application ID
Applicant Name
Disability Type
Barangay
Assistance Type
Submission Date
Status
Actions

Sample Data

PWD-201 | Maria Santos | Mobility Disability | Pacol | Medical Assistance | Mar 12 2026 | Pending | View / Evaluate
PWD-202 | Carlos Mendoza | Visual Impairment | Santa Cruz | Assistive Device Support | Mar 11 2026 | Pending | View / Evaluate
PWD-203 | Liza Romero | Hearing Disability | San Rafael | Therapy Assistance | Mar 10 2026 | Pending | View / Evaluate

Add filters:

Search by Name
Filter by Barangay
Filter by Disability Type

---

APPLICATION EVALUATION PANEL

When clicking **Evaluate**, open a detailed review interface.

Sections

Applicant Information

Full Name
Gender
Age
Address
Barangay
Contact Number

PWD Details

Disability Type
PWD ID Number
Medical Certification

Assistance Request

Type of Assistance
Requested Amount
Reason for Request

Uploaded Documents

Valid ID
PWD ID
Medical Certificate

---

EVALUATION FORM

Eligibility Verified (checkbox)

Documents Complete (checkbox)

Recommendation Options

Approve Application
Reject Application
Request Additional Documents

Evaluation Notes field.

If approved, the application status becomes:

Recommended for MSWDO Head Approval.

The request is automatically forwarded to the **MSWDO Head Dashboard**.

---

PWD SECTOR BENEFICIARY DATABASE

This section stores all **PWD residents who received assistance**.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
Disability Type
Assistance Received
Date Approved
Status
Actions

Example Data

PWD-1001 | Maria Santos | Female | 45 | Pacol | Mobility Disability | Medical Assistance | Mar 12 2026 | Active | View / Edit
PWD-1002 | Carlos Mendoza | Male | 38 | Santa Cruz | Visual Impairment | Assistive Device Support | Mar 10 2026 | Active | View / Edit
PWD-1003 | Liza Romero | Female | 29 | San Rafael | Hearing Disability | Therapy Assistance | Mar 8 2026 | Active | View / Edit

Add search tools and filters.

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

PWD Information

Disability Type
PWD ID Number
Medical Classification

Assistance Details

Assistance Program
Date Approved

Assistance History

Medical Assistance – ₱3,500 – March 2026
Assistive Device Support – ₱2,500 – January 2026

Buttons

Edit Information
Save Changes

Staff can **update resident records when necessary**.

All updates must be logged in the **transaction history**.

---

TRANSACTION HISTORY TABLE

Record all assistance disbursements handled by the PWD sector.

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

Example Data

TRX-601 | Maria Santos | Pacol | Medical Assistance | ₱3,500 | Mar 13 2026 | PWD Sector Staff
TRX-602 | Carlos Mendoza | Santa Cruz | Assistive Device Support | ₱2,500 | Mar 11 2026 | PWD Sector Staff
TRX-603 | Liza Romero | San Rafael | Therapy Assistance | ₱2,000 | Mar 9 2026 | PWD Sector Staff

Add filters

Filter by Date
Filter by Barangay
Filter by Assistance Type

---

SECTOR STAFF TASKS

Staff should be able to perform these tasks within the dashboard.

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

Design should follow the same **municipal government dashboard style** used across the system.

Design elements

White background
Blue accent colors
Rounded cards
Clean charts and tables
Minimalist icons
Professional typography

The interface should look like a **real LGU social welfare assistance management system used by MSWDO staff**.
