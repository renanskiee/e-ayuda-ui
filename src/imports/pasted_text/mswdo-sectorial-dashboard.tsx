Create a **complete management dashboard interface** for the **Sectorial Database & Program Creation Management Module** in the **E-Ayuda Management and Monitoring System** used by the Municipal Social Welfare and Development Office (MSWDO).

This module is primarily used by the **MSWDO Head / Focal Person** and authorized municipal administrators to manage the centralized beneficiary database, track assistance records across all sectors, detect duplicate beneficiaries, create assistance programs, and allocate budgets transparently.

This module must look like a **high-level municipal government management system** with a professional dashboard layout, tables, filters, charts, forms, and monitoring panels.

---

LOGIN ROUTING BEHAVIOR

The system uses a **universal login page**.

If the user selects:

Role: MSWDO Head – Focal Person

After clicking **Login**, the system must automatically redirect to the **MSWDO Head Dashboard**.

Inside the MSWDO Head system, there should be a menu item called:

**Sectorial Database & Program Creation Management**

Clicking this menu opens this module.

This module should display **all sectors together**, unlike sector dashboards which only show one sector.

---

GENERAL DASHBOARD LAYOUT

Top Navigation Bar

Municipality Logo (San Pascual LGU)
System Title: E-Ayuda Management and Monitoring System
Module Title: Sectorial Database & Program Creation Management
Notification Icon
User Profile
Logout Button

Sidebar Navigation Menu

Dashboard
Central Beneficiary Database
Duplicate Detection
Program Creation
Program Management
Budget Allocation
Assistance History
Reports
Settings

Use a **modern municipal government dashboard style** with structured cards, tables, charts, tabs, and side panels.

---

MODULE OVERVIEW DASHBOARD

Add summary cards showing overall municipal data.

Cards

Total Registered Beneficiaries: 512
Total Active Programs: 8
Potential Duplicate Records: 14
Total Budget Allocated: ₱1,500,000
Total Budget Disbursed: ₱1,045,000
Remaining Municipal Budget: ₱455,000

---

SECTOR DISTRIBUTION CHARTS

Chart 1: Total Beneficiaries by Sector

Senior Citizen – 150
PWD – 92
Solo Parent – 78
Women – 64
Youth / Children – 73
Disaster-Affected Families – 55

Chart 2: Budget Allocation by Sector

Senior Citizen – ₱300,000
PWD – ₱250,000
Solo Parent – ₱200,000
Women – ₱180,000
Youth / Children – ₱160,000
Disaster-Affected Families – ₱220,000

Chart 3: Monthly Assistance Distribution

January – ₱180,000
February – ₱210,000
March – ₱230,000
April – ₱205,000
May – ₱220,000

---

CENTRAL BENEFICIARY DATABASE

Create a **centralized beneficiary records table** that stores all beneficiaries from every sector.

Table Columns

Beneficiary ID
Full Name
Gender
Age
Barangay
Sector
Program Enrolled
Assistance Received
Date Approved
Status
Actions

Sample Data

BEN-1001 | Pedro Garcia | Male | 72 | Pacol | Senior Citizen | Senior Medical Aid | ₱5,000 | Mar 12 2026 | Active | View / Edit
BEN-1002 | Maria Santos | Female | 45 | Santa Cruz | PWD | PWD Medical Support | ₱3,500 | Mar 10 2026 | Active | View / Edit
BEN-1003 | Ana Ramirez | Female | 35 | San Rafael | Solo Parent | Solo Parent Educational Aid | ₱4,000 | Mar 8 2026 | Active | View / Edit
BEN-1004 | Angela Flores | Female | 34 | Pacol | Women | Livelihood Assistance | ₱4,000 | Mar 7 2026 | Active | View / Edit
BEN-1005 | Mark Dela Cruz | Male | 16 | Santa Cruz | Youth / Children | Educational Assistance | ₱3,000 | Mar 6 2026 | Active | View / Edit

Add filters:

Search by Name
Filter by Barangay
Filter by Sector
Filter by Program
Filter by Status

---

BENEFICIARY PROFILE PAGE

When clicking **View or Edit**, open a detailed profile page.

Sections

Personal Information

Full Name
Gender
Birthdate
Age
Address
Barangay
Contact Number

Sector Information

Assigned Sector
Program Enrolled
Date Registered

Assistance Details

Latest Assistance Received
Amount
Approval Date
Status

Assistance History

Medical Assistance – ₱5,000 – March 2026
Educational Assistance – ₱3,000 – January 2026
Livelihood Assistance – ₱4,000 – December 2025

Buttons

Edit Information
Save Changes
View Full History

Behavior:

MSWDO Head or authorized admin can **update records** and changes must be reflected across the system.

---

DUPLICATE DETECTION PANEL

Create a **Duplicate Detection section** that identifies possible duplicate beneficiaries across sectors.

Table Columns

Record Match ID
Full Name
Possible Duplicate Sector
Barangay
Reason Flagged
Actions

Sample Data

DUP-001 | Maria Santos | PWD / Women | Santa Cruz | Same name and birthdate | Review
DUP-002 | Juan Lopez | Senior Citizen / Disaster Sector | Pacol | Same address and ID number | Review
DUP-003 | Ana Ramirez | Solo Parent / Women | San Rafael | Similar personal information | Review

