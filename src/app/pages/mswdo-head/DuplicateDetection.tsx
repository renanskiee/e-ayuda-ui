import { useState } from 'react';
import { Search, AlertTriangle, X } from 'lucide-react';

interface DuplicateRecord {
  id: string;
  fullName: string;
  sectors: string;
  barangay: string;
  reason: string;
}

const duplicateRecords: DuplicateRecord[] = [
  {
    id: 'DUP-001',
    fullName: 'Maria Santos',
    sectors: 'PWD / Women',
    barangay: 'Santa Cruz',
    reason: 'Same name and birthdate'
  },
  {
    id: 'DUP-002',
    fullName: 'Juan Lopez',
    sectors: 'Senior Citizen / Disaster Sector',
    barangay: 'Pacol',
    reason: 'Same address and ID number'
  },
  {
    id: 'DUP-003',
    fullName: 'Ana Ramirez',
    sectors: 'Solo Parent / Women',
    barangay: 'San Rafael',
    reason: 'Similar personal information'
  }
];

export default function DuplicateDetection() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DuplicateRecord | null>(null);

  const handleReview = (record: DuplicateRecord) => {
    setSelectedRecord(record);
    setShowReviewModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Duplicate Detection</h1>
        <p className="text-gray-500 mt-1">Identify and manage potential duplicate beneficiaries across sectors</p>
      </div>

      {/* Alert Card */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-yellow-800">Duplicate Records Detected</h3>
          <p className="text-sm text-yellow-700 mt-1">
            {duplicateRecords.length} potential duplicate records found. Please review and take appropriate action.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, barangay, or sector..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Duplicate Records Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Potential Duplicate Records</h2>
          <p className="text-sm text-gray-500 mt-1">Review and resolve duplicate beneficiary records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Record Match ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Possible Duplicate Sectors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason Flagged
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {duplicateRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.sectors}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleReview(record)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Review Duplicate Record</h2>
                <p className="text-sm text-gray-500 mt-1">Compare records and determine appropriate action</p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Record A */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Record A - {selectedRecord.sectors.split(' / ')[0]}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-sm text-gray-900">{selectedRecord.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Birthdate</label>
                      <p className="text-sm text-gray-900">January 15, 1980</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Barangay</label>
                      <p className="text-sm text-gray-900">{selectedRecord.barangay}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">ID Number</label>
                      <p className="text-sm text-gray-900">ID-2024-001</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Sector</label>
                      <p className="text-sm text-gray-900">{selectedRecord.sectors.split(' / ')[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Record B */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Record B - {selectedRecord.sectors.split(' / ')[1]}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-sm text-gray-900">{selectedRecord.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Birthdate</label>
                      <p className="text-sm text-gray-900">January 15, 1980</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Barangay</label>
                      <p className="text-sm text-gray-900">{selectedRecord.barangay}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">ID Number</label>
                      <p className="text-sm text-gray-900">ID-2024-001</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Sector</label>
                      <p className="text-sm text-gray-900">{selectedRecord.sectors.split(' / ')[1]}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Analysis */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Match Analysis</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>✓ Name match: 100%</li>
                  <li>✓ Birthdate match: Exact</li>
                  <li>✓ Barangay match: Exact</li>
                  <li>✓ ID number match: Exact</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Confirm Duplicate - Merge Records
                </button>
                <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Mark as Separate Valid Records
                </button>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
