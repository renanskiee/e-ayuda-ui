import { Search, Users } from 'lucide-react';
import { useState } from 'react';

// Extended beneficiary data with all sectors
const allBeneficiaries = [
  // Senior Citizen
  { id: "BEN-1001", name: "Pedro Garcia", gender: "Male", age: 72, barangay: "Pacol", sector: "Senior Citizen", program: "Senior Medical Aid", assistanceReceived: "₱5,000", dateApproved: "Mar 12, 2026", status: "Active" },
  { id: "BEN-1006", name: "Rosa Mendoza", gender: "Female", age: 68, barangay: "Santa Cruz", sector: "Senior Citizen", program: "Senior Medical Aid", assistanceReceived: "₱5,000", dateApproved: "Mar 10, 2026", status: "Active" },
  { id: "BEN-1011", name: "Jose Reyes", gender: "Male", age: 75, barangay: "San Rafael", sector: "Senior Citizen", program: "Senior Medical Aid", assistanceReceived: "₱4,500", dateApproved: "Mar 8, 2026", status: "Active" },
  
  // PWD
  { id: "BEN-1002", name: "Maria Santos", gender: "Female", age: 45, barangay: "Santa Cruz", sector: "PWD", program: "PWD Medical Support", assistanceReceived: "₱3,500", dateApproved: "Mar 10, 2026", status: "Active" },
  { id: "BEN-1007", name: "Carlos Diaz", gender: "Male", age: 38, barangay: "Pacol", sector: "PWD", program: "PWD Medical Support", assistanceReceived: "₱3,500", dateApproved: "Mar 9, 2026", status: "Active" },
  { id: "BEN-1012", name: "Linda Cruz", gender: "Female", age: 52, barangay: "Malaking Ilog", sector: "PWD", program: "PWD Medical Support", assistanceReceived: "₱3,000", dateApproved: "Mar 7, 2026", status: "Active" },
  
  // Solo Parent
  { id: "BEN-1003", name: "Ana Ramirez", gender: "Female", age: 35, barangay: "San Rafael", sector: "Solo Parent", program: "Educational Assistance", assistanceReceived: "₱4,000", dateApproved: "Mar 8, 2026", status: "Active" },
  { id: "BEN-1008", name: "Elena Torres", gender: "Female", age: 32, barangay: "Santa Cruz", sector: "Solo Parent", program: "Educational Assistance", assistanceReceived: "₱4,000", dateApproved: "Mar 6, 2026", status: "Active" },
  { id: "BEN-1013", name: "Sofia Navarro", gender: "Female", age: 29, barangay: "San Antonio", sector: "Solo Parent", program: "Educational Assistance", assistanceReceived: "₱3,500", dateApproved: "Mar 5, 2026", status: "Active" },
  
  // Women
  { id: "BEN-1004", name: "Angela Flores", gender: "Female", age: 34, barangay: "Pacol", sector: "Women", program: "Livelihood Assistance", assistanceReceived: "₱4,000", dateApproved: "Mar 7, 2026", status: "Active" },
  { id: "BEN-1009", name: "Carmen Lopez", gender: "Female", age: 41, barangay: "San Rafael", sector: "Women", program: "Livelihood Assistance", assistanceReceived: "₱4,000", dateApproved: "Mar 5, 2026", status: "Active" },
  { id: "BEN-1014", name: "Patricia Ramos", gender: "Female", age: 28, barangay: "Santa Cruz", sector: "Women", program: "Livelihood Assistance", assistanceReceived: "₱3,500", dateApproved: "Mar 4, 2026", status: "Active" },
  
  // Youth / Children
  { id: "BEN-1005", name: "Mark Dela Cruz", gender: "Male", age: 16, barangay: "Santa Cruz", sector: "Youth / Children", program: "Educational Assistance", assistanceReceived: "₱3,000", dateApproved: "Mar 6, 2026", status: "Active" },
  { id: "BEN-1010", name: "Julia Santos", gender: "Female", age: 15, barangay: "Pacol", sector: "Youth / Children", program: "Educational Assistance", assistanceReceived: "₱3,000", dateApproved: "Mar 4, 2026", status: "Active" },
  { id: "BEN-1015", name: "Miguel Perez", gender: "Male", age: 17, barangay: "San Rafael", sector: "Youth / Children", program: "Educational Assistance", assistanceReceived: "₱2,500", dateApproved: "Mar 3, 2026", status: "Active" },
  
  // Disaster-Affected Families
  { id: "BEN-1016", name: "Roberto Gonzales", gender: "Male", age: 42, barangay: "Malaking Ilog", sector: "Disaster-Affected Families", program: "Emergency Relief", assistanceReceived: "₱5,000", dateApproved: "Mar 11, 2026", status: "Active" },
  { id: "BEN-1017", name: "Luisa Fernandez", gender: "Female", age: 36, barangay: "San Antonio", sector: "Disaster-Affected Families", program: "Emergency Relief", assistanceReceived: "₱5,000", dateApproved: "Mar 10, 2026", status: "Active" },
  { id: "BEN-1018", name: "Ramon Castillo", gender: "Male", age: 48, barangay: "Pacol", sector: "Disaster-Affected Families", program: "Emergency Relief", assistanceReceived: "₱4,500", dateApproved: "Mar 9, 2026", status: "Active" },
];

