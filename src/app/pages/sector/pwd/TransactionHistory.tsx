import { useState } from 'react';
import { Search, Download, Calendar, Filter } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';

// Mock transaction data
const transactions = [
  { id: 'PWD-TRX-001', beneficiaryName: 'Juan Dela Cruz', barangay: 'Pacol', assistanceType: 'Wheelchair', amountReleased: 18000, releaseDate: 'May 10 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-002', beneficiaryName: 'Maria Santos', barangay: 'Santa Cruz', assistanceType: 'Hearing Aid', amountReleased: 15000, releaseDate: 'May 9 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-003', beneficiaryName: 'Roberto Garcia', barangay: 'San Rafael', assistanceType: 'White Cane', amountReleased: 2500, releaseDate: 'May 8 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-004', beneficiaryName: 'Linda Reyes', barangay: 'Kinalansan', assistanceType: 'Medical Assistance', amountReleased: 12000, releaseDate: 'May 7 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-005', beneficiaryName: 'Carmen Cruz', barangay: 'Concepcion Grande', assistanceType: 'Therapy Support', amountReleased: 8000, releaseDate: 'May 6 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-006', beneficiaryName: 'Antonio Lopez', barangay: 'San Antonio', assistanceType: 'Prosthetic Limb', amountReleased: 35000, releaseDate: 'May 5 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-007', beneficiaryName: 'Rosa Fernandez', barangay: 'Malaking Ilog', assistanceType: 'Crutches', amountReleased: 3500, releaseDate: 'May 4 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-008', beneficiaryName: 'Miguel Torres', barangay: 'Pacol', assistanceType: 'Medical Assistance', amountReleased: 10000, releaseDate: 'May 3 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-009', beneficiaryName: 'Teresa Aquino', barangay: 'Santa Cruz', assistanceType: 'Wheelchair', amountReleased: 18000, releaseDate: 'Apr 28 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-010', beneficiaryName: 'Carlos Mendoza', barangay: 'San Rafael', assistanceType: 'Livelihood Aid', amountReleased: 15000, releaseDate: 'Apr 25 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-011', beneficiaryName: 'Ana Castillo', barangay: 'Kinalansan', assistanceType: 'Hearing Aid', amountReleased: 15000, releaseDate: 'Apr 22 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-012', beneficiaryName: 'Francisco Rivera', barangay: 'Concepcion Grande', assistanceType: 'Therapy Support', amountReleased: 8000, releaseDate: 'Apr 18 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-013', beneficiaryName: 'Gloria Santos', barangay: 'San Antonio', assistanceType: 'Medical Assistance', amountReleased: 11000, releaseDate: 'Apr 15 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-014', beneficiaryName: 'Pablo Diaz', barangay: 'Malaking Ilog', assistanceType: 'White Cane', amountReleased: 2500, releaseDate: 'Apr 12 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-015', beneficiaryName: 'Josefa Gomez', barangay: 'Pacol', assistanceType: 'Crutches', amountReleased: 3500, releaseDate: 'Apr 10 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-016', beneficiaryName: 'Ricardo Navarro', barangay: 'Santa Cruz', assistanceType: 'Livelihood Aid', amountReleased: 15000, releaseDate: 'Apr 8 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-017', beneficiaryName: 'Beatriz Ramos', barangay: 'San Rafael', assistanceType: 'Medical Assistance', amountReleased: 9500, releaseDate: 'Apr 5 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-018', beneficiaryName: 'Jose Cruz', barangay: 'Kinalansan', assistanceType: 'Therapy Support', amountReleased: 8000, releaseDate: 'Apr 2 2026', processedBy: 'Carlos Reyes' },
  { id: 'PWD-TRX-019', beneficiaryName: 'Luz Martinez', barangay: 'Concepcion Grande', assistanceType: 'Wheelchair', amountReleased: 18000, releaseDate: 'Mar 28 2026', processedBy: 'Ana Garcia' },
  { id: 'PWD-TRX-020', beneficiaryName: 'Ramon Sanchez', barangay: 'San Antonio', assistanceType: 'Hearing Aid', amountReleased: 15000, releaseDate: 'Mar 25 2026', processedBy: 'Carlos Reyes' }
];

const totalTransactions = transactions.length;
const totalAmountReleased = transactions.reduce((sum, t) => sum + t.amountReleased, 0);
const currentMonthTransactions = transactions.filter(t => t.releaseDate.includes('May')).length;
const currentMonthAmount = transactions.filter(t => t.releaseDate.includes('May')).reduce((sum, t) => sum + t.amountReleased, 0);

export default function TransactionHistory() {
  const [dateFilter, setDateFilter] = useState('all');

  const handleExportToExcel = () => {
    exportToExcel(transactions, {
      filename: 'PWD_Transaction_History'
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
              <option value="wheelchair">Wheelchair</option>
              <option value="hearing-aid">Hearing Aid</option>
              <option value="medical">Medical Assistance</option>
              <option value="therapy">Therapy Support</option>
              <option value="livelihood">Livelihood Aid</option>
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
