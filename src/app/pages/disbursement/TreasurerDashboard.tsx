import { DollarSign, TrendingDown, TrendingUp, Users, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const programUtilization = [
  { program: 'Senior Citizen Medical Aid', sector: 'Senior Citizen', allocated: 300000, used: 214500, remaining: 85500, rate: 72 },
  { program: 'PWD Medical Support', sector: 'PWD', allocated: 250000, used: 178000, remaining: 72000, rate: 71 },
  { program: 'Solo Parent Educational Aid', sector: 'Solo Parent', allocated: 200000, used: 134500, remaining: 65500, rate: 67 },
  { program: 'Women Livelihood Assistance', sector: 'Women', allocated: 180000, used: 120500, remaining: 59500, rate: 67 },
  { program: 'Youth Educational Assistance', sector: 'Youth / Children', allocated: 160000, used: 110000, remaining: 50000, rate: 69 },
  { program: 'Disaster Emergency Relief', sector: 'Disaster-Affected Families', allocated: 220000, used: 150000, remaining: 70000, rate: 68 }
];

const monthlyDisbursement = [
  { month: 'January', amount: 180000 },
  { month: 'February', amount: 210000 },
  { month: 'March', amount: 245000 },
  { month: 'April', amount: 320000 },
  { month: 'May', amount: 290000 }
];

export default function TreasurerDashboard() {
  const totalFundsReleased = 1245000;
  const remainingBudget = 255000;
  const totalBeneficiariesPaid = 142;
  const pendingTransactions = 48;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Municipal Treasurer Dashboard</h1>
        <p className="text-gray-500 mt-1">Financial disbursement monitoring and fund utilization overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Funds Released</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₱{(totalFundsReleased / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">83% of total allocation</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">₱{(remainingBudget / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">17% available</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Beneficiaries Paid</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalBeneficiariesPaid}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">72.4% completion rate</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Transactions</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingTransactions}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">Awaiting processing</p>
          </div>
        </div>
      </div>

      {/* Monthly Disbursement Trend */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Monthly Disbursement Trend</h2>
            <p className="text-sm text-gray-500">Fund release pattern over time</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyDisbursement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" name="Disbursed Amount (₱)">
              {monthlyDisbursement.map((entry, index) => (
                <Cell key={`treasurer-bar-month-${entry.month}-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Program Fund Utilization */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Program Fund Utilization</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed budget allocation and utilization by program</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funds Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programUtilization.map((program, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{program.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      program.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                      program.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                      program.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                      program.sector === 'Women' ? 'bg-pink-100 text-pink-800' :
                      program.sector === 'Youth / Children' ? 'bg-yellow-100 text-yellow-800' :
                      program.sector === 'Disaster-Affected Families' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {program.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₱{program.allocated.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₱{program.used.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₱{program.remaining.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div
                          className={`h-2 rounded-full ${
                            program.rate >= 75 ? 'bg-green-600' :
                            program.rate >= 50 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${program.rate}%` }}
                        />
                      </div>
                      <span className="font-semibold text-gray-700 min-w-[3rem]">{program.rate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      program.rate >= 75 ? 'bg-green-100 text-green-800' :
                      program.rate >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {program.rate >= 75 ? 'High Utilization' :
                       program.rate >= 50 ? 'Moderate Utilization' :
                       'Low Utilization'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td colSpan={2} className="px-6 py-4 text-sm font-bold text-gray-900">TOTAL</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  ₱{programUtilization.reduce((sum, p) => sum + p.allocated, 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ₱{programUtilization.reduce((sum, p) => sum + p.used, 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                  ₱{programUtilization.reduce((sum, p) => sum + p.remaining, 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {Math.round((programUtilization.reduce((sum, p) => sum + p.used, 0) / programUtilization.reduce((sum, p) => sum + p.allocated, 0)) * 100)}%
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
