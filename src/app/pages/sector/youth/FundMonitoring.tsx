import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyDisbursement = [
  { month: 'January', amount: 22000 },
  { month: 'February', amount: 18000 },
  { month: 'March', amount: 26000 },
  { month: 'April', amount: 24000 },
  { month: 'May', amount: 20000 }
];

const assistanceTypeDistribution = [
  { name: 'Educational', value: 68000, color: '#3b82f6' },
  { name: 'Scholarship', value: 28000, color: '#10b981' },
  { name: 'School Supplies', value: 14000, color: '#f59e0b' }
];

const recentTransactions = [
  { id: "TRX-901", beneficiary: "Mark Dela Cruz", barangay: "Pacol", type: "Educational Assistance", amount: 4000, date: "Mar 13 2026" },
  { id: "TRX-902", beneficiary: "Jenny Santos", barangay: "Santa Cruz", type: "Scholarship Support", amount: 3000, date: "Mar 11 2026" },
  { id: "TRX-903", beneficiary: "Ryan Flores", barangay: "San Rafael", type: "Educational Assistance", amount: 3500, date: "Mar 9 2026" }
];

export default function FundMonitoring() {
  const totalBudget = 160000;
  const totalDisbursed = 110000;
  const remainingBudget = 50000;
  const fundsUtilized = 69;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Fund Monitoring</h1>
        <p className="text-gray-500 mt-1">Track and monitor youth sector budget allocation and utilization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-500">Total Budget</p><p className="text-2xl font-bold text-gray-800 mt-2">₱{totalBudget.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Wallet className="w-6 h-6 text-purple-600" /></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-500">Total Disbursed</p><p className="text-2xl font-bold text-green-600 mt-2">₱{totalDisbursed.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><TrendingUp className="w-6 h-6 text-green-600" /></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-500">Remaining Budget</p><p className="text-2xl font-bold text-blue-600 mt-2">₱{remainingBudget.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><TrendingDown className="w-6 h-6 text-blue-600" /></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-500">Utilization Rate</p><p className="text-2xl font-bold text-purple-600 mt-2">{fundsUtilized}%</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><DollarSign className="w-6 h-6 text-purple-600" /></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Utilization</h3>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">₱{totalDisbursed.toLocaleString()} of ₱{totalBudget.toLocaleString()}</p>
            <p className="text-sm font-semibold text-purple-600">{fundsUtilized}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-500" style={{ width: `${fundsUtilized}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Disbursement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyDisbursement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="amount" fill="#8b5cf6" name="Disbursed Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Funds by Assistance Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={assistanceTypeDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                {assistanceTypeDistribution.map((entry) => (
                  <Cell key={`youth-assistance-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Fund Transactions</h3>
          <p className="text-sm text-gray-500 mt-1">Latest disbursements from sector budget</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.beneficiary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₱{transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
