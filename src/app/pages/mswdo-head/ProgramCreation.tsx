import { useState } from 'react';
import { Save, FileText, Plus, Trash2, Upload, File, Image as ImageIcon, X, CheckCircle, AlertCircle } from 'lucide-react';
import { programStore, ProgramRequirement } from '../../utils/programStore';
import { useNavigate } from 'react-router';

export default function ProgramCreation() {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [targetSector, setTargetSector] = useState('');
  const [assistanceType, setAssistanceType] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [budgetAllocation, setBudgetAllocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Draft'>('Active');

  const [requirements, setRequirements] = useState<ProgramRequirement[]>([
    {
      id: '1',
      name: '',
      description: '',
      isMandatory: true,
      placeholderFile: undefined
    }
  ]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProgramId, setCreatedProgramId] = useState('');

  const addRequirement = () => {
    setRequirements([
      ...requirements,
      {
        id: String(requirements.length + 1),
        name: '',
        description: '',
        isMandatory: true,
        placeholderFile: undefined
      }
    ]);
  };

  const removeRequirement = (id: string) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter(req => req.id !== id));
    }
  };

  const updateRequirement = (id: string, field: keyof ProgramRequirement, value: any) => {
    setRequirements(requirements.map(req =>
      req.id === id ? { ...req, [field]: value } : req
    ));
  };

  const handleFileUpload = (requirementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      // For demo, we'll create a local URL
      const fileUrl = URL.createObjectURL(file);

      updateRequirement(requirementId, 'placeholderFile', {
        name: file.name,
        type: file.type,
        url: fileUrl,
        uploadedAt: new Date().toISOString()
      });
    }
  };

  const removeFile = (requirementId: string) => {
    updateRequirement(requirementId, 'placeholderFile', undefined);
  };

  const handleSubmit = (e: React.FormEvent, saveStatus: 'Active' | 'Inactive' | 'Draft') => {
    e.preventDefault();

    // Validation
    if (!programName || !programDescription || !targetSector || !assistanceType) {
      alert('Please fill in all required fields');
      return;
    }

    if (requirements.some(req => !req.name.trim())) {
      alert('Please fill in all requirement names');
      return;
    }

    const currentUser = localStorage.getItem('username') || 'head-001';

    const newProgram = programStore.create({
      programName,
      programDescription,
      targetSector,
      assistanceType,
      requirements: requirements.filter(req => req.name.trim() !== ''),
      maxAmount: Number(maxAmount),
      budgetAllocation: Number(budgetAllocation),
      startDate,
      endDate,
      eligibilityCriteria,
      status: saveStatus,
      createdBy: currentUser
    });

    setCreatedProgramId(newProgram.id);
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setProgramName('');
    setProgramDescription('');
    setTargetSector('');
    setAssistanceType('');
    setMaxAmount('');
    setBudgetAllocation('');
    setStartDate('');
    setEndDate('');
    setEligibilityCriteria('');
    setStatus('Active');
    setRequirements([{
      id: '1',
      name: '',
      description: '',
      isMandatory: true,
      placeholderFile: undefined
    }]);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Program Creation</h1>
        <p className="text-gray-500 mt-1">Create new assistance programs with document requirements and placeholder files</p>
      </div>

      <form className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Program Details</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in the information below to create a new assistance program</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Program Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="e.g., Senior Citizen Medical Aid Program"
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
              value={programDescription}
              onChange={(e) => setProgramDescription(e.target.value)}
              placeholder="Describe the purpose, objectives, and goals of this assistance program"
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
                value={targetSector}
                onChange={(e) => setTargetSector(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Sector</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="PWD">PWD</option>
                <option value="Solo Parent">Solo Parent</option>
                <option value="Women">Women</option>
                <option value="Youth">Youth / Children</option>
                <option value="ECCD">ECCD</option>
                <option value="Disaster">Disaster-Affected Families</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Assistance <span className="text-red-500">*</span>
              </label>
              <select
                value={assistanceType}
                onChange={(e) => setAssistanceType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Financial Assistance">Financial Assistance</option>
                <option value="Medical Assistance">Medical Assistance</option>
                <option value="Educational Assistance">Educational Assistance</option>
                <option value="Livelihood Assistance">Livelihood Assistance</option>
                <option value="Emergency Relief">Emergency Relief</option>
                <option value="Food Assistance">Food Assistance</option>
              </select>
            </div>
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
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="5000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Program Budget <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  value={budgetAllocation}
                  onChange={(e) => setBudgetAllocation(e.target.value)}
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
              value={eligibilityCriteria}
              onChange={(e) => setEligibilityCriteria(e.target.value)}
              placeholder="Define who is eligible for this program (age requirements, income level, residency, etc.)"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Document Requirements Section */}
        <div className="border-t border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Document Requirements</h2>
              <p className="text-sm text-gray-500 mt-1">
                Define required documents and upload placeholder/sample files for each requirement
              </p>
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Requirement
            </button>
          </div>

          <div className="p-6 space-y-6">
            {requirements.map((req, index) => (
              <div key={req.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Requirement #{index + 1}</h3>
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(req.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirement Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={req.name}
                      onChange={(e) => updateRequirement(req.id, 'name', e.target.value)}
                      placeholder="e.g., Valid ID, Medical Certificate, Barangay Certificate"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirement Type
                    </label>
                    <select
                      value={req.isMandatory ? 'mandatory' : 'optional'}
                      onChange={(e) => updateRequirement(req.id, 'isMandatory', e.target.value === 'mandatory')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="mandatory">Mandatory</option>
                      <option value="optional">Optional</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirement Description
                  </label>
                  <textarea
                    value={req.description}
                    onChange={(e) => updateRequirement(req.id, 'description', e.target.value)}
                    placeholder="Provide instructions on what type of document is needed and any specific requirements"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Placeholder/Sample File
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Upload a sample or placeholder document to show applicants what format is expected
                  </p>

                  {!req.placeholderFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <input
                        type="file"
                        id={`file-${req.id}`}
                        onChange={(e) => handleFileUpload(req.id, e)}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                      <label
                        htmlFor={`file-${req.id}`}
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF, DOC up to 10MB
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {req.placeholderFile.type.startsWith('image/') ? (
                            <ImageIcon className="w-10 h-10 text-blue-600" />
                          ) : (
                            <File className="w-10 h-10 text-blue-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {req.placeholderFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Uploaded on {new Date(req.placeholderFile.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(req.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {req.placeholderFile.type.startsWith('image/') && (
                        <div className="mt-3">
                          <img
                            src={req.placeholderFile.url}
                            alt="Preview"
                            className="max-w-full h-32 object-contain rounded border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'Active')}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <CheckCircle className="w-5 h-5" />
            Create & Publish Program
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'Draft')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Save as Draft
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Clear Form
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Program Created Successfully!
              </h3>

              <p className="text-gray-600 text-center mb-1">
                Program ID: <span className="font-semibold">{createdProgramId}</span>
              </p>
              <p className="text-gray-600 text-center mb-6">
                The program "{programName}" has been created and is now {status.toLowerCase()}.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Create Another Program
                </button>
                <button
                  onClick={() => navigate('/mswdo-head/program-management')}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  View All Programs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
