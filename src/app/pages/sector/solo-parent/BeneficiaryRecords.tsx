import { Search, Filter, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { ResidentProfilePanel } from '../../../components/ResidentProfilePanel';

interface SoloParentRecord {
  no: number;
  barangay: string;
  name: string;
  male: boolean;
  female: boolean;
  birthdate: string;
  civilStatus: string;
  sourceOfIncome: string;
  fourPs: string;
  pwd: string;
  sc: string;
}

const soloParentData: SoloParentRecord[] = [
  {
    no: 1,
    barangay: 'Pacol',
    name: 'Maria Fernandez',
    male: false,
    female: true,
    birthdate: '1988-06-12',
    civilStatus: 'Separated',
    sourceOfIncome: 'Laundry Services',
    fourPs: 'Yes',
    pwd: 'No',
    sc: 'No'
  },
  {
    no: 2,
    barangay: 'Santa Cruz',
    name: 'Ana Mercado',
    male: false,
    female: true,
    birthdate: '1990-11-25',
    civilStatus: 'Widowed',
    sourceOfIncome: 'Sari-sari Store',
    fourPs: 'Yes',
    pwd: 'No',
    sc: 'No'
  },
  {
    no: 3,
    barangay: 'San Rafael',
    name: 'Carmen Villar',
    male: false,
    female: true,
    birthdate: '1985-03-18',
    civilStatus: 'Single',
    sourceOfIncome: 'Dressmaking',
    fourPs: 'No',
    pwd: 'Yes',
    sc: 'No'
  },
  {
    no: 4,
    barangay: 'Malaking Ilog',
    name: 'Rosa Santiago',
    male: false,
    female: true,
    birthdate: '1992-08-05',
    civilStatus: 'Separated',
    sourceOfIncome: 'Market Vendor',
    fourPs: 'Yes',
    pwd: 'No',
    sc: 'No'
  },
  {
    no: 5,
    barangay: 'San Antonio',
    name: 'Liza Ramos',
    male: false,
    female: true,
    birthdate: '1987-12-30',
    civilStatus: 'Widowed',
    sourceOfIncome: 'Freelance',
    fourPs: 'No',
    pwd: 'No',
    sc: 'No'
  }
];

export default function BeneficiaryRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('all');
  const [civilStatusFilter, setCivilStatusFilter] = useState('all');
  const [fourPsFilter, setFourPsFilter] = useState('all');
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredData = soloParentData.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBarangay = barangayFilter === 'all' || record.barangay.toLowerCase() === barangayFilter.toLowerCase();
    const matchesCivilStatus = civilStatusFilter === 'all' || record.civilStatus === civilStatusFilter;
    const matchesFourPs = fourPsFilter === 'all' || record.fourPs === fourPsFilter;

    return matchesSearch && matchesBarangay && matchesCivilStatus && matchesFourPs;
  });

  const handleRowClick = (record: SoloParentRecord) => {
    // Calculate age
    const birthDate = new Date(record.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    setSelectedResident({
      fullName: record.name,
      sex: record.male ? 'Male' : 'Female',
      gender: record.male ? 'Male' : 'Female',
      birthdate: record.birthdate,
      birthday: record.birthdate,
      age: age,
      barangay: record.barangay,
      civilStatus: record.civilStatus,
      sourceOfIncome: record.sourceOfIncome,
      fourPs: record.fourPs,
      pwd: record.pwd,
      sc: record.sc
    });
    setIsPanelOpen(true);
  };

  const totalBeneficiaries = soloParentData.length;
  const fourPsCount = soloParentData.filter(r => r.fourPs === 'Yes').length;
  const pwdCount = soloParentData.filter(r => r.pwd === 'Yes').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Solo Parent Beneficiary Records</h1>
        <p className="text-gray-500 mt-1">Complete database of solo parent beneficiaries following official masterlist structure</p>
      </div>

      {/* Fund Monitoring Card */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Sector Fund Monitoring</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-pink-100 text-sm mb-1">Total Budget</p>
            <p className="text-2xl font-bold">₱1,500,000</p>
          </div>
          <div>
            <p className="text-pink-100 text-sm mb-1">Disbursed</p>
            <p className="text-2xl font-bold">₱980,000</p>
          </div>
          <div>
            <p className="text-pink-100 text-sm mb-1">Remaining</p>
            <p className="text-2xl font-bold">₱520,000</p>
          </div>
          <div>
            <p className="text-pink-100 text-sm mb-1">Utilization</p>
            <p className="text-2xl font-bold">65%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Beneficiaries</h3>
          <p className="text-3xl font-bold text-pink-600">{totalBeneficiaries}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">4Ps Members</h3>
          <p className="text-3xl font-bold text-blue-600">{fourPsCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">PWD Tagged</h3>
          <p className="text-3xl font-bold text-purple-600">{pwdCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filters
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Barangays</option>
              <option value="pacol">Pacol</option>
              <option value="santa-cruz">Santa Cruz</option>
              <option value="san-rafael">San Rafael</option>
              <option value="malaking-ilog">Malaking Ilog</option>
              <option value="san-antonio">San Antonio</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Civil Status</label>
            <select
              value={civilStatusFilter}
              onChange={(e) => setCivilStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All</option>
              <option value="Single">Single</option>
              <option value="Separated">Separated</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">4Ps Status</label>
            <select
              value={fourPsFilter}
              onChange={(e) => setFourPsFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All</option>
              <option value="Yes">4Ps Member</option>
              <option value="No">Non-4Ps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Barangay</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Male</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Female</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Birthdate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Civil Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Source of Income</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">4Ps</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">PWD</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SC</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((record) => (
                <tr 
                  key={record.no} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(record)}
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{record.no}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.barangay}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.male ? '✓' : ''}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.female ? '✓' : ''}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.birthdate}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                      {record.civilStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.sourceOfIncome}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${record.fourPs === 'Yes' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {record.fourPs}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.pwd}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.sc}</td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(record);
                      }}
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No records found matching your filters</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredData.length} of {totalBeneficiaries} beneficiaries
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Previous
            </button>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Resident Profile Panel */}
      <ResidentProfilePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        resident={selectedResident}
        sector="Solo Parent"
        onUpdate={(data) => {
          console.log('Updated data:', data);
          setIsPanelOpen(false);
        }}
      />
    </div>
  );
}
