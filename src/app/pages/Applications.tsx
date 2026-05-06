import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, Send, FileText, AlertTriangle, Upload } from 'lucide-react';
import { mockApplications, type Application } from '../data/mockData';

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSector = sectorFilter === 'All' || app.sector === sectorFilter;

    return matchesSearch && matchesStatus && matchesSector;
  });

  // Separate returned applications
  const returnedApplications = filteredApplications.filter(app => app.status === 'Returned for Completion');
  const otherApplications = filteredApplications.filter(app => app.status !== 'Returned for Completion');

  const sectors = ['All', 'Senior Citizen', 'PWD', 'Solo Parent', 'Women', 'Youth', 'Disaster Affected'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Applications</h1>
        <p className="text-gray-500 mt-1">View and manage all assistance applications</p>
      </div>

      {/* Returned Applications Alert */}
      {returnedApplications.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                {returnedApplications.length} Application{returnedApplications.length !== 1 ? 's' : ''} Returned by MSWDO
              </h3>
              <p className="text-sm text-red-800 mb-3">
                The following applications have been returned for completion. Please review and upload the required documents.
              </p>
              <div className="space-y-2">
                {returnedApplications.map((app) => (
                  <div key={app.id} className="bg-white border border-red-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{app.id} - {app.applicantName}</p>
                        <p className="text-sm text-gray-600 mt-1">{app.assistanceType}</p>
                        {app.returnedReason && (
                          <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-800">
                            <strong>Reason:</strong> {app.returnedReason}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          Returned on: {app.returnedDate} by {app.returnedBy}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 flex-shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by applicant name or application ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Pending Validation">Pending Validation</option>
                <option value="Validated by Barangay">Validated</option>
                <option value="Forwarded to Municipal MSWDO">Forwarded</option>
                <option value="Approved by MSWDO">Approved</option>
                <option value="Returned for Completion">Returned</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
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
              {otherApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {app.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.submissionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Pending Validation' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Validated by Barangay' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Forwarded to Municipal MSWDO' ? 'bg-purple-100 text-purple-800' :
                      app.status === 'Returned for Completion' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {app.status}
                    </span>
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
                      {app.status === 'Pending Validation' && (
                        <button 
                          className="text-green-600 hover:text-green-800"
                          title="Validate"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {app.status === 'Validated by Barangay' && (
                        <button 
                          className="text-purple-600 hover:text-purple-800"
                          title="Forward to MSWDO"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No applications found</p>
          </div>
        )}
      </div>

      {/* View Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Application Details</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Returned Status Alert */}
              {selectedApp.status === 'Returned for Completion' && selectedApp.returnedReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Application Returned by MSWDO</h4>
                      <p className="text-sm text-red-800 mb-2">{selectedApp.returnedReason}</p>
                      <p className="text-xs text-red-700">
                        Returned on: {selectedApp.returnedDate} by {selectedApp.returnedBy}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Application ID</p>
                  <p className="text-gray-900 font-medium">{selectedApp.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    selectedApp.status === 'Pending Validation' ? 'bg-yellow-100 text-yellow-800' :
                    selectedApp.status === 'Validated by Barangay' ? 'bg-blue-100 text-blue-800' :
                    selectedApp.status === 'Forwarded to Municipal MSWDO' ? 'bg-purple-100 text-purple-800' :
                    selectedApp.status === 'Returned for Completion' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedApp.status}
                  </span>
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
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="text-gray-900">{selectedApp.submissionDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Reason for Request</p>
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
                {selectedApp.status === 'Returned for Completion' && (
                  <button
                    onClick={() => alert('Upload additional documents feature will be implemented')}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Missing Documents
                  </button>
                )}
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