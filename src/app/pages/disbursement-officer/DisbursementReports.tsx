import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign, Users, FileText } from 'lucide-react';
import { useState } from 'react';

export default function DisbursementReports() {
  const [reportType, setReportType] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');

  // Daily disbursement data
  const dailyDisbursementData = [
    { date: 'Mar 8', amount: 45000, beneficiaries: 12 },
    { date: 'Mar 9', amount: 52000, beneficiaries: 15 },
    { date: 'Mar 10', amount: 38000, beneficiaries: 10 },
    { date: 'Mar 11', amount: 61000, beneficiaries: 18 },
    { date: 'Mar 12', amount: 47000, beneficiaries: 14 },
    { date: 'Mar 13', amount: 55000, beneficiaries: 16 },
    { date: 'Mar 14', amount: 63000, beneficiaries: 19 }
  ];

  // Sector distribution data
  const sectorData = [
    { name: 'Senior Citizen', value: 35, amount: 175000 },
    { name: 'PWD', value: 25, amount: 187500 },
    { name: 'Solo Parent', value: 20, amount: 140000 },
    { name: 'Women', value: 12, amount: 84000 },
    { name: 'Youth', value: 8, amount: 56000 }
  ];

  // Monthly comparison data
  const monthlyData = [
    { month: 'Oct', amount: 850000, beneficiaries: 245 },
    { month: 'Nov', amount: 920000, beneficiaries: 268 },
    { month: 'Dec', amount: 1050000, beneficiaries: 295 },
    { month: 'Jan', amount: 780000, beneficiaries: 225 },
    { month: 'Feb', amount: 890000, beneficiaries: 255 },
    { month: 'Mar', amount: 642500, beneficiaries: 104 }
  ];

  // Barangay-wise disbursement
  const barangayData = [
    { barangay: 'Pacol', amount: 125000, count: 18 },
    { barangay: 'Santa Cruz', amount: 98000, count: 15 },
    { barangay: 'San Rafael', amount: 87500, count: 12 },
    { barangay: 'San Antonio', amount: 76000, count: 11 },
    { barangay: 'Poblacion', amount: 65000, count: 9 },
    { barangay: 'Others', amount: 191000, count: 39 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const totalDisbursed = dailyDisbursementData.reduce((sum, item) => sum + item.amount, 0);
  const totalBeneficiaries = dailyDisbursementData.reduce((sum, item) => sum + item.beneficiaries, 0);
  const avgDisbursement = Math.round(totalDisbursed / totalBeneficiaries);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Disbursement Reports</h1>
        <p className="text-gray-500 mt-1">Analytics and reports for disbursement operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Disbursed (Week)</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">₱{totalDisbursed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% from last week
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beneficiaries Served</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{totalBeneficiaries}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8% from last week
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Per Beneficiary</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">₱{avgDisbursement.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Across all sectors</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Transactions</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">{totalBeneficiaries}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">This week</p>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily Report</option>
                <option value="weekly">Weekly Report</option>
                <option value="monthly">Monthly Report</option>
                <option value="sector">Sector Analysis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Period
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Disbursement Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Disbursement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyDisbursementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: any) => ['₱' + value.toLocaleString(), 'Amount']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Disbursed Amount"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Disbursement by Sector</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [value + '%', 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: any) => ['₱' + value.toLocaleString(), 'Amount']}
              />
              <Legend />
              <Bar dataKey="amount" fill="#10b981" name="Total Disbursed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Barangay Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Disbursement by Barangay</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barangayData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="barangay" type="category" width={100} />
              <Tooltip 
                formatter={(value: any) => ['₱' + value.toLocaleString(), 'Amount']}
              />
              <Legend />
              <Bar dataKey="amount" fill="#8b5cf6" name="Amount Disbursed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Sector Breakdown */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Sector-wise Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Beneficiaries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Disbursed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average per Beneficiary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectorData.map((sector, index) => (
                <tr key={sector.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{sector.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {sector.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₱{sector.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ₱{Math.round(sector.amount / sector.value).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ maxWidth: '100px' }}>
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${sector.value}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{sector.value}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">TOTAL</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  {sectorData.reduce((sum, s) => sum + s.value, 0)}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  ₱{sectorData.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  ₱{Math.round(
                    sectorData.reduce((sum, s) => sum + s.amount, 0) /
                    sectorData.reduce((sum, s) => sum + s.value, 0)
                  ).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}