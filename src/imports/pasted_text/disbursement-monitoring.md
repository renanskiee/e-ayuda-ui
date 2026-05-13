Create a complete interface design for *Module 3: Municipal Disbursement & Monitoring* of the *E-Ayuda Management and Monitoring System* used by the Municipality of San Pascual.

This module handles the *final stage of the assistance workflow*, where approved beneficiaries receive financial assistance and all disbursement transactions are recorded and monitored.

The design must include *three user interfaces*, each accessible depending on the user role selected during login.

ROLES THAT USE THIS MODULE
1. MSWDO Head / Focal Person
2. Payout Officer / MSWDO Staff
3. Municipal Treasurer / Accountant

Use the same design style as the rest of the system:
- municipal government dashboard
- white background
- blue accent color
- sidebar navigation
- summary cards
- clean tables
- simple charts
- rounded UI cards

---------------------------------------

LOGIN BEHAVIOR

If the user selects:

Role: MSWDO Head
Role: Payout Officer
Role: Municipal Treasurer

The system redirects them to the *Municipal Disbursement & Monitoring Module interface*, but each role sees different sections depending on their permissions.

---------------------------------------

SCREEN 1 – MSWDO HEAD DISBURSEMENT AUTHORIZATION DASHBOARD

This page allows the *MSWDO Head / Focal Person* to authorize the release of assistance.

Sidebar menu items:
- Dashboard
- Sector Monitoring
- Applications Awaiting Approval
- Disbursement Authorization
- Transaction Logs
- Municipal Reports
- GAD Reports

Top cards:
Approved Beneficiaries Ready for Payout: 196  
Total Funds Allocated: ₱1,500,000  
Funds Released: ₱1,245,000  
Remaining Funds: ₱255,000  

Main table: Approved Beneficiary List

Columns:
Beneficiary Name  
Barangay  
Sector  
Program Name  
Approved Amount  
Approval Date  
Status  
Action  

Example rows:

Juan Dela Cruz | Pacol | Senior Citizen | Senior Medical Aid | ₱5,000 | Mar 13, 2026 | Pending Release | Authorize  
Maria Santos | Santa Cruz | PWD | PWD Medical Support | ₱3,500 | Mar 12, 2026 | Pending Release | Authorize  
Ana Ramirez | San Rafael | Solo Parent | Educational Assistance | ₱4,000 | Mar 12, 2026 | Pending Release | Authorize  

Action buttons:
Authorize Disbursement  
Reject  
View Application Details  

Behavior:
If the MSWDO Head clicks *Authorize Disbursement*, the system updates the status to:

"Authorized for Payout"

and sends the record to the *Payout Officer Dashboard*.

---------------------------------------

SCREEN 2 – PAYOUT OFFICER DASHBOARD (QR PAYOUT VERIFICATION)

This screen is used during the *actual payout event*.

Top cards:

Total Beneficiaries Scheduled Today: 120  
Beneficiaries Paid: 95  
Pending: 23  
Unclaimed: 2  

Main section: QR Code Verification Panel

Components:

QR Code Scanner Input  
Manual Beneficiary Search Field  
Verification Result Card  

When a QR code is scanned, display a beneficiary card showing:

Beneficiary Name  
Barangay  
Sector  
Program Name  
Approved Amount  
Payout Status  

Status examples:

Eligible for Payout  
Already Paid  
Invalid QR Code  

Buttons:

Confirm Payout  
Mark as Unclaimed  
Cancel  

Behavior:

If Confirm Payout is clicked:

- beneficiary status becomes "Paid"
- transaction is recorded in the Transaction Log
- funds are deducted from program budget
- payout statistics update automatically

---------------------------------------

SCREEN 3 – PAYOUT MONITORING DASHBOARD

This screen shows real-time payout analytics.

Cards:

Total Approved Beneficiaries: 196  
Total Paid: 142  
Pending Beneficiaries: 48  
Unclaimed Beneficiaries: 6  

Charts:

Bar Chart – Payout by Barangay  
Pacol: 40  
Santa Cruz: 28  
San Rafael: 24  
San Antonio: 22  

Pie Chart – Payout by Sector

Senior Citizen: 35%  
PWD: 25%  
Solo Parent: 18%  
Women: 12%  
Youth: 6%  
Disaster: 4%

---------------------------------------

SCREEN 4 – TRANSACTION LOG TABLE

This page records every assistance payout.

Columns:

Transaction ID  
Beneficiary Name  
Sector  
Barangay  
Program Name  
Amount Released  
Release Date  
Processed By  
Status  

Example data:

TRX-501 | Pedro Garcia | Senior Citizen | Pacol | Senior Medical Aid | ₱5,000 | Mar 14 2026 | Payout Officer | Paid  
TRX-502 | Maria Santos | PWD | Santa Cruz | Medical Assistance | ₱3,500 | Mar 14 2026 | Payout Officer | Paid  
TRX-503 | Ana Ramirez | Solo Parent | San Rafael | Educational Assistance | ₱4,000 | Mar 14 2026 | Payout Officer | Pending  

Filters:

Search by Name  
Filter by Barangay  
Filter by Sector  
Filter by Date  

Buttons:

View Transaction  
Export Record  

---------------------------------------

SCREEN 5 – MUNICIPAL TREASURER / ACCOUNTANT DASHBOARD

This page is used by the *Municipal Treasurer or Accountant* to review financial disbursement.

Top cards:

Total Funds Released: ₱1,245,000  
Remaining Budget: ₱255,000  
Total Beneficiaries Paid: 142  
Pending Transactions: 48  

Table: Program Fund Utilization

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
Solo Parent Educational Aid | Solo Parent | ₱200,000 | ₱134,500 | ₱65,500 | 67%  

---------------------------------------

SCREEN 6 – LIQUIDATION REPORT GENERATOR

Create a report generation interface.

Fields:

Program Name  
Sector  
Date Range  

Buttons:

Generate Report  
Download PDF  
Download Excel  

Example output:

Program: Senior Citizen Medical Aid  
Total Beneficiaries Paid: 85  
Total Funds Released: ₱425,000  
Remaining Budget: ₱75,000  

---------------------------------------

SCREEN 7 – FINAL AUDIT REPORT

This page generates the final audit report used by the municipal government.

Contents:

Total Beneficiaries Approved  
Total Beneficiaries Paid  
Total Funds Released  
Unclaimed Assistance  
Remaining Budget  

Buttons:

Generate Final Audit Report  
Download PDF  
Print Report  

---------------------------------------

DESIGN GOAL

The Municipal Disbursement & Monitoring Module should feel like a real municipal financial monitoring system where:

- MSWDO Head authorizes payouts
- Payout officers verify beneficiaries using QR codes
- Municipal finance staff monitor funds and generate reports

The design must look like a *professional LGU financial assistance management platform integrated within the E-Ayuda system*.