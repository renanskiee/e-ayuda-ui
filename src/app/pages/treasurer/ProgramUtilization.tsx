export default function ProgramUtilization() {
  const programs = [
    {
      name: 'Senior Citizen Medical Aid',
      sector: 'Senior Citizen',
      allocated: 300000,
      used: 214500,
      remaining: 85500,
      utilization: 72
    },
    {
      name: 'PWD Medical Support',
      sector: 'PWD',
      allocated: 250000,
      used: 178000,
      remaining: 72000,
      utilization: 71
    },
    {
      name: 'Solo Parent Educational Support',
      sector: 'Solo Parent',
      allocated: 200000,
      used: 156000,
      remaining: 44000,
      utilization: 78
    },
    {
      name: 'Women Empowerment Program',
      sector: 'Women',
      allocated: 150000,
      used: 118000,
      remaining: 32000,
      utilization: 79
    },
    {
      name: 'Youth Development Program',
      sector: 'Youth',
      allocated: 100000,
      used: 76000,
      remaining: 24000,
      utilization: 76
    },
    {
      name: 'ECCD Support',
      sector: 'ECCD',
      allocated: 50000,
      used: 35000,
      remaining: 15000,
      utilization: 70
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Program Utilization</h1>
        <p className="text-gray-500 mt-1">Monitor budget allocation and utilization across all programs</p>
      </div>

      {/* Program Utilization Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocated Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funds Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilization Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programs.map((program, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {program.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {program.sector}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    ₱{program.allocated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    ₱{program.used.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                    ₱{program.remaining.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 mr-2">{program.utilization}%</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${
                            program.utilization >= 75 ? 'bg-green-600' :
                            program.utilization >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${program.utilization}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-sm font-medium text-blue-600 mb-1">Total Allocated</p>
          <p className="text-2xl font-bold text-blue-700">
            ₱{programs.reduce((sum, p) => sum + p.allocated, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <p className="text-sm font-medium text-green-600 mb-1">Total Used</p>
          <p className="text-2xl font-bold text-green-700">
            ₱{programs.reduce((sum, p) => sum + p.used, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-sm font-medium text-purple-600 mb-1">Total Remaining</p>
          <p className="text-2xl font-bold text-purple-700">
            ₱{programs.reduce((sum, p) => sum + p.remaining, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
