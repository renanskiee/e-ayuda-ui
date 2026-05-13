import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Wallet, Users, CheckCircle, Clock, FileText, X, Calendar, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { applicationStore, Application } from '../../utils/applicationStore';
import SuccessNotification from '../../components/SuccessNotification';

export default function TreasurerDashboard() {
  const [approvedApplications, setApprovedApplications] = useState<Application[]>([]);
  const [fundedApplications, setFundedApplications] = useState<Application[]>([]);
  const [paidApplications, setPaidApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showFundModal, setShowFundModal] = useState(false);
  const [payoutSchedule, setPayoutSchedule] = useState('');
  const [fundingNotes, setFundingNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });

  useEffect(() => {
    const loadApplications = async () => {
      setApprovedApplications(await applicationStore.getByStatus('Approved'));
      setFundedApplications(await applicationStore.getByStatus('Funded'));
      setPaidApplications(await applicationStore.getByStatus('Paid'));
    };

    loadApplications();
    const unsubscribe = applicationStore.subscribe(loadApplications);
    return unsubscribe;
  }, []);

  const handleFundApplication = async () => {
    if (!payoutSchedule || !selectedApplication) {
      return;
    }

    const currentUser = localStorage.getItem('username') || 'tres-001';
    const success = await applicationStore.fundApplication(
      selectedApplication.id,
      currentUser,
      payoutSchedule
    );

    if (success) {
      setShowFundModal(false);
      setSuccessMessage({
        title: 'Funding Confirmed Successfully!',
        message: `Application ${selectedApplication.id} for ${selectedApplication.applicantName} has been funded and scheduled for payout on ${payoutSchedule}.`
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);

      setSelectedApplication(null);
      setPayoutSchedule('');
      setFundingNotes('');
    }
  };

  const totalApprovedAmount = approvedApplications.reduce(
    (sum, app) => sum + app.recommendedAmount,
    0
  );

  const totalFundedAmount = fundedApplications.reduce(
    (sum, app) => sum + app.recommendedAmount,
    0
  );

  const totalDisbursed = paidApplications.reduce(
    (sum, app) => sum + app.recommendedAmount,
    0
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Municipal Treasurer Dashboard</h1>
        <p className="text-gray-500 mt-1">Fund verification, allocation, and disbursement monitoring</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">Pending Funding Verification</p>
              <p className="text-3xl font-bold mt-2">{approvedApplications.length}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-purple-100 mt-3">₱{totalApprovedAmount.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Funded & Scheduled</p>
              <p className="text-3xl font-bold mt-2">{fundedApplications.length}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-blue-100 mt-3">₱{totalFundedAmount.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Total Disbursed</p>
              <p className="text-3xl font-bold mt-2">{allPaidApplications.length}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-green-100 mt-3">₱{totalDisbursed.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-100">Total Budget Allocated</p>
              <p className="text-3xl font-bold mt-2">₱1.5M</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-orange-100 mt-3">For all programs</p>
        </div>
      </div>

      {/* Approved Beneficiaries Pending Funding */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Approved Beneficiaries - Pending Fund Verification</h2>
            <p className="text-sm text-gray-500 mt-1">Review and verify funding for approved applications</p>
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold">
            {approvedApplications.length} Pending
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assistance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {approvedApplications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No approved applications pending funding verification
                  </td>
                </tr>
              ) : (
                approvedApplications.map((app) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₱{app.recommendedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.approvedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.dateApproved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowFundModal(true);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Verify & Fund
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Funded Applications with Payout Schedule */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Funded Applications - Scheduled for Payout</h2>
            <p className="text-sm text-gray-500 mt-1">Ready for disbursement by disbursement officer</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
            {fundedApplications.length} Scheduled
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payout Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fundedApplications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No funded applications scheduled for payout
                  </td>
                </tr>
              ) : (
                fundedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.applicantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₱{app.recommendedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.payoutSchedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.referenceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Funded
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Notification */}
      <SuccessNotification
        show={showSuccess}
        title={successMessage.title}
        message={successMessage.message}
        onClose={() => setShowSuccess(false)}
      />

      {/* Fund Verification Modal */}
      {showFundModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full animate-slideUp">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <DollarSign className="w-7 h-7" />
                  Fund Verification & Allocation
                </h3>
                <p className="text-green-100 text-sm mt-1">Verify and allocate funds for approved beneficiary</p>
              </div>
              <button
                onClick={() => {
                  setShowFundModal(false);
                  setSelectedApplication(null);
                  setPayoutSchedule('');
                  setFundingNotes('');
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Application Details */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Application Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Application ID:</span>
                    <p className="font-medium text-gray-900">{selectedApplication.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Beneficiary:</span>
                    <p className="font-medium text-gray-900">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Sector:</span>
                    <p className="font-medium text-gray-900">{selectedApplication.sector}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Assistance Type:</span>
                    <p className="font-medium text-gray-900">{selectedApplication.assistanceType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Approved Amount:</span>
                    <p className="font-semibold text-green-600 text-lg">
                      ₱{selectedApplication.recommendedAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Approved By:</span>
                    <p className="font-medium text-gray-900">{selectedApplication.approvedBy}</p>
                  </div>
                </div>
              </div>

              {/* Funding Information */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Payout Schedule Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={payoutSchedule}
                    onChange={(e) => setPayoutSchedule(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Select when the beneficiary can claim their payout</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treasurer Notes (Optional)
                  </label>
                  <textarea
                    value={fundingNotes}
                    onChange={(e) => setFundingNotes(e.target.value)}
                    rows={3}
                    placeholder="Add any notes regarding funding verification..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Information Alert */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-5 mb-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2 text-lg">Funding Verification Process</h5>
                    <p className="text-sm text-blue-800">
                      By confirming, you verify that:
                    </p>
                    <ul className="text-sm text-blue-800 list-disc list-inside mt-2 space-y-1">
                      <li>Budget allocation is available for this beneficiary</li>
                      <li>All documentation has been reviewed and approved</li>
                      <li>Payout schedule has been coordinated with disbursement officer</li>
                      <li>The beneficiary will be notified via SMS for payout</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowFundModal(false);
                    setSelectedApplication(null);
                    setPayoutSchedule('');
                    setFundingNotes('');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFundApplication}
                  disabled={!payoutSchedule}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg ${
                    payoutSchedule
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Funding & Schedule Payout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
