Create a complete high-level municipal government dashboard interface for the **MSWDO Head / Focal Person** in the **E-Ayuda Management and Monitoring System**.

This dashboard is the main supervisory and administrative interface of the entire system. It is used by the **MSWDO Head / Focal Person** to oversee all sector activities, review applications recommended by sector staff, provide final approval before disbursement, monitor municipal assistance programs, maintain the centralized sectorial beneficiary database, manage program creation and budget allocation, and generate reports such as GAD data.

IMPORTANT LOGIN BEHAVIOR:
The system uses a universal login page.
If the user selects:
Role: MSWDO Head / Focal Person
and clicks Login,
the system must automatically redirect to this **MSWDO Head Dashboard**.

This dashboard must look more advanced and authoritative than the sector dashboards because it is the central monitoring and decision-making interface for the whole municipal assistance system.

GENERAL DASHBOARD LAYOUT

Use a modern municipal government dashboard design with:
- left sidebar navigation
- top navigation bar
- summary cards
- charts
- large data tables
- side panels and modal forms

Top Navigation Bar:
- San Pascual LGU logo
- System title: “E-Ayuda Management and Monitoring System”
- Role label: “MSWDO Head / Focal Person”
- notification bell icon
- profile dropdown
- logout button

Sidebar Navigation Menu:
- Dashboard
- Sector Monitoring
- Applications Awaiting Approval
- Final Approval Queue
- Disbursement Authorization
- Central Beneficiary Database
- Duplicate Detection
- Program Creation
- Program Management
- Budget Allocation
- GAD Reports
- Municipal Reports
- Settings

Use a clean government style:
- white background
- blue accent colors
- rounded cards
- subtle shadows
- professional typography
- clean tables and charts
- simple icons

DASHBOARD OVERVIEW SECTION

Add summary cards with realistic sample data:

- Total Applications Received: 248
- Pending Sector Evaluation: 32
- Applications Awaiting Final Approval: 18
- Total Beneficiaries Assisted: 196
- Total Municipal Funds Released: ₱1,245,000
- Remaining Municipal Budget: ₱455,000

Add a short overview panel titled:
“Municipal Assistance System Summary”
with a short description that this dashboard oversees all sectors, approvals, and program budgets.

ANALYTICS CHARTS

Add visual analytics cards and charts:

Chart 1: Applications per Sector
- Senior Citizen: 85
- PWD: 54
- Solo Parent: 42
- Women: 36
- Youth / Children: 31
- Disaster-Affected Families: 20

Chart 2: Applications per Barangay
- Pacol: 48
- Santa Cruz: 35
- San Rafael: 29
- San Antonio: 21
- Malaking Ilog: 18

Chart 3: Monthly Assistance Distribution
- January: 25 beneficiaries
- February: 40 beneficiaries
- March: 36 beneficiaries
- April: 52 beneficiaries
- May: 43 beneficiaries

Chart 4: Budget Utilization by Sector
- Senior Citizen: 72%
- PWD: 71%
- Solo Parent: 67%
- Women: 67%
- Youth / Children: 69%
- Disaster Sector: 68%

SECTOR MONITORING PAGE

Create a sector monitoring page where the focal person can oversee all sectors in one table.

Table columns:
- Sector
- Pending Evaluation
- Recommended for Approval
- Approved
- Disbursed
- Remaining Budget
- Status
- Action

Sample data:
- Senior Citizen | 6 | 8 | 35 | 32 | ₱85,500 | Active | View Sector
- PWD | 4 | 5 | 28 | 25 | ₱72,000 | Active | View Sector
- Solo Parent | 3 | 3 | 22 | 20 | ₱65,500 | Active | View Sector
- Women | 2 | 1 | 15 | 14 | ₱59,500 | Active | View Sector
- Youth / Children | 1 | 1 | 10 | 9 | ₱50,000 | Active | View Sector
- Disaster Sector | 2 | 1 | 14 | 12 | ₱70,000 | Active | View Sector

When clicking “View Sector”, open a detail panel showing:
- sector budget
- applications received
- approved beneficiaries
- recent transactions
- recent alerts

APPLICATIONS AWAITING APPROVAL PAGE

Create a page for recommended applications waiting for final review.

Table columns:
- Application ID
- Applicant Name
- Barangay
- Sector
- Assistance Type
- Recommended Amount
- Evaluation Date
- Recommended By
- Action

Sample data:
- AICS-2026-101 | Juan Dela Cruz | Pacol | Senior Citizen | Financial Assistance | ₱5,000 | Mar 12, 2026 | Senior Sector Staff | View
- AICS-2026-102 | Maria Santos | Santa Cruz | PWD | Medical Assistance | ₱3,500 | Mar 11, 2026 | PWD Sector Staff | View
- AICS-2026-103 | Ana Ramirez | San Rafael | Solo Parent | Educational Assistance | ₱4,000 | Mar 10, 2026 | Solo Parent Sector Staff | View

