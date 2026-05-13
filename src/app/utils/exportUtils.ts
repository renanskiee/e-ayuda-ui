// Export utilities for Excel, CSV, and PDF exports

export const exportToExcel = (data: any[], filename: string) => {
  // Convert data to CSV format (Excel can open CSV files)
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Handle values with commas, quotes, or newlines
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Add BOM for Excel to recognize UTF-8
  const BOM = '﻿';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (data: any[], filename: string) => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToPDF = (elementId: string, filename: string) => {
  // For PDF export, we'll use the browser's print functionality
  // which allows "Save as PDF"
  const printContent = document.getElementById(elementId);
  if (!printContent) {
    alert('Content not found for PDF export');
    return;
  }

  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) {
    alert('Please allow popups for PDF export');
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${filename}</title>
        <style>
          @media print {
            @page {
              size: letter;
              margin: 0.5in;
            }
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          h1, h2, h3 {
            color: #333;
          }
          .no-print {
            display: none;
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() {
              window.close();
            }, 100);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};

export const printElement = (elementId: string) => {
  const printContent = document.getElementById(elementId);
  if (!printContent) {
    alert('Content not found for printing');
    return;
  }

  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) {
    alert('Please allow popups for printing');
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          @media print {
            @page {
              size: letter;
              margin: 0.5in;
            }
            body {
              margin: 0;
              padding: 0;
            }
          }
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() {
              window.close();
            }, 100);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};
