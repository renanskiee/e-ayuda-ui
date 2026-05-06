Follow-up update for the **Focal Person Dashboard** in the E-Ayuda Management and Monitoring System.

Do not redesign the whole dashboard. Only add a new page called **GAD Reports** under the focal person’s sidebar navigation.

Use the same design style already used in the system:
white background  
municipal blue accent color  
clean data tables  
government dashboard layout  
rounded cards and containers  

====================================================

ADD NEW SIDEBAR MENU ITEM

Insert a new sidebar item under the monitoring/reporting section:

GAD Reports

When clicked, open the **GAD Report Generation Page**.

====================================================

PAGE HEADER

Title:
Gender and Development (GAD) Data Report

Subtitle:
Summary of Beneficiaries per Sector and Barangay

Description text:

"This report summarizes the total number of beneficiaries across all social welfare sectors per barangay."

====================================================

REPORT FILTER PANEL

Place a filter panel at the top of the page.

Fields:

Report Type  
Dropdown:
Yearly  
Monthly

Year  
Dropdown example:
2022  
2023  
2024  
2025  
2026

Month (only visible when Monthly is selected)

Barangay Filter  
Dropdown:
All Barangays  
Boca Chica  
Bolod  
Busing  
Cueva  
Dancalan  
Halabang Baybay  
Inawaran  
Ki-Buaya  
Ki-Romero  
Laurente  
Mabini  
Mabuhay  
Malaking Ilog  
Mapanique  
Nazareno  
Pinamasangan  
Quintina  
San Jose  
San Pedro  
San Rafael  
Sta Cruz  
Terraplin

Buttons:

Generate GAD Report  
Reset Filters

====================================================

REPORT SUMMARY CARDS

Display summary cards above the table:

Total Day Care Beneficiaries  
Total Children Beneficiaries  
Total Youth Beneficiaries  
Total Women Beneficiaries  
Total Solo Parent Beneficiaries  
Total PWD Beneficiaries  
Total Senior Citizen Beneficiaries

Example values:

Day Care: 1464  
Children: 0  
Youth: 1530  
Women: 1975  
Solo Parent: 969  
PWD: 890  
Senior Citizen: 3863

====================================================

GAD REPORT TABLE

Display a large statistical table that follows the format used in the MSWDO GAD report sheet.

Table Title:

Summary of Yearly Gender and Development (GAD) Data

Subheading:

As of December 30, 2026

Table Columns:

No.  
Barangay  
Day Care  
Children  
Youth  
Women  
Solo Parent  
PWD  
Senior Citizen

Example rows:

1 | Boca Chica | 101 | 0 | 56 | 225 | 29 | 35 | 211  
2 | Bolod | 108 | 0 | 127 | 96 | 63 | 66 | 261  
3 | Busing | 35 | 0 | 89 | 111 | 57 | 46 | 197  
4 | Cueva | 139 | 0 | 193 | 90 | 67 | 44 | 197  
5 | Dancalan | 53 | 0 | 90 | 34 | 36 | 28 | 143  

Continue rows for all barangays.

====================================================

TOTAL ROW

Add a final summary row at the bottom of the table.

Example:

TOTAL |  | 1464 | 0 | 1530 | 1975 | 969 | 890 | 3863

The totals should be automatically calculated by the system.

====================================================

EXPORT OPTIONS

Place export buttons on the top right of the table.

Buttons:

Export to Excel  
Download PDF  
Print Report

====================================================

REPORT FOOTER

At the bottom of the report page include a section similar to official MSWDO reports.

Text:

Prepared and Submitted:

MSWDO  
Municipality of San Pascual

====================================================

SYSTEM BEHAVIOR

When the focal person clicks **Generate GAD Report**:

• the system retrieves data from all sector databases  
• counts beneficiaries per sector and barangay  
• automatically fills the table  
• calculates the total row  
• updates the summary cards above the table

====================================================

DESIGN GOAL

The GAD Reports page should look like an official government statistical report interface used by the MSWDO for monitoring sector beneficiaries and preparing municipal GAD reports.