import { FileText, Download, Printer, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const sectorSummary = [
  { sector: 'Senior Citizen', approved: 68, paid: 52, percentage: 76 },
  { sector: 'PWD', approved: 49, paid: 37, percentage: 76 },
  { sector: 'Solo Parent', approved: 35, paid: 23, percentage: 66 },
  { sector: 'Women', approved: 24, paid: 18, percentage: 75 },
  { sector: 'Youth', approved: 12, paid: 8, percentage: 67 },
  { sector: 'Disaster', approved: 8, paid: 4, percentage: 50 }
];

export default function FinalAuditReport() {
  const auditData = {
    reportPeriod: "January 1, 2026 - March 14, 2026",
    totalBeneficiariesApproved: 196,
    totalBeneficiariesPaid: 142,
    totalFundsReleased: 1245000,
    unclaimedAssistance: 24000,
    remainingBudget: 255000,
    totalBudget: 1500000,
    utilizationRate: 83,
    completionRate: 72
  };

  const handleDownloadPDF = () => {
    alert("Downloading final audit report as PDF...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Final Audit Report</h1>
        <p className="text-gray-500 mt-1">Comprehensive financial audit report for municipal government review</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
      </div>

      {/* Audit Report Document */}
      <div className="bg-white rounded-lg shadow print:shadow-none">
        {/* Report Header */}
        <div className="p-8 border-b border-gray-200 bg-gray-50 print:bg-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">FINAL AUDIT REPORT</h2>
            <p className="text-lg text-gray-700">E-Ayuda Management and Monitoring System</p>
            <p className="text-base text-gray-600 mt-2">Municipality of San Pascual</p>
            <p className="text-base text-gray-600">Municipal Social Welfare and Development Office</p>
            <div className="mt-4 inline-block px-6 py-2 bg-blue-100 rounded-lg">
              <p className="text-sm font-semibold text-blue-800">Report Period: {auditData.reportPeriod}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Executive Summary */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Executive Summary</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This final audit report presents a comprehensive overview of the financial assistance disbursement 
              activities conducted by the Municipal Social Welfare and Development Office for the period of {auditData.reportPeriod}. 
              The report includes total beneficiaries approved and paid, funds released, unclaimed assistance, 
              and remaining budget allocations across all sectors.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold text-gray-700">Total Beneficiaries Approved</h4>
              </div>
              <p className="text-4xl font-bold text-blue-600">{auditData.totalBeneficiariesApproved}</p>
              <p className="text-sm text-gray-600 mt-1">Across all sectors</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold text-gray-700">Total Beneficiaries Paid</h4>
              </div>
              <p className="text-4xl font-bold text-green-600">{auditData.totalBeneficiariesPaid}</p>
              <p className="text-sm text-gray-600 mt-1">{auditData.completionRate}% completion rate</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-gray-700">Total Funds Released</h4>
              </div>
              <p className="text-4xl font-bold text-purple-600">₱{(auditData.totalFundsReleased / 1000000).toFixed(2)}M</p>
              <p className="text-sm text-gray-600 mt-1">{auditData.utilizationRate}% of total budget</p>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Budget Allocated</p>
                <p className="text-2xl font-bold text-gray-900">₱{(auditData.totalBudget / 1000000).toFixed(2)}M</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Funds Released</p>
                <p className="text-2xl font-bold text-green-600">₱{(auditData.totalFundsReleased / 1000000).toFixed(2)}M</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Unclaimed Assistance</p>
                <p className="text-2xl font-bold text-yellow-600">₱{(auditData.unclaimedAssistance / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Remaining Budget</p>
                <p className="text-2xl font-bold text-blue-600">₱{(auditData.remainingBudget / 1000).toFixed(0)}K</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Budget Utilization</span>
                <span className="text-sm font-semibold text-green-600">{auditData.utilizationRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full"
                  style={{ width: `${auditData.utilizationRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sector Breakdown Chart */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Beneficiary Payout Status by Sector</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sectorSummary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#3b82f6" name="Approved">
                  {sectorSummary.map((entry, index) => (
                    <Cell key={`audit-bar-approved-${entry.sector}-${index}`} />
                  ))}
                </Bar>
                <Bar dataKey="paid" fill="#10b981" name="Paid">
                  {sectorSummary.map((entry, index) => (
                    <Cell key={`audit-bar-paid-${entry.sector}-${index}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Summary Table */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Sector-wise Breakdown</h3>
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Approved</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {sectorSummary.map((sector, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{sector.sector}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sector.approved}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{sector.paid}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-yellow-600">{sector.approved - sector.paid}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sector.percentage >= 75 ? 'bg-green-100 text-green-800' :
                        sector.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sector.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 text-sm text-gray-900">TOTAL</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sectorSummary.reduce((sum, s) => sum + s.approved, 0)}</td>
                  <td className="px-6 py-4 text-sm text-green-600">{sectorSummary.reduce((sum, s) => sum + s.paid, 0)}</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">{sectorSummary.reduce((sum, s) => sum + (s.approved - s.paid), 0)}</td>
                  <td className="px-6 py-4 text-sm">
                    {Math.round((sectorSummary.reduce((sum, s) => sum + s.paid, 0) / sectorSummary.reduce((sum, s) => sum + s.approved, 0)) * 100)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Findings and Recommendations */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Findings and Recommendations</h3>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-600 p-4">
                <p className="font-semibold text-green-800">✓ High Compliance Rate</p>
                <p className="text-sm text-gray-700 mt-1">The overall budget utilization of {auditData.utilizationRate}% demonstrates effective fund management and timely disbursement of assistance to approved beneficiaries.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="font-semibold text-blue-800">ℹ Good Completion Rate</p>
                <p className="text-sm text-gray-700 mt-1">With {auditData.completionRate}% of approved beneficiaries already paid, the program shows strong implementation and beneficiary reach.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="font-semibold text-yellow-800">⚠ Recommendation</p>
                <p className="text-sm text-gray-700 mt-1">Continue efforts to reach remaining pending beneficiaries and reduce unclaimed assistance through enhanced communication and coordination with barangay offices.</p>
              </div>
            </div>
          </div>

          {/* Certification and Signatures */}
          <div className="border-t-2 border-gray-800 pt-8 mt-8 print:break-before-page">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Certification</h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              This is to certify that the foregoing final audit report is a true and accurate representation of all 
              financial assistance disbursement activities conducted by the Municipal Social Welfare and Development Office 
              for the period of {auditData.reportPeriod}. All transactions have been properly recorded, verified, 
              and documented in accordance with established government accounting and auditing standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="border-t-2 border-gray-800 pt-3 mt-16">
                  <p className="font-bold text-gray-800">MSWDO Head / Focal Person</p>
                  <p className="text-sm text-gray-600">Prepared By</p>
                  <p className="text-xs text-gray-500 mt-1">Date: _____________</p>
                </div>
              </div>

              <div>
                <div className="border-t-2 border-gray-800 pt-3 mt-16">
                  <p className="font-bold text-gray-800">Municipal Treasurer</p>
                  <p className="text-sm text-gray-600">Certified Correct</p>
                  <p className="text-xs text-gray-500 mt-1">Date: _____________</p>
                </div>
              </div>

              <div>
                <div className="border-t-2 border-gray-800 pt-3 mt-16">
                  <p className="font-bold text-gray-800">Municipal Mayor</p>
                  <p className="text-sm text-gray-600">Approved By</p>
                  <p className="text-xs text-gray-500 mt-1">Date: _____________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