FINAL APPROVAL REVIEW PAGE

When the focal person clicks View, open a detailed review page.

Sections:
1. Applicant Information
- Full Name
- Gender
- Age
- Address
- Barangay
- Sector

2. Assistance Request
- Program Name
- Type of Assistance
- Requested Amount
- Reason for Request

3. Sector Evaluation Summary
- Evaluation notes from sector staff
- Eligibility checklist
- Recommendation result

4. Uploaded Documents
- Valid ID
- Barangay Certification
- Supporting Documents
- Sector-specific documents

5. Approval Decision Panel
Fields:
- Approval Decision: Approve / Reject / Request Clarification
- Remarks
- Digital Signature
- Approval Date

Buttons:
- Approve and Sign
- Reject Application
- Return to Sector Staff

SYSTEM BEHAVIOR:
If approved:
- application status changes to “Approved by MSWDO Head”
- record moves to Disbursement Authorization
- beneficiary is added or updated in the Central Beneficiary Database
- transaction becomes available for reports

If rejected:
- application status changes to “Rejected by MSWDO Head”
- feedback is returned to the sector staff dashboard

DISBURSEMENT AUTHORIZATION PAGE

Create a page for approved beneficiaries ready for payout scheduling.

Table columns:
- Beneficiary Name
- Barangay
- Sector
- Program
- Approved Amount
- Approval Date
- Disbursement Status
- Action

Sample data:
- Juan Dela Cruz | Pacol | Senior Citizen | Senior Medical Aid | ₱5,000 | Mar 13, 2026 | Pending Release | Authorize
- Maria Santos | Santa Cruz | PWD | PWD Medical Support | ₱3,500 | Mar 12, 2026 | Scheduled | View
- Ana Ramirez | San Rafael | Solo Parent | Educational Assistance | ₱4,000 | Mar 12, 2026 | Pending Release | Authorize

Buttons:
- Authorize Disbursement
- Schedule Payout
- Export Approved List

CENTRAL BENEFICIARY DATABASE PAGE

Create a full centralized sectorial database for all beneficiaries from all sectors.

Table columns:
- Beneficiary ID
- Full Name
- Gender
- Age
- Barangay
- Sector
- Program Enrolled
- Assistance Received
- Date Approved
- Status
- Action

Sample data:
- BEN-1001 | Pedro Garcia | Male | 72 | Pacol | Senior Citizen | Senior Medical Aid | ₱5,000 | Mar 12, 2026 | Active | View / Edit
- BEN-1002 | Maria Santos | Female | 45 | Santa Cruz | PWD | PWD Medical Support | ₱3,500 | Mar 10, 2026 | Active | View / Edit
- BEN-1003 | Ana Ramirez | Female | 35 | San Rafael | Solo Parent | Educational Assistance | ₱4,000 | Mar 8, 2026 | Active | View / Edit
- BEN-1004 | Angela Flores | Female | 34 | Pacol | Women | Livelihood Assistance | ₱4,000 | Mar 7, 2026 | Active | View / Edit
- BEN-1005 | Mark Dela Cruz | Male | 16 | Santa Cruz | Youth / Children | Educational Assistance | ₱3,000 | Mar 6, 2026 | Active | View / Edit

Add filters:
- Search by Name
- Filter by Sector
- Filter by Barangay
- Filter by Program
- Filter by Status

BENEFICIARY PROFILE PAGE

When clicking View or Edit, open a detailed resident profile page.

Sections:
- Personal Information
- Sector Information
- Program Details
- Assistance History
- Latest Transaction
- Status Monitoring

Include assistance history examples:
- Medical Assistance – ₱5,000 – March 2026
- Educational Assistance – ₱3,000 – January 2026
- Livelihood Assistance – ₱4,000 – December 2025

Buttons:
- Edit Information
- Save Changes
- View Full History

DUPLICATE DETECTION PAGE

Create a page that identifies possible duplicate beneficiaries across all sectors.

Table columns:
- Record Match ID
- Full Name
- Possible Duplicate Sector
- Barangay
- Reason Flagged
- Action

Sample data:
- DUP-001 | Maria Santos | PWD / Women | Santa Cruz | Same name and birthdate | Review
- DUP-002 | Juan Lopez | Senior Citizen / Disaster Sector | Pacol | Same address and ID number | Review
- DUP-003 | Ana Ramirez | Solo Parent / Women | San Rafael | Similar personal information | Review

When clicking Review, open a comparison side panel showing:
- Record A
- Record B
- Name match
- Birthdate match
- Barangay match
- ID number match

Buttons:
- Confirm Duplicate
- Mark as Separate Valid Records

PROGRAM CREATION PAGE

