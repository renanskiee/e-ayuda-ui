import { useState } from 'react';
import { Search, Eye, X, Download } from 'lucide-react';
import { pwdApplications } from '../../../data/sectorData';

export default function ApprovedBeneficiaries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarangay, setFilterBarangay] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock approved beneficiaries (in real app, these would be applications with status 'Approved')
  const approvedBeneficiaries = pwdApplications.slice(0, 5).map(app => ({
    ...app,
    status: 'Approved',
    approvalDate: 'Mar 11 2026',
    beneficiaryId: `BEN-${app.id}`
  }));

  const filteredBeneficiaries = approvedBeneficiaries.filter(ben => {
    const matchesSearch = ben.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ben.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarangay = !filterBarangay || ben.barangay === filterBarangay;
    return matchesSearch && matchesBarangay;
  });

  const handleViewDetails = (beneficiary: any) => {
    setSelectedBeneficiary(beneficiary);
    setShowModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Approved Beneficiaries</h1>
        <p className="text-gray-500 mt-1">List of approved beneficiaries for PWD assistance programs</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Beneficiaries
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Barangay
            </label>
            <select
              value={filterBarangay}
              onChange={(e) => setFilterBarangay(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Barangays</option>
              <option value="Pacol">Pacol</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="San Rafael">San Rafael</option>
              <option value="San Antonio">San Antonio</option>
              <option value="Malaking Ilog">Malaking Ilog</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Total Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{approvedBeneficiaries.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Total Assistance Amount</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₱{approvedBeneficiaries.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-500">Active Beneficiaries</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{approvedBeneficiaries.length}</p>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Approved Beneficiaries</h2>
              <p className="text-sm text-gray-500 mt-1">Total: {filteredBeneficiaries.length} beneficiaries</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export List
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beneficiary ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disability Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approval Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {beneficiary.beneficiaryId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.disabilityType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {beneficiary.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱{beneficiary.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.approvalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleViewDetails(beneficiary)}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-800">Beneficiary Details</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Beneficiary ID</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedBeneficiary.beneficiaryId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Application ID</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Name</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.applicantName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Age</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Gender</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Barangay</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.barangay}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Disability Type</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.disabilityType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Assistance Type</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.assistanceType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Approved Amount</label>
                  <p className="mt-1 text-gray-900 font-semibold text-lg">₱{selectedBeneficiary.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Approval Date</label>
                  <p className="mt-1 text-gray-900">{selectedBeneficiary.approvalDate}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedBeneficiary.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
