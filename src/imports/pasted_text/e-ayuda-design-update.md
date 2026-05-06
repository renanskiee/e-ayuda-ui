Update the existing design of the **E-Ayuda Management and Monitoring System**.

IMPORTANT:
Do not use generic sample tables anymore.
The database tables in the sector dashboards and in the focal person dashboard must be redesigned to match the structure of the actual sector tables already prepared in Excel.

The focal person must also be able to view all sector tables in one centralized database module, and the GAD report generation page must use the structure of the uploaded GAD table.

Use the same overall design system already used in the prototype:
- municipal government dashboard style
- white background
- blue accent color
- left sidebar navigation
- top header bar
- rounded cards
- professional clean tables
- filters and search bars
- responsive admin dashboard layout

====================================================
A. LOGIN BEHAVIOR
====================================================

The system uses one universal login page.

If the user selects:
Role: MSWDO Sector Staff
then the user must also select a sector:
- Senior Citizen
- PWD
- Solo Parent
- Women
- Children
- ECCD

After login, the user is redirected to the dashboard of the chosen sector.

If the user selects:
Role: MSWDO Head / Focal Person
then the user is redirected to the focal person dashboard where all sector databases are visible.

====================================================
B. SECTOR DASHBOARDS – USE REAL TABLE STRUCTURE
====================================================

Each sector dashboard must include:
- Dashboard summary cards
- Received Applications
- Evaluation Queue
- Approved Beneficiaries
- Sector Beneficiary Records
- Fund Monitoring
- Transaction History
- Sector Reports

The most important update is:
The **Sector Beneficiary Records table** in each sector must follow the uploaded Excel structure.

----------------------------------------------------
1. SENIOR CITIZEN SECTOR TABLE
----------------------------------------------------

Use the uploaded senior citizen table format.

Create a table with these columns:

No.
Name
- Last
- First
- Middle
Birthday
Age
Birthplace
Sex
- M
- F
Status
Purok / Sitio
ID Number
Date Issued
Place of Issue
Pensioner
- Yes
- No
PWD
4Ps
SP
National ID
Remarks

Design behavior:
- this table stores all senior citizen residents assigned to this sector
- allow search by name
- filter by barangay
- filter by pensioner status
- filter by PWD / 4Ps / SP
- clicking a row opens a resident profile panel
- staff can update editable fields such as status, purok/sitio, ID number, date issued, place of issue, remarks
- assistance history must be viewable in the resident profile
- fund monitoring panel must remain visible above the table

----------------------------------------------------
2. PWD SECTOR TABLE
----------------------------------------------------

Use the uploaded PWD table format.

Create a table with these columns:

No.
Barangay
Name
B-Day
Age
Male
Female
Occupation
Address
Educational Attainment
Type of Disability
ID Number
Date Issued

Design behavior:
- this table stores all PWD residents assigned to this sector
- allow search by name
- filter by barangay
- filter by type of disability
- clicking a row opens a resident profile panel
- staff can update editable fields such as occupation, address, educational attainment, disability type, ID number, and date issued
- show assistance history inside the resident profile
- show sector fund monitoring card above the table

----------------------------------------------------
3. SOLO PARENT SECTOR TABLE
----------------------------------------------------

Use the uploaded solo parent table format.

Create a table with these columns:

No.
Barangay
Name
Male
Female
Birthdate
Civil Status
Source of Income
4Ps
PWD
SC

Design behavior:
- this table stores all solo parent residents assigned to this sector
- allow search by name
- filter by barangay
- filter by civil status
- filter by 4Ps / PWD / SC tagging
- clicking a row opens a resident profile panel
- staff can update editable fields such as civil status, source of income, and remarks if needed
- assistance history should be visible inside the profile
- sector fund transparency card should remain above the table

----------------------------------------------------
4. WOMEN SECTOR TABLE
----------------------------------------------------

Use the uploaded women table format.

Create a table with these columns:

No.
Name
- Last
- First
- Middle
Birthday
Age
Birthplace
Purok / Sitio
Active
- Yes
- No
Remarks

Design behavior:
- this table stores all women beneficiaries assigned to this sector
- allow search by name
- filter by barangay
- filter by active status
- clicking a row opens a resident profile panel
- staff can update editable fields such as purok/sitio, active status, and remarks
- assistance history should be visible in the profile
- fund monitoring card above the table

----------------------------------------------------
5. CHILDREN SECTOR TABLE
----------------------------------------------------

Use the uploaded children masterlist structure.

Create a table with these columns:

No.
Name
Birthday
Age
Gender
Address
Educational Status
- In School
- Out of School
With Disability
4Ps Beneficiary

Design behavior:
- this table stores all child beneficiaries assigned to the children sector
- allow search by name
- filter by address / barangay
- filter by in-school / out-of-school
- filter by disability and 4Ps
- clicking a row opens a resident profile panel
- staff can update educational status, disability flag, and 4Ps flag
- assistance history visible in profile
- fund monitoring card visible above table

----------------------------------------------------
6. ECCD SECTOR TABLE
----------------------------------------------------

