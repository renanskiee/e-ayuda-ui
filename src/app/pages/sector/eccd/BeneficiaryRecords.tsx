import { useState } from 'react';
import { Search, Download, Eye } from 'lucide-react';
import { exportToExcel } from '../../../utils/excelExport';

const beneficiaries = [
  { id: "ECCD-1001", childName: "Baby Miguel Cruz", age: 3, gender: "Male", parentName: "Maria Cruz", barangay: "Pacol", dayCareName: "Pacol Day Care Center", assistanceType: "Day Care Support", dateEnrolled: "Jan 15 2026", status: "Active" },
  { id: "ECCD-1002", childName: "Princess Sofia Reyes", age: 4, gender: "Female", parentName: "Ana Reyes", barangay: "Santa Cruz", dayCareName: "Santa Cruz Day Care", assistanceType: "Nutrition Program", dateEnrolled: "Feb 10 2026", status: "Active" },
  { id: "ECCD-1003", childName: "Joshua Santos", age: 2, gender: "Male", parentName: "Linda Santos", barangay: "San Rafael", dayCareName: "San Rafael Day Care", assistanceType: "Day Care Support", dateEnrolled: "Mar 5 2026", status: "Active" },
  { id: "ECCD-1004", childName: "Angel Mae Garcia", age: 3, gender: "Female", parentName: "Rosa Garcia", barangay: "Kinalansan", dayCareName: "Kinalansan Day Care Center", assistanceType: "Early Learning Kit", dateEnrolled: "Jan 20 2026", status: "Active" },
  { id: "ECCD-1005", childName: "Carlo Bautista", age: 4, gender: "Male", parentName: "Jenny Bautista", barangay: "Concepcion Grande", dayCareName: "Concepcion Day Care", assistanceType: "Nutrition Program", dateEnrolled: "Feb 28 2026", status: "Active" }
];

export default function BeneficiaryRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('');

  const filteredBeneficiaries = beneficiaries.filter(b => {
    const matchesSearch = b.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarangay = !barangayFilter || b.barangay === barangayFilter;
    return matchesSearch && matchesBarangay;
  });

  const handleExportToExcel = () => {
    exportToExcel(filteredBeneficiaries, {
      filename: 'ECCD_Beneficiary_Records'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">ECCD Sector Beneficiary Records</h1>
        <p className="text-gray-500 mt-1">Complete database of ECCD beneficiaries</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Children Enrolled</h3>
          <p className="text-3xl font-bold text-blue-600">{beneficiaries.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Programs</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Day Care Centers</h3>
          <p className="text-3xl font-bold text-purple-600">5</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Search & Filters</h2>
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Child/Parent Name or ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Barangays</option>
              <option value="Pacol">Pacol</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="San Rafael">San Rafael</option>
              <option value="Kinalansan">Kinalansan</option>
              <option value="Concepcion Grande">Concepcion Grande</option>
            </select>
          </div>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Beneficiary Records</h2>
          <p className="text-sm text-gray-500 mt-1">Showing {filteredBeneficiaries.length} of {beneficiaries.length} records</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent/Guardian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Care Center</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {beneficiary.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.childName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.parentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.dayCareName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.dateEnrolled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {beneficiary.status}
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