Add a **Review Duplicate Record** side panel showing:

Primary Record
Possible Duplicate Record
Comparison of Name, Birthdate, Barangay, and ID Number

Buttons

Confirm Duplicate
Mark as Valid Separate Records

This feature is important for **transparency and preventing multiple claims**.

---

PROGRAM CREATION SECTION

Create a **Program Creation form** that allows the MSWDO Head to create new assistance programs.

Form Fields

Program Name
Program Description
Target Sector
Type of Assistance
Required Documents
Maximum Assistance Amount
Sector Budget Allocation
Program Start Date
Program End Date
Eligibility Criteria
Status (Active / Inactive)

Sample Program Data

Program Name: Senior Citizen Medical Aid
Target Sector: Senior Citizen
Type of Assistance: Financial Assistance
Maximum Assistance Amount: ₱5,000
Sector Budget Allocation: ₱300,000
Program Start Date: January 1, 2026
Program End Date: December 31, 2026
Eligibility Criteria: Verified senior citizen resident with medical needs
Status: Active

Buttons

Create Program
Save Draft
Cancel

Behavior:

Once a program is created, it should automatically appear in the **Program Management table** and become available to the appropriate sector.

---

PROGRAM MANAGEMENT TABLE

Display all created assistance programs.

Columns

Program ID
Program Name
Target Sector
Type of Assistance
Budget Allocation
Used Budget
Remaining Budget
Program Duration
Status
Actions

Sample Data

PRG-001 | Senior Citizen Medical Aid | Senior Citizen | Financial | ₱300,000 | ₱214,500 | ₱85,500 | Jan–Dec 2026 | Active | View / Edit
PRG-002 | PWD Medical Support | PWD | Financial | ₱250,000 | ₱178,000 | ₱72,000 | Jan–Dec 2026 | Active | View / Edit
PRG-003 | Solo Parent Educational Aid | Solo Parent | Financial | ₱200,000 | ₱134,500 | ₱65,500 | Jan–Dec 2026 | Active | View / Edit
PRG-004 | Women Livelihood Support | Women | Financial | ₱180,000 | ₱120,500 | ₱59,500 | Jan–Dec 2026 | Active | View / Edit
PRG-005 | Youth Educational Support | Youth / Children | Financial | ₱160,000 | ₱110,000 | ₱50,000 | Jan–Dec 2026 | Active | View / Edit
PRG-006 | Disaster Emergency Support | Disaster-Affected Families | Financial | ₱220,000 | ₱150,000 | ₱70,000 | Jan–Dec 2026 | Active | View / Edit

---

BUDGET ALLOCATION PANEL

Create a **Budget Allocation page** showing transparent budget status for all sectors and programs.

Table Columns

Sector
Allocated Budget
Used Budget
Remaining Budget
Utilization Rate

Sample Data

Senior Citizen | ₱300,000 | ₱214,500 | ₱85,500 | 72%
PWD | ₱250,000 | ₱178,000 | ₱72,000 | 71%
Solo Parent | ₱200,000 | ₱134,500 | ₱65,500 | 67%
Women | ₱180,000 | ₱120,500 | ₱59,500 | 67%
Youth / Children | ₱160,000 | ₱110,000 | ₱50,000 | 69%
Disaster Sector | ₱220,000 | ₱150,000 | ₱70,000 | 68%

Add a visual progress bar for each row.

This page should clearly show **fund transparency and remaining budget per sector**.

---

ASSISTANCE HISTORY LOG

Create a municipal-wide assistance history table.

Columns

Transaction ID
Beneficiary Name
Sector
Program
Amount Released
Release Date
Processed By
Status

Sample Data

TRX-501 | Pedro Garcia | Senior Citizen | Senior Medical Aid | ₱5,000 | Mar 14 2026 | Senior Sector Staff | Released
TRX-601 | Maria Santos | PWD | PWD Medical Support | ₱3,500 | Mar 13 2026 | PWD Sector Staff | Released
TRX-701 | Ana Ramirez | Solo Parent | Solo Parent Educational Aid | ₱4,000 | Mar 12 2026 | Solo Parent Sector Staff | Released
TRX-801 | Angela Flores | Women | Women Livelihood Support | ₱4,000 | Mar 11 2026 | Women Sector Staff | Released
TRX-901 | Mark Dela Cruz | Youth / Children | Youth Educational Support | ₱3,000 | Mar 10 2026 | Youth Sector Staff | Released

Add filters:

Filter by Sector
Filter by Program
Filter by Date
Filter by Status

---

REPORTS SECTION

Create a reporting page for municipal-level reports.

Available reports:

Beneficiaries per Sector
Programs by Budget Utilization
Duplicate Beneficiary Report
Monthly Assistance Report
Yearly Assistance Report

Export buttons:

Download PDF
Download Excel
Print Report

---

UI STYLE

Follow the same **municipal government dashboard style used across the system**.

Design characteristics

White background
Blue accent colors
Rounded cards
Clean tables
Progress bars for budget monitoring
Professional typography
Minimalist icons
Consistent layout with the focal person and sector dashboards

The interface should look like a **real centralized LGU management platform** used by MSWDO administrators to manage beneficiaries, programs, and sector budgets.
