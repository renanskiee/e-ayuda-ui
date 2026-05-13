import { X, Users, FileText, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SectorDetailsModalProps {
  sector: string;
  isOpen: boolean;
  onClose: () => void;
}

// Detailed sector data
const sectorDetails: { [key: string]: any } = {
  "Senior Citizen": {
    stats: {
      totalApplications: 85,
      pending: 6,
      recommended: 8,
      approved: 35,
      disbursed: 32,
      rejected: 4,
      totalFunds: "₱175,000",
      utilizationRate: 72
    },
    recentApplications: [
      { id: "SC-2026-001", name: "Juan Dela Cruz", barangay: "Pacol", type: "Medical Assistance", amount: "₱5,000", status: "Recommended", date: "May 12, 2026" },
      { id: "SC-2026-002", name: "Maria Garcia", barangay: "Santa Cruz", type: "Financial Assistance", amount: "₱3,500", status: "Recommended", date: "May 11, 2026" },
      { id: "SC-2026-003", name: "Pedro Santos", barangay: "San Rafael", type: "Medical Assistance", amount: "₱4,000", status: "Pending", date: "May 10, 2026" },
      { id: "SC-2026-004", name: "Rosa Fernandez", barangay: "Malaking Ilog", type: "Financial Assistance", amount: "₱3,000", status: "Pending", date: "May 9, 2026" },
      { id: "SC-2026-005", name: "Antonio Reyes", barangay: "San Antonio", type: "Medical Assistance", amount: "₱6,000", status: "Approved", date: "May 8, 2026" }
    ],
    assistanceTypes: [
      { name: "Medical", value: 45, color: "#3B82F6" },
      { name: "Financial", value: 30, color: "#10B981" },
      { name: "Food Aid", value: 10, color: "#F59E0B" }
    ],
    monthlyTrend: [
      { month: "Jan", applications: 12 },
      { month: "Feb", applications: 18 },
      { month: "Mar", applications: 15 },
      { month: "Apr", applications: 22 },
      { month: "May", applications: 18 }
    ],
    staff: "sector-sc-001 (Jane Doe)",
    performance: "Excellent - 94% processing rate"
  },
  "PWD": {
    stats: {
      totalApplications: 54,
      pending: 4,
      recommended: 5,
      approved: 28,
      disbursed: 25,
      rejected: 2,
      totalFunds: "₱142,000",
      utilizationRate: 71
    },
    recentApplications: [
      { id: "PWD-2026-001", name: "Ana Martinez", barangay: "Pacol", type: "Assistive Device", amount: "₱8,000", status: "Recommended", date: "May 12, 2026" },
      { id: "PWD-2026-002", name: "Carlos Lopez", barangay: "Santa Cruz", type: "Medical Assistance", amount: "₱5,500", status: "Recommended", date: "May 11, 2026" },
      { id: "PWD-2026-003", name: "Linda Santos", barangay: "San Rafael", type: "Therapy Support", amount: "₱4,500", status: "Pending", date: "May 10, 2026" },
      { id: "PWD-2026-004", name: "Miguel Torres", barangay: "Malaking Ilog", type: "Assistive Device", amount: "₱7,000", status: "Approved", date: "May 9, 2026" },
      { id: "PWD-2026-005", name: "Sofia Ramirez", barangay: "San Antonio", type: "Medical Assistance", amount: "₱3,800", status: "Approved", date: "May 8, 2026" }
    ],
    assistanceTypes: [
      { name: "Medical", value: 25, color: "#3B82F6" },
      { name: "Assistive Devices", value: 20, color: "#10B981" },
      { name: "Therapy", value: 9, color: "#8B5CF6" }
    ],
    monthlyTrend: [
      { month: "Jan", applications: 8 },
      { month: "Feb", applications: 12 },
      { month: "Mar", applications: 11 },
      { month: "Apr", applications: 15 },
      { month: "May", applications: 8 }
    ],
    staff: "sector-pwd-001 (Mark Johnson)",
    performance: "Good - 89% processing rate"
  },
  "Solo Parent": {
    stats: {
      totalApplications: 42,
      pending: 3,
      recommended: 3,
      approved: 22,
      disbursed: 20,
      rejected: 1,
      totalFunds: "₱126,000",
      utilizationRate: 67
    },
    recentApplications: [
      { id: "SP-2026-001", name: "Elena Cruz", barangay: "Pacol", type: "Educational Assistance", amount: "₱4,000", status: "Recommended", date: "May 12, 2026" },
      { id: "SP-2026-002", name: "Roberto Aquino", barangay: "Santa Cruz", type: "Livelihood Support", amount: "₱6,000", status: "Recommended", date: "May 11, 2026" },
      { id: "SP-2026-003", name: "Diana Perez", barangay: "San Rafael", type: "Food Assistance", amount: "₱2,500", status: "Pending", date: "May 10, 2026" },
      { id: "SP-2026-004", name: "Ramon Silva", barangay: "Malaking Ilog", type: "Educational Assistance", amount: "₱4,500", status: "Approved", date: "May 9, 2026" },
      { id: "SP-2026-005", name: "Carmen Reyes", barangay: "San Antonio", type: "Livelihood Support", amount: "₱5,500", status: "Approved", date: "May 8, 2026" }
    ],
    assistanceTypes: [
      { name: "Educational", value: 18, color: "#3B82F6" },
      { name: "Livelihood", value: 15, color: "#10B981" },
      { name: "Food Aid", value: 9, color: "#F59E0B" }
    ],
    monthlyTrend: [
      { month: "Jan", applications: 6 },
      { month: "Feb", applications: 9 },
      { month: "Mar", applications: 8 },
      { month: "Apr", applications: 11 },
      { month: "May", applications: 8 }
    ],
    staff: "sector-sp-001 (Lisa Brown)",
    performance: "Good - 91% processing rate"
  },
  "Women": {
    stats: {
      totalApplications: 36,
      pending: 2,
      recommended: 1,
      approved: 15,
      disbursed: 14,
      rejected: 1,
      totalFunds: "₱108,000",
      utilizationRate: 67
    },
    recentApplications: [
      { id: "WOM-2026-001", name: "Isabella Santos", barangay: "Pacol", type: "Livelihood Training", amount: "₱5,000", status: "Recommended", date: "May 12, 2026" },
      { id: "WOM-2026-002", name: "Gabriela Cruz", barangay: "Santa Cruz", type: "Business Capital", amount: "₱8,000", status: "Pending", date: "May 11, 2026" },
      { id: "WOM-2026-003", name: "Patricia Lopez", barangay: "San Rafael", type: "Skills Training", amount: "₱3,500", status: "Pending", date: "May 10, 2026" },
      { id: "WOM-2026-004", name: "Angela Torres", barangay: "Malaking Ilog", type: "Livelihood Training", amount: "₱4,800", status: "Approved", date: "May 9, 2026" },
      { id: "WOM-2026-005", name: "Victoria Reyes", barangay: "San Antonio", type: "Business Capital", amount: "₱7,500", status: "Approved", date: "May 8, 2026" }
    ],
    assistanceTypes: [
      { name: "Livelihood", value: 15, color: "#3B82F6" },
      { name: "Business Capital", value: 12, color: "#10B981" },
      { name: "Skills Training", value: 9, color: "#EC4899" }
    ],
    monthlyTrend: [
      { month: "Jan", applications: 5 },
      { month: "Feb", applications: 8 },
      { month: "Mar", applications: 7 },
      { month: "Apr", applications: 9 },
      { month: "May", applications: 7 }
    ],
    staff: "sector-women-001 (Sarah Miller)",
    performance: "Excellent - 96% processing rate"
  },
  "Youth": {
    stats: {
      totalApplications: 31,
      pending: 1,
      recommended: 1,
      approved: 10,
      disbursed: 9,
      rejected: 0,
      totalFunds: "₱93,000",
      utilizationRate: 69
    },
    recentApplications: [
      { id: "YTH-2026-001", name: "Marco Dela Cruz", barangay: "Pacol", type: "Scholarship", amount: "₱6,000", status: "Recommended", date: "May 12, 2026" },
      { id: "YTH-2026-002", name: "Lucia Santos", barangay: "Santa Cruz", type: "Skills Development", amount: "₱4,500", status: "Pending", date: "May 11, 2026" },
      { id: "YTH-2026-003", name: "Diego Martinez", barangay: "San Rafael", type: "Sports Program", amount: "₱3,000", status: "Approved", date: "May 10, 2026" },
      { id: "YTH-2026-004", name: "Nina Lopez", barangay: "Malaking Ilog", type: "Scholarship", amount: "₱5,500", status: "Approved", date: "May 9, 2026" },
      { id: "YTH-2026-005", name: "Rafael Torres", barangay: "San Antonio", type: "Skills Development", amount: "₱4,000", status: "Approved", date: "May 8, 2026" }
    ],
    assistanceTypes: [
      { name: "Scholarship", value: 14, color: "#3B82F6" },
      { name: "Skills Dev", value: 10, color: "#10B981" },
      { name: "Sports", value: 7, color: "#F59E0B" }
    ],
    monthlyTrend: [
      { month: "Jan", applications: 4 },
      { month: "Feb", applications: 7 },
      { month: "Mar", applications: 6 },
      { month: "Apr", applications: 8 },
      { month: "May", applications: 6 }
    ],
    staff: "sector-youth-001 (David Chen)",
    performance: "Excellent - 100% processing rate"
  },
  "ECCD": {
    stats: {
      totalApplications: 28,
      pending: 2,
      recommended: 2,
      approved: 12,
      disbursed: 11,
      rejected: 1,
      totalFunds: "₱84,000",
      utilizationRate: 68
    },
    recentApplications: [
      { id: "ECCD-2026-001", name: "Baby Emma Cruz", barangay: "Pacol", type: "Nutrition Program", amount: "₱2,500", status: "Recommended", date: "May 12, 2026" },
      { id: "ECCD-2026-002", name: "Infant Lucas Santos", barangay: "Santa Cruz", type: "Health Check-up", amount: "₱1,800", status: "Recommended", date: "May 11, 2026" },
      { id: "ECCD-2026-003", name: "Toddler Mia Lopez", barangay: "San Rafael", type: "Daycare Support", amount: "₱3,200", status: "Pending", date: "May 10, 2026" },
      { id: "ECCD-2026-004", name: "Child Noah Reyes", barangay: "Malaking Ilog", type: "Nutrition Program", amount: "₱2,800", status: "Approved", date: "May 9, 2026" },
      { id: "ECCD-2026-005", name: "Baby Sophia Torres", barangay: "San Antonio", type: "Health Check-up", amount: "₱2,000", status: "Approved", date: "May 8, 2026" }
    ],
    assistanceTypes: [
      { name: "Nutrition", value: 12, color: "#3B82F6" },
      { name: "Health", value: 10, color: "#10B981" },
      { name: "Daycare", value: 6, color: "#F59E0B" }
    ],
    monthlyTrend: [
      { month: "Jan", applications: 4 },
      { month: "Feb", applications: 6 },
      { month: "Mar", applications: 5 },
      { month: "Apr", applications: 7 },
      { month: "May", applications: 6 }
    ],
    staff: "sector-eccd-001 (Maria Garcia)",
    performance: "Good - 92% processing rate"
  }
};

export default function SectorDetailsModal({ sector, isOpen, onClose }: SectorDetailsModalProps) {
  if (!isOpen) return null;

  const details = sectorDetails[sector];
  if (!details) return null;

  const { stats, recentApplications, assistanceTypes, monthlyTrend, staff, performance } = details;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{sector} Sector - Detailed Performance</h2>
            <p className="text-blue-100 text-sm mt-1">Comprehensive sector monitoring and analytics</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-600">Total Applications</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.totalApplications}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <p className="text-sm text-gray-600">Recommended</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.recommended}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">Approved</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Disbursed</p>
              <p className="text-xl font-bold text-gray-800">{stats.disbursed}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Rejected</p>
              <p className="text-xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Funds Released</p>
              <p className="text-xl font-bold text-gray-800">{stats.totalFunds}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Budget Utilization</p>
              <p className="text-xl font-bold text-green-600">{stats.utilizationRate}%</p>
            </div>
          </div>

          {/* Staff and Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium text-gray-700">Assigned Staff</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{staff}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="text-sm font-medium text-gray-700">Performance Rating</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{performance}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Application Trend */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Application Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Assistance Type Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Assistance Type Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={assistanceTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assistanceTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Applications</h3>
              <p className="text-sm text-gray-500 mt-1">Latest 5 applications in this sector</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barangay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{app.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{app.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{app.barangay}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{app.type}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{app.amount}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'Recommended' ? 'bg-purple-100 text-purple-800' :
                          app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
