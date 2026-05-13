import { useState } from 'react';
import { Users, FileText, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';
import SectorDetailsModal from '../../components/SectorDetailsModal';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data for MSWDO Head Dashboard
const applicationsBySector = [
  { id: 'sector-sc', name: "Senior Citizen", value: 85 },
  { id: 'sector-pwd', name: "PWD", value: 54 },
  { id: 'sector-sp', name: "Solo Parent", value: 42 },
  { id: 'sector-women', name: "Women", value: 36 },
  { id: 'sector-youth', name: "Youth", value: 31 },
  { id: 'sector-eccd', name: "ECCD", value: 28 }
];

const applicationsByBarangay = [
  { id: 'brgy-pacol', name: "Barangay Pacol", value: 48 },
  { id: 'brgy-santa-cruz', name: "Barangay Santa Cruz", value: 35 },
  { id: 'brgy-san-rafael', name: "Barangay San Rafael", value: 29 },
  { id: 'brgy-malaking-ilog', name: "Barangay Malaking Ilog", value: 21 },
  { id: 'brgy-san-antonio', name: "Barangay San Antonio", value: 18 }
];

const monthlyAssistance = [
  { id: 'month-jan', name: "January", beneficiaries: 25 },
  { id: 'month-feb', name: "February", beneficiaries: 40 },
  { id: 'month-mar', name: "March", beneficiaries: 36 },
  { id: 'month-apr', name: "April", beneficiaries: 52 },
  { id: 'month-may', name: "May", beneficiaries: 43 }
];

const sectorMonitoring = [
  { id: 'monitor-sc', sector: "Senior Citizen", pending: 6, recommended: 8, approved: 35, disbursed: 32 },
  { id: 'monitor-pwd', sector: "PWD", pending: 4, recommended: 5, approved: 28, disbursed: 25 },
  { id: 'monitor-sp', sector: "Solo Parent", pending: 3, recommended: 3, approved: 22, disbursed: 20 },
  { id: 'monitor-women', sector: "Women", pending: 2, recommended: 1, approved: 15, disbursed: 14 },
  { id: 'monitor-youth', sector: "Youth", pending: 1, recommended: 1, approved: 10, disbursed: 9 }
];

const budgetUtilization = [
  { id: 'budget-sc', sector: "Senior Citizen", utilization: 72 },
  { id: 'budget-pwd', sector: "PWD", utilization: 71 },
  { id: 'budget-sp', sector: "Solo Parent", utilization: 67 },
  { id: 'budget-women', sector: "Women", utilization: 67 },
  { id: 'budget-youth', sector: "Youth", utilization: 69 },
  { id: 'budget-eccd', sector: "ECCD", utilization: 68 }
];

export default function MswdoHeadDashboard() {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (sector: string) => {
    setSelectedSector(sector);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSector(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">MSWDO Head Dashboard</h1>
        <p className="text-gray-500 mt-1">Municipal-wide oversight and approval management</p>
      </div>

      {/* Dashboard Overview Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <DashboardCard
          title="Total Applications Received"
          value={276}
          icon={FileText}
          color="blue"
        />
        <DashboardCard
          title="Pending Sector Evaluation"
          value={18}
          icon={TrendingUp}
          color="yellow"
        />
        <DashboardCard
          title="Applications Awaiting Final Approval"
          value={20}
          icon={CheckCircle}
          color="purple"
        />
        <DashboardCard
          title="Total Beneficiaries Assisted"
          value={228}
          icon={Users}
          color="green"
        />
        <DashboardCard
          title="Total Municipal Funds Released"
          value="₱728,000"
          icon={DollarSign}
          color="blue"
        />
      </div>

      {/* Monitoring Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Applications per Sector */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Applications per Sector</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationsBySector}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {applicationsBySector.map((entry, index) => (
                  <Cell key={`mswdo-pie-sector-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {applicationsBySector.map((sector, index) => (
              <div key={`legend-sector-${sector.id}`} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{sector.name}: {sector.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications per Barangay */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Applications per Barangay</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsByBarangay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" name="Applications">
                {applicationsByBarangay.map((entry) => (
                  <Cell key={`bar-barangay-${entry.id}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Assistance Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Assistance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyAssistance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="beneficiaries" stroke="#3B82F6" strokeWidth={2} name="Beneficiaries" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Utilization by Sector */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Utilization by Sector</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="utilization" fill="#10B981" name="Utilization %">
                {budgetUtilization.map((entry) => (
                  <Cell key={`bar-budget-${entry.id}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Monitoring Panel */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Sector Monitoring</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of sector activities</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending Evaluation
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommended for Approval
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disbursed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectorMonitoring.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {item.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {item.recommended}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {item.approved}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {item.disbursed}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewDetails(item.sector)}
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Awaiting Final Approval */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Applications Awaiting Final Approval</h2>
          <p className="text-sm text-gray-500 mt-1">Applications recommended by sector staff requiring your approval</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommended Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evaluation Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  AICS-2026-101
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Juan Dela Cruz
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Pacol
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Senior Citizen
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Financial Assistance
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ₱5,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  March 12, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    Approve
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  AICS-2026-102
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Maria Santos
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Santa Cruz
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    PWD
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Medical Assistance
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ₱3,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  March 11, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    Approve
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  AICS-2026-103
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Ana Ramirez
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  San Rafael
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Solo Parent
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Educational Assistance
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ₱4,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  March 10, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-800 font-medium">
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Details Modal */}
      {selectedSector && (
        <SectorDetailsModal
          sector={selectedSector}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}