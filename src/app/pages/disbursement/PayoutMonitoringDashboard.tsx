import { Users, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const payoutByBarangay = [
  { barangay: 'Pacol', paid: 40 },
  { barangay: 'Santa Cruz', paid: 28 },
  { barangay: 'San Rafael', paid: 24 },
  { barangay: 'San Antonio', paid: 22 },
  { barangay: 'Malaking Ilog', paid: 18 }
];

const payoutBySector = [
  { name: 'Senior Citizen', value: 35, color: '#10b981' },
  { name: 'PWD', value: 25, color: '#8b5cf6' },
  { name: 'Solo Parent', value: 18, color: '#3b82f6' },
  { name: 'Women', value: 12, color: '#ec4899' },
  { name: 'Youth', value: 6, color: '#f59e0b' },
  { name: 'Disaster', value: 4, color: '#ef4444' }
];

export default function PayoutMonitoringDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Payout Monitoring Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time payout analytics and monitoring</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Approved Beneficiaries</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">196</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">142</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">72.4% completion rate</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Beneficiaries</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">48</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">24.5% remaining</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unclaimed Beneficiaries</p>
              <p className="text-3xl font-bold text-red-600 mt-2">6</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">3.1% unclaimed rate</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Payout by Barangay */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Payout by Barangay</h2>
              <p className="text-sm text-gray-500">Distribution across barangays</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payoutByBarangay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="barangay" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="paid" fill="#3b82f6" name="Beneficiaries Paid">
                {payoutByBarangay.map((entry, index) => (
                  <Cell key={`payout-bar-barangay-${entry.barangay}-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payout by Sector */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Payout by Sector</h2>
              <p className="text-sm text-gray-500">Sector distribution breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={payoutBySector}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {payoutBySector.map((entry, index) => (
                  <Cell key={`payout-pie-sector-${entry.name}-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout Progress by Sector */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Payout Progress by Sector</h2>
        <div className="space-y-4">
          {[
            { sector: 'Senior Citizen', total: 68, paid: 52, percentage: 76 },
            { sector: 'PWD', total: 49, paid: 37, percentage: 76 },
            { sector: 'Solo Parent', total: 35, paid: 23, percentage: 66 },
            { sector: 'Women', total: 24, paid: 18, percentage: 75 },
            { sector: 'Youth / Children', total: 12, paid: 8, percentage: 67 },
            { sector: 'Disaster-Affected Families', total: 8, paid: 4, percentage: 50 }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.sector}</span>
                <span className="text-sm text-gray-500">{item.paid} / {item.total} beneficiaries ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    item.percentage >= 75 ? 'bg-green-600' :
                    item.percentage >= 50 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Statistics Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Payout Statistics by Barangay & Sector</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed breakdown of payout status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unclaimed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { barangay: 'Pacol', sector: 'Senior Citizen', total: 15, paid: 12, pending: 2, unclaimed: 1 },
                { barangay: 'Pacol', sector: 'PWD', total: 12, paid: 9, pending: 3, unclaimed: 0 },
                { barangay: 'Santa Cruz', sector: 'Senior Citizen', total: 14, paid: 10, pending: 3, unclaimed: 1 },
                { barangay: 'Santa Cruz', sector: 'Solo Parent', total: 8, paid: 5, pending: 2, unclaimed: 1 },
                { barangay: 'San Rafael', sector: 'PWD', total: 10, paid: 7, pending: 2, unclaimed: 1 },
                { barangay: 'San Rafael', sector: 'Women', total: 6, paid: 5, pending: 1, unclaimed: 0 }
              ].map((row, index) => {
                const completionRate = Math.round((row.paid / row.total) * 100);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.barangay}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.sector}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{row.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{row.paid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-semibold">{row.pending}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{row.unclaimed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        completionRate >= 75 ? 'bg-green-100 text-green-800' :
                        completionRate >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {completionRate}%
                      </span>
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
