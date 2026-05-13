import { DollarSign, TrendingDown, TrendingUp, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

const budgetData = {
  totalBudget: 1800000,
  allocated: 1550000,
  disbursed: 1280000,
  pending: 270000,
  remaining: 520000
};

const allocationByType = [
  { type: 'Assistive Devices', amount: 650000, color: '#3B82F6' },
  { type: 'Medical Assistance', amount: 450000, color: '#10B981' },
  { type: 'Therapy Support', amount: 250000, color: '#F59E0B' },
  { type: 'Livelihood Aid', amount: 200000, color: '#8B5CF6' },
];

const monthlyDisbursement = [
  { month: 'January', amount: 195000 },
  { month: 'February', amount: 220000 },
  { month: 'March', amount: 245000 },
  { month: 'April', amount: 280000 },
  { month: 'May', amount: 340000 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export default function FundMonitoring() {
  const utilizationRate = ((budgetData.disbursed / budgetData.totalBudget) * 100).toFixed(1);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Fund Monitoring</h1>
        <p className="text-gray-500 mt-1">Track budget allocation and disbursement for PWD assistance</p>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">₱{budgetData.totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Disbursed</p>
              <p className="text-2xl font-bold text-green-600 mt-2">₱{budgetData.disbursed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{utilizationRate}% utilized</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Disbursement</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">₱{budgetData.pending.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">₱{budgetData.remaining.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Allocation by Type */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Allocation by Assistance Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={allocationByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({type, percent}) => `${type} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {allocationByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `₱${value.toLocaleString()}`} />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Disbursement */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Disbursement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyDisbursement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => `₱${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="amount" fill="#3B82F6" name="Disbursed Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Allocation Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Allocation Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocated Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disbursed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilization
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allocationByType.map((item, index) => {
                const disbursed = item.amount * 0.6; // Mock 60% disbursed
                const remaining = item.amount - disbursed;
                const utilization = ((disbursed / item.amount) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                        {item.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{item.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{disbursed.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{remaining.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${utilization}%`}}
                          ></div>
                        </div>
                        <span className="text-gray-600 font-medium">{utilization}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
