import { QrCode, Search, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function QRVerification() {
  const [qrInput, setQrInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [verifiedBeneficiary, setVerifiedBeneficiary] = useState<any>(null);

  const handleVerify = () => {
    // Mock verification
    setVerifiedBeneficiary({
      id: 'APP-1023',
      name: 'Juan Dela Cruz',
      barangay: 'Pacol',
      sector: 'Senior Citizen',
      program: 'Senior Medical Aid',
      amount: '₱5,000',
      status: 'Authorized',
    });
  };

  const handleConfirmPayout = () => {
    alert('Payout confirmed! Transaction recorded.');
    setVerifiedBeneficiary(null);
    setQrInput('');
    setSearchInput('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">QR Verification</h1>
        <p className="text-gray-500 mt-1">Verify beneficiary identity before payout processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">QR Code Scanner</h2>
          
          {/* QR Scanner Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
            <div className="flex flex-col items-center justify-center text-center">
              <QrCode className="w-24 h-24 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Scan QR Code</p>
              <p className="text-sm text-gray-500">Position the QR code within the frame</p>
            </div>
          </div>

          {/* Manual QR Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Enter QR Code Manually
            </label>
            <input
              type="text"
              placeholder="Enter QR code value..."
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Manual Search */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manual Search by Name or ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search beneficiary..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleVerify}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Verification Result */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Beneficiary Verification</h2>

          {!verifiedBeneficiary ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No beneficiary verified yet</p>
                <p className="text-sm text-gray-500 mt-2">Scan QR code or search to verify beneficiary</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Beneficiary Verified</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Application ID:</span>
                  <span className="text-sm font-semibold text-gray-800">{verifiedBeneficiary.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Beneficiary Name:</span>
                  <span className="text-sm font-semibold text-gray-800">{verifiedBeneficiary.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Barangay:</span>
                  <span className="text-sm font-medium text-gray-800">{verifiedBeneficiary.barangay}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Sector:</span>
                  <span className="text-sm font-medium text-gray-800">{verifiedBeneficiary.sector}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Program:</span>
                  <span className="text-sm font-medium text-gray-800">{verifiedBeneficiary.program}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Approved Amount:</span>
                  <span className="text-lg font-bold text-green-600">{verifiedBeneficiary.amount}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {verifiedBeneficiary.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmPayout}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirm Payout
                </button>
                <button className="flex-1 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                  Mark as Unclaimed
                </button>
              </div>
              <button
                onClick={() => setVerifiedBeneficiary(null)}
                className="w-full mt-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
