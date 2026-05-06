import { FileText, Clock, CheckCircle, XCircle, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { pwdApplications } from '../../../data/sectorData';

export default function PwdDashboard() {
  // Calculate statistics from actual data
  const totalApplications = pwdApplications.length;
  const pendingEvaluation = pwdApplications.filter(app => app.status === 'Pending' || app.status === 'Under Review').length;
  const approved = Math.floor(totalApplications * 0.4); // Mock 40% approval rate
  const rejected = Math.floor(totalApplications * 0.1); // Mock 10% rejection rate

  // Budget data
  const totalBudget = 500000;
  const totalDisbursed = 178000;
  const remainingBudget = totalBudget - totalDisbursed;
  const fundsUtilized = ((totalDisbursed / totalBudget) * 100).toFixed(1);

  // Applications by barangay
  const barangayCounts: Record<string, number> = {};
  pwdApplications.forEach(app => {
    barangayCounts[app.barangay] = (barangayCounts[app.barangay] || 0) + 1;
  });
  const applicationsByBarangay = Object.entries(barangayCounts)
    .map(([barangay, applications], index) => ({ id: `brgy-${index}`, barangay, applications }))
    .slice(0, 5);

  // Monthly applications trend
  const monthlyApplications = [
    { id: 'month-jan', month: 'January', applications: 8 },
    { id: 'month-feb', month: 'February', applications: 11 },
    { id: 'month-mar', month: 'March', applications: 15 },
    { id: 'month-apr', month: 'April', applications: 12 },
    { id: 'month-may', month: 'May', applications: 10 },
  ];

  // Recent applications
  const recentApplications = pwdApplications.slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">PWD Sector Dashboard</h1>
        <p className="text-gray-500 mt-1">Persons with Disabilities sector overview and application management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Applications Received</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <Link to="/sector/pwd/applications" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
            View all →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Evaluation</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingEvaluation}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <Link to="/sector/pwd/evaluation" className="text-sm text-yellow-600 hover:text-yellow-800 mt-2 inline-block">
            Go to queue →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved Beneficiaries</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <Link to="/sector/pwd/approved" className="text-sm text-green-600 hover:text-green-800 mt-2 inline-block">
            View list →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected Applications</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Total Budget</p>
              <p className="text-3xl font-bold mt-2">₱{totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Total Disbursed</p>
              <p className="text-3xl font-bold mt-2">₱{totalDisbursed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-green-100 mt-2">{fundsUtilized}% utilized</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">Remaining Budget</p>
              <p className="text-3xl font-bold mt-2">₱{remainingBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <Link to="/sector/pwd/funds" className="text-sm text-purple-100 hover:text-white mt-2 inline-block">
            View details →
          </Link>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Applications by Barangay */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications by Barangay</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsByBarangay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="barangay" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Application Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={2} name="Applications" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Recent Applications</h3>
            <Link to="/sector/pwd/applications" className="text-sm text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disability Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.disabilityType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱{application.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status}
                    </span>
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