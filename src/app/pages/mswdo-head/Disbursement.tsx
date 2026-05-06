import { CheckCircle, Calendar, Eye, XCircle } from 'lucide-react';

const disbursementData = [
  {
    applicationId: "APP-1011",
    beneficiaryName: "Juan Dela Cruz",
    barangay: "Pacol",
    sector: "Senior Citizen",
    program: "Medical Assistance",
    approvedAmount: "₱5,000",
    sectorRecommendation: "Approved",
    status: "Awaiting Authorization"
  },
  {
    applicationId: "APP-1012",
    beneficiaryName: "Maria Santos",
    barangay: "Santa Cruz",
    sector: "PWD",
    program: "Medical Assistance",
    approvedAmount: "₱3,500",
    sectorRecommendation: "Approved",
    status: "Awaiting Authorization"
  },
  {
    applicationId: "APP-1013",
    beneficiaryName: "Ana Ramirez",
    barangay: "San Rafael",
    sector: "Solo Parent",
    program: "Educational Support",
    approvedAmount: "₱4,000",
    sectorRecommendation: "Approved",
    status: "Awaiting Authorization"
  }
];

export default function Disbursement() {
  const handleAuthorize = (appId: string) => {
    alert(`Application ${appId} authorized for payout! The record has been forwarded to the Disbursement Officer.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Disbursement Authorization</h1>
        <p className="text-gray-500 mt-1">Authorize approved applications for disbursement</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Authorized Beneficiaries</h3>
          <p className="text-3xl font-bold text-green-600">142</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Funds Allocated</h3>
          <p className="text-3xl font-bold text-blue-600">₱1.5M</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Funds Released</h3>
          <p className="text-3xl font-bold text-purple-600">₱1.2M</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Remaining Budget</h3>
          <p className="text-3xl font-bold text-orange-600">₱255K</p>
        </div>
      </div>

      {/* Disbursement Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Applications Awaiting Authorization</h2>
          <p className="text-sm text-gray-500 mt-1">Sector-approved applications pending final authorization for disbursement</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beneficiary Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector Recommendation
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
              {disbursementData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {item.applicationId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.beneficiaryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.sector === 'Senior Citizen' ? 'bg-green-100 text-green-800' :
                      item.sector === 'PWD' ? 'bg-purple-100 text-purple-800' :
                      item.sector === 'Solo Parent' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {item.approvedAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.sectorRecommendation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleAuthorize(item.applicationId)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Authorize Disbursement
                      </button>
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </div>
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