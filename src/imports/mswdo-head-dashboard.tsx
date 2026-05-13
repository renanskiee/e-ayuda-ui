Design a **municipal government management dashboard** for the **MSWDO Head / Focal Person** in the **E-Ayuda Management and Monitoring System**.

The dashboard should look like a **professional government assistance management platform** used by municipal social welfare officials. Use a **clean modern layout with sidebar navigation, top header bar, cards, charts, and detailed tables**.

IMPORTANT BEHAVIOR:
When the user logs in and selects the role **“MSWDO Head – Focal Person”**, the system should automatically redirect to this **MSWDO Head Dashboard**.

The focal person dashboard must allow the user to **monitor all sectors, review recommended applications, approve assistance before disbursement, manage programs, and generate reports including GAD data**.

---

SYSTEM LAYOUT

Top Header Bar:
• Municipality Logo (San Pascual LGU)
• System Title: “E-Ayuda Management and Monitoring System”
• Notification Icon
• User Profile: “MSWDO Head”
• Logout Button

Sidebar Navigation Menu:
Dashboard
Sector Monitoring
Applications Awaiting Approval
Disbursement Authorization
Beneficiary Database
Program Management
GAD Reports
System Reports
Settings

---

DASHBOARD OVERVIEW SECTION

Display **summary cards with sample values**.

Cards:

Total Applications Received
Value: 248

Pending Sector Evaluation
Value: 32

Applications Awaiting Final Approval
Value: 18

Total Beneficiaries Assisted
Value: 196

Total Municipal Funds Released
Value: ₱1,245,000

---

ANALYTICS CHARTS

Add charts showing system data.

Chart 1: Applications per Sector

Senior Citizen – 85
PWD – 54
Solo Parent – 42
Women – 36
Youth – 31

Chart 2: Applications per Barangay

Barangay Pacol – 48
Barangay Santa Cruz – 35
Barangay San Rafael – 29
Barangay Malaking Ilog – 21
Barangay San Antonio – 18

Chart 3: Monthly Assistance Distribution

January – 25 beneficiaries
February – 40 beneficiaries
March – 36 beneficiaries
April – 52 beneficiaries
May – 43 beneficiaries

---

SECTOR MONITORING PANEL

Create a monitoring table showing each sector’s activity.

Table Columns:
Sector | Pending Evaluation | Recommended | Approved | Disbursed

Sample Data:

Senior Citizen | 6 | 8 | 35 | 32
PWD | 4 | 5 | 28 | 25
Solo Parent | 3 | 3 | 22 | 20
Women | 2 | 1 | 15 | 14
Youth | 1 | 1 | 10 | 9

Clicking a sector should open **sector activity details**.

---

APPLICATIONS AWAITING FINAL APPROVAL

This section lists applications that have been **recommended by sector staff and waiting for final approval from the MSWDO Head**.

Table Columns:

Application ID
Applicant Name
Barangay
Sector
Assistance Type
Recommended Amount
Evaluation Date
Action

Sample Data:

AICS-2026-101 | Juan Dela Cruz | Pacol | Senior Citizen | Financial Assistance | ₱5,000 | March 12, 2026 | View / Approve
AICS-2026-102 | Maria Santos | Santa Cruz | PWD | Medical Assistance | ₱3,500 | March 11, 2026 | View / Approve
AICS-2026-103 | Ana Ramirez | San Rafael | Solo Parent | Educational Assistance | ₱4,000 | March 10, 2026 | View / Approve

---

APPLICATION REVIEW PAGE

When clicking **View**, display a full evaluation page.

Applicant Information:
Name: Juan Dela Cruz
Gender: Male
Age: 72
Barangay: Pacol
Sector: Senior Citizen

Assistance Request:
Type: Financial Assistance
Requested Amount: ₱5,000
Reason: Medical expenses

Sector Evaluation Notes:
“Applicant verified as senior citizen with medical expenses and no other financial support.”

Uploaded Documents:
• Valid ID
• Medical Certificate
• Barangay Certification

---

FINAL APPROVAL PANEL

Approval Decision Options:

Approve Assistance
Reject Application

Remarks Field:
Example text: “Approved for immediate assistance.”

Digital Signature Section:

Approved By: MSWDO Head
Date Approved: March 13, 2026

Buttons:
Approve and Sign
Reject Application

Once approved, status changes to:

“Approved by MSWDO Head”

Application is automatically sent to **Disbursement Authorization Module**.

---

DISBURSEMENT AUTHORIZATION PAGE

Show approved beneficiaries ready for payout.

Table Columns:

Beneficiary Name
Barangay
Sector
Approved Assistance
Approval Date
Disbursement Status

Sample Data:

Juan Dela Cruz | Pacol | Senior Citizen | ₱5,000 | March 13, 2026 | Pending Release
Maria Santos | Santa Cruz | PWD | ₱3,500 | March 12, 2026 | Scheduled

Buttons:
Authorize Disbursement
Schedule Payout

---

BENEFICIARY DATABASE

Display the sectorial database of beneficiaries.

Columns:

Beneficiary ID
Name
Barangay
Sector
Assistance Received
Date Released

Sample Data:

B-1001 | Juan Dela Cruz | Pacol | Senior Citizen | ₱5,000 | March 14, 2026
B-1002 | Maria Santos | Santa Cruz | PWD | ₱3,500 | March 13, 2026
B-1003 | Ana Ramirez | San Rafael | Solo Parent | ₱4,000 | March 12, 2026

Search Filters:

Search by Name
Filter by Sector
Filter by Barangay

---

PROGRAM MANAGEMENT PAGE

Display existing municipal assistance programs.

Table:

Program Name | Target Sector | Max Assistance | Status

Senior Citizen Medical Aid | Senior Citizen | ₱5,000 | Active
PWD Medical Assistance | PWD | ₱4,000 | Active
Solo Parent Educational Support | Solo Parent | ₱3,500 | Active

Button: Create New Program

Program Creation Form Fields:

Program Name
Description
Target Sector
Required Documents
Maximum Assistance Amount
Program Duration

---

GAD REPORT GENERATOR

Create a report generation interface.

Report Options:

Select Report Type:
Monthly
Yearly

Sample GAD Data Table:

Sector | Male | Female | Total

Senior Citizen | 25 | 40 | 65
PWD | 15 | 18 | 33
Solo Parent | 5 | 32 | 37
Women | 0 | 50 | 50

Buttons:

Generate Report
Download PDF
Download Excel

---

UI STYLE

Design the interface as a **modern government management dashboard**.

Style guidelines:

Clean white background
Blue accent colors
Rounded cards and tables
Simple charts
Professional typography
Minimalist icons

The interface should look like a **real municipal government assistance monitoring system used by MSWDO administrators**.
