import { useState } from 'react';
import { mockApplications, type Application } from '../data/mockData';
import { Eye, Send, Check } from 'lucide-react';

export default function ForwardedApplications() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [assignedSector, setAssignedSector] = useState('');

  const validatedApplications = mockApplications.filter(
    app => app.status === 'Validated by Barangay'
  );

  const forwardedApplications = mockApplications.filter(
    app => app.status === 'Forwarded to Municipal MSWDO' || app.status === 'Approved by MSWDO'
  );

  const handleForward = (app: Application) => {
    setSelectedApp(app);
    setShowForwardModal(true);
    setAssignedSector(app.sector);
  };

  const confirmForward = () => {
    alert(`Application ${selectedApp?.id} forwarded to MSWDO\nAssigned Sector: ${assignedSector}`);
    setShowForwardModal(false);
    setSelectedApp(null);
    setAssignedSector('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Forwarded Applications</h1>
        <p className="text-gray-500 mt-1">Forward validated applications to MSWDO and track their status</p>
      </div>

      {/* Ready to Forward Section */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Ready to Forward ({validatedApplications.length})
          </h2>
          <p className="text-sm text-gray-600 mt-1">Applications validated and ready to be sent to MSWDO</p>
        </div>

        {validatedApplications.length > 0 ? (
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
                    Validated By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {validatedApplications.map((app) => (
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
                      {app.validatedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleForward(app)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Forward to MSWDO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Check className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No applications ready to forward</p>
          </div>
        )}
      </div>

      {/* Already Forwarded Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Forwarded to MSWDO ({forwardedApplications.length})
          </h2>
          <p className="text-sm text-gray-600 mt-1">Track applications sent to Municipal SWDO</p>
        </div>

        {forwardedApplications.length > 0 ? (
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
                    Forwarded Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forwardedApplications.map((app) => (
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
                      {app.forwardedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Approved by MSWDO' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Send className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No forwarded applications yet</p>
          </div>
        )}
      </div>

      {/* Forward to MSWDO Modal */}
      {showForwardModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full">
            <div className="bg-purple-600 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Forward to MSWDO</h2>
              <p className="text-sm text-purple-100 mt-1">{selectedApp.id} - {selectedApp.applicantName}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Application ID:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedApp.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applicant:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedApp.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Assistance Type:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedApp.assistanceType}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign to Sector *
                </label>
                <select
                  value={assignedSector}
                  onChange={(e) => setAssignedSector(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Senior Citizen">Senior Citizen Sector</option>
                  <option value="PWD">PWD Sector</option>
                  <option value="Solo Parent">Solo Parent Sector</option>
                  <option value="Women">Women Sector</option>
                  <option value="Youth">Youth Sector</option>
                  <option value="Disaster Affected">Disaster Response Sector</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Once forwarded, this application will be sent to the Municipal SWDO 
                  and assigned to the selected sector for processing.
                </p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowForwardModal(false);
                    setSelectedApp(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmForward}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Confirm Forward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Application Modal */}
      {selectedApp && !showForwardModal && (
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
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    selectedApp.status === 'Approved by MSWDO' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedApp.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Applicant Name</p>
                  <p className="text-gray-900">{selectedApp.applicantName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sector</p>
                  <p className="text-gray-900">{selectedApp.sector}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Forwarded Date</p>
                  <p className="text-gray-900">{selectedApp.forwardedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Validated By</p>
                  <p className="text-gray-900">{selectedApp.validatedBy}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Assistance Type</p>
                  <p className="text-gray-900">{selectedApp.assistanceType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="text-gray-900">{selectedApp.reason}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}