import { Download, FileText } from 'lucide-react';
import { useState } from 'react';

export default function LiquidationReports() {
  const [programName, setProgramName] = useState('');
  const [sector, setSector] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleGenerate = () => {
    alert('Generating liquidation report...');
  };

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
              <option value="">Select Program</option>
              <option value="senior-medical">Senior Citizen Medical Aid</option>
              <option value="pwd-medical">PWD Medical Support</option>
              <option value="solo-parent-edu">Solo Parent Educational Support</option>
              <option value="women-empowerment">Women Empowerment Program</option>
              <option value="youth-dev">Youth Development Program</option>
              <option value="eccd">ECCD Support</option>
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
              <option value="">Select Sector</option>
              <option value="senior-citizen">Senior Citizen</option>
              <option value="pwd">PWD</option>
              <option value="solo-parent">Solo Parent</option>
              <option value="women">Women</option>
              <option value="youth">Youth</option>
              <option value="eccd">ECCD</option>
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
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Download Excel
          </button>
        </div>
      </div>

      {/* Sample Output */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Preview</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No report generated yet</p>
          <p className="text-sm text-gray-500">Select filters and click "Generate Report" to preview</p>
        </div>

        {/* Example Output */}
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Example Output:</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Program:</span> Senior Citizen Medical Aid</p>
            <p><span className="font-medium">Beneficiaries Paid:</span> 85</p>
            <p><span className="font-medium">Funds Released:</span> ₱425,000</p>
            <p><span className="font-medium">Remaining Budget:</span> ₱75,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
