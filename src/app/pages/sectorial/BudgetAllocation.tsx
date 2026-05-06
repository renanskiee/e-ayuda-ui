import { DollarSign, TrendingUp } from 'lucide-react';

const sectorBudgets = [
  { sector: "Senior Citizen", allocated: 300000, used: 214500, remaining: 85500, utilization: 72, color: "blue" },
  { sector: "PWD", allocated: 250000, used: 178000, remaining: 72000, utilization: 71, color: "green" },
  { sector: "Solo Parent", allocated: 200000, used: 134500, remaining: 65500, utilization: 67, color: "orange" },
  { sector: "Women", allocated: 180000, used: 120500, remaining: 59500, utilization: 67, color: "pink" },
  { sector: "Youth / Children", allocated: 160000, used: 110000, remaining: 50000, utilization: 69, color: "purple" },
  { sector: "Disaster-Affected Families", allocated: 220000, used: 150000, remaining: 70000, utilization: 68, color: "red" }
];

export default function BudgetAllocation() {
  const totalAllocated = sectorBudgets.reduce((sum, s) => sum + s.allocated, 0);
  const totalUsed = sectorBudgets.reduce((sum, s) => sum + s.used, 0);
  const totalRemaining = sectorBudgets.reduce((sum, s) => sum + s.remaining, 0);
  const overallUtilization = Math.round((totalUsed / totalAllocated) * 100);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Budget Allocation</h1>
        <p className="text-gray-500 mt-1">Transparent budget monitoring across all sectors</p>
      </div>

      {/* Overall Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm">Total Allocated</p>
            <DollarSign className="w-5 h-5 text-white/70" />
          </div>
          <p className="text-3xl font-bold">₱{totalAllocated.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100 text-sm">Total Used</p>
            <TrendingUp className="w-5 h-5 text-white/70" />
          </div>
          <p className="text-3xl font-bold">₱{totalUsed.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100 text-sm">Total Remaining</p>
            <DollarSign className="w-5 h-5 text-white/70" />
          </div>
          <p className="text-3xl font-bold">₱{totalRemaining.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm">Overall Utilization</p>
            <TrendingUp className="w-5 h-5 text-white/70" />
          </div>
          <p className="text-3xl font-bold">{overallUtilization}%</p>
        </div>
      </div>

      {/* Sector Budget Details */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Budget by Sector</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed budget allocation and utilization per sector</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectorBudgets.map((budget) => {
                const colorClasses = {
                  blue: 'from-blue-500 to-blue-600',
                  green: 'from-green-500 to-green-600',
                  orange: 'from-orange-500 to-orange-600',
                  pink: 'from-pink-500 to-pink-600',
                  purple: 'from-purple-500 to-purple-600',
                  red: 'from-red-500 to-red-600'
                };
                const colorClass = colorClasses[budget.color as keyof typeof colorClasses];

                return (
                  <tr key={budget.sector} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{budget.sector}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₱{budget.allocated.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₱{budget.used.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₱{budget.remaining.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{budget.utilization}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className={`bg-gradient-to-r ${colorClass} h-3 rounded-full transition-all duration-500`} style={{ width: `${budget.utilization}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">Municipal Budget Transparency</p>
              <p className="text-xs text-gray-500 mt-1">All budget allocations are monitored and publicly accessible</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Export Budget Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
