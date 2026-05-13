import { Download, Calendar, Users, DollarSign, TrendingUp, FileText, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const quarterlyData = [
  { quarter: 'Q1 2026', beneficiaries: 142, disbursed: 265000, applications: 158 },
  { quarter: 'Q2 2026', beneficiaries: 152, disbursed: 275000, applications: 168 }
];

const programTypeData = [
  { type: 'Educational', count: 85, amount: 340000 },
  { type: 'Skills Development', count: 72, amount: 252000 },
  { type: 'Sports Programs', count: 58, amount: 145000 },
  { type: 'Scholarship', count: 48, amount: 144000 }
];

const barangayData = [
  { barangay: 'Pacol', beneficiaries: 62, amount: 138000 },
  { barangay: 'Santa Cruz', beneficiaries: 54, amount: 122000 },
  { barangay: 'San Rafael', beneficiaries: 48, amount: 108000 },
  { barangay: 'Kinalansan', beneficiaries: 42, amount: 95000 },
  { barangay: 'Concepcion Grande', beneficiaries: 38, amount: 86000 },
  { barangay: 'San Antonio', beneficiaries: 35, amount: 78000 },
  { barangay: 'Malaking Ilog', beneficiaries: 37, amount: 82000 }
];

const demographics = {
  totalRegistered: 520,
  activeBeneficiaries: 294,
  age5to12: 88,
  age13to17: 125,
  age18to24: 65,
  age25to30: 16,
  inSchool: 218,
  outOfSchool: 76,
  employed: 42,
  indigent: 185
};

export default function SectorReports() {
  const [reportPeriod, setReportPeriod] = useState('Q2-2026');
  const [reportType, setReportType] = useState('summary');

  const handleDownloadReport = () => {
    alert('Downloading comprehensive sector report...');
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Youth Sector Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive performance and statistical analysis</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Full Report
        </button>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Q1-2026">Q1 2026 (Jan-Mar)</option>
              <option value="Q2-2026">Q2 2026 (Apr-Jun)</option>
              <option value="2026">Full Year 2026</option>
              <option value="2025">Full Year 2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="financial">Financial Report</option>
              <option value="demographic">Demographic Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV File</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +7%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Beneficiaries</h3>
          <p className="text-3xl font-bold text-gray-900">{demographics.activeBeneficiaries}</p>
          <p className="text-xs text-gray-500 mt-1">of {demographics.totalRegistered} registered</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +4%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Disbursed</h3>
          <p className="text-3xl font-bold text-gray-900">₱540K</p>
          <p className="text-xs text-gray-500 mt-1">Year-to-date 2026</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-blue-600 font-semibold">326 total</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Applications</h3>
          <p className="text-3xl font-bold text-gray-900">326</p>
          <p className="text-xs text-gray-500 mt-1">90% approval rate</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-orange-600" />
            <span className="text-xs text-gray-600 font-semibold">64%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Budget Utilization</h3>
          <p className="text-3xl font-bold text-gray-900">64%</p>
          <p className="text-xs text-gray-500 mt-1">₱310K remaining</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quarterly Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quarterly Performance (2026)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="beneficiaries" fill="#3b82f6" name="Beneficiaries Served" />
              <Bar dataKey="applications" fill="#8b5cf6" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Program Type Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Program Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programTypeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" width={120} />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Bar dataKey="count" fill="#10b981" name="Beneficiaries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Barangay-wise Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Barangay-wise Distribution</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiaries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Disbursed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {barangayData.map((data, index) => {
                const percentage = ((data.beneficiaries / demographics.activeBeneficiaries) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.barangay}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.beneficiaries}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">₱{data.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demographics Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Demographic Profile</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">{demographics.age5to12}</p>
            <p className="text-sm text-gray-600 mt-1">Age 5-12</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{demographics.age13to17}</p>
            <p className="text-sm text-gray-600 mt-1">Age 13-17</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{demographics.age18to24}</p>
            <p className="text-sm text-gray-600 mt-1">Age 18-24</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">{demographics.age25to30}</p>
            <p className="text-sm text-gray-600 mt-1">Age 25-30</p>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <p className="text-3xl font-bold text-pink-600">{demographics.inSchool}</p>
            <p className="text-sm text-gray-600 mt-1">In School</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-3xl font-bold text-yellow-600">{demographics.outOfSchool}</p>
            <p className="text-sm text-gray-600 mt-1">Out of School</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-3xl font-bold text-red-600">{demographics.employed}</p>
            <p className="text-sm text-gray-600 mt-1">Employed</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg">
            <p className="text-3xl font-bold text-gray-700">{demographics.indigent}</p>
            <p className="text-sm text-gray-600 mt-1">Indigent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
