import { Users, Briefcase, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const beneficiariesBySector = [
  { sector: 'Senior Citizen', beneficiaries: 150, color: '#3b82f6' },
  { sector: 'PWD', beneficiaries: 92, color: '#10b981' },
  { sector: 'Solo Parent', beneficiaries: 78, color: '#f59e0b' },
  { sector: 'Women', beneficiaries: 64, color: '#ec4899' },
  { sector: 'Youth / Children', beneficiaries: 73, color: '#8b5cf6' },
  { sector: 'Disaster-Affected', beneficiaries: 55, color: '#ef4444' }
];

const budgetBySector = [
  { sector: 'Senior Citizen', budget: 300000 },
  { sector: 'PWD', budget: 250000 },
  { sector: 'Solo Parent', budget: 200000 },
  { sector: 'Women', budget: 180000 },
  { sector: 'Youth / Children', budget: 160000 },
  { sector: 'Disaster-Affected', budget: 220000 }
];

const monthlyAssistance = [
  { month: 'January', amount: 180000 },
  { month: 'February', amount: 210000 },
  { month: 'March', amount: 230000 },
  { month: 'April', amount: 205000 },
  { month: 'May', amount: 220000 }
];

export default function SectorialDashboard() {
  const totalBeneficiaries = 512;
  const totalPrograms = 8;
  const duplicateRecords = 14;
  const totalBudget = 1500000;
  const disbursed = 1045000;
  const remaining = 455000;
  const utilizationRate = Math.round((disbursed / totalBudget) * 100);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sectorial Database & Program Creation Management</h1>
        <p className="text-gray-500 mt-1">Centralized beneficiary management, program creation, and budget allocation</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Registered Beneficiaries</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalBeneficiaries}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Active Programs</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalPrograms}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Potential Duplicate Records</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{duplicateRecords}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Budget Allocated</p>
              <p className="text-3xl font-bold mt-2">₱{totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Budget Disbursed</p>
              <p className="text-3xl font-bold mt-2">₱{disbursed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Remaining Municipal Budget</p>
              <p className="text-3xl font-bold mt-2">₱{remaining.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Utilization Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Budget Utilization</h3>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">₱{disbursed.toLocaleString()} of ₱{totalBudget.toLocaleString()}</p>
            <p className="text-sm font-semibold text-blue-600">{utilizationRate}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500" style={{ width: `${utilizationRate}%` }} />
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Beneficiaries by Sector */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Beneficiaries by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={beneficiariesBySector} cx="50%" cy="50%" labelLine={false} label={({ sector, beneficiaries }) => `${sector}: ${beneficiaries}`} outerRadius={100} fill="#8884d8" dataKey="beneficiaries">
                {beneficiariesBySector.map((entry) => (
                  <Cell key={`sectorial-beneficiary-${entry.sector}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Budget by Sector */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Allocation by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetBySector}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Bar dataKey="budget" fill="#3b82f6" name="Budget (₱)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Assistance Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Assistance Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyAssistance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} name="Amount Distributed (₱)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/sectorial/beneficiaries" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Central Database</h3>
          </div>
          <p className="text-sm text-gray-500">View all beneficiaries across sectors</p>
        </Link>

        <Link to="/sectorial/duplicates" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Duplicate Detection</h3>
          </div>
          <p className="text-sm text-gray-500">Review {duplicateRecords} potential duplicates</p>
        </Link>

        <Link to="/sectorial/program-creation" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Create Program</h3>
          </div>
          <p className="text-sm text-gray-500">Design new assistance programs</p>
        </Link>

        <Link to="/sectorial/budget" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Budget Allocation</h3>
          </div>
          <p className="text-sm text-gray-500">Monitor sector budget status</p>
        </Link>
      </div>
    </div>
  );
}
