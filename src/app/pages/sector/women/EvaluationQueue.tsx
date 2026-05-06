import { useState } from 'react';
import { FileText } from 'lucide-react';

const queuedApplications = [
  {
    id: "WS-401",
    applicantName: "Angela Flores",
    age: 34,
    gender: "Female",
    address: "789 Main St., Pacol",
    barangay: "Pacol",
    contactNumber: "0917-345-6789",
    programCategory: "Livelihood Program",
    employmentStatus: "Unemployed",
    monthlyIncome: "₱5,000",
    assistanceType: "Financial Assistance",
    requestedAmount: "₱4,000",
    reason: "Starting small business for family livelihood"
  }
];

export default function EvaluationQueue() {
  const [selectedApplication, setSelectedApplication] = useState<typeof queuedApplications[0] | null>(null);
  const [eligibilityVerified, setEligibilityVerified] = useState(false);
  const [documentsComplete, setDocumentsComplete] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [evaluationNotes, setEvaluationNotes] = useState('');

  const handleEvaluate = (application: typeof queuedApplications[0]) => {
    setSelectedApplication(application);
  };

  const handleSubmitEvaluation = () => {
    alert('Application evaluation submitted successfully!');
    setSelectedApplication(null);
    setEligibilityVerified(false);
    setDocumentsComplete(false);
    setRecommendation('');
    setEvaluationNotes('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Evaluation Queue</h1>
        <p className="text-gray-500 mt-1">Review and evaluate pending women sector applications</p>
      </div>

      {!selectedApplication ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Applications Pending Evaluation</h2>
            <p className="text-sm text-gray-500 mt-1">{queuedApplications.length} application(s) awaiting review</p>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {queuedApplications.map((application) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEvaluate(application)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Application Evaluation</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Back to Queue
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applicant Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900">{selectedApplication.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900">{selectedApplication.age}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Barangay</label>
                    <p className="text-gray-900">{selectedApplication.barangay}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{selectedApplication.address}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Contact Number</label>
                    <p className="text-gray-900">{selectedApplication.contactNumber}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">Program Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Program Category</label>
                    <p className="text-gray-900">{selectedApplication.programCategory}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Employment Status</label>
                    <p className="text-gray-900">{selectedApplication.employmentStatus}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Monthly Income</label>
                    <p className="text-gray-900">{selectedApplication.monthlyIncome}</p>
                  </div>
                </div>
              </div>

              {/* Assistance Request Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Assistance Request</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Type of Assistance</label>
                    <p className="text-gray-900">{selectedApplication.assistanceType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Requested Amount</label>
                    <p className="text-gray-900">{selectedApplication.requestedAmount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Reason for Request</label>
                    <p className="text-gray-900">{selectedApplication.reason}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">Uploaded Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Valid ID</span>
                    <button className="ml-auto text-sm text-blue-600 hover:underline">View</button>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Barangay Certificate</span>
                    <button className="ml-auto text-sm text-blue-600 hover:underline">View</button>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Supporting Documents</span>
                    <button className="ml-auto text-sm text-blue-600 hover:underline">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Evaluation Form</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="eligibility"
                  checked={eligibilityVerified}
                  onChange={(e) => setEligibilityVerified(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="eligibility" className="text-gray-700 font-medium">
                  Eligibility Verified
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="documents"
                  checked={documentsComplete}
                  onChange={(e) => setDocumentsComplete(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="documents" className="text-gray-700 font-medium">
                  Documents Complete
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendation
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="recommendation"
                      value="approve"
                      checked={recommendation === 'approve'}
                      onChange={(e) => setRecommendation(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Approve Application</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="recommendation"
                      value="reject"
                      checked={recommendation === 'reject'}
                      onChange={(e) => setRecommendation(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Reject Application</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="recommendation"
                      value="additional"
                      checked={recommendation === 'additional'}
                      onChange={(e) => setRecommendation(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">Request Additional Documents</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evaluation Notes
                </label>
                <textarea
                  value={evaluationNotes}
                  onChange={(e) => setEvaluationNotes(e.target.value)}
                  rows={4}
                  placeholder="Enter your evaluation notes here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitEvaluation}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Evaluation
                </button>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
