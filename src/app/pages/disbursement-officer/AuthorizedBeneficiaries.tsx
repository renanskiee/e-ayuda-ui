import { Search, Eye, Filter, Download, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  barangay: string;
  sector: string;
  program: string;
  amount: string;
  date: string;
  status: string;
  contactNumber: string;
  authorizedBy: string;
  scheduleDate?: string;
}

export default function AuthorizedBeneficiaries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const beneficiaries: Beneficiary[] = [
    { 
      id: 'APP-1023', 
      name: 'Juan Dela Cruz', 
      barangay: 'Pacol', 
      sector: 'Senior Citizen', 
      program: 'Senior Medical Aid', 
      amount: '₱5,000', 
      date: 'Mar 12, 2026',
      status: 'Authorized',
      contactNumber: '09171234567',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 14, 2026'
    },
    { 
      id: 'APP-1024', 
      name: 'Maria Santos', 
      barangay: 'Santa Cruz', 
      sector: 'PWD', 
      program: 'Medical Assistance', 
      amount: '₱3,500', 
      date: 'Mar 12, 2026',
      status: 'Authorized',
      contactNumber: '09181234568',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 14, 2026'
    },
    { 
      id: 'APP-1025', 
      name: 'Pedro Garcia', 
      barangay: 'San Rafael', 
      sector: 'Senior Citizen', 
      program: 'Senior Medical Aid', 
      amount: '₱4,000', 
      date: 'Mar 13, 2026',
      status: 'Authorized',
      contactNumber: '09191234569',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 15, 2026'
    },
    { 
      id: 'APP-1026', 
      name: 'Rosa Reyes', 
      barangay: 'San Antonio', 
      sector: 'Solo Parent', 
      program: 'Educational Support', 
      amount: '₱2,500', 
      date: 'Mar 13, 2026',
      status: 'Authorized',
      contactNumber: '09201234570',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 15, 2026'
    },
    { 
      id: 'APP-1027', 
      name: 'Carlos Mendoza', 
      barangay: 'Poblacion', 
      sector: 'PWD', 
      program: 'Mobility Aid', 
      amount: '₱15,000', 
      date: 'Mar 13, 2026',
      status: 'Authorized',
      contactNumber: '09211234571',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 16, 2026'
    },
    { 
      id: 'APP-1028', 
      name: 'Jennifer Cruz', 
      barangay: 'Pacol', 
      sector: 'Solo Parent', 
      program: 'Livelihood Support', 
      amount: '₱10,000', 
      date: 'Mar 13, 2026',
      status: 'Ready for Payout',
      contactNumber: '09221234572',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 14, 2026'
    },
    { 
      id: 'APP-1029', 
      name: 'Sarah Cruz', 
      barangay: 'Santa Cruz', 
      sector: 'Women', 
      program: 'Livelihood Training', 
      amount: '₱7,000', 
      date: 'Mar 13, 2026',
      status: 'Authorized',
      contactNumber: '09231234573',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 16, 2026'
    },
    { 
      id: 'APP-1030', 
      name: 'Mark Dela Cruz', 
      barangay: 'San Isidro', 
      sector: 'Youth', 
      program: 'Educational Assistance', 
      amount: '₱4,000', 
      date: 'Mar 13, 2026',
      status: 'Ready for Payout',
      contactNumber: '09241234574',
      authorizedBy: 'MSWDO Head',
      scheduleDate: 'Mar 14, 2026'
    },
  ];

  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    const matchesSearch = 
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.barangay.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = selectedSector === 'All Sectors' || beneficiary.sector === selectedSector;
    const matchesStatus = selectedStatus === 'All Status' || beneficiary.status === selectedStatus;
    
    return matchesSearch && matchesSector && matchesStatus;
  });

  const handleViewDetails = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setShowDetails(true);
  };

  const handleSchedulePayout = (beneficiary: Beneficiary) => {
    alert(`Payout scheduled for ${beneficiary.name} on ${beneficiary.scheduleDate}`);
    setShowDetails(false);
  };

  const totalAuthorized = filteredBeneficiaries.length;
  const totalAmount = filteredBeneficiaries.reduce((sum, b) => {
    return sum + parseInt(b.amount.replace(/[₱,]/g, ''));
  }, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Authorized Beneficiaries</h1>
        <p className="text-gray-500 mt-1">List of beneficiaries ready for payout processing</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Authorized</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">{totalAuthorized}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-blue-600 opacity-80" />
          </div>
          <p className="text-xs text-blue-600 mt-2">Ready for disbursement</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Amount</p>
              <p className="text-3xl font-bold text-green-700 mt-2">₱{totalAmount.toLocaleString()}</p>
            </div>
            <Download className="w-12 h-12 text-green-600 opacity-80" />
          </div>
          <p className="text-xs text-green-600 mt-2">Pending disbursement</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg. Amount</p>
              <p className="text-3xl font-bold text-purple-700 mt-2">
                ₱{Math.round(totalAmount / totalAuthorized).toLocaleString()}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-purple-600 opacity-80" />
          </div>
          <p className="text-xs text-purple-600 mt-2">Per beneficiary</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or barangay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select 
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>All Sectors</option>
                <option>Senior Citizen</option>
                <option>PWD</option>
                <option>Solo Parent</option>
                <option>Women</option>
                <option>Youth</option>
                <option>ECCD</option>
              </select>
            </div>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Authorized</option>
              <option>Ready for Payout</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredBeneficiaries.length}</span> of{' '}
          <span className="font-semibold">{beneficiaries.length}</span> authorized beneficiaries
        </p>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beneficiary Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authorization Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {beneficiary.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {beneficiary.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {beneficiary.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {beneficiary.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {beneficiary.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {beneficiary.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {beneficiary.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      beneficiary.status === 'Ready for Payout' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {beneficiary.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleViewDetails(beneficiary)}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBeneficiaries.length === 0 && (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No beneficiaries found matching your filters</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSector('All Sectors');
                  setSelectedStatus('All Status');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Beneficiary Details</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Authorization Status: {selectedBeneficiary.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Beneficiary Name</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedBeneficiary.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Application ID</p>
                    <p className="text-sm font-semibold text-blue-600">{selectedBeneficiary.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contact Number</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBeneficiary.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Barangay</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBeneficiary.barangay}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Program Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Sector</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBeneficiary.sector}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Program</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBeneficiary.program}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Approved Amount</p>
                    <p className="text-2xl font-bold text-green-600">{selectedBeneficiary.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Authorization Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Authorization Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBeneficiary.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Authorized By</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBeneficiary.authorizedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Scheduled Payout Date</p>
                  <p className="text-sm font-medium text-blue-600">{selectedBeneficiary.scheduleDate}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleSchedulePayout(selectedBeneficiary)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule for Payout
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}