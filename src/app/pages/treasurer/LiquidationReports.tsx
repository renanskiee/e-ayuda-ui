import { Download, FileText, Printer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { applicationStore } from '../../utils/applicationStore';
import { programStore } from '../../utils/programStore';

export default function LiquidationReports() {
  const [programName, setProgramName] = useState('');
  const [sector, setSector] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reportData, setReportData] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setPrograms(programStore.getAll() || []);
        setApplications((await applicationStore.getAll()) || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();

    const unsubscribe1 = programStore.subscribe(() => {
      try {
        setPrograms(programStore.getAll() || []);
      } catch (error) {
        console.error('Error updating programs:', error);
      }
    });

    const unsubscribe2 = applicationStore.subscribe(async () => {
      try {
        setApplications((await applicationStore.getAll()) || []);
      } catch (error) {
        console.error('Error updating applications:', error);
      }
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  const handleGenerate = () => {
    let filtered = applications.filter(app => app.status === 'Paid');

    // Apply filters
    if (programName) {
      filtered = filtered.filter(app => app.program === programName);
    }
    if (sector) {
      filtered = filtered.filter(app => app.sector === sector);
    }
    if (dateFrom) {
      filtered = filtered.filter(app => {
        const appDate = new Date(app.dateDisbursed || '');
        return appDate >= new Date(dateFrom);
      });
    }
    if (dateTo) {
      filtered = filtered.filter(app => {
        const appDate = new Date(app.dateDisbursed || '');
        return appDate <= new Date(dateTo);
      });
    }

    const totalDisbursed = filtered.reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);
    const beneficiariesCount = filtered.length;

    // Find program budget if program is selected
    const selectedProgram = programs.find(p => p.programName === programName);
    const programBudget = selectedProgram?.budgetAllocation || 0;
    const remaining = programBudget - totalDisbursed;

    setReportData({
      program: programName || 'All Programs',
      sector: sector || 'All Sectors',
      dateRange: dateFrom && dateTo ? `${dateFrom} to ${dateTo}` : 'All Dates',
      beneficiariesPaid: beneficiariesCount,
      fundsReleased: totalDisbursed,
      programBudget: programBudget,
      remainingBudget: remaining,
      transactions: filtered
    });
  };

  const handleDownloadPDF = () => {
    if (!reportData) {
      alert('Please generate a report first');
      return;
    }
    alert('PDF download functionality - Report data prepared for export');
  };

  const handleDownloadExcel = () => {
    if (!reportData) {
      alert('Please generate a report first');
      return;
    }

    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `liquidation-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Get unique sectors
  const sectors = Array.from(new Set(applications.map(app => app.sector).filter(Boolean)));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Liquidation Report Generator</h1>
        <p className="text-gray-500 mt-1">Generate comprehensive liquidation reports for programs</p>
      </div>

      {/* Report Generator Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name
            </label>
            <select
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Programs</option>
              {programs.map(program => (
                <option key={program.id} value={program.programName}>{program.programName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sectors</option>
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            Generate Report
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          <button
            onClick={handleDownloadExcel}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download JSON
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Preview</h2>

        {!reportData ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No report generated yet</p>
            <p className="text-sm text-gray-500">Select filters and click "Generate Report" to preview</p>
          </div>
        ) : (
          <div>
            {/* Report Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-2">Liquidation Report</h3>
              <p className="text-blue-100">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Report Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Program</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.program}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Sector</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.sector}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Date Range</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.dateRange}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Beneficiaries Paid</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.beneficiariesPaid}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Program Budget</p>
                <p className="text-2xl font-bold text-blue-700">₱{reportData.programBudget.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">Funds Released</p>
                <p className="text-2xl font-bold text-green-700">₱{reportData.fundsReleased.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 mb-1">Remaining Budget</p>
                <p className="text-2xl font-bold text-purple-700">₱{reportData.remainingBudget.toLocaleString()}</p>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Transaction Details</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date Disbursed</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reference #</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportData.transactions.slice(0, 10).map((txn: any) => (
                      <tr key={txn.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{txn.applicantName}</td>
                        <td className="px-4 py-2 font-semibold">₱{(txn.recommendedAmount || 0).toLocaleString()}</td>
                        <td className="px-4 py-2">{txn.dateDisbursed || 'N/A'}</td>
                        <td className="px-4 py-2 font-mono text-xs">{txn.referenceNumber || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reportData.transactions.length > 10 && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Showing 10 of {reportData.transactions.length} transactions
                  </p>
                )}
              </div>
            </div>

            {/* Print Button */}
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
