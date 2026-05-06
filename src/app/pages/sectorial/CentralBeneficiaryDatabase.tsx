import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const beneficiaries = [
  { id: "BEN-1001", fullName: "Pedro Garcia", gender: "Male", age: 72, barangay: "Pacol", sector: "Senior Citizen", program: "Senior Medical Aid", assistance: "₱5,000", dateApproved: "Mar 12 2026", status: "Active" },
  { id: "BEN-1002", fullName: "Maria Santos", gender: "Female", age: 45, barangay: "Santa Cruz", sector: "PWD", program: "PWD Medical Support", assistance: "₱3,500", dateApproved: "Mar 10 2026", status: "Active" },
  { id: "BEN-1003", fullName: "Ana Ramirez", gender: "Female", age: 35, barangay: "San Rafael", sector: "Solo Parent", program: "Solo Parent Educational Aid", assistance: "₱4,000", dateApproved: "Mar 8 2026", status: "Active" },
  { id: "BEN-1004", fullName: "Angela Flores", gender: "Female", age: 34, barangay: "Pacol", sector: "Women", program: "Livelihood Assistance", assistance: "₱4,000", dateApproved: "Mar 7 2026", status: "Active" },
  { id: "BEN-1005", fullName: "Mark Dela Cruz", gender: "Male", age: 16, barangay: "Santa Cruz", sector: "Youth / Children", program: "Educational Assistance", assistance: "₱3,000", dateApproved: "Mar 6 2026", status: "Active" },
  { id: "BEN-1006", fullName: "Juan Lopez", gender: "Male", age: 47, barangay: "Pacol", sector: "Disaster-Affected Families", program: "Emergency Financial Assistance", assistance: "₱5,000", dateApproved: "Mar 5 2026", status: "Active" }
];

export default function CentralBeneficiaryDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarangay, setFilterBarangay] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Central Beneficiary Database</h1>
        <p className="text-gray-500 mt-1">Centralized records of all beneficiaries across all sectors</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Beneficiaries</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search beneficiary..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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
            </select>
          </div>

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
              <option value="Medical">Medical Aid Programs</option>
              <option value="Educational">Educational Programs</option>
              <option value="Livelihood">Livelihood Programs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Beneficiaries</h2>
          <p className="text-sm text-gray-500 mt-1">Total: {beneficiaries.length} registered beneficiaries</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistance Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beneficiary.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{beneficiary.assistance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.dateApproved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{beneficiary.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                    <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing {beneficiaries.length} beneficiaries</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Export to Excel</button>
        </div>
      </div>
    </div>
  );
}
