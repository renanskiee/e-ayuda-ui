import { useState } from 'react';
import { FileDown, Printer, FileSpreadsheet } from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

// Mock data for barangays
const barangayData = [
  { id: 1, name: "Boca Chica", dayCare: 101, children: 0, youth: 56, women: 225, soloParent: 29, pwd: 35, seniorCitizen: 211 },
  { id: 2, name: "Bolod", dayCare: 108, children: 0, youth: 127, women: 96, soloParent: 63, pwd: 66, seniorCitizen: 261 },
  { id: 3, name: "Busing", dayCare: 35, children: 0, youth: 89, women: 111, soloParent: 57, pwd: 46, seniorCitizen: 197 },
  { id: 4, name: "Cueva", dayCare: 139, children: 0, youth: 193, women: 90, soloParent: 67, pwd: 44, seniorCitizen: 197 },
  { id: 5, name: "Dancalan", dayCare: 53, children: 0, youth: 90, women: 34, soloParent: 36, pwd: 28, seniorCitizen: 143 },
  { id: 6, name: "Halabang Baybay", dayCare: 62, children: 0, youth: 72, women: 118, soloParent: 41, pwd: 52, seniorCitizen: 185 },
  { id: 7, name: "Inawaran", dayCare: 88, children: 0, youth: 105, women: 142, soloParent: 48, pwd: 61, seniorCitizen: 223 },
  { id: 8, name: "Ki-Buaya", dayCare: 74, children: 0, youth: 82, women: 95, soloParent: 38, pwd: 44, seniorCitizen: 176 },
  { id: 9, name: "Ki-Romero", dayCare: 91, children: 0, youth: 114, women: 128, soloParent: 55, pwd: 58, seniorCitizen: 241 },
  { id: 10, name: "Laurente", dayCare: 67, children: 0, youth: 96, women: 87, soloParent: 44, pwd: 39, seniorCitizen: 168 },
  { id: 11, name: "Mabini", dayCare: 103, children: 0, youth: 138, women: 156, soloParent: 62, pwd: 71, seniorCitizen: 278 },
  { id: 12, name: "Mabuhay", dayCare: 45, children: 0, youth: 68, women: 74, soloParent: 32, pwd: 36, seniorCitizen: 152 },
  { id: 13, name: "Malaking Ilog", dayCare: 122, children: 0, youth: 147, women: 183, soloParent: 73, pwd: 79, seniorCitizen: 295 },
  { id: 14, name: "Mapanique", dayCare: 56, children: 0, youth: 79, women: 102, soloParent: 37, pwd: 42, seniorCitizen: 164 },
  { id: 15, name: "Nazareno", dayCare: 84, children: 0, youth: 108, women: 135, soloParent: 51, pwd: 55, seniorCitizen: 218 },
  { id: 16, name: "Pinamasangan", dayCare: 71, children: 0, youth: 91, women: 112, soloParent: 46, pwd: 48, seniorCitizen: 192 },
  { id: 17, name: "Quintina", dayCare: 58, children: 0, youth: 73, women: 89, soloParent: 34, pwd: 41, seniorCitizen: 159 },
  { id: 18, name: "San Jose", dayCare: 95, children: 0, youth: 122, women: 148, soloParent: 59, pwd: 64, seniorCitizen: 253 },
  { id: 19, name: "San Pedro", dayCare: 78, children: 0, youth: 101, women: 124, soloParent: 49, pwd: 53, seniorCitizen: 206 },
  { id: 20, name: "San Rafael", dayCare: 69, children: 0, youth: 87, women: 106, soloParent: 42, pwd: 47, seniorCitizen: 181 },
  { id: 21, name: "Sta Cruz", dayCare: 112, children: 0, youth: 143, women: 171, soloParent: 68, pwd: 75, seniorCitizen: 287 },
  { id: 22, name: "Terraplin", dayCare: 53, children: 0, youth: 69, women: 81, soloParent: 35, pwd: 38, seniorCitizen: 155 }
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function GADReports() {
  const [reportType, setReportType] = useState('Yearly');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedBarangay, setSelectedBarangay] = useState('All Barangays');

  // Filter data based on selected barangay
  const filteredData = selectedBarangay === 'All Barangays' 
    ? barangayData 
    : barangayData.filter(b => b.name === selectedBarangay);

  // Calculate totals
  const totals = filteredData.reduce((acc, curr) => ({
    dayCare: acc.dayCare + curr.dayCare,
    children: acc.children + curr.children,
    youth: acc.youth + curr.youth,
    women: acc.women + curr.women,
    soloParent: acc.soloParent + curr.soloParent,
    pwd: acc.pwd + curr.pwd,
    seniorCitizen: acc.seniorCitizen + curr.seniorCitizen
  }), { dayCare: 0, children: 0, youth: 0, women: 0, soloParent: 0, pwd: 0, seniorCitizen: 0 });

  const handleReset = () => {
    setReportType('Yearly');
    setSelectedYear('2026');
    setSelectedMonth('January');
    setSelectedBarangay('All Barangays');
  };

  const handleExportExcel = () => {
    // Create CSV content
    let csv = 'Gender and Development (GAD) Data Report\n';
    csv += `Report Type: ${reportType}\n`;
    csv += `Year: ${selectedYear}\n`;
    if (reportType === 'Monthly') {
      csv += `Month: ${selectedMonth}\n`;
    }
    csv += `Barangay: ${selectedBarangay}\n`;
    csv += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    
    // Headers
    csv += 'No.,Barangay,Day Care,Children,Youth,Women,Solo Parent,PWD,Senior Citizen\n';
    
    // Data rows
    filteredData.forEach((item, index) => {
      csv += `${index + 1},${item.name},${item.dayCare},${item.children},${item.youth},${item.women},${item.soloParent},${item.pwd},${item.seniorCitizen}\n`;
    });
    
    // Total row
    csv += `TOTAL,,${totals.dayCare},${totals.children},${totals.youth},${totals.women},${totals.soloParent},${totals.pwd},${totals.seniorCitizen}\n`;
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `GAD_Report_${selectedYear}${reportType === 'Monthly' ? '_' + selectedMonth : ''}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    // Create a printable version
    const printWindow = window.open('', '', 'height=800,width=1000');
    if (!printWindow) return;
    
    printWindow.document.write('<html><head><title>GAD Report - PDF</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('h1 { color: #1f2937; font-size: 24px; margin-bottom: 10px; }');
    printWindow.document.write('h2 { color: #4b5563; font-size: 18px; margin-top: 20px; margin-bottom: 10px; }');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
    printWindow.document.write('th { background-color: #dbeafe; border: 1px solid #93c5fd; padding: 8px; text-align: center; font-size: 11px; }');
    printWindow.document.write('td { border: 1px solid #e5e7eb; padding: 8px; text-align: center; font-size: 11px; }');
    printWindow.document.write('tr:hover { background-color: #f9fafb; }');
    printWindow.document.write('.total-row { background-color: #bfdbfe; font-weight: bold; }');
    printWindow.document.write('.info { margin-bottom: 5px; color: #6b7280; font-size: 12px; }');
    printWindow.document.write('.footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    
    printWindow.document.write('<h1>Gender and Development (GAD) Data Report</h1>');
    printWindow.document.write('<div class="info">Municipality of San Pascual - MSWDO</div>');
    printWindow.document.write(`<div class="info">Report Type: ${reportType}</div>`);
    printWindow.document.write(`<div class="info">Year: ${selectedYear}</div>`);
    if (reportType === 'Monthly') {
      printWindow.document.write(`<div class="info">Month: ${selectedMonth}</div>`);
    }
    printWindow.document.write(`<div class="info">Barangay Filter: ${selectedBarangay}</div>`);
    printWindow.document.write(`<div class="info">Generated: ${new Date().toLocaleString()}</div>`);
    
    printWindow.document.write('<h2>Summary Statistics</h2>');
    printWindow.document.write('<table style="width: auto;">');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">Day Care:</td><td style="text-align: right;">' + totals.dayCare.toLocaleString() + '</td></tr>');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">Children:</td><td style="text-align: right;">' + totals.children.toLocaleString() + '</td></tr>');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">Youth:</td><td style="text-align: right;">' + totals.youth.toLocaleString() + '</td></tr>');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">Women:</td><td style="text-align: right;">' + totals.women.toLocaleString() + '</td></tr>');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">Solo Parent:</td><td style="text-align: right;">' + totals.soloParent.toLocaleString() + '</td></tr>');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">PWD:</td><td style="text-align: right;">' + totals.pwd.toLocaleString() + '</td></tr>');
    printWindow.document.write('<tr><td style="text-align: left; font-weight: bold;">Senior Citizen:</td><td style="text-align: right;">' + totals.seniorCitizen.toLocaleString() + '</td></tr>');
    printWindow.document.write('</table>');
    
    printWindow.document.write('<h2>Detailed Report by Barangay</h2>');
    printWindow.document.write('<table>');
    printWindow.document.write('<thead><tr>');
    printWindow.document.write('<th>No.</th><th>Barangay</th><th>Day Care</th><th>Children</th><th>Youth</th><th>Women</th><th>Solo Parent</th><th>PWD</th><th>Senior Citizen</th>');
    printWindow.document.write('</tr></thead><tbody>');
    
    filteredData.forEach((item, index) => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${index + 1}</td>`);
      printWindow.document.write(`<td style="text-align: left;">${item.name}</td>`);
      printWindow.document.write(`<td>${item.dayCare}</td>`);
      printWindow.document.write(`<td>${item.children}</td>`);
      printWindow.document.write(`<td>${item.youth}</td>`);
      printWindow.document.write(`<td>${item.women}</td>`);
      printWindow.document.write(`<td>${item.soloParent}</td>`);
      printWindow.document.write(`<td>${item.pwd}</td>`);
      printWindow.document.write(`<td>${item.seniorCitizen}</td>`);
      printWindow.document.write('</tr>');
    });
    
    printWindow.document.write('<tr class="total-row">');
    printWindow.document.write('<td></td><td style="text-align: left;">TOTAL</td>');
    printWindow.document.write(`<td>${totals.dayCare}</td>`);
    printWindow.document.write(`<td>${totals.children}</td>`);
    printWindow.document.write(`<td>${totals.youth}</td>`);
    printWindow.document.write(`<td>${totals.women}</td>`);
    printWindow.document.write(`<td>${totals.soloParent}</td>`);
    printWindow.document.write(`<td>${totals.pwd}</td>`);
    printWindow.document.write(`<td>${totals.seniorCitizen}</td>`);
    printWindow.document.write('</tr>');
    
    printWindow.document.write('</tbody></table>');
    
    printWindow.document.write('<div class="footer">');
    printWindow.document.write('<p>Prepared and Submitted by: MSWDO</p>');
    printWindow.document.write('<p>Municipality of San Pascual</p>');
    printWindow.document.write('</div>');
    
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Auto print after content loads
    printWindow.onload = function() {
      printWindow.print();
    };
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    exportToExcel(gadData, {
      filename: 'GAD_Reports'
    });
  };
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Gender and Development (GAD) Data Report</h1>
        <p className="text-lg text-gray-600 mt-1">Summary of Beneficiaries per Sector and Barangay</p>
        <p className="text-sm text-gray-500 mt-2">
          This report summarizes the total number of beneficiaries across all social welfare sectors per barangay.
        </p>
      </div>

      {/* Filter Panel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>

          {/* Month (conditional) */}
          {reportType === 'Monthly' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {months.map(month => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </div>
          )}

          {/* Barangay Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barangay Filter</label>
            <select
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Barangays</option>
              {barangayData.map(b => (
                <option key={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">Day Care</p>
          <p className="text-2xl font-bold text-blue-600">{totals.dayCare.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">Children</p>
          <p className="text-2xl font-bold text-purple-600">{totals.children.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">Youth</p>
          <p className="text-2xl font-bold text-green-600">{totals.youth.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">Women</p>
          <p className="text-2xl font-bold text-pink-600">{totals.women.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">Solo Parent</p>
          <p className="text-2xl font-bold text-orange-600">{totals.soloParent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">PWD</p>
          <p className="text-2xl font-bold text-indigo-600">{totals.pwd.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-600 mb-1">Senior Citizen</p>
          <p className="text-2xl font-bold text-teal-600">{totals.seniorCitizen.toLocaleString()}</p>
        </div>
      </div>

      {/* GAD Report Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Summary of {reportType} Gender and Development (GAD) Data
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                As of December 30, {selectedYear}
                {reportType === 'Monthly' && ` - ${selectedMonth}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Export to Excel
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <FileDown className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <Printer className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50 border-b-2 border-blue-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">No.</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Barangay</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Day Care</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Children</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Youth</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Women</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Solo Parent</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">PWD</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Senior Citizen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.dayCare}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.children}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.youth}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.women}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.soloParent}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.pwd}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{item.seniorCitizen}</td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-blue-100 border-t-2 border-blue-300 font-bold">
                <td className="px-4 py-3 text-sm text-gray-900"></td>
                <td className="px-4 py-3 text-sm text-gray-900 uppercase">TOTAL</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.dayCare}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.children}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.youth}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.women}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.soloParent}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.pwd}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{totals.seniorCitizen}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Report Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Prepared and Submitted:</p>
            <p className="text-base font-semibold text-gray-800 mt-2">MSWDO</p>
            <p className="text-sm text-gray-600">Municipality of San Pascual</p>
          </div>
        </div>
      </div>
    </div>
  );
}