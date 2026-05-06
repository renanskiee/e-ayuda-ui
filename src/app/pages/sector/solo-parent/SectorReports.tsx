import { FileText, Download, Calendar, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const applicationTrends = [
  { month: 'Jan', applications: 8, approved: 7, rejected: 1 },
  { month: 'Feb', applications: 9, approved: 8, rejected: 1 },
  { month: 'Mar', applications: 11, approved: 9, rejected: 2 },
  { month: 'Apr', applications: 7, approved: 6, rejected: 1 },
  { month: 'May', applications: 7, approved: 4, rejected: 3 }
];

const disbursementByType = [
  { type: 'Educational', amount: 68000 },
  { type: 'Financial', amount: 42500 },
  { type: 'Medical', amount: 24000 }
];

const reportTemplates = [
  {
    id: 1,
    name: "Monthly Solo Parent Sector Report",
    description: "Comprehensive monthly report of sector activities and fund utilization",
    icon: FileText,
    color: "blue"
  },
  {
    id: 2,
    name: "Beneficiary Statistics Report",
    description: "Demographic breakdown and assistance distribution analysis",
    icon: BarChart3,
    color: "green"
  },
  {
    id: 3,
    name: "Fund Utilization Report",
    description: "Detailed budget allocation and disbursement summary",
    icon: FileText,
    color: "purple"
  },
  {
    id: 4,
    name: "Application Status Report",
    description: "Overview of applications received, approved, and rejected",
    icon: BarChart3,
    color: "orange"
  }
];

export default function SectorReports() {
  const handleGenerateReport = (reportName: string) => {
    alert(`Generating ${reportName}...`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sector Reports</h1>
        <p className="text-gray-500 mt-1">Generate and export solo parent sector performance reports</p>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reportTemplates.map((report) => {
          const Icon = report.icon;
          const colorMap = {
            blue: { bg: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
            green: { bg: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
            purple: { bg: 'bg-purple-100', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
            orange: { bg: 'bg-orange-100', text: 'text-orange-600', button: 'bg-orange-600 hover:bg-orange-700' }
          };
          const colors = colorMap[report.color as keyof typeof colorMap];

          return (
            <div key={report.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{report.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                  <button
                    onClick={() => handleGenerateReport(report.name)}
                    className={`mt-4 px-4 py-2 ${colors.button} text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Report Generator */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Custom Report Generator</h2>
        <p className="text-sm text-gray-500 mb-6">Generate a custom report with specific date range and parameters</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Monthly Summary</option>
              <option>Quarterly Review</option>
              <option>Annual Report</option>
              <option>Custom Date Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <Download className="w-4 h-4" />
          Generate Custom Report
        </button>
      </div>

      {/* Report Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} name="Total Applications" />
              <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="Approved" />
              <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Disbursement by Type */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Disbursement by Assistance Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={disbursementByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="amount" fill="#8b5cf6" name="Amount Disbursed (₱)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}