Create a **complete sector dashboard interface** for the **Women Sector** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This dashboard is used by **MSWDO staff assigned to the Women sector** to evaluate assistance applications forwarded from barangays, manage beneficiary records of women applicants, monitor sector funds, and record assistance transactions.

---

LOGIN ROUTING BEHAVIOR

The system uses a **universal login page**.

If the user selects:

Role: MSWDO Sector Staff
Sector: Women Sector

After clicking **Login**, the system must automatically redirect to the **Women Sector Dashboard**.

This dashboard should display **only applications, beneficiaries, and transactions related to the Women sector**.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Sector Label: Women Sector
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

Applications Received: 36
Pending Evaluation: 4
Approved Beneficiaries: 29
Rejected Applications: 3

---

APPLICATION ANALYTICS CHARTS

Chart 1: Applications by Barangay

Pacol – 10
Santa Cruz – 8
San Rafael – 7
San Antonio – 6
Malaking Ilog – 5

Chart 2: Monthly Assistance Requests

January – 7
February – 6
March – 8
April – 7
May – 8

---

SECTOR FUND TRANSPARENCY PANEL

Add a card showing the **allocated assistance fund for the Women sector**.

Fields

Total Sector Budget: ₱180,000
Total Disbursed: ₱120,500
Remaining Budget: ₱59,500

Add a **progress bar visualization**.

Example:

67% of funds utilized.

Include button:

View Fund Transactions

This section helps maintain **financial transparency within the sector**.

---

RECEIVED APPLICATIONS TABLE

Display applications forwarded by barangay BSWDO.

Columns

Application ID
Applicant Name
Barangay
Program Category
Assistance Type
Submission Date
Status
Actions

Sample Data

WS-401 | Angela Flores | Pacol | Livelihood Program | Financial Assistance | Mar 12 2026 | Pending | View / Evaluate
WS-402 | Diana Ramos | Santa Cruz | Women Support Program | Medical Assistance | Mar 11 2026 | Pending | View / Evaluate
WS-403 | Teresa Mendoza | San Rafael | Livelihood Program | Capital Assistance | Mar 10 2026 | Pending | View / Evaluate

Add filters

Search by Name
Filter by Barangay
Filter by Program Category

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

Program Details

Program Category
Employment Status
Monthly Income

Assistance Request

Type of Assistance
Requested Amount
Reason for Request

Uploaded Documents

Valid ID
Barangay Certificate
Supporting Documents

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

WOMEN SECTOR BENEFICIARY DATABASE

This section stores all **women beneficiaries who received assistance**.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
Program Category
Assistance Received
Date Approved
Status
Actions

Example Data

WS-1001 | Angela Flores | Female | 34 | Pacol | Livelihood Program | Financial Assistance | Mar 12 2026 | Active | View / Edit
WS-1002 | Diana Ramos | Female | 41 | Santa Cruz | Women Support Program | Medical Assistance | Mar 10 2026 | Active | View / Edit
WS-1003 | Teresa Mendoza | Female | 37 | San Rafael | Livelihood Program | Capital Assistance | Mar 8 2026 | Active | View / Edit

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

Women Sector Details

Program Category
Employment Status
Household Income

Assistance Details

Assistance Program
Date Approved

Assistance History

Livelihood Assistance – ₱4,000 – March 2026
Medical Assistance – ₱3,000 – January 2026

Buttons

Edit Information
Save Changes

Sector staff can **update resident records when needed**.

All updates must be recorded in the **transaction history log**.

---

TRANSACTION HISTORY TABLE

Display assistance disbursement records handled by the Women sector.

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

Example Data

TRX-801 | Angela Flores | Pacol | Livelihood Assistance | ₱4,000 | Mar 13 2026 | Women Sector Staff
TRX-802 | Diana Ramos | Santa Cruz | Medical Assistance | ₱3,000 | Mar 11 2026 | Women Sector Staff
TRX-803 | Teresa Mendoza | San Rafael | Capital Assistance | ₱3,500 | Mar 9 2026 | Women Sector Staff

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

Follow the same **municipal government dashboard style used across the system**.

Design characteristics

White background
Blue accent colors
Rounded cards
Clean charts and tables
Minimalist icons
Professional typography

The interface should resemble a **real LGU social welfare assistance monitoring system used by MSWDO staff**.
