Design a **Senior Citizen Sector Dashboard** for the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

LOGIN BEHAVIOR

If the user logs in from the login page and selects:

Role: MSWDO Sector Staff
Sector: Senior Citizen Sector

The system should automatically redirect to this **Senior Citizen Dashboard**.

---

LAYOUT

Top Navigation Bar

Municipality Logo
System Name: E-Ayuda Management and Monitoring System
Sector Label: Senior Citizen Sector
Notification Icon
User Profile
Logout

Sidebar Menu

Dashboard
Received Applications
Evaluation Queue
Approved Beneficiaries
Sector Beneficiary Records
Fund Monitoring
Transaction History
Sector Reports

---

DASHBOARD SUMMARY

Cards

Applications Received: 65
Pending Evaluation: 8
Approved Beneficiaries: 52
Rejected Applications: 5

---

SECTOR FUND TRANSPARENCY

Display a **fund monitoring card**.

Total Sector Budget: ₱300,000
Total Disbursed: ₱214,500
Remaining Budget: ₱85,500

Show a progress bar indicating **72% funds utilized**.

---

RECEIVED APPLICATIONS TABLE

Columns

Application ID
Applicant Name
Barangay
Assistance Type
Submission Date
Status
Actions

Sample Data

SC-101 | Pedro Garcia | Pacol | Medical Assistance | Mar 12 2026 | Pending | View / Evaluate
SC-102 | Elena Cruz | Santa Cruz | Financial Assistance | Mar 11 2026 | Pending | View / Evaluate
SC-103 | Ramon Reyes | San Rafael | Burial Assistance | Mar 10 2026 | Pending | View / Evaluate

---

APPLICATION EVALUATION PANEL

When clicking **Evaluate**, open a review interface.

Sections

Applicant Information
Assistance Request
Uploaded Documents

Evaluation Fields

Eligibility Verified
Documents Complete
Recommendation

Options

Approve
Reject
Request Documents

If approved → status becomes **Recommended for MSWDO Head Approval**.

---

SECTOR BENEFICIARY RECORDS TABLE

Columns

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

Example

SC-1001 | Pedro Garcia | Male | 72 | Pacol | Senior Citizen | Medical Assistance | Mar 12 2026 | Active | View / Edit
SC-1002 | Elena Cruz | Female | 69 | Santa Cruz | Senior Citizen | Financial Assistance | Mar 10 2026 | Active | View / Edit

Staff can **update resident information** and save changes.

---

TRANSACTION HISTORY

Columns

Transaction ID
Beneficiary Name
Barangay
Assistance Type
Amount Released
Release Date
Processed By

TRX-501 | Pedro Garcia | Pacol | Medical Assistance | ₱5,000 | Mar 14 2026 | Senior Sector Staff
