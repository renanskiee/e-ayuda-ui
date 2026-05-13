import { Search, Filter, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { ResidentProfilePanel } from '../../../components/ResidentProfilePanel';
import { exportTableToExcel } from '../../../utils/excelExport';

interface SeniorCitizenRecord {
  no: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthday: string;
  age: number;
  birthplace: string;
  sex: 'M' | 'F';
  status: string;
  purok: string;
  idNumber: string;
  dateIssued: string;
  placeOfIssue: string;
  pensioner: 'Yes' | 'No';
  pwd: string;
  fourPs: string;
  sp: string;
  nationalId: string;
  remarks: string;
  barangay: string;
}

const seniorCitizenData: SeniorCitizenRecord[] = [
  {
    no: 1,
    lastName: 'Garcia',
    firstName: 'Pedro',
    middleName: 'Santos',
    birthday: '1952-03-15',
    age: 74,
    birthplace: 'Naga City',
    sex: 'M',
    status: 'Active',
    purok: 'Purok 1',
    idNumber: 'SC-2024-001',
    dateIssued: '2024-01-10',
    placeOfIssue: 'Naga City',
    pensioner: 'Yes',
    pwd: 'No',
    fourPs: 'No',
    sp: 'No',
    nationalId: '1234-5678-9012',
    remarks: 'Regular checkups',
    barangay: 'Pacol'
  },
  {
    no: 2,
    lastName: 'Cruz',
    firstName: 'Elena',
    middleName: 'Reyes',
    birthday: '1955-07-22',
    age: 71,
    birthplace: 'Camarines Sur',
    sex: 'F',
    status: 'Active',
    purok: 'Purok 3',
    idNumber: 'SC-2024-002',
    dateIssued: '2024-01-15',
    placeOfIssue: 'Naga City',
    pensioner: 'No',
    pwd: 'Yes',
    fourPs: 'No',
    sp: 'Yes',
    nationalId: '2234-5678-9013',
    remarks: 'Hearing impaired',
    barangay: 'Santa Cruz'
  },
  {
    no: 3,
    lastName: 'Reyes',
    firstName: 'Ramon',
    middleName: 'Dela Cruz',
    birthday: '1950-12-05',
    age: 76,
    birthplace: 'Naga City',
    sex: 'M',
    status: 'Active',
    purok: 'Purok 2',
    idNumber: 'SC-2024-003',
    dateIssued: '2024-01-20',
    placeOfIssue: 'Naga City',
    pensioner: 'Yes',
    pwd: 'No',
    fourPs: 'No',
    sp: 'No',
    nationalId: '3234-5678-9014',
    remarks: '',
    barangay: 'San Rafael'
  },
  {
    no: 4,
    lastName: 'Santos',
    firstName: 'Maria',
    middleName: 'Lopez',
    birthday: '1953-09-18',
    age: 73,
    birthplace: 'Camarines Sur',
    sex: 'F',
    status: 'Active',
    purok: 'Purok 4',
    idNumber: 'SC-2024-004',
    dateIssued: '2024-02-01',
    placeOfIssue: 'Naga City',
    pensioner: 'No',
    pwd: 'No',
    fourPs: 'Yes',
    sp: 'No',
    nationalId: '4234-5678-9015',
    remarks: '4Ps beneficiary',
    barangay: 'Malaking Ilog'
  },
  {
    no: 5,
    lastName: 'Gonzales',
    firstName: 'Jose',
    middleName: 'Mendoza',
    birthday: '1954-04-30',
    age: 72,
    birthplace: 'Naga City',
    sex: 'M',
    status: 'Active',
    purok: 'Purok 1',
    idNumber: 'SC-2024-005',
    dateIssued: '2024-02-10',
    placeOfIssue: 'Naga City',
    pensioner: 'Yes',
    pwd: 'Yes',
    fourPs: 'No',
    sp: 'No',
    nationalId: '5234-5678-9016',
    remarks: 'Mobility impaired, pensioner',
    barangay: 'San Antonio'
  }
];

export default function BeneficiaryRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('all');
  const [pensionerFilter, setPensionerFilter] = useState('all');
  const [pwdFilter, setPwdFilter] = useState('all');
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredData = seniorCitizenData.filter(record => {
    const matchesSearch = searchTerm === '' || 
      `${record.firstName} ${record.middleName} ${record.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.idNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBarangay = barangayFilter === 'all' || record.barangay.toLowerCase() === barangayFilter.toLowerCase();
    const matchesPensioner = pensionerFilter === 'all' || record.pensioner === pensionerFilter;
    const matchesPwd = pwdFilter === 'all' || 
      (pwdFilter === 'Yes' && record.pwd === 'Yes') ||
      (pwdFilter === 'No' && record.pwd === 'No');

    return matchesSearch && matchesBarangay && matchesPensioner && matchesPwd;
  });

  const handleRowClick = (record: SeniorCitizenRecord) => {
    setSelectedResident({
      fullName: `${record.firstName} ${record.middleName} ${record.lastName}`,
      sex: record.sex === 'M' ? 'Male' : 'Female',
      birthday: record.birthday,
      age: record.age,
      barangay: record.barangay,
      purok: record.purok,
      idNumber: record.idNumber,
      pensioner: record.pensioner,
      pwd: record.pwd,
      fourPs: record.fourPs,
      remarks: record.remarks,
      birthplace: record.birthplace,
      status: record.status
    });
    setIsPanelOpen(true);
  };

  const handleExportToExcel = () => {
    const columnMapping = {
      no: 'No.',
      lastName: 'Last Name',
      firstName: 'First Name',
      middleName: 'Middle Name',
      birthday: 'Birthday',
      age: 'Age',
      birthplace: 'Birthplace',
      sex: 'Sex',
      status: 'Status',
      purok: 'Purok',
      idNumber: 'ID Number',
      dateIssued: 'Date Issued',
      placeOfIssue: 'Place of Issue',
      pensioner: 'Pensioner',
      pwd: 'PWD',
      fourPs: '4Ps',
      sp: 'Solo Parent',
      nationalId: 'National ID',
      remarks: 'Remarks',
      barangay: 'Barangay'
    };

    exportTableToExcel(
      filteredRecords,
      'Senior_Citizen_Beneficiary_Records',
      columnMapping
    );
  };

  // Calculate stats
  const totalBeneficiaries = seniorCitizenData.length;
  const totalPensioners = seniorCitizenData.filter(r => r.pensioner === 'Yes').length;
  const totalPwd = seniorCitizenData.filter(r => r.pwd === 'Yes').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Senior Citizen Beneficiary Records</h1>
        <p className="text-gray-500 mt-1">Complete database of senior citizen beneficiaries following official masterlist structure</p>
      </div>

      {/* Fund Monitoring Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Sector Fund Monitoring</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Total Budget</p>
            <p className="text-2xl font-bold">₱2,500,000</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Disbursed</p>
            <p className="text-2xl font-bold">₱1,850,000</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Remaining</p>
            <p className="text-2xl font-bold">₱650,000</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Utilization</p>
            <p className="text-2xl font-bold">74%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Beneficiaries</h3>
          <p className="text-3xl font-bold text-blue-600">{totalBeneficiaries}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pensioners</h3>
          <p className="text-3xl font-bold text-green-600">{totalPensioners}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">PWD Tagged</h3>
          <p className="text-3xl font-bold text-orange-600">{totalPwd}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name/ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Pensioner Status</label>
            <select
              value={pensionerFilter}
              onChange={(e) => setPensionerFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="Yes">Pensioner</option>
              <option value="No">Non-Pensioner</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PWD Status</label>
            <select
              value={pwdFilter}
              onChange={(e) => setPwdFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="Yes">PWD</option>
              <option value="No">Non-PWD</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Middle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Birthday</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sex</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Purok/Sitio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pensioner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">PWD</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">4Ps</th>
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
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs ${record.sex === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {record.sex}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.purok}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.idNumber}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${record.pensioner === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {record.pensioner}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.pwd}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.fourPs}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{record.remarks || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(record);
                      }}
                      className="text-blue-600 hover:text-blue-800"
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
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
        sector="Senior Citizen"
        onUpdate={(data) => {
          console.log('Updated data:', data);
          setIsPanelOpen(false);
        }}
      />
    </div>
  );
}
