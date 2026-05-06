import { useState } from 'react';
import { Search, Download, Calendar, Filter } from 'lucide-react';

// Mock transaction data
const transactions = [
  { id: 'TXN-001', date: 'Mar 12 2026', beneficiary: 'Anna Cruz', type: 'Assistive Device', amount: 8000, status: 'Completed', method: 'Cash' },
  { id: 'TXN-002', date: 'Mar 11 2026', beneficiary: 'Mark Santos', type: 'Mobility Aid', amount: 15000, status: 'Completed', method: 'Bank Transfer' },
  { id: 'TXN-003', date: 'Mar 10 2026', beneficiary: 'Lisa Garcia', type: 'Hearing Aid', amount: 12000, status: 'Completed', method: 'Cash' },
  { id: 'TXN-004', date: 'Mar 9 2026', beneficiary: 'John Reyes', type: 'Wheelchair', amount: 18000, status: 'Pending', method: 'Bank Transfer' },
  { id: 'TXN-005', date: 'Mar 8 2026', beneficiary: 'Maria Lopez', type: 'Assistive Device', amount: 10000, status: 'Completed', method: 'Cash' },
  { id: 'TXN-006', date: 'Mar 7 2026', beneficiary: 'Carlos Mendoza', type: 'Crutches', amount: 5000, status: 'Completed', method: 'Cash' },
  { id: 'TXN-007', date: 'Mar 6 2026', beneficiary: 'Sofia Flores', type: 'Therapy Support', amount: 7000, status: 'Completed', method: 'Bank Transfer' },
  { id: 'TXN-008', date: 'Mar 5 2026', beneficiary: 'Miguel Torres', type: 'Mobility Aid', amount: 14000, status: 'Processing', method: 'Bank Transfer' },
];

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMethod, setFilterMethod] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || txn.status === filterStatus;
    const matchesMethod = !filterMethod || txn.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalCompleted = transactions.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const totalPending = transactions.filter(t => t.status === 'Pending' || t.status === 'Processing').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Transaction History</h1>
        <p className="text-gray-500 mt-1">Complete record of all assistance disbursements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Completed Disbursements</p>
          <p className="text-3xl font-bold text-green-600 mt-2">₱{totalCompleted.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Pending Disbursements</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">₱{totalPending.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Transactions
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by beneficiary or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Method
            </label>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Methods</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
              <p className="text-sm text-gray-500 mt-1">Total: {filteredTransactions.length} transactions</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beneficiary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.beneficiary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    ₱{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.status}
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
