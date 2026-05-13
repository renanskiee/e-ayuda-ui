import { CheckCircle, DollarSign, FileText, TrendingUp, Eye, Ban } from 'lucide-react';
import { useState } from 'react';

const approvedBeneficiaries = [
  { id: 1, name: "Juan Dela Cruz", barangay: "Pacol", sector: "Senior Citizen", program: "Senior Medical Aid", amount: 5000, approvalDate: "Mar 13, 2026", status: "Pending Release" },
  { id: 2, name: "Maria Santos", barangay: "Santa Cruz", sector: "PWD", program: "PWD Medical Support", amount: 3500, approvalDate: "Mar 12, 2026", status: "Pending Release" },
  { id: 3, name: "Ana Ramirez", barangay: "San Rafael", sector: "Solo Parent", program: "Educational Assistance", amount: 4000, approvalDate: "Mar 12, 2026", status: "Pending Release" },
  { id: 4, name: "Rosa Mendoza", barangay: "Santa Cruz", sector: "Senior Citizen", program: "Senior Medical Aid", amount: 5000, approvalDate: "Mar 11, 2026", status: "Pending Release" },
  { id: 5, name: "Carlos Diaz", barangay: "Pacol", sector: "PWD", program: "PWD Medical Support", amount: 3500, approvalDate: "Mar 11, 2026", status: "Pending Release" },
  { id: 6, name: "Elena Torres", barangay: "Santa Cruz", sector: "Solo Parent", program: "Educational Assistance", amount: 4000, approvalDate: "Mar 10, 2026", status: "Pending Release" },
];

export default function DisbursementAuthorizationDashboard() {
  const [beneficiaries, setBeneficiaries] = useState(approvedBeneficiaries);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAuthorize = (id: number) => {
    setBeneficiaries(beneficiaries.map(b => 
      b.id === id ? { ...b, status: "Authorized for Payout" } : b
    ));
    setShowModal(false);
    alert("Disbursement authorized successfully! Record sent to Payout Officer.");
  };

  const handleReject = (id: number) => {
    if (confirm("Are you sure you want to reject this disbursement?")) {
      setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    }
  };

  const pendingCount = beneficiaries.filter(b => b.status === "Pending Release").length;
  const authorizedCount = beneficiaries.filter(b => b.status === "Authorized for Payout").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Disbursement Authorization Dashboard</h1>
        <p className="text-gray-500 mt-1">Authorize approved beneficiaries for payout release</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved Beneficiaries Ready for Payout</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">196</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Funds Allocated</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">₱1.5M</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Funds Released</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₱1.24M</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining Funds</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">₱255K</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Release</p>
              <p className="text-2xl font-bold text-gray-800">{pendingCount} beneficiaries</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Authorized for Payout</p>
              <p className="text-2xl font-bold text-gray-800">{authorizedCount} beneficiaries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Approved Beneficiary List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Approved Beneficiary List</h2>
          <p className="text-sm text-gray-500 mt-1">Review and authorize disbursement for approved beneficiaries</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beneficiary.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      beneficiary.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                      beneficiary.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                      beneficiary.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {beneficiary.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{beneficiary.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₱{beneficiary.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beneficiary.approvalDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      beneficiary.status === 'Pending Release' ? 'bg-yellow-100 text-yellow-800' :
                      beneficiary.status === 'Authorized for Payout' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {beneficiary.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {beneficiary.status === 'Pending Release' ? (
                      <>
                        <button 
                          onClick={() => {
                            setSelectedBeneficiary(beneficiary);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button 
                          onClick={() => handleAuthorize(beneficiary.id)}
                          className="text-green-600 hover:text-green-800 font-medium inline-flex items-center gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Authorize
                        </button>
                        <button 
                          onClick={() => handleReject(beneficiary.id)}
                          className="text-red-600 hover:text-red-800 font-medium inline-flex items-center gap-1"
                        >
                          <Ban className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">Already Authorized</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedBeneficiary && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Application Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Beneficiary Name</label>
                  <p className="text-gray-900 font-semibold">{selectedBeneficiary.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Barangay</label>
                  <p className="text-gray-900">{selectedBeneficiary.barangay}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sector</label>
                  <p className="text-gray-900">{selectedBeneficiary.sector}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Program Name</label>
                  <p className="text-gray-900">{selectedBeneficiary.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Approved Amount</label>
                  <p className="text-gray-900 font-bold text-lg">₱{selectedBeneficiary.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Approval Date</label>
                  <p className="text-gray-900">{selectedBeneficiary.approvalDate}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleAuthorize(selectedBeneficiary.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Authorize Disbursement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
