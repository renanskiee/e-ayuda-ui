import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';

const transactions = [
  { id: "SP-TRX-001", beneficiaryName: "Ana Ramirez", barangay: "Pacol", assistanceType: "Educational Assistance", amountReleased: 4000, releaseDate: "May 10 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-002", beneficiaryName: "Grace Villanueva", barangay: "Santa Cruz", assistanceType: "Livelihood Support", amountReleased: 6000, releaseDate: "May 9 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-003", beneficiaryName: "Carla Mendoza", barangay: "San Rafael", assistanceType: "Medical Assistance", amountReleased: 2500, releaseDate: "May 8 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-004", beneficiaryName: "Rosa Santos", barangay: "Kinalansan", assistanceType: "Educational Assistance", amountReleased: 4000, releaseDate: "May 7 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-005", beneficiaryName: "Linda Cruz", barangay: "Concepcion Grande", assistanceType: "Financial Assistance", amountReleased: 3500, releaseDate: "May 6 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-006", beneficiaryName: "Maria Lopez", barangay: "San Antonio", assistanceType: "Medical Assistance", amountReleased: 2000, releaseDate: "May 5 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-007", beneficiaryName: "Teresa Fernandez", barangay: "Malaking Ilog", assistanceType: "Livelihood Support", amountReleased: 6000, releaseDate: "May 4 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-008", beneficiaryName: "Carmen Reyes", barangay: "Pacol", assistanceType: "Educational Assistance", amountReleased: 4000, releaseDate: "May 3 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-009", beneficiaryName: "Elena Torres", barangay: "Santa Cruz", assistanceType: "Financial Assistance", amountReleased: 3500, releaseDate: "Apr 28 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-010", beneficiaryName: "Josefa Aquino", barangay: "San Rafael", assistanceType: "Medical Assistance", amountReleased: 2500, releaseDate: "Apr 25 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-011", beneficiaryName: "Gloria Mendoza", barangay: "Kinalansan", assistanceType: "Livelihood Support", amountReleased: 6000, releaseDate: "Apr 22 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-012", beneficiaryName: "Beatriz Castillo", barangay: "Concepcion Grande", assistanceType: "Educational Assistance", amountReleased: 4000, releaseDate: "Apr 18 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-013", beneficiaryName: "Luz Rivera", barangay: "San Antonio", assistanceType: "Financial Assistance", amountReleased: 3500, releaseDate: "Apr 15 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-014", beneficiaryName: "Angela Diaz", barangay: "Malaking Ilog", assistanceType: "Medical Assistance", amountReleased: 2500, releaseDate: "Apr 12 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-015", beneficiaryName: "Sofia Gomez", barangay: "Pacol", assistanceType: "Livelihood Support", amountReleased: 6000, releaseDate: "Apr 10 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-016", beneficiaryName: "Isabel Navarro", barangay: "Santa Cruz", assistanceType: "Educational Assistance", amountReleased: 4000, releaseDate: "Apr 8 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-017", beneficiaryName: "Patricia Ramos", barangay: "San Rafael", assistanceType: "Financial Assistance", amountReleased: 3500, releaseDate: "Apr 5 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-018", beneficiaryName: "Cristina Cruz", barangay: "Kinalansan", assistanceType: "Medical Assistance", amountReleased: 2500, releaseDate: "Apr 2 2026", processedBy: "Juan Dela Cruz" },
  { id: "SP-TRX-019", beneficiaryName: "Diana Martinez", barangay: "Concepcion Grande", assistanceType: "Livelihood Support", amountReleased: 6000, releaseDate: "Mar 28 2026", processedBy: "Maria Santos" },
  { id: "SP-TRX-020", beneficiaryName: "Monica Sanchez", barangay: "San Antonio", assistanceType: "Educational Assistance", amountReleased: 4000, releaseDate: "Mar 25 2026", processedBy: "Juan Dela Cruz" }
];

const totalTransactions = transactions.length;
const totalAmountReleased = transactions.reduce((sum, t) => sum + t.amountReleased, 0);
const currentMonthTransactions = transactions.filter(t => t.releaseDate.includes('May')).length;
const currentMonthAmount = transactions.filter(t => t.releaseDate.includes('May')).reduce((sum, t) => sum + t.amountReleased, 0);

export default function TransactionHistory() {
  const [dateFilter, setDateFilter] = useState('all');

  const handleExportToExcel = () => {
    exportToExcel(transactions, {
      filename: 'Solo_Parent_Transaction_History'
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Transaction History</h1>
          <p className="text-gray-500 mt-1">Complete record of all disbursements and releases</p>
        </div>
        <button onClick={handleExportToExcel} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold text-blue-600">{totalTransactions}</p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Amount Released</h3>
          <p className="text-3xl font-bold text-green-600">₱{totalAmountReleased.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Year-to-date 2026</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">This Month (May)</h3>
          <p className="text-3xl font-bold text-purple-600">₱{currentMonthAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{currentMonthTransactions} transactions</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Average per Transaction</h3>
          <p className="text-3xl font-bold text-orange-600">₱{Math.round(totalAmountReleased / totalTransactions).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Computed average</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Filter Transactions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assistance Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="all">All Types</option>
              <option value="educational">Educational Assistance</option>
              <option value="livelihood">Livelihood Support</option>
              <option value="financial">Financial Assistance</option>
              <option value="medical">Medical Assistance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barangay</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="all">All Barangays</option>
              <option value="pacol">Pacol</option>
              <option value="santa-cruz">Santa Cruz</option>
              <option value="san-rafael">San Rafael</option>
              <option value="kinalansan">Kinalansan</option>
              <option value="concepcion">Concepcion Grande</option>
              <option value="san-antonio">San Antonio</option>
              <option value="malaking-ilog">Malaking Ilog</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Transaction Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beneficiary Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Released
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Release Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processed By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.beneficiaryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₱{transaction.amountReleased.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.releaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.processedBy}
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
