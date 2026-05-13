MODULE – MSWDO HEAD / FOCAL PERSON DASHBOARD
(Municipal Supervisor System)

Prompt for Figma Make:

Design a municipal government supervisor dashboard for the MSWDO Head / Focal Person in the E-Ayuda Management and Monitoring System.

This interface is used by the MSWDO Head to oversee all sector activities, review recommended assistance applications, approve requests before disbursement, monitor assistance programs, and generate reports such as GAD data.

The design should look like a high-level management dashboard with analytics cards, monitoring tables, approval queues, and reporting tools.

Use a clean government-style UI with a sidebar layout, top navigation bar, cards, charts, and tables.

Login Behavior (Important)

If the user logs in through the login page and selects the role:

MSWDO Head – Focal Person

Then after successful login, the system must automatically redirect the user to:

MSWDO Head Dashboard

This dashboard is different from sector dashboards because it shows all sectors and overall system monitoring.

Dashboard Layout

Create a main dashboard interface with:

Top Navigation Bar:

Municipality Logo
System Name
User Profile (MSWDO Head)
Notifications
Logout

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

Dashboard Overview Widgets

Display summary statistics of the entire municipal assistance system.

Dashboard cards:

Total Applications Received
Applications Pending Sector Evaluation
Applications Awaiting Head Approval
Total Beneficiaries Assisted
Total Funds Disbursed

Monitoring Charts

Add visual charts to show municipal statistics.

Charts:

Applications per Sector
Applications per Barangay
Monthly Assistance Distribution
Assistance by Sector

These charts help the MSWDO Head monitor overall assistance activity across the municipality.

Sector Monitoring Panel

Create a monitoring table showing the status of each sector.

Example table:

Sector | Pending Evaluation | Recommended for Approval | Approved | Disbursed
Senior Citizen | 12 | 8 | 20 | 18
PWD | 10 | 5 | 14 | 13
Solo Parent | 7 | 4 | 11 | 10

Behavior:

Clicking a sector opens the sector activity details page.

Applications Awaiting Final Approval

This is the most important section of the dashboard.

Applications that were recommended for approval by sector staff appear here.

Table Columns:

Application ID
Applicant Name
Barangay
Sector
Type of Assistance
Recommendation by Sector
Date Evaluated
Action

Actions available:

View Application
Approve and Sign
Reject Application

Application Review Page

When the MSWDO Head clicks View Application, show a full review interface.

Sections:

Applicant Information

Name
Gender
Address
Barangay
Sector

Assistance Details

Type of Assistance
Requested Amount
Reason for Request

Sector Evaluation

Evaluation notes from sector staff
Eligibility checklist

Uploaded Documents

Display uploaded files.

Final Approval and Digital Signature

Create an approval panel where the MSWDO Head can approve the request.

Fields:

Approval Decision

Approve Assistance
Reject Application

Remarks field

Digital Signature field

Buttons:

Approve and Sign
Reject Application

Behavior:

If approved:

Application status becomes:

Approved by MSWDO Head

The application is automatically sent to the Disbursement Module.

Disbursement Authorization

Create a page where approved beneficiaries appear before assistance release.

Table fields:

Beneficiary Name
Barangay
Sector
Approved Assistance Amount
Approval Date
Status

Actions:

Authorize Disbursement
Schedule Payout

This ensures that no assistance can be released without approval from the MSWDO Head.

Program Management Section

Create a management interface where the focal person can create or manage assistance programs.

Fields when creating a program:

Program Name
Program Description
Target Sector
Required Documents
Maximum Assistance Amount
Program Duration

Buttons:

Create Program
Edit Program
Deactivate Program

Beneficiary Database

This page shows the central sectorial database of all beneficiaries.

Table fields:

Beneficiary ID
Name
Barangay
Sector
Assistance Received
Date Released

Search options:

Search by Name
Filter by Sector
Filter by Barangay

GAD Report Generator

Add a reporting tool for Gender and Development (GAD) data.

Create a report panel with the following options.

Select Report Type:

Monthly
Yearly

Filters:

Sector
Barangay
Assistance Program

Button:

Generate GAD Report

Output should display:

Beneficiaries by Gender
Assistance by Sector
Women Beneficiary Statistics

Allow export options:

Download PDF
Download Excel

System Reports

Create a reporting page where the MSWDO Head can generate municipal reports.

Reports available:

Applications per Barangay
Assistance Distribution per Sector
Monthly Assistance Report
Yearly Assistance Report

UI Style

The design should be modern, professional, and appropriate for government management systems.

Design style:

White background
Blue accent colors
Rounded cards
Clean charts and tables
Simple icons
Professional typography

The dashboard should look like a high-level administrative system used by municipal officials.