import { useState } from 'react';
import { Search, Eye, X, Send } from 'lucide-react';
import { Link } from 'react-router';

const applications = [
  {
    id: "WS-401",
    applicantName: "Angela Flores",
    barangay: "Pacol",
    programCategory: "Livelihood Program",
    assistanceType: "Financial Assistance",
    amount: 5000,
    submissionDate: "Mar 12 2026",
    status: "Pending",
    contactNumber: "+63 912 345 6789",
    purpose: "Start small sari-sari store business"
  },
  {
    id: "WS-402",
    applicantName: "Diana Ramos",
    barangay: "Santa Cruz",
    programCategory: "Women Support Program",
    assistanceType: "Medical Assistance",
    amount: 3000,
    submissionDate: "Mar 11 2026",
    status: "Pending",
    contactNumber: "+63 923 456 7890",
    purpose: "Medical checkup and laboratory tests"
  },
  {
    id: "WS-403",
    applicantName: "Teresa Mendoza",
    barangay: "San Rafael",
    programCategory: "Livelihood Program",
    assistanceType: "Capital Assistance",
    amount: 8000,
    submissionDate: "Mar 10 2026",
    status: "Pending",
    contactNumber: "+63 934 567 8901",
    purpose: "Purchase sewing machine for tailoring business"
  },
  {
    id: "WS-404",
    applicantName: "Carmen Santos",
    barangay: "San Antonio",
    programCategory: "Women Support Program",
    assistanceType: "Financial Assistance",
    amount: 4500,
    submissionDate: "Mar 9 2026",
    status: "Under Review",
    contactNumber: "+63 945 678 9012",
    purpose: "Family emergency financial support"
  },
  {
    id: "WS-405",
    applicantName: "Sofia Cruz",
    barangay: "Malaking Ilog",
    programCategory: "Livelihood Program",
    assistanceType: "Medical Assistance",
    amount: 6000,
    submissionDate: "Mar 8 2026",
    status: "Pending",
    contactNumber: "+63 956 789 0123",
    purpose: "Medical treatment for chronic condition"
  },
  {
    id: "WS-406",
    applicantName: "Patricia Lopez",
    barangay: "Pacol",
    programCategory: "Women Support Program",
    assistanceType: "Capital Assistance",
    amount: 7000,
    submissionDate: "Mar 7 2026",
    status: "Under Review",
    contactNumber: "+63 967 890 1234",
    purpose: "Purchase cooking equipment for catering business"
  }
];

export default function ReceivedApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarangay, setFilterBarangay] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarangay = !filterBarangay || app.barangay === filterBarangay;
    const matchesProgram = !filterProgram || app.programCategory === filterProgram;
    return matchesSearch && matchesBarangay && matchesProgram;
  });

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleMoveToEvaluation = (id: string) => {
    alert(`Application ${id} moved to Evaluation Queue`);
    setShowModal(false);
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
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Program Category
            </label>
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Programs</option>
              <option value="Livelihood Program">Livelihood Program</option>
              <option value="Women Support Program">Women Support Program</option>
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
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
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
                    {application.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.programCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱{application.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.submissionDate}
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
                    <Link to="/sector/women/evaluation" className="text-green-600 hover:text-green-800 font-medium">
                      Evaluate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-semibold text-gray-800">Application Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Application Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Application ID</label>
                  <p className="text-base font-semibold text-gray-900">{selectedApplication.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p>
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

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-base text-gray-900">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Barangay</label>
                    <p className="text-base text-gray-900">{selectedApplication.barangay}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact Number</label>
                    <p className="text-base text-gray-900">{selectedApplication.contactNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submission Date</label>
                    <p className="text-base text-gray-900">{selectedApplication.submissionDate}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assistance Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Program Category</label>
                    <p className="text-base text-gray-900">{selectedApplication.programCategory}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Assistance Type</label>
                    <p className="text-base text-gray-900">{selectedApplication.assistanceType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Requested Amount</label>
                    <p className="text-xl font-bold text-green-600">₱{selectedApplication.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-500">Purpose</label>
                  <p className="text-base text-gray-900">{selectedApplication.purpose}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => handleMoveToEvaluation(selectedApplication.id)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Move to Evaluation Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}