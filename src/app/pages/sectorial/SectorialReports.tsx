import { FileText, Download, BarChart3, FileSpreadsheet, Printer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const beneficiariesBySector = [
  { sector: 'Senior Citizen', value: 150, color: '#3b82f6' },
  { sector: 'PWD', value: 92, color: '#10b981' },
  { sector: 'Solo Parent', value: 78, color: '#f59e0b' },
  { sector: 'Women', value: 64, color: '#ec4899' },
  { sector: 'Youth', value: 73, color: '#8b5cf6' },
  { sector: 'Disaster', value: 55, color: '#ef4444' }
];

const budgetUtilization = [
  { sector: 'Senior Citizen', allocated: 300000, used: 214500 },
  { sector: 'PWD', allocated: 250000, used: 178000 },
  { sector: 'Solo Parent', allocated: 200000, used: 134500 },
  { sector: 'Women', allocated: 180000, used: 120500 },
  { sector: 'Youth', allocated: 160000, used: 110000 },
  { sector: 'Disaster', allocated: 220000, used: 150000 }
];

const reportTemplates = [
  { id: 1, name: "Beneficiaries per Sector Report", description: "Comprehensive breakdown of registered beneficiaries across all sectors", icon: BarChart3, color: "blue" },
  { id: 2, name: "Programs by Budget Utilization", description: "Analysis of program spending and budget performance", icon: FileSpreadsheet, color: "green" },
  { id: 3, name: "Duplicate Beneficiary Report", description: "List of potential duplicate records flagged in the system", icon: FileText, color: "yellow" },
  { id: 4, name: "Monthly Assistance Report", description: "Monthly summary of assistance distribution and transactions", icon: BarChart3, color: "purple" },
  { id: 5, name: "Yearly Assistance Report", description: "Annual comprehensive report of all assistance programs", icon: FileText, color: "orange" }
];

export default function SectorialReports() {
  const handleGenerateReport = (reportName: string) => {
    alert(`Generating ${reportName}...`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sectorial Reports</h1>
        <p className="text-gray-500 mt-1">Generate and export municipal-level assistance reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reportTemplates.map((report) => {
          const Icon = report.icon;
          const colorMap = {
            blue: { bg: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
            green: { bg: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
            yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', button: 'bg-yellow-600 hover:bg-yellow-700' },
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
                  <button onClick={() => handleGenerateReport(report.name)} className={`mt-4 px-4 py-2 ${colors.button} text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2`}>
                    <Download className="w-4 h-4" />Generate
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Export Options</h2>
        <p className="text-sm text-gray-500 mb-6">Choose your preferred export format</p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
            <FileText className="w-5 h-5" />Download PDF
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />Download Excel
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <Printer className="w-5 h-5" />Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Beneficiaries by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={beneficiariesBySector} cx="50%" cy="50%" labelLine={false} label={({ sector, value }) => `${sector}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                {beneficiariesBySector.map((entry) => (
                  <Cell key={`sectorial-report-${entry.sector}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Utilization by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" />
              <Bar dataKey="used" fill="#10b981" name="Used" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
