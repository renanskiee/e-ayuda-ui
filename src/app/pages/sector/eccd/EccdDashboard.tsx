import { FileText, Clock, CheckCircle, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function EccdDashboard() {
  // Mock data for ECCD
  const totalApplications = 25;
  const pendingEvaluation = 8;
  const approved = 12;
  const rejected = 2;

  const totalBudget = 300000;
  const totalDisbursed = 120000;
  const remainingBudget = totalBudget - totalDisbursed;
  const fundsUtilized = ((totalDisbursed / totalBudget) * 100).toFixed(1);

  const applicationsByBarangay = [
    { barangay: 'Pacol', applications: 6 },
    { barangay: 'Santa Cruz', applications: 5 },
    { barangay: 'San Rafael', applications: 4 },
    { barangay: 'San Antonio', applications: 5 },
    { barangay: 'Malaking Ilog', applications: 5 },
  ];

  const monthlyApplications = [
    { month: 'January', applications: 4 },
    { month: 'February', applications: 5 },
    { month: 'March', applications: 8 },
    { month: 'April', applications: 6 },
    { month: 'May', applications: 5 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">ECCD Sector Dashboard</h1>
        <p className="text-gray-500 mt-1">Early Childhood Care and Development sector overview and application management</p>
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
          <Link to="/sector/eccd/applications" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
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
          <Link to="/sector/eccd/evaluation" className="text-sm text-yellow-600 hover:text-yellow-800 mt-2 inline-block">
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
          <Link to="/sector/eccd/approved" className="text-sm text-green-600 hover:text-green-800 mt-2 inline-block">
            View list →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Beneficiaries</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{approved + 8}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
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
          <Link to="/sector/eccd/funds" className="text-sm text-purple-100 hover:text-white mt-2 inline-block">
            View details →
          </Link>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
}
