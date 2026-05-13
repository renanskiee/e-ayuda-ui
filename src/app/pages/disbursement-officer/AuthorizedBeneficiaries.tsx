import { Search, Eye, Filter, Download, CheckCircle, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { applicationStore, Application } from '../../utils/applicationStore';
import DisbursementVoucher from '../../components/DisbursementVoucher';

export default function AuthorizedBeneficiaries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [paidApplications, setPaidApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);

  useEffect(() => {
    const loadPaidApplications = async () => {
      setPaidApplications(await applicationStore.getByStatus('Paid'));
    };

    loadPaidApplications();
    const unsubscribe = applicationStore.subscribe(loadPaidApplications);
    return unsubscribe;
  }, []);

  const filteredBeneficiaries = paidApplications.filter(app => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.barangay && app.barangay.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSector = selectedSector === 'All Sectors' || app.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  const handleViewDetails = (app: Application) => {
    setSelectedApplication(app);
    setShowDetails(true);
  };

  const handlePrintVoucher = (app: Application) => {
    setSelectedApplication(app);
    setShowVoucher(true);
  };

  const handleExport = () => {
    const data = filteredBeneficiaries.map(app => ({
      'Reference Number': app.referenceNumber,
      'Application ID': app.id,
      'Beneficiary Name': app.applicantName,
      'Barangay': app.barangay,
      'Sector': app.sector,
      'Program': app.program,
      'Amount Received': app.recommendedAmount,
      'Date Disbursed': app.dateDisbursed,
      'Disbursed By': app.disbursedBy,
      'QR Code': app.qrCode
    }));

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `disbursed-beneficiaries-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalDisbursed = filteredBeneficiaries.length;
  const totalAmount = filteredBeneficiaries.reduce((sum, app) => sum + app.recommendedAmount, 0);
  const avgAmount = totalDisbursed > 0 ? totalAmount / totalDisbursed : 0;

  // Get unique sectors
  const sectors = Array.from(new Set(paidApplications.map(app => app.sector)));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Disbursed Beneficiaries</h1>
        <p className="text-gray-500 mt-1">List of beneficiaries who already received their assistance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Disbursed</p>
              <p className="text-3xl font-bold text-green-700 mt-2">{totalDisbursed}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600 opacity-80" />
          </div>
          <p className="text-xs text-green-600 mt-2">Beneficiaries who received funds</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Amount</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">₱{totalAmount.toLocaleString()}</p>
            </div>
            <Download className="w-12 h-12 text-blue-600 opacity-80" />
          </div>
          <p className="text-xs text-blue-600 mt-2">Successfully disbursed</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg. Amount</p>
              <p className="text-3xl font-bold text-purple-700 mt-2">
                ₱{Math.round(avgAmount).toLocaleString()}
              </p>
            </div>
            <FileText className="w-12 h-12 text-purple-600 opacity-80" />
          </div>
          <p className="text-xs text-purple-600 mt-2">Per beneficiary</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, reference number, or barangay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredBeneficiaries.length}</span> of{' '}
          <span className="font-semibold">{paidApplications.length}</span> disbursed beneficiaries
        </p>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference #
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
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Disbursed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disbursed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeneficiaries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No disbursed beneficiaries found</p>
                    {searchTerm || selectedSector !== 'All Sectors' ? (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedSector('All Sectors');
                        }}
                        className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Clear Filters
                      </button>
                    ) : null}
                  </td>
                </tr>
              ) : (
                filteredBeneficiaries.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {app.referenceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {app.applicantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.barangay || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {app.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.program}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ₱{app.recommendedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.dateDisbursed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.disbursedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(app)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handlePrintVoucher(app)}
                          className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Voucher
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Disbursement Details</h2>
                  <p className="text-green-100 text-sm mt-1">Completed transaction record</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Status: Disbursed Successfully</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Beneficiary Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Beneficiary Name</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedApplication.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reference Number</p>
                      <p className="text-sm font-semibold text-blue-600">{selectedApplication.referenceNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Application ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedApplication.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Barangay</p>
                      <p className="text-sm font-medium text-gray-900">{selectedApplication.barangay || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Program & Amount</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Sector</p>
                      <p className="text-sm font-medium text-gray-900">{selectedApplication.sector}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Program</p>
                      <p className="text-sm font-medium text-gray-900">{selectedApplication.program}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Amount Received</p>
                      <p className="text-2xl font-bold text-green-600">₱{selectedApplication.recommendedAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Disbursement Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date Funded</p>
                    <p className="text-sm font-medium text-gray-900">{selectedApplication.dateFunded}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funded By</p>
                    <p className="text-sm font-medium text-gray-900">{selectedApplication.fundedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date Disbursed</p>
                    <p className="text-sm font-medium text-green-600">{selectedApplication.dateDisbursed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Disbursed By</p>
                    <p className="text-sm font-medium text-gray-900">{selectedApplication.disbursedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">QR Code</p>
                    <p className="text-sm font-mono font-medium text-gray-900">{selectedApplication.qrCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payout Schedule</p>
                    <p className="text-sm font-medium text-gray-900">{selectedApplication.payoutSchedule || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDetails(false);
                    handlePrintVoucher(selectedApplication);
                  }}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Print Voucher
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disbursement Voucher */}
      <DisbursementVoucher
        show={showVoucher}
        application={selectedApplication}
        onClose={() => {
          setShowVoucher(false);
          setSelectedApplication(null);
        }}
      />
    </div>
  );
}
