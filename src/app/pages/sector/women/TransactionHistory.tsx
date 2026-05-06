import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';

const transactions = [
  { id: "TRX-801", beneficiaryName: "Angela Flores", barangay: "Pacol", assistanceType: "Livelihood Assistance", amountReleased: 4000, releaseDate: "Mar 13 2026", processedBy: "Women Sector Staff" },
  { id: "TRX-802", beneficiaryName: "Diana Ramos", barangay: "Santa Cruz", assistanceType: "Medical Assistance", amountReleased: 3000, releaseDate: "Mar 11 2026", processedBy: "Women Sector Staff" },
  { id: "TRX-803", beneficiaryName: "Teresa Mendoza", barangay: "San Rafael", assistanceType: "Capital Assistance", amountReleased: 3500, releaseDate: "Mar 9 2026", processedBy: "Women Sector Staff" },
  { id: "TRX-804", beneficiaryName: "Carmen Santos", barangay: "San Antonio", assistanceType: "Livelihood Assistance", amountReleased: 4000, releaseDate: "Mar 7 2026", processedBy: "Women Sector Staff" },
  { id: "TRX-805", beneficiaryName: "Sofia Cruz", barangay: "Malaking Ilog", assistanceType: "Medical Assistance", amountReleased: 2500, releaseDate: "Mar 5 2026", processedBy: "Women Sector Staff" },
  { id: "TRX-806", beneficiaryName: "Patricia Lopez", barangay: "Pacol", assistanceType: "Capital Assistance", amountReleased: 3000, releaseDate: "Mar 3 2026", processedBy: "Women Sector Staff" }
];

export default function TransactionHistory() {
  const [filterBarangay, setFilterBarangay] = useState('');
  const [filterAssistanceType, setFilterAssistanceType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const totalAmount = transactions.reduce((sum, t) => sum + t.amountReleased, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Transaction History</h1>
        <p className="text-gray-500 mt-1">Complete record of all assistance disbursements</p>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total Transactions</p>
            <p className="text-3xl font-bold mt-1">{transactions.length}</p>
          </div>
          <div className="text-right">
            <p className="text-purple-100 text-sm">Total Amount Disbursed</p>
            <p className="text-3xl font-bold mt-1">₱{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Transactions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Barangay</label>
            <select value={filterBarangay} onChange={(e) => setFilterBarangay(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Barangays</option>
              <option value="Pacol">Pacol</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="San Rafael">San Rafael</option>
              <option value="San Antonio">San Antonio</option>
              <option value="Malaking Ilog">Malaking Ilog</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Assistance Type</label>
            <select value={filterAssistanceType} onChange={(e) => setFilterAssistanceType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Types</option>
              <option value="Livelihood Assistance">Livelihood Assistance</option>
              <option value="Medical Assistance">Medical Assistance</option>
              <option value="Capital Assistance">Capital Assistance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
          <p className="text-sm text-gray-500 mt-1">Complete disbursement history</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Released</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.beneficiaryName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.assistanceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₱{transaction.amountReleased.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.releaseDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.processedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing {transactions.length} transactions</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Export to Excel</button>
        </div>
      </div>
    </div>
  );
}
