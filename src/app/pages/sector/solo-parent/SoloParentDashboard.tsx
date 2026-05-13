import { FileText, Clock, CheckCircle, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const receivedApplications = [
  {
    id: "SP-301",
    applicantName: "Ana Ramirez",
    barangay: "Pacol",
    numberOfChildren: 2,
    assistanceType: "Educational Assistance",
    submissionDate: "Mar 12 2026",
    status: "Pending"
  },
  {
    id: "SP-302",
    applicantName: "Grace Villanueva",
    barangay: "Santa Cruz",
    numberOfChildren: 3,
    assistanceType: "Financial Assistance",
    submissionDate: "Mar 11 2026",
    status: "Pending"
  },
  {
    id: "SP-303",
    applicantName: "Carla Mendoza",
    barangay: "San Rafael",
    numberOfChildren: 1,
    assistanceType: "Medical Assistance",
    submissionDate: "Mar 10 2026",
    status: "Pending"
  },
  {
    id: "SP-304",
    applicantName: "Rosa Santos",
    barangay: "San Antonio",
    numberOfChildren: 2,
    assistanceType: "Educational Assistance",
    submissionDate: "Mar 9 2026",
    status: "Pending"
  },
  {
    id: "SP-305",
    applicantName: "Linda Cruz",
    barangay: "Malaking Ilog",
    numberOfChildren: 1,
    assistanceType: "Financial Assistance",
    submissionDate: "Mar 8 2026",
    status: "Pending"
  }
];

const applicationsByBarangay = [
  { barangay: 'Pacol', applications: 12 },
  { barangay: 'Santa Cruz', applications: 9 },
  { barangay: 'San Rafael', applications: 8 },
  { barangay: 'San Antonio', applications: 7 },
  { barangay: 'Malaking Ilog', applications: 6 }
];

const monthlyApplications = [
  { month: 'January', applications: 8 },
  { month: 'February', applications: 9 },
  { month: 'March', applications: 11 },
  { month: 'April', applications: 7 },
  { month: 'May', applications: 7 }
];

export default function SoloParentDashboard() {
  const fundsUtilized = 67;
  const totalBudget = 200000;
  const totalDisbursed = 134500;
  const remainingBudget = 65500;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Solo Parent Sector Dashboard</h1>
        <p className="text-gray-500 mt-1">Solo parent sector overview and application management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Applications Received</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">42</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Evaluation</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">5</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved Beneficiaries</p>
              <p className="text-3xl font-bold text-green-600 mt-2">34</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected Applications</p>
              <p className="text-3xl font-bold text-red-600 mt-2">3</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Fund Monitoring Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Sector Fund Transparency</h2>
            <p className="text-sm text-gray-500">Budget allocation and utilization</p>
          </div>
          <Link 
            to="/sector/solo-parent/funds"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            View Fund Transactions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Sector Budget</p>
            <p className="text-2xl font-bold text-gray-800">₱{totalBudget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Disbursed</p>
            <p className="text-2xl font-bold text-green-600">₱{totalDisbursed.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Remaining Budget</p>
            <p className="text-2xl font-bold text-blue-600">₱{remainingBudget.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Funds Utilized</p>
            <p className="text-sm font-semibold text-purple-600">{fundsUtilized}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${fundsUtilized}%` }}
            />
          </div>
        </div>
      </div>

      {/* Application Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Applications by Barangay */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Applications by Barangay</h2>
              <p className="text-sm text-gray-500">Distribution across barangays</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsByBarangay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="barangay" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Assistance Requests */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Monthly Assistance Requests</h2>
              <p className="text-sm text-gray-500">Application trends over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Received Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Received Applications</h2>
          <p className="text-sm text-gray-500 mt-1">Recent applications pending evaluation</p>
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
                  Number of Children
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receivedApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.numberOfChildren}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.submissionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Link to="/sector/solo-parent/applications" className="text-blue-600 hover:text-blue-800 font-medium">
                      View
                    </Link>
                    <Link to="/sector/solo-parent/evaluation" className="text-green-600 hover:text-green-800 font-medium">
                      Evaluate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 5 of 42 applications</p>
          <Link 
            to="/sector/solo-parent/applications"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Applications →
          </Link>
        </div>
      </div>
    </div>
  );
}
