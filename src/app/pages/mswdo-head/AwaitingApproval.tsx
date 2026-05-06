import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const awaitingApplications = [
  {
    id: "AICS-2026-101",
    applicantName: "Juan Dela Cruz",
    barangay: "Pacol",
    sector: "Senior Citizen",
    assistanceType: "Financial Assistance",
    recommendedBy: "Senior Citizen Sector Staff",
    amount: "₱5,000",
    dateEvaluated: "March 12, 2026"
  },
  {
    id: "AICS-2026-102",
    applicantName: "Maria Santos",
    barangay: "Santa Cruz",
    sector: "PWD",
    assistanceType: "Medical Assistance",
    recommendedBy: "PWD Sector Staff",
    amount: "₱3,500",
    dateEvaluated: "March 11, 2026"
  },
  {
    id: "AICS-2026-103",
    applicantName: "Ana Ramirez",
    barangay: "San Rafael",
    sector: "Solo Parent",
    assistanceType: "Educational Assistance",
    recommendedBy: "Solo Parent Sector Staff",
    amount: "₱4,000",
    dateEvaluated: "March 10, 2026"
  }
];

export default function AwaitingApproval() {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Applications Awaiting Final Approval</h1>
        <p className="text-gray-500 mt-1">Review and approve applications recommended by sector staff</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Awaiting Approval</h3>
          <p className="text-3xl font-bold text-purple-600">28</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Approved Today</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Amount</h3>
          <p className="text-3xl font-bold text-blue-600">₱120K</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Sector</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              <option value="senior">Senior Citizen</option>
              <option value="pwd">PWD</option>
              <option value="solo-parent">Solo Parent</option>
              <option value="women">Women</option>
              <option value="youth">Youth</option>
              <option value="disaster">Disaster Affected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <input
              type="text"
              placeholder="Enter applicant name..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pending Approval Queue</h2>
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
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Evaluated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {awaitingApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                      app.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                      app.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                      app.sector === 'Women' ? 'bg-pink-100 text-pink-800' :
                      app.sector === 'Youth' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {app.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.dateEvaluated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}