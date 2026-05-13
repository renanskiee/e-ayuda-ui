import { Eye, CheckCircle, XCircle, X, FileText, AlertTriangle, Bell, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { applicationStore, Application } from '../../utils/applicationStore';
import { BeneficiaryQRCode } from '../../components/BeneficiaryQRCode';

export default function AwaitingApproval() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Load applications from store
  useEffect(() => {
    const loadApplications = async () => {
      const recommended = await applicationStore.getByStatus('Recommended');
      setApplications(recommended);
    };

    loadApplications();
    const unsubscribe = applicationStore.subscribe(loadApplications);
    return unsubscribe;
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [approvalRemarks, setApprovalRemarks] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [viewingDocument, setViewingDocument] = useState<{ name: string; type: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [approvedApp, setApprovedApp] = useState<Application | null>(null);
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

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleFinalApproval = async () => {
    if (!approvalRemarks.trim()) {
      showNotification('error', 'Missing Information', 'Please provide final approval remarks.');
      return;
    }

    if (!selectedApplication) return;

    setIsProcessing(true);

    try {
      // Get current user from localStorage
      const currentUser = localStorage.getItem('username') || 'head-001';

      // Approve application in store (async - generates QR code and sends SMS)
      const success = await applicationStore.approveApplication(selectedApplication.id, currentUser);

      if (success) {
        // Get updated application with QR code
        const updatedApp = await applicationStore.getById(selectedApplication.id);

        if (updatedApp) {
          setApprovedApp(updatedApp);
        }

        showNotification(
          'success',
          'Application Finally Approved',
          `Application ${selectedApplication.id} has been given final approval!`,
          `QR code generated and SMS notification sent to ${selectedApplication.applicantName}.`
        );

        setShowApproveModal(false);
        setShowModal(false);
        setApprovalRemarks('');
        setSelectedApplication(null);

        // Show QR code modal
        if (updatedApp) {
          setTimeout(() => {
            setShowQRModal(true);
          }, 500);
        }
      } else {
        showNotification(
          'error',
          'Approval Failed',
          'Unable to approve application. Please try again.'
        );
      }
    } catch (error) {
      console.error('Approval error:', error);
      showNotification(
        'error',
        'Approval Failed',
        'An error occurred during approval. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinalRejection = async () => {
    if (!rejectionReason.trim()) {
      showNotification('error', 'Missing Information', 'Please provide a reason for rejection.');
      return;
    }

    if (!selectedApplication) return;

    setIsProcessing(true);

    try {
      // Reject application in store (async - sends SMS notification)
      const success = await applicationStore.rejectApplication(selectedApplication.id, rejectionReason);

      if (success) {
        showNotification(
          'error',
          'Application Rejected',
          `Application ${selectedApplication.id} has been rejected by MSWDO Head.`,
          `SMS notification sent to ${selectedApplication.applicantName}.`
        );
      } else {
        showNotification(
          'error',
          'Rejection Failed',
          'Unable to reject application. Please try again.'
        );
      }

      setShowRejectModal(false);
      setShowModal(false);
      setRejectionReason('');
      setSelectedApplication(null);
    } catch (error) {
      console.error('Rejection error:', error);
      showNotification(
        'error',
        'Rejection Failed',
        'An error occurred during rejection. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Applications Awaiting Final Approval</h1>
        <p className="text-gray-500 mt-1">Review and approve applications recommended by sector staff</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Awaiting Approval</h3>
          <p className="text-3xl font-bold text-purple-600">{applications.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Approved Today</h3>
          <p className="text-3xl font-bold text-green-600">{applicationStore.getByStatus('Approved').filter(app => app.dateApproved === new Date().toISOString().split('T')[0]).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{applicationStore.getByStatus('Rejected').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Amount</h3>
          <p className="text-3xl font-bold text-blue-600">₱{applications.reduce((sum, app) => sum + app.recommendedAmount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Sector</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              <option value="senior">Senior Citizen</option>
              <option value="pwd">PWD</option>
              <option value="solo-parent">Solo Parent</option>
              <option value="women">Women</option>
              <option value="youth">Youth/Children</option>
              <option value="eccd">ECCD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter applicant name..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pending Approval Queue</h2>
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
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Evaluated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                      app.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                      app.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                      app.sector === 'Women' ? 'bg-pink-100 text-pink-800' :
                      app.sector === 'Youth' ? 'bg-orange-100 text-orange-800' :
                      app.sector === 'ECCD' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₱{app.recommendedAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.dateEvaluated || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(app)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowApproveModal(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Give Final Approval"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowRejectModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
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
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-800">Final Approval Review - Application Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Sector Staff Recommendation Alert */}
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 mb-1">Recommended by Sector Staff</h4>
                  <p className="text-sm text-green-700">
                    Evaluated and forwarded by: <span className="font-semibold">{selectedApplication.evaluatedBy || 'Sector Staff'}</span>
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Date Evaluated: <span className="font-semibold">{selectedApplication.dateEvaluated || 'N/A'}</span>
                  </p>
                </div>
              </div>

              {/* Application Information */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Application ID</h4>
                  <p className="text-gray-900 font-semibold">{selectedApplication.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Sector</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedApplication.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                    selectedApplication.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                    selectedApplication.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                    selectedApplication.sector === 'Women' ? 'bg-pink-100 text-pink-800' :
                    selectedApplication.sector === 'Youth' ? 'bg-orange-100 text-orange-800' :
                    selectedApplication.sector === 'ECCD' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedApplication.sector}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Applicant Name</h4>
                  <p className="text-gray-900">{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Barangay</h4>
                  <p className="text-gray-900">{selectedApplication.barangay}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Assistance Type</h4>
                  <p className="text-gray-900">{selectedApplication.assistanceType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Recommended Amount</h4>
                  <p className="text-gray-900 font-semibold text-lg">₱{selectedApplication.recommendedAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Sector Staff Notes */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sector Staff Evaluation Notes</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-700">
                    All documents have been verified and the applicant meets all eligibility criteria for the requested assistance.
                    Recommended for final approval.
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
                      <span className="text-gray-700">Valid ID</span>
                      <button
                        onClick={() => setViewingDocument({ name: 'Valid ID', type: 'Valid_ID.pdf' })}
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
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">Supporting Documents</span>
                      <button
                        onClick={() => setViewingDocument({ name: 'Supporting Documents', type: 'Supporting_Documents.pdf' })}
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
                    setShowRejectModal(true);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowApproveModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Give Final Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final Approval Modal */}
      {showApproveModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Give Final Approval</h3>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  This application will be given final approval and will proceed to disbursement. The applicant will be notified.
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
                  MSWDO Head Approval Remarks *
                </label>
                <textarea
                  value={approvalRemarks}
                  onChange={(e) => setApprovalRemarks(e.target.value)}
                  rows={4}
                  placeholder="Enter final approval remarks..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowApproveModal(false);
                    setShowModal(true);
                    setApprovalRemarks('');
                  }}
                  disabled={isProcessing}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalApproval}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Confirm Final Approval
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Reject Application</h3>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  This application will be rejected and sent back to the sector staff. The applicant will be notified.
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
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  placeholder="Enter detailed reason for rejection..."
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
                  disabled={isProcessing}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalRejection}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Confirm Rejection
                    </>
                  )}
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

      {/* QR Code Modal */}
      {showQRModal && approvedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 p-6 border-b border-green-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">QR Code Generated</h3>
                  <p className="text-green-100 text-sm">Beneficiary verification code</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowQRModal(false);
                  setApprovedApp(null);
                }}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <BeneficiaryQRCode
                qrCodeImage={approvedApp.qrCodeImage}
                referenceNumber={approvedApp.referenceNumber}
                beneficiaryName={approvedApp.applicantName}
                amount={approvedApp.recommendedAmount}
                onClose={() => {
                  setShowQRModal(false);
                  setApprovedApp(null);
                }}
              />
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