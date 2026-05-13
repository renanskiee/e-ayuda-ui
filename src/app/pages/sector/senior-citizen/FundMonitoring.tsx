import { DollarSign, TrendingUp, TrendingDown, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const budgetAllocation = {
  totalBudget: 2500000,
  allocated: 2100000,
  disbursed: 1850000,
  remaining: 650000,
  pending: 250000
};

const programBreakdown = [
  { name: 'Monthly Pension', amount: 1200000, disbursed: 1050000, color: '#3b82f6' },
  { name: 'Medical Assistance', amount: 600000, disbursed: 480000, color: '#10b981' },
  { name: 'Burial Assistance', amount: 200000, disbursed: 180000, color: '#f59e0b' },
  { name: 'Emergency Aid', amount: 100000, disbursed: 70000, color: '#ef4444' },
  { name: 'Social Pension', amount: 400000, disbursed: 320000, color: '#8b5cf6' }
];

const monthlyDisbursement = [
  { month: 'January', amount: 285000 },
  { month: 'February', amount: 310000 },
  { month: 'March', amount: 295000 },
  { month: 'April', amount: 320000 },
  { month: 'May', amount: 640000 }
];

export default function FundMonitoring() {
  const utilizationRate = ((budgetAllocation.disbursed / budgetAllocation.totalBudget) * 100).toFixed(1);
  const pieData = programBreakdown.map(p => ({ name: p.name, value: p.disbursed }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Senior Citizen Fund Monitoring</h1>
        <p className="text-gray-500 mt-1">Budget allocation, utilization, and financial tracking</p>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Total Budget (2026)</h3>
            <DollarSign className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-3xl font-bold">₱{(budgetAllocation.totalBudget / 1000000).toFixed(1)}M</p>
          <p className="text-xs opacity-75 mt-1">Annual Allocation</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Disbursed</h3>
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-3xl font-bold">₱{(budgetAllocation.disbursed / 1000000).toFixed(2)}M</p>
          <p className="text-xs opacity-75 mt-1">{utilizationRate}% Utilized</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Remaining</h3>
            <TrendingDown className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-3xl font-bold">₱{(budgetAllocation.remaining / 1000).toFixed(0)}K</p>
          <p className="text-xs opacity-75 mt-1">Available Balance</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Pending</h3>
            <Calendar className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-3xl font-bold">₱{(budgetAllocation.pending / 1000).toFixed(0)}K</p>
          <p className="text-xs opacity-75 mt-1">For Processing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Program Budget Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Program Budget Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ₱${(entry.value / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={programBreakdown[index].color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Program Breakdown Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Program-wise Utilization</h2>
          <div className="space-y-4">
            {programBreakdown.map((program, index) => {
              const utilizationPercent = ((program.disbursed / program.amount) * 100).toFixed(1);
              return (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{program.name}</span>
                    <span className="text-sm text-gray-600">{utilizationPercent}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Allocated: ₱{program.amount.toLocaleString()}</span>
                    <span>Disbursed: ₱{program.disbursed.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${utilizationPercent}%`,
                        backgroundColor: program.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Disbursement Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Monthly Disbursement Trend (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Disbursed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiaries Served</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyDisbursement.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                    ₱{record.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.floor(record.amount / 5000)} persons
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Completed
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
