import { useState, useEffect } from 'react';
import { Users, CheckCircle, Clock, AlertCircle, TrendingUp, Calendar, DollarSign, QrCode, X } from 'lucide-react';
import { Link } from 'react-router';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { applicationStore, Application } from '../../utils/applicationStore';
import SuccessNotification from '../../components/SuccessNotification';
import DisbursementVoucher from '../../components/DisbursementVoucher';
import QRScanner from '../../components/QRScanner';

export default function DisbursementDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [fundedApplications, setFundedApplications] = useState<Application[]>([]);
  const [scheduledApplications, setScheduledApplications] = useState<Application[]>([]);
  const [paidApplications, setPaidApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
  const [showVoucher, setShowVoucher] = useState(false);
  const [disbursedApp, setDisbursedApp] = useState<Application | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  useEffect(() => {
    const loadApplications = async () => {
      setFundedApplications(await applicationStore.getByStatus('Funded'));
      setScheduledApplications(await applicationStore.getByStatus('Scheduled'));
      setPaidApplications(await applicationStore.getByStatus('Paid'));
    };

    loadApplications();
    const unsubscribe = applicationStore.subscribe(loadApplications);
    return unsubscribe;
  }, []);

  const handleProcessPayout = (app: Application) => {
    setSelectedApp(app);
    setShowQRModal(true);
  };

  const handleVerifyAndDisburse = async () => {
    if (!selectedApp) return;

    // Simulate QR code verification
    if (verificationCode === selectedApp.qrCode || verificationCode === selectedApp.referenceNumber) {
      const currentUser = localStorage.getItem('username') || 'disb-001';
      const success = await applicationStore.disburseApplication(selectedApp.id, currentUser);

      if (success) {
        // Store the disbursed application for the voucher
        setDisbursedApp(selectedApp);

        setSuccessMessage({
          title: 'Payout Successfully Disbursed!',
          message: `Transaction for ${selectedApp.applicantName} (${selectedApp.referenceNumber}) amounting to ₱${selectedApp.recommendedAmount.toLocaleString()} has been successfully disbursed and recorded. SMS notification sent.`
        });
        setShowSuccess(true);
        setShowQRModal(false);
        setVerificationCode('');

        // Show voucher after short delay
        setTimeout(() => {
          setShowVoucher(true);
          setSelectedApp(null);
        }, 1000);

        // Auto-hide success notification after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    } else {
      alert('Invalid QR code or reference number. Please try again.');
    }
  };

  const totalScheduled = fundedApplications.length + scheduledApplications.length;
  const totalPaid = paidApplications.length;
  const totalDisbursed = paidApplications.reduce((sum, app) => sum + app.recommendedAmount, 0);

  // Weekly disbursement trend data
  const weeklyTrendData = [
    { day: 'Mon', disbursed: 45000, scheduled: 50000 },
    { day: 'Tue', disbursed: 52000, scheduled: 55000 },
    { day: 'Wed', disbursed: 38000, scheduled: 42000 },
    { day: 'Thu', disbursed: 61000, scheduled: 63000 },
    { day: 'Fri', disbursed: totalDisbursed, scheduled: totalDisbursed + 20000 },
    { day: 'Sat', disbursed: 0, scheduled: 0 },
    { day: 'Sun', disbursed: 0, scheduled: 0 }
  ];

  // Today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Disbursement Officer Dashboard</h1>
            <p className="text-gray-500 mt-1">QR verification and payout processing</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Today: {today}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Scheduled for Payout</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalScheduled}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Ready for disbursement</p>
          <Link to="/disbursement-officer/authorized" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
            View list →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beneficiaries Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalPaid}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <Link to="/disbursement-officer/transactions" className="text-sm text-green-600 hover:text-green-800 mt-2 inline-block">
            View transactions →
          </Link>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${Math.min(100, (totalPaid / (totalScheduled + totalPaid)) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((totalPaid / (totalScheduled + totalPaid || 1)) * 100)}% completion rate
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Processing</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{fundedApplications.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <Link to="/disbursement-officer/qr-verification" className="text-sm text-yellow-600 hover:text-yellow-800 mt-2 inline-block">
            Process now →
          </Link>
          <p className="text-xs text-gray-500 mt-3">Awaiting beneficiary arrival</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Disbursed</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">₱{totalDisbursed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">From {totalPaid} transactions</p>
          <p className="text-xs text-gray-500 mt-3">Avg: ₱{Math.round(totalDisbursed / (totalPaid || 1)).toLocaleString()}</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Financial Summary</h2>
          <DollarSign className="w-8 h-8 opacity-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-200 text-sm mb-1">Total Disbursed</p>
            <p className="text-3xl font-bold">₱{totalDisbursed.toLocaleString()}</p>
            <p className="text-xs text-blue-200 mt-1">From {totalPaid} transactions</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm mb-1">Pending Disbursement</p>
            <p className="text-3xl font-bold">
              ₱{[...fundedApplications, ...scheduledApplications]
                .reduce((sum, app) => sum + app.recommendedAmount, 0)
                .toLocaleString()}
            </p>
            <p className="text-xs text-blue-200 mt-1">{totalScheduled} beneficiaries waiting</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm mb-1">Average Payout</p>
            <p className="text-3xl font-bold">₱{Math.round(totalDisbursed / (totalPaid || 1)).toLocaleString()}</p>
            <p className="text-xs text-blue-200 mt-1">Per beneficiary</p>
          </div>
        </div>
      </div>

      {/* Scheduled Beneficiaries for Payout */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Scheduled Beneficiaries - Ready for Payout</h2>
            <p className="text-sm text-gray-500 mt-1">Scan QR code or enter reference number to disburse</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
            {totalScheduled} Ready
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...fundedApplications, ...scheduledApplications].length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No beneficiaries scheduled for payout
                  </td>
                </tr>
              ) : (
                [...fundedApplications, ...scheduledApplications].slice(0, 5).map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.referenceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.applicantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {app.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₱{app.recommendedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.payoutSchedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleProcessPayout(app)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"
                      >
                        <QrCode className="w-4 h-4" />
                        Process Payout
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalScheduled > 5 && (
          <div className="px-6 py-4 border-t border-gray-200 text-center">
            <Link
              to="/disbursement-officer/authorized"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all {totalScheduled} beneficiaries →
            </Link>
          </div>
        )}
      </div>

      {/* Recent Payout Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Payout Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {paidApplications.slice(0, 5).length === 0 ? (
              <p className="text-center text-gray-500 py-4">No payout activity yet</p>
            ) : (
              paidApplications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{app.applicantName}</p>
                      <p className="text-xs text-gray-500">{app.sector} • {app.dateDisbursed}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₱{app.recommendedAmount.toLocaleString()}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      Paid
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link
            to="/disbursement-officer/transactions"
            className="block text-center mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Transactions →
          </Link>
        </div>
      </div>

      {/* QR Verification Modal */}
      {showQRModal && selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full animate-slideUp">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">QR Code Verification & Payout</h3>
                <p className="text-blue-100 text-sm mt-1">Verify beneficiary identity and process payout</p>
              </div>
              <button
                onClick={() => {
                  setShowQRModal(false);
                  setSelectedApp(null);
                  setVerificationCode('');
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Beneficiary Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Beneficiary Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Reference Number:</span>
                    <p className="font-mono font-bold text-gray-900">{selectedApp.referenceNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">QR Code:</span>
                    <p className="font-mono font-bold text-gray-900">{selectedApp.qrCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Beneficiary:</span>
                    <p className="font-medium text-gray-900">{selectedApp.applicantName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Sector:</span>
                    <p className="font-medium text-gray-900">{selectedApp.sector}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Payout Amount:</span>
                    <p className="font-semibold text-green-600 text-xl">
                      ₱{selectedApp.recommendedAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Schedule:</span>
                    <p className="font-medium text-gray-900">{selectedApp.payoutSchedule}</p>
                  </div>
                </div>
              </div>

              {/* QR Scanner Simulation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  Scan QR Code or Enter Reference Number
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter QR code or reference number..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 font-medium inline-flex items-center gap-2 shadow-md transition-all"
                  >
                    <QrCode className="w-5 h-5" />
                    Scan QR
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click "Scan QR" to use camera or manually enter: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{selectedApp.qrCode}</code>
                </p>
              </div>

              {/* Verification Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-blue-900 mb-2">Verification Steps</h5>
                <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
                  <li>Verify beneficiary's valid ID matches the name above</li>
                  <li>Scan beneficiary's QR code or enter reference number</li>
                  <li>Confirm payout amount with beneficiary</li>
                  <li>Click "Confirm & Disburse" to process payment</li>
                  <li>Have beneficiary sign receipt acknowledgment</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowQRModal(false);
                    setSelectedApp(null);
                    setVerificationCode('');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyAndDisburse}
                  disabled={!verificationCode}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg transition-all ${
                    verificationCode
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm & Disburse ₱{selectedApp.recommendedAmount.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      <SuccessNotification
        show={showSuccess}
        title={successMessage.title}
        message={successMessage.message}
        onClose={() => setShowSuccess(false)}
      />

      {/* Disbursement Voucher */}
      <DisbursementVoucher
        show={showVoucher}
        application={disbursedApp}
        onClose={() => {
          setShowVoucher(false);
          setDisbursedApp(null);
        }}
      />

      {/* QR Scanner */}
      <QRScanner
        show={showQRScanner}
        onScan={(code) => {
          setVerificationCode(code);
          setShowQRScanner(false);
        }}
        onClose={() => setShowQRScanner(false)}
      />
    </div>
  );
}
