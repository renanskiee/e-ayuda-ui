import { QrCode, Search, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { useState } from 'react';

const scheduledBeneficiaries = [
  { id: 1, qrCode: "QR-SC-001", name: "Juan Dela Cruz", barangay: "Pacol", sector: "Senior Citizen", program: "Senior Medical Aid", amount: 5000, status: "Eligible for Payout" },
  { id: 2, qrCode: "QR-PWD-002", name: "Maria Santos", barangay: "Santa Cruz", sector: "PWD", program: "PWD Medical Support", amount: 3500, status: "Eligible for Payout" },
  { id: 3, qrCode: "QR-SP-003", name: "Ana Ramirez", barangay: "San Rafael", sector: "Solo Parent", program: "Educational Assistance", amount: 4000, status: "Eligible for Payout" },
];

export default function PayoutOfficerDashboard() {
  const [qrInput, setQrInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [verifiedBeneficiary, setVerifiedBeneficiary] = useState<any>(null);
  const [payoutList, setPayoutList] = useState(scheduledBeneficiaries);

  const totalScheduled = 120;
  const paid = 95;
  const pending = 23;
  const unclaimed = 2;

  const handleQrScan = () => {
    const beneficiary = payoutList.find(b => b.qrCode === qrInput);
    if (beneficiary) {
      setVerifiedBeneficiary(beneficiary);
    } else {
      setVerifiedBeneficiary({ status: "Invalid QR Code", error: true });
    }
  };

  const handleManualSearch = () => {
    const beneficiary = payoutList.find(b => 
      b.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (beneficiary) {
      setVerifiedBeneficiary(beneficiary);
    } else {
      setVerifiedBeneficiary({ status: "Beneficiary Not Found", error: true });
    }
  };

  const handleConfirmPayout = () => {
    if (verifiedBeneficiary && !verifiedBeneficiary.error) {
      setPayoutList(payoutList.map(b => 
        b.id === verifiedBeneficiary.id ? { ...b, status: "Already Paid" } : b
      ));
      alert("Payout confirmed! Transaction recorded in the system.");
      setVerifiedBeneficiary(null);
      setQrInput('');
      setSearchInput('');
    }
  };

  const handleMarkUnclaimed = () => {
    if (verifiedBeneficiary && !verifiedBeneficiary.error) {
      setPayoutList(payoutList.map(b => 
        b.id === verifiedBeneficiary.id ? { ...b, status: "Unclaimed" } : b
      ));
      alert("Beneficiary marked as unclaimed.");
      setVerifiedBeneficiary(null);
      setQrInput('');
      setSearchInput('');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Payout Officer Dashboard</h1>
        <p className="text-gray-500 mt-1">QR code verification and payout processing</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Beneficiaries Scheduled Today</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalScheduled}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beneficiaries Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{paid}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unclaimed</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{unclaimed}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* QR Code Verification Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">QR Code Scanner</h2>
              <p className="text-sm text-gray-500">Scan beneficiary QR code for verification</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">QR Code Input</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  placeholder="Scan or enter QR code..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleQrScan()}
                />
                <button
                  onClick={handleQrScan}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Verify
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Manual Beneficiary Search</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                  />
                </div>
                <button
                  onClick={handleManualSearch}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Result Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Verification Result</h2>

          {!verifiedBeneficiary ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <QrCode className="w-16 h-16 mb-4" />
              <p className="text-center">Scan QR code or search beneficiary<br />to verify payout eligibility</p>
            </div>
          ) : verifiedBeneficiary.error ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <p className="text-xl font-semibold text-red-600 mb-2">{verifiedBeneficiary.status}</p>
              <p className="text-gray-500 text-center">Please verify the QR code or search again</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Beneficiary Name</span>
                  <span className="text-sm font-semibold text-gray-900">{verifiedBeneficiary.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Barangay</span>
                  <span className="text-sm text-gray-900">{verifiedBeneficiary.barangay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Sector</span>
                  <span className="text-sm text-gray-900">{verifiedBeneficiary.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Program Name</span>
                  <span className="text-sm text-gray-900">{verifiedBeneficiary.program}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-sm font-medium text-gray-500">Approved Amount</span>
                  <span className="text-lg font-bold text-green-600">₱{verifiedBeneficiary.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                verifiedBeneficiary.status === 'Eligible for Payout' ? 'bg-green-50 border border-green-200' :
                verifiedBeneficiary.status === 'Already Paid' ? 'bg-gray-50 border border-gray-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {verifiedBeneficiary.status === 'Eligible for Payout' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {verifiedBeneficiary.status === 'Already Paid' && <XCircle className="w-5 h-5 text-gray-600" />}
                  <span className={`font-semibold ${
                    verifiedBeneficiary.status === 'Eligible for Payout' ? 'text-green-700' :
                    verifiedBeneficiary.status === 'Already Paid' ? 'text-gray-700' :
                    'text-red-700'
                  }`}>
                    Payout Status: {verifiedBeneficiary.status}
                  </span>
                </div>
              </div>

              {verifiedBeneficiary.status === 'Eligible for Payout' && (
                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmPayout}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Confirm Payout
                  </button>
                  <button
                    onClick={handleMarkUnclaimed}
                    className="flex-1 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium"
                  >
                    Mark as Unclaimed
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setVerifiedBeneficiary(null);
                  setQrInput('');
                  setSearchInput('');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scheduled Beneficiaries List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Today's Scheduled Beneficiaries</h2>
          <p className="text-sm text-gray-500 mt-1">List of beneficiaries scheduled for payout today</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payoutList.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beneficiary.qrCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₱{beneficiary.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      beneficiary.status === 'Eligible for Payout' ? 'bg-green-100 text-green-800' :
                      beneficiary.status === 'Already Paid' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {beneficiary.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
