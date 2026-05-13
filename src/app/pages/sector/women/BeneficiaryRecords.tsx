import { Search, Filter, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { ResidentProfilePanel } from '../../../components/ResidentProfilePanel';
import { exportTableToExcel } from '../../../utils/excelExport';

interface WomenRecord {
  no: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthday: string;
  age: number;
  birthplace: string;
  purok: string;
  active: 'Yes' | 'No';
  remarks: string;
  barangay: string;
}

const womenData: WomenRecord[] = [
  {
    no: 1,
    lastName: 'Ramos',
    firstName: 'Josefa',
    middleName: 'Cruz',
    birthday: '1992-04-15',
    age: 34,
    birthplace: 'Naga City',
    purok: 'Purok 1',
    active: 'Yes',
    remarks: 'Active member of women\'s organization',
    barangay: 'Pacol'
  },
  {
    no: 2,
    lastName: 'Santos',
    firstName: 'Luz',
    middleName: 'Garcia',
    birthday: '1988-09-22',
    age: 38,
    birthplace: 'Camarines Sur',
    purok: 'Purok 3',
    active: 'Yes',
    remarks: 'Regular attendee in seminars',
    barangay: 'Santa Cruz'
  },
  {
    no: 3,
    lastName: 'Mendoza',
    firstName: 'Teresa',
    middleName: 'Reyes',
    birthday: '1995-01-10',
    age: 31,
    birthplace: 'Naga City',
    purok: 'Purok 2',
    active: 'No',
    remarks: 'Inactive due to relocation',
    barangay: 'San Rafael'
  },
  {
    no: 4,
    lastName: 'Dela Cruz',
    firstName: 'Carmen',
    middleName: 'Lopez',
    birthday: '1990-11-28',
    age: 36,
    birthplace: 'Camarines Sur',
    purok: 'Purok 4',
    active: 'Yes',
    remarks: '',
    barangay: 'Malaking Ilog'
  },
  {
    no: 5,
    lastName: 'Fernandez',
    firstName: 'Gloria',
    middleName: 'Gonzales',
    birthday: '1993-06-05',
    age: 33,
    birthplace: 'Naga City',
    purok: 'Purok 5',
    active: 'Yes',
    remarks: 'Women\'s livelihood program participant',
    barangay: 'San Antonio'
  }
];

export default function BeneficiaryRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredData = womenData.filter(record => {
    const matchesSearch = searchTerm === '' || 
      `${record.firstName} ${record.middleName} ${record.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBarangay = barangayFilter === 'all' || record.barangay.toLowerCase() === barangayFilter.toLowerCase();
    const matchesActive = activeFilter === 'all' || record.active === activeFilter;

    return matchesSearch && matchesBarangay && matchesActive;
  });

  const handleRowClick = (record: WomenRecord) => {
    setSelectedResident({
      fullName: `${record.firstName} ${record.middleName} ${record.lastName}`,
      name: `${record.firstName} ${record.middleName} ${record.lastName}`,
      sex: 'Female',
      gender: 'Female',
      birthday: record.birthday,
      age: record.age,
      barangay: record.barangay,
      purok: record.purok,
      birthplace: record.birthplace,
      active: record.active,
      remarks: record.remarks
    });
    setIsPanelOpen(true);
  };

  const totalBeneficiaries = womenData.length;
  const activeCount = womenData.filter(r => r.active === 'Yes').length;
  const inactiveCount = womenData.filter(r => r.active === 'No').length;

  const handleExportToExcel = () => {
    const columnMapping = {
      no: 'No.',
      barangay: 'Barangay',
      name: 'Name',
      birthday: 'Birthday',
      age: 'Age',
      occupation: 'Occupation',
      address: 'Address',
      idNumber: 'ID Number',
      dateIssued: 'Date Issued'
    };

    exportTableToExcel(
      filteredRecords,
      'Women_Beneficiary_Records',
      columnMapping
    );
  };
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Women Beneficiary Records</h1>
        <p className="text-gray-500 mt-1">Complete database of women beneficiaries following official masterlist structure</p>
      </div>

      {/* Fund Monitoring Card */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Sector Fund Monitoring</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-rose-100 text-sm mb-1">Total Budget</p>
            <p className="text-2xl font-bold">₱1,200,000</p>
          </div>
          <div>
            <p className="text-rose-100 text-sm mb-1">Disbursed</p>
            <p className="text-2xl font-bold">₱750,000</p>
          </div>
          <div>
            <p className="text-rose-100 text-sm mb-1">Remaining</p>
            <p className="text-2xl font-bold">₱450,000</p>
          </div>
          <div>
            <p className="text-rose-100 text-sm mb-1">Utilization</p>
            <p className="text-2xl font-bold">62.5%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Beneficiaries</h3>
          <p className="text-3xl font-bold text-rose-600">{totalBeneficiaries}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Members</h3>
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Inactive Members</h3>
          <p className="text-3xl font-bold text-gray-600">{inactiveCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filters
          </h2>
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Status</label>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="all">All</option>
              <option value="Yes">Active</option>
              <option value="No">Inactive</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">First Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Middle Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Birthday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Birthplace</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Purok/Sitio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Remarks</th>
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.lastName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.firstName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.middleName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.birthday}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.age}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.birthplace}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.purok}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${record.active === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {record.active}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{record.remarks || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(record);
                      }}
                      className="text-rose-600 hover:text-rose-800"
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
            <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm">
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
        sector="Women"
        onUpdate={(data) => {
          console.log('Updated data:', data);
          setIsPanelOpen(false);
        }}
      />
    </div>
  );
}
