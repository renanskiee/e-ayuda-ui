Update the existing design of the *E-Ayuda Management and Monitoring System*.

Do not redesign the entire system. Only update the current prototype to support the additional users responsible for *Module 3 – Municipal Disbursement & Monitoring*.

Keep the same design system already used in the prototype:
- municipal government dashboard style
- white background
- blue accent color
- sidebar navigation
- rounded UI cards
- clean tables
- consistent typography

----------------------------------------------------

SECTION 1 — UPDATE EXISTING LOGIN PAGE

The login page already exists, so only modify the *Role Selection dropdown* and login routing behavior.

Keep the current layout:

LEFT SIDE
- Municipality logo
- System title
- System description

RIGHT SIDE
- Login form

Fields remain:
Role Selection  
Username  
Password  
Login Button

----------------------------------------------------

UPDATE ROLE SELECTION DROPDOWN

Add the following roles:

BSWDO Staff  
MSWDO Sector Staff  
MSWDO Head / Focal Person  
MSWDO Disbursement Officer  
Municipal Treasurer / Accountant

----------------------------------------------------

LOGIN REDIRECTION BEHAVIOR

After login, redirect users to the correct dashboard.

BSWDO Staff  
→ Barangay Registration & Initial Validation Dashboard (Module 1)

MSWDO Sector Staff  
→ Sector Processing Dashboard (Module 2)

MSWDO Head / Focal Person  
→ Focal Person Monitoring Dashboard (Modules 3 & 4)

MSWDO Disbursement Officer  
→ Disbursement Processing Dashboard (Module 3)

Municipal Treasurer / Accountant  
→ Financial Monitoring Dashboard (Module 3)

----------------------------------------------------

EXTRA FIELD FOR SECTOR STAFF

If Role = MSWDO Sector Staff  
Show an additional dropdown:

Select Sector

Options:
Senior Citizen  
PWD  
Solo Parent  
Women  
Children  
ECCD  
Disaster Affected Families

After login, redirect the user to the dashboard of the chosen sector.

----------------------------------------------------

SECTION 2 — ADD MODULE 3 USER INTERFACES

Create dashboards for the two operational users of Module 3.

----------------------------------------------------

MODULE 3 USER 1 — MSWDO DISBURSEMENT OFFICER

This user processes the actual payout during assistance distribution.

Sidebar menu:

Dashboard  
Authorized Beneficiaries  
QR Verification  
Payout Processing  
Transaction Log  
Reports

----------------------------------------------------

DISBURSEMENT DASHBOARD CONTENT

Top cards:

Beneficiaries Scheduled Today – 120  
Beneficiaries Paid – 95  
Pending Beneficiaries – 23  
Unclaimed Beneficiaries – 2  

----------------------------------------------------

AUTHORIZED BENEFICIARY TABLE

Columns:

Application ID  
Beneficiary Name  
Barangay  
Sector  
Program Name  
Approved Amount  
Authorization Date  
Status  
Action

Example rows:

APP-1023 | Juan Dela Cruz | Pacol | Senior Citizen | Senior Medical Aid | ₱5,000 | Mar 12 2026 | Authorized | Verify  
APP-1024 | Maria Santos | Santa Cruz | PWD | Medical Assistance | ₱3,500 | Mar 12 2026 | Authorized | Verify  

----------------------------------------------------

QR VERIFICATION PANEL

Include a scanning area.

Fields:

QR Scanner Input  
Manual Search by Name or ID

Verification card displays:

Beneficiary Name  
Barangay  
Sector  
Program  
Approved Amount  
Status

Buttons:

Confirm Payout  
Mark as Unclaimed  
Cancel

When Confirm Payout is clicked:

- payout status becomes *Paid*
- transaction is recorded
- program funds update automatically

----------------------------------------------------

TRANSACTION LOG TABLE

Columns:

Transaction ID  
Beneficiary Name  
Sector  
Barangay  
Program  
Amount Released  
Release Date  
Processed By  
Status

Example:

TRX-501 | Pedro Garcia | Senior Citizen | Pacol | Senior Medical Aid | ₱5,000 | Mar 14 2026 | Officer 1 | Paid

----------------------------------------------------

MODULE 3 USER 2 — MUNICIPAL TREASURER / ACCOUNTANT

This dashboard focuses on financial monitoring.

Sidebar:

Dashboard  
Fund Monitoring  
Program Utilization  
Transaction Records  
Liquidation Reports  
Audit Reports

----------------------------------------------------

TREASURER DASHBOARD CARDS

Total Funds Allocated – ₱1,500,000  
Funds Released – ₱1,245,000  
Remaining Budget – ₱255,000  
Total Beneficiaries Paid – 142

----------------------------------------------------

PROGRAM UTILIZATION TABLE

Columns:

Program Name  
Sector  
Allocated Budget  
Funds Used  
Remaining Budget  
Utilization Rate

Example:

Senior Citizen Medical Aid | Senior Citizen | ₱300,000 | ₱214,500 | ₱85,500 | 72%  
PWD Medical Support | PWD | ₱250,000 | ₱178,000 | ₱72,000 | 71%

----------------------------------------------------

LIQUIDATION REPORT GENERATOR

Fields:

Program Name  
Sector  
Date Range

Buttons:

Generate Report  
Download PDF  
Download Excel

Example Output:

Program: Senior Citizen Medical Aid  
Beneficiaries Paid: 85  
Funds Released: ₱425,000  
Remaining Budget: ₱75,000

----------------------------------------------------

SECTION 3 — UPDATE FOCAL PERSON DASHBOARD (MODULE 3 ROLE)

The focal person dashboard already exists.

Only *add additional panels related to Module 3 responsibilities*.

Do not redesign the whole dashboard.

----------------------------------------------------

ADD NEW SIDEBAR ITEM

Disbursement Authorization

----------------------------------------------------

DISBURSEMENT AUTHORIZATION PAGE

Table showing approved applications waiting for authorization.

Columns:

Application ID  
Beneficiary Name  
Barangay  
Sector  
Program  
Approved Amount  
Sector Recommendation  
Status  
Action

Example rows:

APP-1011 | Juan Dela Cruz | Pacol | Senior Citizen | Medical Assistance | ₱5,000 | Approved | Awaiting Authorization | Authorize  
APP-1012 | Maria Santos | Santa Cruz | PWD | Medical Assistance | ₱3,500 | Approved | Awaiting Authorization | Authorize  

Buttons:

Authorize Disbursement  
Reject  
View Application

When the focal person clicks *Authorize Disbursement*

- the application status becomes *Authorized for Payout*
- the record is forwarded to the *Disbursement Officer dashboard*

----------------------------------------------------

ADD MONITORING PANEL

Add summary cards:

Total Authorized Beneficiaries  
Total Funds Allocated  
Total Funds Released  
Remaining Budget

----------------------------------------------------

DESIGN GOAL

The update should clearly show the workflow:

Sector Staff → evaluate applications  
Focal Person → authorize disbursement  
Disbursement Officer → process payout  
Treasurer → monitor financial records

The interface must look like a realistic municipal assistance distribution system used by the MSWDO.