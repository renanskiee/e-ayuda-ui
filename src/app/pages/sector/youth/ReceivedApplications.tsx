import { useState } from 'react';
import { Search, Eye, X, CheckCircle, XCircle, AlertTriangle, FileText, Upload } from 'lucide-react';
import { youthApplications } from '../../../data/sectorData';

export default function ReceivedApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarangay, setFilterBarangay] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestDocsModal, setShowRequestDocsModal] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [requestedDocuments, setRequestedDocuments] = useState('');
  const [viewingDocument, setViewingDocument] = useState<{ name: string; type: string } | null>(null);
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

  const filteredApplications = youthApplications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarangay = !filterBarangay || app.barangay === filterBarangay;
    const matchesStatus = !filterStatus || app.status === filterStatus;
    return matchesSearch && matchesBarangay && matchesStatus;
  });

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleApproveApplication = () => {
    if (!approvalNotes.trim()) {
      showNotification('error', 'Missing Information', 'Please provide approval notes before forwarding the application.');
      return;
    }

    showNotification(
      'success',
      'Application Forwarded to MSWDO',
      `Application ${selectedApplication.id} has been forwarded to MSWDO Focal Persons for final approval!`,
      `The application will appear in the MSWDO dashboard for final review and approval.`
    );

    setShowApproveModal(false);
    setShowModal(false);
    setApprovalNotes('');
    setSelectedApplication(null);
  };

  const handleRejectApplication = () => {
    if (!rejectionReason.trim()) {
      showNotification('error', 'Missing Information', 'Please provide a reason for rejection.');
      return;
    }

    showNotification(
      'error',
      'Application Rejected',
      `Application ${selectedApplication.id} has been rejected.`,
      `The applicant ${selectedApplication.applicantName} will be notified with the reason provided.`
    );

    setShowRejectModal(false);
    setShowModal(false);
    setRejectionReason('');
    setSelectedApplication(null);
  };

  const handleRequestDocuments = () => {
    if (!requestedDocuments.trim()) {
      showNotification('error', 'Missing Information', 'Please specify which documents are required.');
      return;
    }

    showNotification(
      'warning',
      'Documents Requested',
      `Request sent for Application ${selectedApplication.id}`,
      `The barangay office will be notified to provide the requested documents.`
    );

    setShowRequestDocsModal(false);
    setShowModal(false);
    setRequestedDocuments('');
    setSelectedApplication(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Received Applications</h1>
        <p className="text-gray-500 mt-1">Applications forwarded from barangay BSWDO offices</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Name or ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applicant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Barangay
            </label>
            <select
              value={filterBarangay}
              onChange={(e) => setFilterBarangay(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Barangays</option>
              <option value="Pacol">Pacol</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="San Rafael">San Rafael</option>
              <option value="San Antonio">San Antonio</option>
              <option value="Malaking Ilog">Malaking Ilog</option>
              <option value="Poblacion">Poblacion</option>
              <option value="San Isidro">San Isidro</option>
              <option value="Bagumbayan">Bagumbayan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Applications</h2>
              <p className="text-sm text-gray-500 mt-1">Total: {filteredApplications.length} applications</p>
            </div>
          </div>
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
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disability Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.disabilityType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱{application.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleViewDetails(application)}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-800">Review & Evaluate Application</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Evaluation Guidelines</h4>
                    <p className="text-sm text-blue-800">
                      Review all application details and submitted documents carefully. Ensure the applicant meets the eligibility criteria for the requested assistance program before making a decision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Application ID</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Submission Date</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.submissionDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Applicant Name</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Age</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Gender</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Barangay</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.barangay}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Disability Type</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.disabilityType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Assistance Type</label>
                  <p className="mt-1 text-gray-900">{selectedApplication.assistanceType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Requested Amount</label>
                  <p className="mt-1 text-gray-900 font-semibold">₱{selectedApplication.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedApplication.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedApplication.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Submitted Documents Section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Submitted Documents</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">PWD ID</span>
                      <button
                        onClick={() => setViewingDocument({ name: 'PWD ID', type: 'PWD_ID.pdf' })}
                        className="ml-auto text-blue-600 hover:text-blue-800 text-xs"
                      >
                        View
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Medical Certificate</span>
                      <button
                        onClick={() => setViewingDocument({ name: 'Medical Certificate', type: 'Medical_Certificate.pdf' })}
                        className="ml-auto text-blue-600 hover:text-blue-800 text-xs"
                      >
                        View
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Barangay Certificate</span>
                      <button
                        onClick={() => setViewingDocument({ name: 'Barangay Certificate', type: 'Barangay_Certificate.pdf' })}
                        className="ml-auto text-blue-600 hover:text-blue-800 text-xs"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowRequestDocsModal(true);
                  }}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Request Documents
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowRejectModal(true);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowApproveModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Forward to MSWDO for Final Approval</h3>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  This application will be forwarded to MSWDO Focal Persons for final approval. The MSWDO Head will review and make the final decision.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Application ID: <span className="font-semibold text-gray-900">{selectedApplication.id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Applicant: <span className="font-semibold text-gray-900">{selectedApplication.applicantName}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector Staff Notes *
                </label>
                <textarea
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  rows={4}
                  placeholder="Enter notes for MSWDO review (e.g., verification details, recommendations)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowApproveModal(false);
                    setShowModal(true);
                    setApprovalNotes('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApproveApplication}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Forward to MSWDO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Reject Application</h3>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Application ID: <span className="font-semibold text-gray-900">{selectedApplication.id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Applicant: <span className="font-semibold text-gray-900">{selectedApplication.applicantName}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  placeholder="Enter the reason for rejecting this application..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setShowModal(true);
                    setRejectionReason('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectApplication}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Documents Modal */}
      {showRequestDocsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Request Additional Documents</h3>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Application ID: <span className="font-semibold text-gray-900">{selectedApplication.id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Applicant: <span className="font-semibold text-gray-900">{selectedApplication.applicantName}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Documents *
                </label>
                <textarea
                  value={requestedDocuments}
                  onChange={(e) => setRequestedDocuments(e.target.value)}
                  rows={4}
                  placeholder="List the additional documents or corrections needed..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  The barangay office will be notified to provide these documents.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowRequestDocsModal(false);
                    setShowModal(true);
                    setRequestedDocuments('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestDocuments}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {notification.show && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[70]">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeNotification}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
            <div className={`h-2 ${
              notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              'bg-gradient-to-r from-yellow-500 to-yellow-600'
            }`}></div>

            <div className="p-6">
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

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {notification.title}
              </h3>

              <p className="text-gray-700 text-center mb-1">
                {notification.message}
              </p>

              {notification.details && (
                <p className="text-sm text-gray-500 text-center mb-4">
                  {notification.details}
                </p>
              )}

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

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[80] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{viewingDocument.name}</h3>
                <p className="text-sm text-gray-600">{viewingDocument.type}</p>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
              <div className="bg-white rounded-lg shadow-sm p-8 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">Document Preview</p>
                  <p className="text-sm text-gray-500 mb-4">{viewingDocument.name}</p>
                  <p className="text-xs text-gray-400">File: {viewingDocument.type}</p>
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      In production, this will display the actual document (PDF, Image, etc.)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Document Type: <span className="font-medium text-gray-800">{viewingDocument.name}</span>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
