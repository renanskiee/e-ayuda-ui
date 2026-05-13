import { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, Send, FileText, AlertTriangle, Upload, UserCheck, XCircle, X } from 'lucide-react';
import { mockApplications, mockResidents, type Application } from '../data/mockData';
import { getRequiredDocuments, type DocumentRequirement } from '../data/assistanceRequirements';

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [residentExists, setResidentExists] = useState<boolean>(false);
  const [residentCheckDone, setResidentCheckDone] = useState<boolean>(false);
  const [viewingDocument, setViewingDocument] = useState<{ type: string; fileName: string; fileUrl: string } | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    details?: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: '',
    details: ''
  });
  const [isUploadingDocuments, setIsUploadingDocuments] = useState(false);
  const [requiredDocs, setRequiredDocs] = useState<DocumentRequirement[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File | null>>({});

  // Check if resident exists in database when application is selected
  useEffect(() => {
    if (selectedApp) {
      const resident = mockResidents.find(r => r.id === selectedApp.residentId || r.fullName === selectedApp.applicantName);
      setResidentExists(!!resident);
      setResidentCheckDone(true);
    } else {
      setResidentExists(false);
      setResidentCheckDone(false);
    }
  }, [selectedApp]);

  // Update required documents when uploading for a returned application
  useEffect(() => {
    if (isUploadingDocuments && selectedApp) {
      const docs = getRequiredDocuments(selectedApp.assistanceType);
      setRequiredDocs(docs);
      // Initialize uploadedDocs with empty values
      const initialDocs: Record<string, File | null> = {};
      docs.forEach(doc => {
        initialDocs[doc.id] = null;
      });
      setUploadedDocs(initialDocs);
    }
  }, [isUploadingDocuments, selectedApp]);

  const showNotification = (type: 'success' | 'error' | 'warning', title: string, message: string, details?: string) => {
    setNotification({
      show: true,
      type,
      title,
      message,
      details
    });
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  const handleRequirementUpload = (docId: string, file: File) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: file
    }));
  };

  const removeRequirementDocument = (docId: string) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: null
    }));
  };

  const handleSubmitUpdatedDocuments = () => {
    if (!selectedApp) return;

    // Check if all required documents are uploaded
    const missingDocs = requiredDocs
      .filter(doc => doc.required && !uploadedDocs[doc.id])
      .map(doc => doc.name);

    if (missingDocs.length > 0) {
      showNotification(
        'error',
        'Missing Required Documents',
        'Please upload all required documents before submitting.',
        `Missing: ${missingDocs.join(', ')}`
      );
      return;
    }

    // Update application status
    const updatedApp = {
      ...selectedApp,
      status: 'Pending Validation',
      returnedReason: undefined,
      returnedDate: undefined,
      returnedBy: undefined
    };

    // Find and update in mockApplications
    const appIndex = mockApplications.findIndex(a => a.id === selectedApp.id);
    if (appIndex !== -1) {
      mockApplications[appIndex] = updatedApp;
    }

    showNotification(
      'success',
      'Documents Uploaded Successfully',
      `Application ${selectedApp.id} has been updated with new documents!`,
      'The application is now pending validation again.'
    );

    setIsUploadingDocuments(false);
    setSelectedApp(null);
    setUploadedDocs({});
  };

  const handleValidateApplication = () => {
    if (!selectedApp) return;

    if (!residentExists) {
      showNotification(
        'error',
        'Validation Failed',
        'Cannot validate: Resident not found in database.',
        'Please register the resident first before validating the application.'
      );
      return;
    }

    // Update application status
    const updatedApp = {
      ...selectedApp,
      status: 'Validated by Barangay',
      validatedBy: 'BSWDO Staff'
    };

    // Find and update in mockApplications
    const appIndex = mockApplications.findIndex(a => a.id === selectedApp.id);
    if (appIndex !== -1) {
      mockApplications[appIndex] = updatedApp;
    }

    showNotification(
      'success',
      'Application Validated Successfully',
      `Application ${selectedApp.id} has been validated!`,
      'Resident verified in database. You can now forward this application to MSWDO.'
    );
    setSelectedApp(updatedApp);
  };

  const handleForwardApplication = () => {
    if (!selectedApp) return;

    if (selectedApp.status !== 'Validated by Barangay') {
      showNotification(
        'error',
        'Cannot Forward Application',
        'Application must be validated first.',
        'Please validate the application before forwarding to MSWDO.'
      );
      return;
    }

    // Update application status
    const updatedApp = {
      ...selectedApp,
      status: 'Forwarded to Municipal MSWDO',
      forwardedDate: new Date().toISOString().split('T')[0]
    };

    // Find and update in mockApplications
    const appIndex = mockApplications.findIndex(a => a.id === selectedApp.id);
    if (appIndex !== -1) {
      mockApplications[appIndex] = updatedApp;
    }

    showNotification(
      'success',
      'Application Forwarded Successfully',
      `Application ${selectedApp.id} has been forwarded to Municipal MSWDO!`,
      `Forwarded to: ${selectedApp.sector} Sector on ${updatedApp.forwardedDate}`
    );
    setSelectedApp(null);
  };

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

  const sectors = ['All', 'Senior Citizen', 'PWD', 'Solo Parent', 'Women', 'Youth/Children', 'ECCD'];

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
                          onClick={() => {
                            setSelectedApp(app);
                            // Will trigger validation check via useEffect
                          }}
                          className="text-green-600 hover:text-green-800"
                          title="Validate"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {app.status === 'Validated by Barangay' && (
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            // Will show forward button in modal
                          }}
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
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Application Details</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Resident Verification Status */}
              {residentCheckDone && (
                <div className={`border rounded-lg p-4 ${
                  residentExists
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {residentExists ? (
                      <UserCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        residentExists ? 'text-green-900' : 'text-red-900'
                      }`}>
                        {residentExists
                          ? '✓ Resident Verified in Database'
                          : '✗ Resident Not Found in Database'}
                      </h4>
                      <p className={`text-sm ${
                        residentExists ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {residentExists
                          ? 'This resident exists in the system and can be validated.'
                          : 'This resident is not registered. Please register the resident before validation.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                {selectedApp.validatedBy && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Validated By</p>
                    <p className="text-gray-900">{selectedApp.validatedBy}</p>
                  </div>
                )}
                {selectedApp.forwardedDate && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Forwarded Date</p>
                    <p className="text-gray-900">{selectedApp.forwardedDate}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Reason for Request</p>
                  <p className="text-gray-900">{selectedApp.reason}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-500">Documents Submitted ({selectedApp.documents.length})</p>
                    <button
                      onClick={() => setViewingDocument({ type: 'All Documents', fileName: 'Complete Document Set', fileUrl: 'all' })}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      View All Documents
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedApp.documents.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{doc.type}</p>
                            <p className="text-xs text-gray-500 truncate">{doc.fileName}</p>
                            <button
                              onClick={() => setViewingDocument({ type: doc.type, fileName: doc.fileName, fileUrl: doc.fileUrl })}
                              className="mt-2 text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              View Document
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                {selectedApp.status === 'Pending Validation' && (
                  <button
                    onClick={handleValidateApplication}
                    disabled={!residentExists}
                    className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                      residentExists
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Validate Application
                  </button>
                )}
                {selectedApp.status === 'Validated by Barangay' && (
                  <button
                    onClick={handleForwardApplication}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Forward to MSWDO
                  </button>
                )}
                {selectedApp.status === 'Returned for Completion' && (
                  <button
                    onClick={() => setIsUploadingDocuments(true)}
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

      {/* Document Viewer Modal */}
      {viewingDocument && selectedApp && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{viewingDocument.type}</h3>
                <p className="text-sm text-gray-600">{viewingDocument.fileName}</p>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
              {viewingDocument.fileUrl === 'all' ? (
                /* View All Documents Layout */
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-1">Document Validation Review</h4>
                    <p className="text-sm text-blue-800">
                      Review all {selectedApp.documents.length} submitted documents below before validating the application.
                    </p>
                  </div>

                  {selectedApp.documents.map((doc, index) => (
                    <div key={doc.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                              <span className="text-white font-semibold text-sm">#{index + 1}</span>
                            </div>
                            <div>
                              <h5 className="text-white font-semibold">{doc.type}</h5>
                              <p className="text-blue-100 text-xs">{doc.fileName}</p>
                            </div>
                          </div>
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="bg-gray-50 rounded-lg p-8 min-h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300">
                          {doc.fileUrl === '#' ? (
                            <div className="text-center">
                              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-600 font-medium mb-1">{doc.type}</p>
                              <p className="text-sm text-gray-500">{doc.fileName}</p>
                              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                <p className="text-xs text-blue-800">
                                  Preview will show actual document in production
                                </p>
                              </div>
                            </div>
                          ) : (
                            <iframe
                              src={doc.fileUrl}
                              className="w-full h-full min-h-[300px] border-0"
                              title={doc.type}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Document View */
                <div className="bg-white rounded-lg shadow-sm p-8 min-h-[500px] flex items-center justify-center">
                  {viewingDocument.fileUrl === '#' ? (
                    <div className="text-center">
                      <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium mb-2">Document Preview</p>
                      <p className="text-sm text-gray-500 mb-4">{viewingDocument.type}</p>
                      <p className="text-xs text-gray-400">File: {viewingDocument.fileName}</p>
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          In production, this will display the actual document (PDF, Image, etc.)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={viewingDocument.fileUrl}
                      className="w-full h-full min-h-[500px] border-0"
                      title={viewingDocument.type}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {viewingDocument.fileUrl === 'all' ? (
                  <span>Viewing <span className="font-medium text-gray-800">{selectedApp.documents.length} documents</span></span>
                ) : (
                  <span>Document Type: <span className="font-medium text-gray-800">{viewingDocument.type}</span></span>
                )}
              </div>
              <div className="flex gap-3">
                {viewingDocument.fileUrl !== 'all' && (
                  <button
                    onClick={() => {
                      if (viewingDocument.fileUrl !== '#') {
                        window.open(viewingDocument.fileUrl, '_blank');
                      } else {
                        showNotification('warning', 'Feature Not Available', 'Document download will be available in production', 'This is a demo environment with sample data.');
                      }
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
                  >
                    Download
                  </button>
                )}
                <button
                  onClick={() => setViewingDocument(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {notification.show && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[70]">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeNotification}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
            {/* Header with colored accent */}
            <div className={`h-2 ${
              notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              'bg-gradient-to-r from-yellow-500 to-yellow-600'
            }`}></div>

            <div className="p-6">
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'error' ? 'bg-red-100' :
                  'bg-yellow-100'
                }`}>
                  {notification.type === 'success' && (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  )}
                  {notification.type === 'error' && (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                  {notification.type === 'warning' && (
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {notification.title}
              </h3>

              {/* Message */}
              <p className="text-gray-700 text-center mb-1">
                {notification.message}
              </p>

              {/* Details */}
              {notification.details && (
                <p className="text-sm text-gray-500 text-center mb-4">
                  {notification.details}
                </p>
              )}

              {/* Close Button */}
              <button
                onClick={closeNotification}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                  notification.type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                  notification.type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Documents Modal */}
      {isUploadingDocuments && selectedApp && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Upload Missing Documents</h2>
              <p className="text-sm text-gray-600 mt-1">
                Application: {selectedApp.id} - {selectedApp.assistanceType}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Returned Reason Alert */}
              {selectedApp.returnedReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Reason for Return</h4>
                      <p className="text-sm text-red-800">{selectedApp.returnedReason}</p>
                      <p className="text-xs text-red-700 mt-2">
                        Returned on: {selectedApp.returnedDate} by {selectedApp.returnedBy}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Document Upload Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Required Documents for {selectedApp.assistanceType}
                </h3>

                {requiredDocs.length > 0 ? (
                  <div className="space-y-4">
                    {requiredDocs.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <label className="block font-medium text-gray-900 mb-1">
                              {doc.name}
                              {doc.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {doc.description && (
                              <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                            )}
                            {uploadedDocs[doc.id] ? (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg flex-1">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span className="text-sm text-green-800 truncate">
                                    {uploadedDocs[doc.id]?.name}
                                  </span>
                                </div>
                                <button
                                  onClick={() => removeRequirementDocument(doc.id)}
                                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                                  title="Remove document"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 italic mt-2">
                                {doc.required ? 'Required - Not uploaded yet' : 'Optional - Not uploaded'}
                              </div>
                            )}
                          </div>
                          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors flex items-center gap-2 flex-shrink-0">
                            <Upload className="w-4 h-4" />
                            {uploadedDocs[doc.id] ? 'Replace' : 'Upload'}
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleRequirementUpload(doc.id, file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Loading required documents...</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsUploadingDocuments(false);
                    setUploadedDocs({});
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitUpdatedDocuments}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}