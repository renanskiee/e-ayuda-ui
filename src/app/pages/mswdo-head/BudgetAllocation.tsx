import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const budgetData = [
  {
    sector: 'Senior Citizen',
    allocated: 300000,
    used: 214500,
    remaining: 85500,
    utilization: 72
  },
  {
    sector: 'PWD',
    allocated: 250000,
    used: 178000,
    remaining: 72000,
    utilization: 71
  },
  {
    sector: 'Solo Parent',
    allocated: 200000,
    used: 134500,
    remaining: 65500,
    utilization: 67
  },
  {
    sector: 'Women',
    allocated: 180000,
    used: 120500,
    remaining: 59500,
    utilization: 67
  },
  {
    sector: 'Youth / Children',
    allocated: 160000,
    used: 110000,
    remaining: 50000,
    utilization: 69
  },
  {
    sector: 'Disaster Sector',
    allocated: 220000,
    used: 150000,
    remaining: 70000,
    utilization: 68
  }
];

const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
const totalUsed = budgetData.reduce((sum, item) => sum + item.used, 0);
const totalRemaining = budgetData.reduce((sum, item) => sum + item.remaining, 0);
const overallUtilization = Math.round((totalUsed / totalAllocated) * 100);

export default function BudgetAllocation() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Budget Allocation</h1>
        <p className="text-gray-500 mt-1">Monitor and manage municipal budget distribution across sectors</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500">Total Allocated Budget</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">₱{totalAllocated.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500">Total Used Budget</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">₱{totalUsed.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500">Total Remaining</p>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">₱{totalRemaining.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500">Overall Utilization</p>
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xs font-bold text-green-600">%</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{overallUtilization}%</p>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-green-800">No Critical Budget Alerts</p>
          <p className="text-xs text-green-700 mt-1">All sectors within acceptable utilization range</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-800">6 Sectors Currently Active</p>
          <p className="text-xs text-blue-700 mt-1">All programs operational and funded</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-purple-800">Overall Municipal Utilization: {overallUtilization}%</p>
          <p className="text-xs text-purple-700 mt-1">Stable and balanced budget distribution</p>
        </div>
      </div>

      {/* Budget Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Sector Budget Breakdown</h2>
          <p className="text-sm text-gray-500 mt-1">Transparent monitoring of budget allocation and utilization</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocated Budget
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Used Budget
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining Budget
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilization Rate
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    ₱{item.allocated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    ₱{item.used.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-green-600">
                    ₱{item.remaining.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900 mb-1">{item.utilization}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.utilization}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Stable
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                  ₱{totalAllocated.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                  ₱{totalUsed.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600">
                  ₱{totalRemaining.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-bold text-gray-900">{overallUtilization}%</span>
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
