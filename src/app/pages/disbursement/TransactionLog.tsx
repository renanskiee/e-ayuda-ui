import { Search, Download, FileText, Filter } from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';
import { useState } from 'react';

const transactions = [
  { id: "TRX-501", beneficiary: "Pedro Garcia", sector: "Senior Citizen", barangay: "Pacol", program: "Senior Medical Aid", amount: 5000, date: "Mar 14 2026", processedBy: "Payout Officer", status: "Paid" },
  { id: "TRX-502", beneficiary: "Maria Santos", sector: "PWD", barangay: "Santa Cruz", program: "Medical Assistance", amount: 3500, date: "Mar 14 2026", processedBy: "Payout Officer", status: "Paid" },
  { id: "TRX-503", beneficiary: "Ana Ramirez", sector: "Solo Parent", barangay: "San Rafael", program: "Educational Assistance", amount: 4000, date: "Mar 14 2026", processedBy: "Payout Officer", status: "Pending" },
  { id: "TRX-504", beneficiary: "Jose Reyes", sector: "Senior Citizen", barangay: "San Rafael", program: "Senior Medical Aid", amount: 4500, date: "Mar 13 2026", processedBy: "Payout Officer", status: "Paid" },
  { id: "TRX-505", beneficiary: "Linda Cruz", sector: "PWD", barangay: "Malaking Ilog", program: "PWD Medical Support", amount: 3000, date: "Mar 13 2026", processedBy: "Payout Officer", status: "Paid" },
  { id: "TRX-506", beneficiary: "Sofia Navarro", sector: "Solo Parent", barangay: "San Antonio", program: "Educational Assistance", amount: 3500, date: "Mar 12 2026", processedBy: "Payout Officer", status: "Paid" },
  { id: "TRX-507", beneficiary: "Angela Flores", sector: "Women", barangay: "Pacol", program: "Livelihood Assistance", amount: 4000, date: "Mar 12 2026", processedBy: "Payout Officer", status: "Paid" },
  { id: "TRX-508", beneficiary: "Mark Dela Cruz", sector: "Youth / Children", barangay: "Santa Cruz", program: "Educational Assistance", amount: 3000, date: "Mar 11 2026", processedBy: "Payout Officer", status: "Paid" },
];

export default function TransactionLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarangay = barangayFilter === 'all' || t.barangay === barangayFilter;
    const matchesSector = sectorFilter === 'all' || t.sector === sectorFilter;
    const matchesDate = !dateFilter || t.date.includes(dateFilter);
    return matchesSearch && matchesBarangay && matchesSector && matchesDate;
  });

  const handleExport = () => {
    alert("Exporting transaction log to Excel...");
  };

  const handleExportToExcel = () => {
    exportToExcel(filteredTransactions, {
      filename: 'Transaction_Log'
    });
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Transaction Log</h1>
        <p className="text-gray-500 mt-1">Complete record of all assistance payouts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Transactions</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{transactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Amount Released</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₱1.24M</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Transactions</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">142</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Transactions</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">48</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Filter className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Search & Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name or ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or transaction ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Barangays</option>
              <option value="Pacol">Pacol</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="San Rafael">San Rafael</option>
              <option value="Malaking Ilog">Malaking Ilog</option>
              <option value="San Antonio">San Antonio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Sector</label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="PWD">PWD</option>
              <option value="Solo Parent">Solo Parent</option>
              <option value="Women">Women</option>
              <option value="Youth / Children">Youth / Children</option>
              <option value="Disaster-Affected Families">Disaster-Affected Families</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
            <input
              type="text"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="e.g., Mar 14 2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Transaction Records</h2>
              <p className="text-sm text-gray-500 mt-1">Showing {filteredTransactions.length} of {transactions.length} transactions</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Released</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.beneficiary}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                        transaction.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                        transaction.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                        transaction.sector === 'Women' ? 'bg-pink-100 text-pink-800' :
                        transaction.sector === 'Youth / Children' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.barangay}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.program}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₱{transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.processedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                      <button className="text-green-600 hover:text-green-800 font-medium">Export</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
