import { useState } from 'react';
import { Search, CheckCircle, XCircle, X, FileText } from 'lucide-react';
import { pwdApplications } from '../../../data/sectorData';

export default function EvaluationQueue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [evaluationForm, setEvaluationForm] = useState({
    assessmentNotes: '',
    recommendedAmount: '',
    decision: ''
  });

  // Filter only "Pending" and "Under Review" applications
  const queuedApplications = pwdApplications.filter(app => 
    app.status === 'Pending' || app.status === 'Under Review'
  ).filter(app => 
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEvaluate = (application: any) => {
    setSelectedApplication(application);
    setEvaluationForm({
      assessmentNotes: '',
      recommendedAmount: application.amount.toString(),
      decision: ''
    });
    setShowEvaluationModal(true);
  };

  const handleSubmitEvaluation = () => {
    if (!evaluationForm.decision) {
      alert('Please select a decision');
      return;
    }
    alert(`Application ${selectedApplication.id} has been ${evaluationForm.decision}`);
    setShowEvaluationModal(false);
    setSelectedApplication(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Evaluation Queue</h1>
        <p className="text-gray-500 mt-1">Review and evaluate pending applications</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Applications
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Evaluation Queue Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pending Evaluation</h2>
          <p className="text-sm text-gray-500 mt-1">Total: {queuedApplications.length} applications</p>
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
                  Disability Type
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
                    {application.disabilityType}
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
                    <button
                      onClick={() => handleEvaluate(application)}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" />
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Modal */}
      {showEvaluationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-800">Evaluate Application</h3>
              <button 
                onClick={() => setShowEvaluationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Application Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Application Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">ID:</span>
                    <span className="ml-2 text-gray-900 font-medium">{selectedApplication.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Applicant:</span>
                    <span className="ml-2 text-gray-900 font-medium">{selectedApplication.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Disability:</span>
                    <span className="ml-2 text-gray-900">{selectedApplication.disabilityType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Assistance:</span>
                    <span className="ml-2 text-gray-900">{selectedApplication.assistanceType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Requested Amount:</span>
                    <span className="ml-2 text-gray-900 font-semibold">₱{selectedApplication.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Barangay:</span>
                    <span className="ml-2 text-gray-900">{selectedApplication.barangay}</span>
                  </div>
                </div>
              </div>

              {/* Evaluation Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Notes
                  </label>
                  <textarea
                    value={evaluationForm.assessmentNotes}
                    onChange={(e) => setEvaluationForm({...evaluationForm, assessmentNotes: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter assessment notes, observations, and recommendations..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommended Amount (₱)
                  </label>
                  <input
                    type="number"
                    value={evaluationForm.recommendedAmount}
                    onChange={(e) => setEvaluationForm({...evaluationForm, recommendedAmount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter recommended amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Decision
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setEvaluationForm({...evaluationForm, decision: 'Approved'})}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        evaluationForm.decision === 'Approved'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Approve</span>
                    </button>
                    <button
                      onClick={() => setEvaluationForm({...evaluationForm, decision: 'Rejected'})}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        evaluationForm.decision === 'Rejected'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 hover:border-red-300'
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                      <span className="font-medium">Reject</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEvaluation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
