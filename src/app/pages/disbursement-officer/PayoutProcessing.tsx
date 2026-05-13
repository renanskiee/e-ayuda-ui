import { Search, Calendar, Download, CheckCircle, XCircle, Clock, User, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { applicationStore, Application } from '../../utils/applicationStore';
import SuccessNotification from '../../components/SuccessNotification';
import DisbursementVoucher from '../../components/DisbursementVoucher';
import QRScanner from '../../components/QRScanner';

export default function PayoutProcessing() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSector, setSelectedSector] = useState('all');
  const [processingBeneficiary, setProcessingBeneficiary] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scheduledPayouts, setScheduledPayouts] = useState<Application[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
  const [showVoucher, setShowVoucher] = useState(false);
  const [disbursedApp, setDisbursedApp] = useState<Application | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);

  useEffect(() => {
    const loadScheduledPayouts = async () => {
      // Get both Funded and Scheduled applications
      const funded = await applicationStore.getByStatus('Funded');
      const scheduled = await applicationStore.getByStatus('Scheduled');
      setScheduledPayouts([...funded, ...scheduled]);
    };

    loadScheduledPayouts();
    const unsubscribe = applicationStore.subscribe(loadScheduledPayouts);
    return unsubscribe;
  }, []);

  const filteredPayouts = scheduledPayouts.filter(payout => {
    const matchesSector = selectedSector === 'all' || payout.sector === selectedSector;
    const matchesSearch = payout.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleProcessPayout = (beneficiary: Application) => {
    setProcessingBeneficiary(beneficiary);
    setVerificationCode('');
  };

  const handleConfirmPayout = async () => {
    if (!processingBeneficiary) return;

    // Verify QR code or reference number
    if (verificationCode !== processingBeneficiary.qrCode && verificationCode !== processingBeneficiary.referenceNumber) {
      alert('Invalid QR code or reference number. Please verify beneficiary identity.');
      return;
    }

    const currentUser = localStorage.getItem('username') || 'disb-001';
    const success = await applicationStore.disburseApplication(processingBeneficiary.id, currentUser);

    if (success) {
      setDisbursedApp(processingBeneficiary);
      setSuccessMessage({
        title: 'Payout Successfully Disbursed!',
        message: `Payout for ${processingBeneficiary.applicantName} amounting to ₱${processingBeneficiary.recommendedAmount.toLocaleString()} has been successfully processed and disbursed. SMS notification sent.`
      });
      setShowSuccess(true);
      setProcessingBeneficiary(null);
      setVerificationCode('');

      // Show voucher after delay
      setTimeout(() => {
        setShowVoucher(true);
      }, 1000);

      // Auto-hide success notification after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  const handleMarkUnclaimed = () => {
    if (!processingBeneficiary) return;

    setSuccessMessage({
      title: 'Marked as Unclaimed',
      message: `${processingBeneficiary.applicantName} has been marked as unclaimed and will be rescheduled for another date.`
    });
    setShowSuccess(true);
    setProcessingBeneficiary(null);
    setVerificationCode('');

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const totalScheduled = filteredPayouts.length;
  const totalAmount = filteredPayouts.reduce((sum, p) => sum + p.recommendedAmount, 0);
  const avgAmount = totalScheduled > 0 ? totalAmount / totalScheduled : 0;

  // Get unique sectors
  const sectors = Array.from(new Set(scheduledPayouts.map(app => app.sector)));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Payout Processing</h1>
        <p className="text-gray-500 mt-1">Process scheduled payouts for beneficiaries</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Scheduled</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{totalScheduled}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Amount</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                ₱{totalAmount.toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending Today</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">
                {scheduledPayouts.filter(p => p.status === 'Scheduled').length}
              </p>
            </div>
            <User className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg. Per Payout</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                ₱{Math.round(avgAmount).toLocaleString()}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Schedule Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector Filter</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Payouts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            Scheduled Payouts ({filteredPayouts.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPayouts.map((payout) => (
            <div key={payout.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{payout.applicantName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">Ref: {payout.referenceNumber}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-sm text-gray-500">ID: {payout.id}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      payout.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {payout.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Barangay</p>
                      <p className="text-sm font-medium text-gray-900">{payout.barangay || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sector</p>
                      <p className="text-sm font-medium text-gray-900">{payout.sector}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Program</p>
                      <p className="text-sm font-medium text-gray-900">{payout.program}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payout Schedule</p>
                      <p className="text-sm font-medium text-gray-900">{payout.payoutSchedule || 'ASAP'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Payout Amount</p>
                      <p className="text-2xl font-bold text-green-600">₱{payout.recommendedAmount.toLocaleString()}</p>
                    </div>

                    <button
                      onClick={() => handleProcessPayout(payout)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center shadow-md"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Process Payout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPayouts.length === 0 && (
            <div className="p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No scheduled payouts found</p>
              {(searchTerm || selectedSector !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSector('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Processing Modal */}
      {processingBeneficiary && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-slideUp">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl">
              <h2 className="text-2xl font-bold">Confirm Payout Processing</h2>
              <p className="text-green-100 text-sm mt-1">Verify beneficiary and process payout</p>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-900">Beneficiary Details</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Name:</span>
                  <span className="text-sm font-semibold text-gray-900">{processingBeneficiary.applicantName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Reference #:</span>
                  <span className="text-sm font-semibold text-gray-900">{processingBeneficiary.referenceNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Sector:</span>
                  <span className="text-sm font-medium text-gray-900">{processingBeneficiary.sector}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Program:</span>
                  <span className="text-sm font-medium text-gray-900">{processingBeneficiary.program}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Payout Amount:</span>
                  <span className="text-xl font-bold text-green-600">₱{processingBeneficiary.recommendedAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* QR Verification */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  Verify QR Code or Reference Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter QR code or reference number..."
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    Scan
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  QR Code: <code className="bg-gray-100 px-1 py-0.5 rounded">{processingBeneficiary.qrCode}</code>
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmPayout}
                  disabled={!verificationCode}
                  className={`w-full px-4 py-3 rounded-lg transition-all font-medium flex items-center justify-center shadow-lg ${
                    verificationCode
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirm Payout Released
                </button>

                <button
                  onClick={handleMarkUnclaimed}
                  className="w-full px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all font-medium flex items-center justify-center"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Mark as Unclaimed
                </button>

                <button
                  onClick={() => {
                    setProcessingBeneficiary(null);
                    setVerificationCode('');
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
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
