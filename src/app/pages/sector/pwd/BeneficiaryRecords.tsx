import { Search, Filter, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { ResidentProfilePanel } from '../../../components/ResidentProfilePanel';

interface PWDRecord {
  no: number;
  barangay: string;
  name: string;
  birthday: string;
  age: number;
  male: boolean;
  female: boolean;
  occupation: string;
  address: string;
  educationalAttainment: string;
  disabilityType: string;
  idNumber: string;
  dateIssued: string;
}

const pwdData: PWDRecord[] = [
  {
    no: 1,
    barangay: 'Pacol',
    name: 'Juan Dela Cruz',
    birthday: '1985-05-15',
    age: 41,
    male: true,
    female: false,
    occupation: 'Self-employed',
    address: 'Purok 2, Pacol',
    educationalAttainment: 'High School Graduate',
    disabilityType: 'Visual Impairment',
    idNumber: 'PWD-2024-001',
    dateIssued: '2024-01-15'
  },
  {
    no: 2,
    barangay: 'Santa Cruz',
    name: 'Maria Santos',
    birthday: '1990-08-22',
    age: 36,
    male: false,
    female: true,
    occupation: 'Housewife',
    address: 'Purok 5, Santa Cruz',
    educationalAttainment: 'Elementary Graduate',
    disabilityType: 'Hearing Impairment',
    idNumber: 'PWD-2024-002',
    dateIssued: '2024-01-20'
  },
  {
    no: 3,
    barangay: 'San Rafael',
    name: 'Roberto Garcia',
    birthday: '1978-12-10',
    age: 48,
    male: true,
    female: false,
    occupation: 'Tricycle Driver',
    address: 'Purok 1, San Rafael',
    educationalAttainment: 'College Level',
    disabilityType: 'Orthopedic Disability',
    idNumber: 'PWD-2024-003',
    dateIssued: '2024-02-01'
  },
  {
    no: 4,
    barangay: 'Malaking Ilog',
    name: 'Ana Reyes',
    birthday: '1992-03-25',
    age: 34,
    male: false,
    female: true,
    occupation: 'Store Owner',
    address: 'Purok 3, Malaking Ilog',
    educationalAttainment: 'High School Graduate',
    disabilityType: 'Intellectual Disability',
    idNumber: 'PWD-2024-004',
    dateIssued: '2024-02-10'
  },
  {
    no: 5,
    barangay: 'San Antonio',
    name: 'Carlos Mendoza',
    birthday: '1988-07-18',
    age: 38,
    male: true,
    female: false,
    occupation: 'Computer Technician',
    address: 'Purok 4, San Antonio',
    educationalAttainment: 'College Graduate',
    disabilityType: 'Speech Impairment',
    idNumber: 'PWD-2024-005',
    dateIssued: '2024-02-15'
  }
];

export default function BeneficiaryRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('all');
  const [disabilityFilter, setDisabilityFilter] = useState('all');
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredData = pwdData.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.idNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBarangay = barangayFilter === 'all' || record.barangay.toLowerCase() === barangayFilter.toLowerCase();
    const matchesDisability = disabilityFilter === 'all' || record.disabilityType === disabilityFilter;

    return matchesSearch && matchesBarangay && matchesDisability;
  });

  const handleRowClick = (record: PWDRecord) => {
    setSelectedResident({
      fullName: record.name,
      sex: record.male ? 'Male' : 'Female',
      gender: record.male ? 'Male' : 'Female',
      birthday: record.birthday,
      age: record.age,
      barangay: record.barangay,
      address: record.address,
      occupation: record.occupation,
      educationalAttainment: record.educationalAttainment,
      disabilityType: record.disabilityType,
      idNumber: record.idNumber,
      dateIssued: record.dateIssued
    });
    setIsPanelOpen(true);
  };

  const totalBeneficiaries = pwdData.length;
  const maleCount = pwdData.filter(r => r.male).length;
  const femaleCount = pwdData.filter(r => r.female).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">PWD Beneficiary Records</h1>
        <p className="text-gray-500 mt-1">Complete database of persons with disability following official masterlist structure</p>
      </div>

      {/* Fund Monitoring Card */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Sector Fund Monitoring</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-purple-100 text-sm mb-1">Total Budget</p>
            <p className="text-2xl font-bold">₱1,800,000</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Disbursed</p>
            <p className="text-2xl font-bold">₱1,200,000</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Remaining</p>
            <p className="text-2xl font-bold">₱600,000</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Utilization</p>
            <p className="text-2xl font-bold">67%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Beneficiaries</h3>
          <p className="text-3xl font-bold text-purple-600">{totalBeneficiaries}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Male</h3>
          <p className="text-3xl font-bold text-blue-600">{maleCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Female</h3>
          <p className="text-3xl font-bold text-pink-600">{femaleCount}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name/ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Type of Disability</label>
            <select
              value={disabilityFilter}
              onChange={(e) => setDisabilityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Visual Impairment">Visual Impairment</option>
              <option value="Hearing Impairment">Hearing Impairment</option>
              <option value="Orthopedic Disability">Orthopedic Disability</option>
              <option value="Intellectual Disability">Intellectual Disability</option>
              <option value="Speech Impairment">Speech Impairment</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">B-Day</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Male</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Female</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Occupation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Educational Attainment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type of Disability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date Issued</th>
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
                  <td className="px-4 py-3 text-sm text-gray-900">{record.birthday}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.age}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.male ? '✓' : ''}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.female ? '✓' : ''}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.occupation}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.address}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.educationalAttainment}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {record.disabilityType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.idNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.dateIssued}</td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(record);
                      }}
                      className="text-purple-600 hover:text-purple-800"
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
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">
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
        sector="PWD"
        onUpdate={(data) => {
          console.log('Updated data:', data);
          setIsPanelOpen(false);
        }}
      />
    </div>
  );
}
