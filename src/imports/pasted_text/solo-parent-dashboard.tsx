Create a **complete sector dashboard interface** for the **Solo Parent Sector** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This dashboard is used by **MSWDO staff assigned to the Solo Parent sector** to evaluate assistance applications forwarded from barangays, manage beneficiary records of solo parents, monitor sector funds, and record assistance transactions.

---

LOGIN ROUTING BEHAVIOR

The system uses a **universal login page**.

If the user selects:

Role: MSWDO Sector Staff
Sector: Solo Parent Sector

After clicking **Login**, the system must automatically redirect to the **Solo Parent Sector Dashboard**.

This dashboard should display **only applications, beneficiaries, and transactions related to the Solo Parent sector**.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Sector Label: Solo Parent Sector
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

Use a **modern government dashboard layout** with cards, charts, and structured tables.

---

DASHBOARD SUMMARY SECTION

Cards showing sector statistics.

Applications Received: 42
Pending Evaluation: 5
Approved Beneficiaries: 34
Rejected Applications: 3

---

APPLICATION ANALYTICS CHARTS

Chart 1: Applications by Barangay

Pacol – 12
Santa Cruz – 9
San Rafael – 8
San Antonio – 7
Malaking Ilog – 6

Chart 2: Monthly Assistance Requests

January – 8
February – 9
March – 11
April – 7
May – 7

---

SECTOR FUND TRANSPARENCY PANEL

Add a card showing the **allocated assistance fund for the Solo Parent sector**.

Fields

Total Sector Budget: ₱200,000
Total Disbursed: ₱134,500
Remaining Budget: ₱65,500

Add a **progress bar visualization**.

Example:

67% of funds utilized.

Include button:

View Fund Transactions

This section allows staff to **monitor remaining funds and ensure transparency**.

---

RECEIVED APPLICATIONS TABLE

Display applications forwarded by barangay BSWDO.

Columns

Application ID
Applicant Name
Barangay
Number of Children
Assistance Type
Submission Date
Status
Actions

Sample Data

SP-301 | Ana Ramirez | Pacol | 2 | Educational Assistance | Mar 12 2026 | Pending | View / Evaluate
SP-302 | Grace Villanueva | Santa Cruz | 3 | Financial Assistance | Mar 11 2026 | Pending | View / Evaluate
SP-303 | Carla Mendoza | San Rafael | 1 | Medical Assistance | Mar 10 2026 | Pending | View / Evaluate

Add filters

Search by Name
Filter by Barangay
Filter by Assistance Type

---

APPLICATION EVALUATION PANEL

When clicking **Evaluate**, open a full evaluation interface.

Sections

Applicant Information

Full Name
Gender
Age
Address
Barangay
Contact Number

Solo Parent Details

Solo Parent ID Number
Number of Children
Employment Status

Assistance Request

Type of Assistance
Requested Amount
Reason for Request

Uploaded Documents

Valid ID
Solo Parent ID
Barangay Certificate

---

EVALUATION FORM

Eligibility Verified (checkbox)

Documents Complete (checkbox)

Recommendation Options

Approve Application
Reject Application
Request Additional Documents

Evaluation Notes text area.

If approved, the status becomes:

Recommended for MSWDO Head Approval.

The application is automatically forwarded to the **MSWDO Head Dashboard**.

---

SOLO PARENT BENEFICIARY DATABASE

This section stores all **solo parent residents who received assistance**.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
Number of Children
Assistance Received
Date Approved
Status
Actions

Example Data

SP-1001 | Ana Ramirez | Female | 35 | Pacol | 2 | Educational Assistance | Mar 12 2026 | Active | View / Edit
SP-1002 | Grace Villanueva | Female | 39 | Santa Cruz | 3 | Financial Assistance | Mar 10 2026 | Active | View / Edit
SP-1003 | Carla Mendoza | Female | 32 | San Rafael | 1 | Medical Assistance | Mar 8 2026 | Active | View / Edit

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

Solo Parent Information

Solo Parent ID Number
Number of Children
Employment Status

Assistance Details

Assistance Program
Date Approved

Assistance History

Educational Assistance – ₱4,000 – March 2026
Financial Assistance – ₱3,000 – January 2026

Buttons

Edit Information
Save Changes

Sector staff can **update resident information when necessary**.

All updates must be recorded in the **transaction log**.

---

TRANSACTION HISTORY TABLE

Display assistance disbursements handled by the Solo Parent sector.

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

Example Data

TRX-701 | Ana Ramirez | Pacol | Educational Assistance | ₱4,000 | Mar 13 2026 | Solo Parent Sector Staff
TRX-702 | Grace Villanueva | Santa Cruz | Financial Assistance | ₱3,000 | Mar 11 2026 | Solo Parent Sector Staff
TRX-703 | Carla Mendoza | San Rafael | Medical Assistance | ₱2,500 | Mar 9 2026 | Solo Parent Sector Staff

Add filters

Filter by Date
Filter by Barangay
Filter by Assistance Type

---

SECTOR STAFF TASKS

Staff should be able to perform these actions:

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

Use the same **municipal government dashboard design style** used in the rest of the system.

Design characteristics

White background
Blue accent colors
Rounded cards
Clean charts and tables
Minimalist icons
Professional typography

The interface should look like a **real operational LGU social welfare assistance system used by MSWDO staff**.
