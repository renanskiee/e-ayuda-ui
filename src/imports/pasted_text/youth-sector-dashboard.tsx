Create a **complete sector dashboard interface** for the **Youth / Children Sector** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This dashboard is used by **MSWDO staff assigned to the Youth / Children sector** to evaluate assistance applications, manage beneficiary records of youth applicants or students, monitor sector funds, and record assistance transactions.

---

LOGIN ROUTING BEHAVIOR

The system uses a **universal login page**.

If the user selects:

Role: MSWDO Sector Staff
Sector: Youth / Children Sector

After clicking **Login**, the system must automatically redirect to the **Youth / Children Sector Dashboard**.

This dashboard should display **only applications, beneficiaries, and transactions related to the Youth / Children sector**.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Sector Label: Youth / Children Sector
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

Use a **modern municipal government dashboard style** with cards, tables, and analytics charts.

---

DASHBOARD SUMMARY SECTION

Cards showing sector statistics.

Applications Received: 31
Pending Evaluation: 3
Approved Beneficiaries: 26
Rejected Applications: 2

---

APPLICATION ANALYTICS CHARTS

Chart 1: Applications by Barangay

Pacol – 9
Santa Cruz – 7
San Rafael – 6
San Antonio – 5
Malaking Ilog – 4

Chart 2: Monthly Assistance Requests

January – 6
February – 5
March – 7
April – 6
May – 7

---

SECTOR FUND TRANSPARENCY PANEL

Add a card showing the **allocated assistance fund for the Youth / Children sector**.

Fields

Total Sector Budget: ₱160,000
Total Disbursed: ₱110,000
Remaining Budget: ₱50,000

Add a **progress bar visualization**.

Example:

69% of funds utilized.

Include button:

View Fund Transactions

This allows staff to **monitor available sector funds**.

---

RECEIVED APPLICATIONS TABLE

Display applications forwarded by barangay BSWDO.

Columns

Application ID
Applicant Name
Barangay
School Name
Program Category
Submission Date
Status
Actions

Sample Data

YC-501 | Mark Dela Cruz | Pacol | San Pascual National High School | Educational Assistance | Mar 12 2026 | Pending | View / Evaluate
YC-502 | Jenny Santos | Santa Cruz | San Pascual Elementary School | Scholarship Support | Mar 11 2026 | Pending | View / Evaluate
YC-503 | Ryan Flores | San Rafael | San Pascual National High School | Educational Assistance | Mar 10 2026 | Pending | View / Evaluate

Add filters

Search by Name
Filter by Barangay
Filter by School Name

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

Student Information

School Name
Grade Level
Student ID Number

Assistance Request

Type of Assistance
Requested Amount
Reason for Request

Uploaded Documents

Student ID
School Certificate
Barangay Certification

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

YOUTH / CHILDREN BENEFICIARY DATABASE

This section stores all **youth or student beneficiaries who received assistance**.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
School Name
Assistance Received
Date Approved
Status
Actions

Example Data

YC-1001 | Mark Dela Cruz | Male | 16 | Pacol | San Pascual National High School | Educational Assistance | Mar 12 2026 | Active | View / Edit
YC-1002 | Jenny Santos | Female | 14 | Santa Cruz | San Pascual Elementary School | Scholarship Support | Mar 10 2026 | Active | View / Edit
YC-1003 | Ryan Flores | Male | 17 | San Rafael | San Pascual National High School | Educational Assistance | Mar 8 2026 | Active | View / Edit

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

Student Information

School Name
Grade Level
Student ID Number

Assistance Details

Assistance Program
Date Approved

Assistance History

Educational Assistance – ₱4,000 – March 2026
School Supplies Support – ₱2,000 – January 2026

Buttons

Edit Information
Save Changes

Staff can **update resident information when necessary**.

All updates must be recorded in the **transaction log**.

---

TRANSACTION HISTORY TABLE

Display assistance disbursement records handled by the Youth / Children sector.

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

Example Data

TRX-901 | Mark Dela Cruz | Pacol | Educational Assistance | ₱4,000 | Mar 13 2026 | Youth Sector Staff
TRX-902 | Jenny Santos | Santa Cruz | Scholarship Support | ₱3,000 | Mar 11 2026 | Youth Sector Staff
TRX-903 | Ryan Flores | San Rafael | Educational Assistance | ₱3,500 | Mar 9 2026 | Youth Sector Staff

Add filters

Filter by Date
Filter by Barangay
Filter by Assistance Type

---

SECTOR STAFF TASKS

Staff must be able to perform the following actions:

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

The interface should resemble a **real LGU assistance management system used by municipal social welfare staff**.
