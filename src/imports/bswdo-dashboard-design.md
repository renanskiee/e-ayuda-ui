Barangay Level System (BSWDO Dashboard)

Prompt for Figma Make:

Design a modern government web system interface for a Barangay Social Welfare and Development Office (BSWDO) dashboard that is part of an E-Ayuda Management and Monitoring System. The interface should be clean, professional, and easy to use for government staff.

The system is used by Barangay Social Welfare and Development Officers (BSWDO) to receive assistance applications from residents, validate them, and forward them to the Municipal Social Welfare and Development Office (MSWDO).

Use a government-style UI, simple layout, light background, clear icons, and easy-to-read tables. Include responsive design and professional dashboard components.

User Role

The only user in this module is the BSWDO staff.

They log in using their barangay staff account.

The system is used to:

• Receive resident applications
• Encode walk-in applicants
• Perform initial validation
• Identify the sector of assistance
• Forward the application to MSWDO

Login Page

Create a secure login page for Barangay staff.

Elements:

Barangay logo
System name:
E-Ayuda Management and Monitoring System

Login form fields:

• Username
• Password

Buttons:

• Login
• Forgot Password

Behavior:

When login is successful, redirect the user to the BSWDO Dashboard.

If credentials are incorrect, show an error message:

"Invalid username or password."

BSWDO Dashboard

Create a dashboard homepage after login.

Top Navigation Bar:

• Barangay Name
• User Profile
• Notification Icon
• Logout Button

Sidebar Navigation Menu:

Dashboard
Applications
New Application
Validation Queue
Forwarded Applications
Residents Database
Reports

Dashboard Widgets

Add dashboard summary cards showing statistics.

Cards:

Total Applications Received
Pending Validation
Forwarded to MSWDO
Approved Applications

Charts:

Applications per Sector
Applications per Month

These charts help BSWDO track barangay assistance activity.

Applications Module

This page displays all applications submitted by residents.

Table Columns:

Application ID
Applicant Name
Barangay
Assistance Type
Sector
Submission Date
Status
Action

Actions:

View Details
Validate
Forward to MSWDO

Search and filter options:

Search by applicant name
Filter by status
Filter by sector

Online Resident Application

Residents can submit applications online through a form.

Application Form Fields:

Personal Information

Full Name
Gender
Birthdate
Contact Number
Address
Barangay

Assistance Details

Type of Assistance Requested
Reason for Request

Sector Selection

Senior Citizen
PWD
Solo Parent
Women
Youth
Disaster Affected

Document Upload

Valid ID
Proof of Residency
Supporting Documents

Buttons:

Submit Application
Cancel

Behavior:

Once submitted:

The application appears in the Validation Queue.

Walk-in Application Encoding

BSWDO can encode applications for residents who visit the barangay office.

Interface:

A New Application Form similar to the online form.

Additional features:

Upload scanned documents
Capture applicant photo (optional)

After submission:

Application is stored in the system.

Status becomes:

Pending Validation

Validation Queue

This page displays applications waiting for barangay validation.

BSWDO reviews the application before forwarding it to MSWDO.

Validation Steps:

Check resident identity
Check document completeness
Confirm assistance eligibility
Verify sector classification

Buttons:

Approve for Forwarding
Request Additional Documents
Reject Application

Behavior:

If approved:

Status becomes

Validated by Barangay

Then the Forward button becomes available.

Forward to MSWDO

After validation, the BSWDO forwards the application.

Forwarding Interface:

Select Assigned Sector:

Senior Citizen Sector
PWD Sector
Solo Parent Sector
Women Sector
Youth Sector

Button:

Forward to MSWDO

Behavior:

Once forwarded:

Status becomes

Forwarded to Municipal MSWDO

The application disappears from the barangay queue and will be received by the Municipal Sector Dashboard.

Residents Database

This section stores basic resident profiles who applied for assistance.

Table Fields:

Resident ID
Full Name
Gender
Address
Contact Number
Sector Category
Application History

Actions:

View Resident Profile
View Assistance History

Purpose:

Avoid duplicate applications and track barangay beneficiaries.

Reports Page

BSWDO can generate simple barangay-level reports.

Report Types:

Applications per Sector
Monthly Assistance Requests
Forwarded Applications

Export options:

Download as PDF
Download as Excel

Notification System

Add notification alerts when:

• New resident application is submitted
• Validation is required
• Application successfully forwarded

Notifications appear in the top navigation bar.

UI Style

Use a modern government dashboard design.

Design preferences:

Clean layout
Soft blue and white colors
Minimalist icons
Professional tables
Rounded cards
Clear typography