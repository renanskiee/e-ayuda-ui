import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const duplicates = [
  { id: "DUP-001", fullName: "Maria Santos", sectors: "PWD / Women", barangay: "Santa Cruz", reason: "Same name and birthdate", status: "Pending" },
  { id: "DUP-002", fullName: "Juan Lopez", sectors: "Senior Citizen / Disaster Sector", barangay: "Pacol", reason: "Same address and ID number", status: "Pending" },
  { id: "DUP-003", fullName: "Ana Ramirez", sectors: "Solo Parent / Women", barangay: "San Rafael", reason: "Similar personal information", status: "Pending" }
];

export default function DuplicateDetection() {
  const [selectedDuplicate, setSelectedDuplicate] = useState<typeof duplicates[0] | null>(null);

  const handleReview = (duplicate: typeof duplicates[0]) => {
    setSelectedDuplicate(duplicate);
  };

  const handleConfirmDuplicate = () => {
    alert('Record marked as duplicate and will be merged.');
    setSelectedDuplicate(null);
  };

  const handleMarkSeparate = () => {
    alert('Records marked as valid separate entries.');
    setSelectedDuplicate(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Duplicate Detection</h1>
        <p className="text-gray-500 mt-1">Identify and resolve potential duplicate beneficiary records across sectors</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-yellow-800">Duplicate Detection Active</p>
          <p className="text-sm text-yellow-700 mt-1">The system has identified {duplicates.length} potential duplicate records that require review to ensure data integrity and prevent multiple assistance claims.</p>
        </div>
      </div>

      {!selectedDuplicate ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Potential Duplicate Records</h2>
            <p className="text-sm text-gray-500 mt-1">{duplicates.length} record(s) flagged for review</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Match ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Possible Duplicate Sectors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason Flagged</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {duplicates.map((duplicate) => (
                  <tr key={duplicate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{duplicate.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{duplicate.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{duplicate.sectors}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{duplicate.barangay}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{duplicate.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">{duplicate.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => handleReview(duplicate)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Review Duplicate Record</h2>
              <p className="text-sm text-gray-500 mt-1">Compare records to determine if they are duplicates</p>
            </div>
            <button onClick={() => setSelectedDuplicate(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Primary Record */}
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Primary Record</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-medium">{selectedDuplicate.fullName}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Birthdate</label>
                    <p className="text-gray-900">January 15, 1980</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Barangay</label>
                    <p className="text-gray-900">{selectedDuplicate.barangay}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">ID Number</label>
                    <p className="text-gray-900">12-3456789-0</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Sector</label>
                    <p className="text-gray-900">{selectedDuplicate.sectors.split(' / ')[0]}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Program</label>
                    <p className="text-gray-900">Medical Aid Program</p>
                  </div>
                </div>
              </div>

              {/* Possible Duplicate Record */}
              <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Possible Duplicate Record</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-medium">{selectedDuplicate.fullName}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Birthdate</label>
                    <p className="text-gray-900">January 15, 1980</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Barangay</label>
                    <p className="text-gray-900">{selectedDuplicate.barangay}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">ID Number</label>
                    <p className="text-gray-900">12-3456789-0</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Sector</label>
                    <p className="text-gray-900">{selectedDuplicate.sectors.split(' / ')[1]}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <label className="text-xs font-medium text-gray-500">Program</label>
                    <p className="text-gray-900">Livelihood Support Program</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-800 mb-1">Reason Flagged:</p>
              <p className="text-sm text-yellow-700">{selectedDuplicate.reason}</p>
            </div>

            <div className="mt-6 flex gap-4 justify-end">
              <button onClick={() => setSelectedDuplicate(null)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">Cancel</button>
              <button onClick={handleMarkSeparate} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">Mark as Valid Separate Records</button>
              <button onClick={handleConfirmDuplicate} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">Confirm Duplicate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