Use the uploaded ECCD weight monitoring record structure.

Create a table with these columns:

No.
Name of Child
Sex
Date of Weighing
Deworming Date
Vitamin A Supplementation Date
Weight (kg)
Height (cm)
Age in Months
Age in Years
120 Days Nutritional Classification fields
- N
- UW
- SUW
- OW
- Wasted
- Severely Wasted
- Overweight
- Obese
- Stunted
- Severely Stunted
- Tall
Remarks

Design behavior:
- this table stores children under ECCD / supplementary feeding monitoring
- this page can look more clinical or child development oriented
- include search by child name
- filter by barangay
- filter by nutritional classification
- clicking a row opens a child profile panel with health monitoring details
- allow updating weight, height, deworming date, vitamin A date, and remarks
- show assistance / feeding program participation history

====================================================
C. FOCAL PERSON DASHBOARD – VIEW ALL TABLES
====================================================

Inside the focal person dashboard, add a module called:

**Central Sectorial Database**

This module must allow the focal person to view all sector databases using tabs or a side filter.

Tabs:
- Masterlist
- Senior Citizen
- PWD
- Solo Parent
- Women
- Children
- ECCD

The focal person must be able to:
- switch between all sector tables
- search residents across all sectors
- filter by barangay
- filter by sector
- open any resident profile
- view assistance history
- monitor which residents already received assistance and which have not
- see sector-specific fund transparency cards
- view duplicate flags if records appear similar across sectors

----------------------------------------------------
MASTERLIST PAGE FOR FOCAL PERSON
----------------------------------------------------

The masterlist should act as a centralized table view of all residents from all sectors.

Instead of using generic columns, use a normalized central format that combines common fields from the sector tables.

Columns:

Resident ID
Full Name
Sex
Birthdate
Age
Barangay
Sector
Address / Purok
Primary Sector Tag
Additional Tags
Program / Assistance Received
Date Registered
Status
Actions

Design behavior:
- this page is the main municipal masterlist view
- allow search by name
- filter by barangay
- filter by sector
- filter by status
- filter by assistance received
- clicking a record opens full profile with sector-specific information
- if the resident belongs to Senior Citizen, show the senior fields
- if PWD, show disability fields
- if Solo Parent, show income and civil status fields
- if ECCD, show child growth monitoring fields

====================================================
D. FOCAL PERSON GAD REPORT PAGE
====================================================

The GAD generation page must follow the structure of the uploaded **GAD data Excel file** instead of using a generic report.

Create a page called:

**GAD Data Generation**

At the top, provide filters:
- Select Year
- Select Report Type: Monthly or Yearly
- Filter by Barangay
- Generate Report button

Use the uploaded GAD sheet layout as the report basis.

----------------------------------------------------
YEARLY GAD TABLE VIEW
----------------------------------------------------

Design the GAD report table similar to the uploaded yearly GAD sheet.

Main row structure:
Barangay-based rows

Main columns:
Barangay
ECCD
Children
Youth
PWD
Women
Solo Parent
Senior Citizen

For years with gender breakdown, support subcolumns like:
- ECCD Male / Female
- Children Male / Female
- Youth Male / Female
- PWD Male / Female
- Solo Parent Male / Female
- Senior Citizen Pensioner Male / Female
- Senior Citizen Non-Pensioner Male / Female
- Women Female only if applicable based on source file

The table should visually resemble a government statistical summary sheet.

Behavior:
- focal person chooses year
- the system generates the proper GAD table layout based on available year structure
- display the table by barangay
- allow export to PDF
- allow export to Excel
- allow print preview

----------------------------------------------------
GAD REPORT SUMMARY CARDS
----------------------------------------------------

Above the GAD table, add summary cards:

Total ECCD
Total Children
Total Youth
Total Women
Total Solo Parents
Total PWD
Total Senior Citizens

These totals should visually correspond to the generated report.

====================================================
E. RESIDENT PROFILE PANEL
====================================================

For all sector tables and for the focal person database, clicking a row should open a detailed side panel or profile page showing:

Personal Information
- Full Name
- Sex
- Birthdate
- Age
- Barangay
- Address / Purok

Sector Information
- Assigned Sector
- Sector-specific fields depending on source table

Assistance History
- Program / assistance received
- Amount if financial
- Date received
- Status

Editable fields:
- staff may update the fields that exist in their assigned table structure
- focal person may view all and edit depending on permissions

====================================================
F. FUND TRANSPARENCY
====================================================

Keep the fund transparency feature on every sector dashboard and also visible to the focal person.

Each sector page should display:
- Total Sector Budget
- Total Disbursed
- Remaining Budget
- Utilization Rate

The focal person should also see a consolidated municipal budget table by sector.

====================================================
G. DESIGN GOAL
====================================================

The design should clearly show that:

- each sector dashboard has its own real beneficiary table based on the uploaded masterlist format
- the focal person can see all sector tables in one centralized database
- the focal person can generate GAD reports using the uploaded GAD table format
- the interface looks like a real municipal social welfare information system
- the database views feel official, data-heavy, and realistic, not generic