import { FileText, Download, Calendar, Printer } from 'lucide-react';
import { useState } from 'react';

export default function LiquidationReportGenerator() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedProgram || !selectedSector || !dateFrom || !dateTo) {
      alert("Please fill in all fields to generate report.");
      return;
    }
    setShowReport(true);
  };

  const handleDownloadPDF = () => {
    alert("Downloading liquidation report as PDF...");
  };

  const handleDownloadExcel = () => {
    alert("Downloading liquidation report as Excel...");
  };

  const reportData = {
    program: "Senior Citizen Medical Aid",
    sector: "Senior Citizen",
    dateRange: "January 1, 2026 - March 14, 2026",
    totalBeneficiariesPaid: 85,
    totalFundsReleased: 425000,
    remainingBudget: 75000,
    allocatedBudget: 500000,
    utilizationRate: 85,
    transactions: [
      { date: "Jan 15 2026", beneficiary: "Pedro Garcia", amount: 5000, barangay: "Pacol" },
      { date: "Jan 18 2026", beneficiary: "Rosa Mendoza", amount: 5000, barangay: "Santa Cruz" },
      { date: "Jan 22 2026", beneficiary: "Jose Reyes", amount: 4500, barangay: "San Rafael" },
      { date: "Feb 05 2026", beneficiary: "Carmen Santos", amount: 5000, barangay: "Pacol" },
      { date: "Feb 10 2026", beneficiary: "Luis Martinez", amount: 5000, barangay: "Santa Cruz" }
    ]
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Liquidation Report Generator</h1>
        <p className="text-gray-500 mt-1">Generate detailed financial liquidation reports for program accountability</p>
      </div>

      {/* Report Generation Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Report Parameters</h2>
            <p className="text-sm text-gray-500">Select program and date range for liquidation report</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Name</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Program</option>
              <option value="Senior Citizen Medical Aid">Senior Citizen Medical Aid</option>
              <option value="PWD Medical Support">PWD Medical Support</option>
              <option value="Solo Parent Educational Aid">Solo Parent Educational Aid</option>
              <option value="Women Livelihood Assistance">Women Livelihood Assistance</option>
              <option value="Youth Educational Assistance">Youth Educational Assistance</option>
              <option value="Disaster Emergency Relief">Disaster Emergency Relief</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Sector</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="PWD">PWD</option>
              <option value="Solo Parent">Solo Parent</option>
              <option value="Women">Women</option>
              <option value="Youth / Children">Youth / Children</option>
              <option value="Disaster-Affected Families">Disaster-Affected Families</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerateReport}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
          {showReport && (
            <>
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handleDownloadExcel}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Excel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Generated Report Preview */}
      {showReport && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">LIQUIDATION REPORT</h2>
              <p className="text-sm text-gray-600 mt-1">Municipality of San Pascual</p>
              <p className="text-sm text-gray-600">Municipal Social Welfare and Development Office</p>
            </div>
          </div>

          <div className="p-8">
            {/* Report Header */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Program:</span>
                <span className="text-gray-900">{reportData.program}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Sector:</span>
                <span className="text-gray-900">{reportData.sector}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Date Range:</span>
                <span className="text-gray-900">{reportData.dateRange}</span>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Allocated Budget</p>
                  <p className="text-2xl font-bold text-gray-900">₱{reportData.allocatedBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Funds Released</p>
                  <p className="text-2xl font-bold text-green-600">₱{reportData.totalFundsReleased.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining Budget</p>
                  <p className="text-2xl font-bold text-blue-600">₱{reportData.remainingBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Beneficiaries Paid</p>
                  <p className="text-2xl font-bold text-purple-600">{reportData.totalBeneficiariesPaid}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Budget Utilization Rate</span>
                  <span className="text-sm font-semibold text-green-600">{reportData.utilizationRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${reportData.utilizationRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Disbursement Transactions (Sample)</h3>
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">Beneficiary Name</th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">Barangay</th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.transactions.map((transaction, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.beneficiary}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.barangay}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">₱{transaction.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={3} className="px-4 py-3 text-sm text-gray-900 text-right">SUBTOTAL (Sample):</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ₱{reportData.transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2 italic">* This is a sample preview. Full report will include all {reportData.totalBeneficiariesPaid} transactions.</p>
            </div>

            {/* Certification */}
            <div className="mt-8 pt-6 border-t-2 border-gray-300">
              <p className="text-sm text-gray-700 mb-6">
                This is to certify that the above report is a true and accurate liquidation of funds disbursed under the {reportData.program} program for the period {reportData.dateRange}.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="border-t-2 border-gray-800 pt-2">
                    <p className="text-sm font-semibold text-gray-800">MSWDO Head / Focal Person</p>
                    <p className="text-xs text-gray-600">Prepared By</p>
                  </div>
                </div>
                <div>
                  <div className="border-t-2 border-gray-800 pt-2">
                    <p className="text-sm font-semibold text-gray-800">Municipal Treasurer</p>
                    <p className="text-xs text-gray-600">Certified Correct</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
