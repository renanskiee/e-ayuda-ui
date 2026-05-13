import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, X, FileText } from 'lucide-react';
import { applicationStore, Application } from '../../../utils/applicationStore';

export default function EvaluationQueue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [evaluationForm, setEvaluationForm] = useState({
    assessmentNotes: '',
    recommendedAmount: '',
    decision: ''
  });
  const [applications, setApplications] = useState<Application[]>([]);

  // Load applications from centralized store
  useEffect(() => {
    const loadApplications = async () => {
      // Get applications for Women sector with status Received or Under Evaluation
      const allApps = await applicationStore.getAll();
      const sectorApps = allApps.filter(app =>
        app.sector === 'Women' &&
        (app.status === 'Received' || app.status === 'Under Evaluation')
      );
      setApplications(sectorApps);
    };

    loadApplications();
    // Subscribe to store changes for real-time updates
    const unsubscribe = applicationStore.subscribe(loadApplications);
    return unsubscribe;
  }, []);

  const filteredApplications = applications.filter(app =>
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEvaluate = (application: Application) => {
    setSelectedApplication(application);
    setEvaluationForm({
      assessmentNotes: '',
      recommendedAmount: application.requestedAmount.toString(),
      decision: ''
    });
    setShowEvaluationModal(true);
  };

  const handleSubmitEvaluation = async () => {
    if (!evaluationForm.decision) {
      alert('Please select a decision');
      return;
    }

    if (!selectedApplication) return;

    const currentUser = localStorage.getItem('username') || 'sector-women-001';

    if (evaluationForm.decision === 'recommend') {
      const recommendedAmount = parseFloat(evaluationForm.recommendedAmount);

      if (isNaN(recommendedAmount) || recommendedAmount <= 0) {
        alert('Please enter a valid recommended amount');
        return;
      }

      // Call centralized store method to update application
      const success = await applicationStore.recommendApplication(
        selectedApplication.id,
        currentUser,
        recommendedAmount,
        evaluationForm.assessmentNotes
      );

      if (success) {
        alert(`✅ Application ${selectedApplication.id} has been recommended for MSWDO Head approval!\n\nThe application will now appear in the "Awaiting Approval" page.`);
        setShowEvaluationModal(false);
        setSelectedApplication(null);
        setEvaluationForm({
          assessmentNotes: '',
          recommendedAmount: '',
          decision: ''
        });
      } else {
        alert('Failed to process application. Please try again.');
      }
    } else if (evaluationForm.decision === 'return') {
      alert('Application returned for additional requirements');
      setShowEvaluationModal(false);
      setSelectedApplication(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Evaluation Queue - Women</h1>
        <p className="text-gray-500 mt-1">Review and evaluate pending women applications</p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total in Queue</p>
            <p className="text-2xl font-bold text-gray-900">{filteredApplications.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Received</p>
            <p className="text-2xl font-bold text-blue-600">
              {filteredApplications.filter(a => a.status === 'Received').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Under Evaluation</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredApplications.filter(a => a.status === 'Under Evaluation').length}
            </p>
          </div>
        </div>
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
          <p className="text-sm text-gray-500 mt-1">Total: {filteredApplications.length} applications</p>
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
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested Amount
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
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <FileText className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-lg font-medium">No applications in evaluation queue</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Applications will appear here when forwarded from barangay
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application) => (
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
                      {application.assistanceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{application.requestedAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        application.status === 'Received'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Modal */}
      {showEvaluationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-blue-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Evaluate Application</h3>
                <p className="text-blue-100 text-sm">{selectedApplication.id}</p>
              </div>
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Applicant Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Applicant Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Barangay</p>
                    <p className="font-medium text-gray-900">{selectedApplication.barangay}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Assistance Type</p>
                    <p className="font-medium text-gray-900">{selectedApplication.assistanceType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Requested Amount</p>
                    <p className="font-medium text-green-600">₱{selectedApplication.requestedAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date Received</p>
                    <p className="font-medium text-gray-900">{selectedApplication.dateReceived}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">{selectedApplication.status}</p>
                  </div>
                </div>
              </div>

              {/* Evaluation Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommended Amount *
                  </label>
                  <input
                    type="number"
                    value={evaluationForm.recommendedAmount}
                    onChange={(e) => setEvaluationForm({...evaluationForm, recommendedAmount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter recommended amount..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Can be equal to or less than requested amount
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Notes
                  </label>
                  <textarea
                    value={evaluationForm.assessmentNotes}
                    onChange={(e) => setEvaluationForm({...evaluationForm, assessmentNotes: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your assessment notes and recommendations..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Decision *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="decision"
                        value="recommend"
                        checked={evaluationForm.decision === 'recommend'}
                        onChange={(e) => setEvaluationForm({...evaluationForm, decision: e.target.value})}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Recommend for Approval</p>
                        <p className="text-xs text-gray-500">Forward to MSWDO Head for final approval</p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="decision"
                        value="return"
                        checked={evaluationForm.decision === 'return'}
                        onChange={(e) => setEvaluationForm({...evaluationForm, decision: e.target.value})}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Return for Additional Requirements</p>
                        <p className="text-xs text-gray-500">Send back to applicant for missing documents</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEvaluation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
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
