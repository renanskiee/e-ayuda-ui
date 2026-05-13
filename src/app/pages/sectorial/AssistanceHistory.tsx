import { useState } from 'react';
import { Filter, Calendar } from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

const transactions = [
  { id: "TRX-501", beneficiaryName: "Pedro Garcia", sector: "Senior Citizen", program: "Senior Medical Aid", amountReleased: 5000, releaseDate: "Mar 14 2026", processedBy: "Senior Sector Staff", status: "Released" },
  { id: "TRX-601", beneficiaryName: "Maria Santos", sector: "PWD", program: "PWD Medical Support", amountReleased: 3500, releaseDate: "Mar 13 2026", processedBy: "PWD Sector Staff", status: "Released" },
  { id: "TRX-701", beneficiaryName: "Ana Ramirez", sector: "Solo Parent", program: "Solo Parent Educational Aid", amountReleased: 4000, releaseDate: "Mar 12 2026", processedBy: "Solo Parent Sector Staff", status: "Released" },
  { id: "TRX-801", beneficiaryName: "Angela Flores", sector: "Women", program: "Women Livelihood Support", amountReleased: 4000, releaseDate: "Mar 11 2026", processedBy: "Women Sector Staff", status: "Released" },
  { id: "TRX-901", beneficiaryName: "Mark Dela Cruz", sector: "Youth / Children", program: "Youth Educational Support", amountReleased: 3000, releaseDate: "Mar 10 2026", processedBy: "Youth Sector Staff", status: "Released" },
  { id: "TRX-1001", beneficiaryName: "Juan Lopez", sector: "Disaster-Affected Families", program: "Emergency Financial Assistance", amountReleased: 5000, releaseDate: "Mar 9 2026", processedBy: "Disaster Sector Staff", status: "Released" }
];

export default function AssistanceHistory() {
  const [filterSector, setFilterSector] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const totalAmount = transactions.reduce((sum, t) => sum + t.amountReleased, 0);

  const handleExportToExcel = () => {
    exportToExcel(filteredHistory, {
      filename: 'Assistance_History'
    });
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Assistance History</h1>
        <p className="text-gray-500 mt-1">Municipal-wide assistance transaction log across all sectors</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Transactions</p>
            <p className="text-3xl font-bold mt-1">{transactions.length}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Total Amount Disbursed</p>
            <p className="text-3xl font-bold mt-1">₱{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Transactions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Sector</label>
            <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Sectors</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="PWD">PWD</option>
              <option value="Solo Parent">Solo Parent</option>
              <option value="Women">Women</option>
              <option value="Youth / Children">Youth / Children</option>
              <option value="Disaster-Affected Families">Disaster-Affected Families</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Program</label>
            <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Programs</option>
              <option value="Medical">Medical Programs</option>
              <option value="Educational">Educational Programs</option>
              <option value="Livelihood">Livelihood Programs</option>
            </select>
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="Released">Released</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
          <p className="text-sm text-gray-500 mt-1">All assistance disbursements across sectors</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Released</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.beneficiaryName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₱{transaction.amountReleased.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.releaseDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.processedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{transaction.status}</span>
                  </td>
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
