import { useState } from 'react';
import { Search, Edit, Save } from 'lucide-react';

const beneficiaries = [
  { id: "YC-1001", name: "Mark Dela Cruz", gender: "Male", age: 16, barangay: "Pacol", schoolName: "San Pascual National High School", gradeLevel: "Grade 10", assistanceReceived: "Educational Assistance", dateApproved: "Mar 12 2026", status: "Active" },
  { id: "YC-1002", name: "Jenny Santos", gender: "Female", age: 14, barangay: "Santa Cruz", schoolName: "San Pascual Elementary School", gradeLevel: "Grade 8", assistanceReceived: "Scholarship Support", dateApproved: "Mar 10 2026", status: "Active" },
  { id: "YC-1003", name: "Ryan Flores", gender: "Male", age: 17, barangay: "San Rafael", schoolName: "San Pascual National High School", gradeLevel: "Grade 11", assistanceReceived: "Educational Assistance", dateApproved: "Mar 8 2026", status: "Active" }
];

export default function BeneficiaryRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<typeof beneficiaries[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (beneficiary: typeof beneficiaries[0]) => {
    setSelectedBeneficiary(beneficiary);
    setIsEditing(false);
  };

  const handleSave = () => {
    alert('Beneficiary information updated successfully!');
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sector Beneficiary Records</h1>
        <p className="text-gray-500 mt-1">Complete database of youth sector beneficiaries</p>
      </div>

      {!selectedBeneficiary ? (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Beneficiaries</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">All Beneficiary Records</h2>
              <p className="text-sm text-gray-500 mt-1">Total: {beneficiaries.length} records</p>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.barangay}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.schoolName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.assistanceReceived}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.dateApproved}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{beneficiary.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button onClick={() => handleView(beneficiary)} className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                        <button onClick={() => { handleView(beneficiary); setIsEditing(true); }} className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Resident Profile</h2>
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><Edit className="w-4 h-4" />Edit Information</button>
                  <button onClick={() => setSelectedBeneficiary(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Back to List</button>
                </>
              ) : (
                <>
                  <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"><Save className="w-4 h-4" />Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  {isEditing ? <input type="text" defaultValue={selectedBeneficiary.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> : <p className="text-gray-900">{selectedBeneficiary.name}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-500 mb-1">Gender</label><p className="text-gray-900">{selectedBeneficiary.gender}</p></div>
                  <div><label className="block text-sm font-medium text-gray-500 mb-1">Age</label><p className="text-gray-900">{selectedBeneficiary.age}</p></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-500 mb-1">Barangay</label><p className="text-gray-900">{selectedBeneficiary.barangay}</p></div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Student Information</h3>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-500 mb-1">School Name</label><p className="text-gray-900">{selectedBeneficiary.schoolName}</p></div>
                  <div><label className="block text-sm font-medium text-gray-500 mb-1">Grade Level</label><p className="text-gray-900">{selectedBeneficiary.gradeLevel}</p></div>
                  <div><label className="block text-sm font-medium text-gray-500 mb-1">Student ID Number</label><p className="text-gray-900">SPNHS-2024-1234</p></div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Assistance History</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div><p className="font-medium text-gray-900">Educational Assistance</p><p className="text-sm text-gray-500">March 2026</p></div>
                      <p className="font-semibold text-gray-900">₱4,000</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div><p className="font-medium text-gray-900">School Supplies Support</p><p className="text-sm text-gray-500">January 2026</p></div>
                      <p className="font-semibold text-gray-900">₱2,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