Create a detailed program creation form used by the MSWDO Head.

Form fields:
- Program Name
- Program Description
- Target Sector
- Type of Assistance
- Required Documents
- Maximum Assistance Amount
- Sector Budget Allocation
- Program Start Date
- Program End Date
- Eligibility Criteria
- Status (Active / Inactive)

Sample values:
- Program Name: Senior Citizen Medical Aid
- Program Description: Assistance for verified senior citizens with medical needs
- Target Sector: Senior Citizen
- Type of Assistance: Financial Assistance
- Required Documents: Valid ID, Barangay Certification, Medical Certificate
- Maximum Assistance Amount: ₱5,000
- Sector Budget Allocation: ₱300,000
- Start Date: January 1, 2026
- End Date: December 31, 2026
- Eligibility Criteria: Verified senior citizen resident with approved medical need
- Status: Active

Buttons:
- Create Program
- Save Draft
- Cancel

PROGRAM MANAGEMENT PAGE

Display all created programs in a management table.

Columns:
- Program ID
- Program Name
- Target Sector
- Type of Assistance
- Budget Allocation
- Used Budget
- Remaining Budget
- Program Duration
- Status
- Action

Sample data:
- PRG-001 | Senior Citizen Medical Aid | Senior Citizen | Financial | ₱300,000 | ₱214,500 | ₱85,500 | Jan–Dec 2026 | Active | View / Edit
- PRG-002 | PWD Medical Support | PWD | Financial | ₱250,000 | ₱178,000 | ₱72,000 | Jan–Dec 2026 | Active | View / Edit
- PRG-003 | Solo Parent Educational Aid | Solo Parent | Financial | ₱200,000 | ₱134,500 | ₱65,500 | Jan–Dec 2026 | Active | View / Edit
- PRG-004 | Women Livelihood Support | Women | Financial | ₱180,000 | ₱120,500 | ₱59,500 | Jan–Dec 2026 | Active | View / Edit
- PRG-005 | Youth Educational Support | Youth / Children | Financial | ₱160,000 | ₱110,000 | ₱50,000 | Jan–Dec 2026 | Active | View / Edit
- PRG-006 | Disaster Emergency Support | Disaster-Affected Families | Financial | ₱220,000 | ₱150,000 | ₱70,000 | Jan–Dec 2026 | Active | View / Edit

BUDGET ALLOCATION PAGE

Create a transparent budget monitoring page for all sectors.

Table columns:
- Sector
- Allocated Budget
- Used Budget
- Remaining Budget
- Utilization Rate
- Status

Sample data:
- Senior Citizen | ₱300,000 | ₱214,500 | ₱85,500 | 72% | Stable
- PWD | ₱250,000 | ₱178,000 | ₱72,000 | 71% | Stable
- Solo Parent | ₱200,000 | ₱134,500 | ₱65,500 | 67% | Stable
- Women | ₱180,000 | ₱120,500 | ₱59,500 | 67% | Stable
- Youth / Children | ₱160,000 | ₱110,000 | ₱50,000 | 69% | Stable
- Disaster Sector | ₱220,000 | ₱150,000 | ₱70,000 | 68% | Stable

Add horizontal progress bars for each row.

Add small alert cards:
- “No critical budget alerts”
- “6 sectors currently active”
- “Overall municipal utilization: 69%”

GAD REPORTS PAGE

Create a reporting interface for GAD data.

Filters:
- Report Type: Monthly / Yearly
- Sector
- Barangay
- Program

Sample GAD data table:
- Senior Citizen | Male 25 | Female 40 | Total 65
- PWD | Male 15 | Female 18 | Total 33
- Solo Parent | Male 5 | Female 32 | Total 37
- Women | Male 0 | Female 50 | Total 50
- Youth / Children | Male 18 | Female 21 | Total 39

Buttons:
- Generate GAD Report
- Download PDF
- Download Excel
- Print Report

MUNICIPAL REPORTS PAGE

Create a page for high-level reports.

Available report cards:
- Beneficiaries per Sector
- Programs by Budget Utilization
- Duplicate Beneficiary Report
- Monthly Assistance Report
- Yearly Assistance Report
- Assistance per Barangay

Each card should have:
- short description
- preview numbers
- Generate button

SETTINGS PAGE

Create a simple settings page for the MSWDO Head with:
- profile settings
- password update
- notification settings
- report preferences
- system access management summary

FINAL DESIGN GOAL

The MSWDO Head dashboard should feel like the main administrative control center of the entire E-Ayuda Management and Monitoring System. It must clearly show that this user:
- oversees all sectors
- performs final approval
- authorizes disbursement
- manages the sectorial beneficiary database
- creates and monitors programs
- allocates budgets
- generates GAD and municipal reports

Make the design polished, realistic, and presentation-ready, like a real LGU social welfare management platform.