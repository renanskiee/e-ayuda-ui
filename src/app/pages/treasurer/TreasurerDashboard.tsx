import { DollarSign, TrendingUp, Wallet, Users } from 'lucide-react';
import { Link } from 'react-router';

export default function TreasurerDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Financial Monitoring Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of municipal assistance fund allocation and utilization</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Total Funds Allocated</p>
              <p className="text-3xl font-bold mt-2">₱1,500,000</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-blue-100 mt-3">Across all programs</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Funds Released</p>
              <p className="text-3xl font-bold mt-2">₱1,245,000</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <Link to="/treasurer/utilization" className="text-sm text-green-100 hover:text-white mt-3 inline-block">
            View details →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">Remaining Budget</p>
              <p className="text-3xl font-bold mt-2">₱255,000</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-purple-100 mt-3">17% of total allocation</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-100">Beneficiaries Paid</p>
              <p className="text-3xl font-bold mt-2">142</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <Link to="/treasurer/transactions" className="text-sm text-orange-100 hover:text-white mt-3 inline-block">
            View records →
          </Link>
        </div>
      </div>

      {/* Fund Utilization by Sector */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Fund Utilization by Sector</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { sector: 'Senior Citizen', allocated: 500000, used: 387000, percentage: 77 },
              { sector: 'PWD', allocated: 350000, used: 271000, percentage: 77 },
              { sector: 'Solo Parent', allocated: 250000, used: 198000, percentage: 79 },
              { sector: 'Women', allocated: 200000, used: 156000, percentage: 78 },
              { sector: 'Youth', allocated: 150000, used: 118000, percentage: 79 },
              { sector: 'ECCD', allocated: 50000, used: 35000, percentage: 70 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.sector}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-800">
                      ₱{item.used.toLocaleString()} / ₱{item.allocated.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Financial Transactions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { date: 'Mar 14, 2026', program: 'Senior Medical Aid', amount: 125000, beneficiaries: 25 },
              { date: 'Mar 13, 2026', program: 'PWD Medical Support', amount: 98000, beneficiaries: 20 },
              { date: 'Mar 12, 2026', program: 'Solo Parent Educational', amount: 75000, beneficiaries: 15 },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{transaction.program}</p>
                  <p className="text-sm text-gray-500">{transaction.date} • {transaction.beneficiaries} beneficiaries</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₱{transaction.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