const sectors = [
  { id: 'all', name: 'All Sectors', icon: '📊' },
  { id: 'Senior Citizen', name: 'Senior Citizen', icon: '👴' },
  { id: 'PWD', name: 'PWD', icon: '♿' },
  { id: 'Solo Parent', name: 'Solo Parent', icon: '👨‍👧' },
  { id: 'Women', name: 'Women', icon: '👩' },
  { id: 'Youth / Children', name: 'Youth / Children', icon: '👦' },
  { id: 'Disaster-Affected Families', name: 'Disaster-Affected Families', icon: '🏚️' },
];

export default function BeneficiaryDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSector, setActiveSector] = useState('all');
  const [barangayFilter, setBarangayFilter] = useState('all');

  // Filter beneficiaries based on active sector, search term, and barangay
  const filteredBeneficiaries = allBeneficiaries.filter(beneficiary => {
    const matchesSector = activeSector === 'all' || beneficiary.sector === activeSector;
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiary.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarangay = barangayFilter === 'all' || beneficiary.barangay === barangayFilter;
    return matchesSector && matchesSearch && matchesBarangay;
  });

  // Count beneficiaries per sector
  const getSectorCount = (sectorId: string) => {
    if (sectorId === 'all') return allBeneficiaries.length;
    return allBeneficiaries.filter(b => b.sector === sectorId).length;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Central Beneficiary Database</h1>
        <p className="text-gray-500 mt-1">Comprehensive sectorial database of all beneficiaries across municipal programs</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Beneficiaries</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{allBeneficiaries.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Programs</h3>
          <p className="text-3xl font-bold text-green-600">6</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Sectors</h3>
          <p className="text-3xl font-bold text-purple-600">6</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Disbursed</h3>
          <p className="text-3xl font-bold text-orange-600">₱1.2M</p>
        </div>
      </div>

      {/* Sector Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeSector === sector.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{sector.icon}</span>
                <span>{sector.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeSector === sector.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {getSectorCount(sector.id)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Search & Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name or ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter beneficiary name or ID..."
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
        </div>
      </div>

      {/* Beneficiary Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSector === 'all' ? 'All Beneficiaries' : `${activeSector} Beneficiaries`}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredBeneficiaries.length} {filteredBeneficiaries.length === 1 ? 'record' : 'records'}
              </p>
            </div>
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
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Enrolled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Approved
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
              {filteredBeneficiaries.length > 0 ? (
                filteredBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {beneficiary.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {beneficiary.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {beneficiary.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {beneficiary.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {beneficiary.barangay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        beneficiary.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                        beneficiary.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                        beneficiary.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                        beneficiary.sector === 'Women' ? 'bg-pink-100 text-pink-800' :
                        beneficiary.sector === 'Youth / Children' ? 'bg-yellow-100 text-yellow-800' :
                        beneficiary.sector === 'Disaster-Affected Families' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {beneficiary.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {beneficiary.program}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {beneficiary.assistanceReceived}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {beneficiary.dateApproved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {beneficiary.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View / Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                    No beneficiaries found matching your search criteria.
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