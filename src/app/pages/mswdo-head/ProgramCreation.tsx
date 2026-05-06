import { useState } from 'react';
import { Save, FileText } from 'lucide-react';

export default function ProgramCreation() {
  const [formData, setFormData] = useState({
    programName: '',
    programDescription: '',
    targetSector: '',
    assistanceType: '',
    requiredDocuments: '',
    maxAmount: '',
    budgetAllocation: '',
    startDate: '',
    endDate: '',
    eligibilityCriteria: '',
    status: 'Active'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Program created successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Program Creation</h1>
        <p className="text-gray-500 mt-1">Create new assistance programs for beneficiaries</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Program Details</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in the information below to create a new program</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Program Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="programName"
              value={formData.programName}
              onChange={handleInputChange}
              placeholder="e.g., Senior Citizen Medical Aid"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Program Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="programDescription"
              value={formData.programDescription}
              onChange={handleInputChange}
              placeholder="Describe the purpose and objectives of this program"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Target Sector and Assistance Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Sector <span className="text-red-500">*</span>
              </label>
              <select
                name="targetSector"
                value={formData.targetSector}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Sector</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="PWD">PWD</option>
                <option value="Solo Parent">Solo Parent</option>
                <option value="Women">Women</option>
                <option value="Youth">Youth / Children</option>
                <option value="Disaster">Disaster-Affected Families</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Assistance <span className="text-red-500">*</span>
              </label>
              <select
                name="assistanceType"
                value={formData.assistanceType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Financial Assistance">Financial Assistance</option>
                <option value="Medical Assistance">Medical Assistance</option>
                <option value="Educational Assistance">Educational Assistance</option>
                <option value="Livelihood Assistance">Livelihood Assistance</option>
                <option value="Emergency Relief">Emergency Relief</option>
              </select>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Documents <span className="text-red-500">*</span>
            </label>
            <textarea
              name="requiredDocuments"
              value={formData.requiredDocuments}
              onChange={handleInputChange}
              placeholder="List required documents, separated by commas (e.g., Valid ID, Barangay Certification, Medical Certificate)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Maximum Amount and Budget Allocation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Assistance Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  name="maxAmount"
                  value={formData.maxAmount}
                  onChange={handleInputChange}
                  placeholder="5000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sector Budget Allocation <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  name="budgetAllocation"
                  value={formData.budgetAllocation}
                  onChange={handleInputChange}
                  placeholder="300000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Program Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eligibility Criteria <span className="text-red-500">*</span>
            </label>
            <textarea
              name="eligibilityCriteria"
              value={formData.eligibilityCriteria}
              onChange={handleInputChange}
              placeholder="Define the eligibility requirements for this program"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Create Program
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            Save as Draft
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
