import { Download, FileText, BarChart3 } from 'lucide-react';
import { applicationsBySector, applicationsByMonth, mockApplications } from '../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const handleDownloadPDF = (reportType: string) => {
    alert(`Downloading ${reportType} as PDF...`);
  };

  const handleDownloadExcel = (reportType: string) => {
    alert(`Downloading ${reportType} as Excel...`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Reports</h1>
        <p className="text-gray-500 mt-1">Generate barangay-level reports and analytics</p>
      </div>

      {/* Report Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Applications per Sector</h3>
              <p className="text-sm text-gray-500">Sector-wise breakdown</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownloadPDF('Applications per Sector')}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={() => handleDownloadExcel('Applications per Sector')}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Monthly Requests</h3>
              <p className="text-sm text-gray-500">Monthly statistics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownloadPDF('Monthly Assistance Requests')}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={() => handleDownloadExcel('Monthly Assistance Requests')}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Forwarded Applications</h3>
              <p className="text-sm text-gray-500">MSWDO submissions</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownloadPDF('Forwarded Applications')}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={() => handleDownloadExcel('Forwarded Applications')}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Applications per Sector Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Applications per Sector</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownloadPDF('Sector Chart')}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Export Chart
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={applicationsBySector}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {applicationsBySector.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {applicationsBySector.map((sector, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-700">{sector.name}: {sector.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Applications Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Applications per Month (2024)</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownloadPDF('Monthly Chart')}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Export Chart
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={applicationsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3B82F6" name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Summary Statistics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Total Applications
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mockApplications.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  100%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Pending Validation
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mockApplications.filter(a => a.status === 'Pending Validation').length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {((mockApplications.filter(a => a.status === 'Pending Validation').length / mockApplications.length) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Validated by Barangay
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mockApplications.filter(a => a.status === 'Validated by Barangay').length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {((mockApplications.filter(a => a.status === 'Validated by Barangay').length / mockApplications.length) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Forwarded to MSWDO
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mockApplications.filter(a => a.status === 'Forwarded to Municipal MSWDO').length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {((mockApplications.filter(a => a.status === 'Forwarded to Municipal MSWDO').length / mockApplications.length) * 100).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Approved by MSWDO
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mockApplications.filter(a => a.status === 'Approved by MSWDO').length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {((mockApplications.filter(a => a.status === 'Approved by MSWDO').length / mockApplications.length) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}