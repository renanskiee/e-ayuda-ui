import { useState } from 'react';
import { mockApplications, mockResidents, type Application, type Resident } from '../data/mockData';
import { CheckCircle, XCircle, FileQuestion, Eye, FileText, Search, UserCheck, AlertTriangle } from 'lucide-react';

export default function ValidationQueue() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [matchedResident, setMatchedResident] = useState<Resident | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'found' | 'not-found'>('idle');

  const pendingApplications = mockApplications.filter(
    app => app.status === 'Pending Validation'
  );

  const handleValidate = (app: Application) => {
    setSelectedApp(app);
    setShowValidationForm(true);
    // Automatically scan for resident when validation starts
    handleScanDatabase(app);
  };

  const handleScanDatabase = (app: Application) => {
    setScanStatus('scanning');
    
    // Simulate scanning delay
    setTimeout(() => {
      // Search for matching resident by name
      const found = mockResidents.find(
        resident => resident.fullName.toLowerCase() === app.applicantName.toLowerCase()
      );
      
      if (found) {
        setMatchedResident(found);
        setScanStatus('found');
      } else {
        setMatchedResident(null);
        setScanStatus('not-found');
      }
    }, 800);
  };

  const handleApprove = () => {
    alert(`Application ${selectedApp?.id} validated successfully!\nStatus changed to: Validated by Barangay`);
    setShowValidationForm(false);
    setSelectedApp(null);
  };

  const handleReject = () => {
    const reason = prompt('Enter reason for rejection:');
    if (reason) {
      alert(`Application ${selectedApp?.id} rejected.\nReason: ${reason}`);
      setShowValidationForm(false);
      setSelectedApp(null);
    }
  };

  const handleRequestDocs = () => {
    alert(`Request sent to ${selectedApp?.applicantName} for additional documents.`);
    setShowValidationForm(false);
    setSelectedApp(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Validation Queue</h1>
        <p className="text-gray-500 mt-1">Review and validate applications before forwarding to MSWDO</p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Validation Steps:</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Check resident identity</li>
          <li>Check document completeness</li>
          <li>Confirm assistance eligibility</li>
          <li>Verify sector classification</li>
        </ul>
      </div>

      {/* Pending Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Pending Applications ({pendingApplications.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {app.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.submissionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.documents.length} files
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleValidate(app)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Validate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pendingApplications.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
            <p className="text-gray-500">No pending applications for validation</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedApp && !showValidationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Application Details</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Application ID</p>
                  <p className="text-gray-900 font-medium">{selectedApp.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Applicant Name</p>
                  <p className="text-gray-900 font-medium">{selectedApp.applicantName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sector</p>
                  <p className="text-gray-900">{selectedApp.sector}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assistance Type</p>
                  <p className="text-gray-900">{selectedApp.assistanceType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="text-gray-900">{selectedApp.reason}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-2">Documents Submitted</p>
                  <div className="space-y-2">
                    {selectedApp.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                            <p className="text-xs text-gray-500">{doc.fileName}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleValidate(selectedApp)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation Form Modal */}
      {showValidationForm && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Validate Application</h2>
              <p className="text-sm text-blue-100 mt-1">{selectedApp.id} - {selectedApp.applicantName}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Database Scan Results */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    Resident Database Verification
                  </h3>
                  <button
                    onClick={() => handleScanDatabase(selectedApp)}
                    disabled={scanStatus === 'scanning'}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Search className="w-3 h-3" />
                    {scanStatus === 'scanning' ? 'Scanning...' : 'Re-scan'}
                  </button>
                </div>

                {scanStatus === 'scanning' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    Scanning resident database...
                  </div>
                )}

                {scanStatus === 'found' && matchedResident && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <UserCheck className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-green-800 mb-2">✓ Resident Found in Database</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Resident ID:</p>
                            <p className="font-medium text-gray-900">{matchedResident.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Full Name:</p>
                            <p className="font-medium text-gray-900">{matchedResident.fullName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Age:</p>
                            <p className="font-medium text-gray-900">{matchedResident.age} years old</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Sector:</p>
                            <p className="font-medium text-gray-900">{matchedResident.sector}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-600">Address:</p>
                            <p className="font-medium text-gray-900">{matchedResident.address}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Contact:</p>
                            <p className="font-medium text-gray-900">{matchedResident.contactNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Registered:</p>
                            <p className="font-medium text-gray-900">{matchedResident.dateRegistered || 'N/A'}</p>
                          </div>
                        </div>
                        {matchedResident.documents && matchedResident.documents.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-gray-600 text-sm mb-1">Documents on file: {matchedResident.documents.length}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {scanStatus === 'not-found' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-800 mb-1">⚠ Resident Not Found in Database</p>
                        <p className="text-sm text-yellow-700">
                          This applicant is not registered in the Residents Database. You may need to:
                        </p>
                        <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                          <li>Verify the applicant's identity manually</li>
                          <li>Register the resident in the database first</li>
                          <li>Check for name spelling variations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {scanStatus === 'idle' && (
                  <div className="text-sm text-gray-500 text-center py-2">
                    Click "Re-scan" to verify applicant in resident database
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Validation Checklist</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                    <span className="text-sm text-gray-700">Resident identity verified</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                    <span className="text-sm text-gray-700">All required documents complete</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                    <span className="text-sm text-gray-700">Assistance eligibility confirmed</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                    <span className="text-sm text-gray-700">Sector classification verified</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validation Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Add any notes or observations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowValidationForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestDocs}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
                >
                  <FileQuestion className="w-5 h-5" />
                  Request Documents
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve for Forwarding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}