import { useState } from 'react';
import { Upload, Save, Search, AlertCircle, CheckCircle, XCircle, FileText, X } from 'lucide-react';
import { mockResidents, type Resident } from '../data/mockData';

export default function NewApplication() {
  const [step, setStep] = useState<'validate' | 'apply'>('validate');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [validatedResident, setValidatedResident] = useState<Resident | null>(null);
  
  const [formData, setFormData] = useState({
    assistanceType: '',
    reason: '',
    sector: [] as string[],
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  const handleSearch = () => {
    setSearchPerformed(true);
    
    if (searchQuery.trim() === '') {
      return;
    }

    // Search in resident database
    const resident = mockResidents.find(
      (r) =>
        r.fullName.toLowerCase() === searchQuery.toLowerCase() ||
        r.id.toLowerCase() === searchQuery.toLowerCase() ||
        r.contactNumber === searchQuery
    );

    if (resident) {
      setValidatedResident(resident);
      setFormData({
        ...formData,
        sector: [resident.sector], // Pre-fill sector from resident data
      });
    } else {
      setValidatedResident(null);
    }
  };

  const handleProceedToApplication = () => {
    if (validatedResident) {
      setStep('apply');
    }
  };

  const handleSectorChange = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sector: prev.sector.includes(sector)
        ? prev.sector.filter(s => s !== sector)
        : [...prev.sector, sector]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocuments(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedDocuments(uploadedDocuments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatedResident) {
      alert('Please validate the resident first!');
      return;
    }

    const applicationId = `APP-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    alert(
      `✅ Application Submitted Successfully!\n\n` +
      `Application ID: ${applicationId}\n` +
      `Resident: ${validatedResident.fullName} (${validatedResident.id})\n` +
      `Assistance Type: ${formData.assistanceType}\n\n` +
      `Status: Pending Validation`
    );
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setStep('validate');
    setSearchQuery('');
    setSearchPerformed(false);
    setValidatedResident(null);
    setFormData({
      assistanceType: '',
      reason: '',
      sector: [],
    });
    setUploadedDocuments([]);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">New Application</h1>
        <p className="text-gray-500 mt-1">Submit assistance application for registered residents</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'validate' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}
            >
              {step === 'apply' ? <CheckCircle className="w-6 h-6" /> : '1'}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Validate Resident</span>
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'apply' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Submit Application</span>
          </div>
        </div>
      </div>

      {/* Step 1: Validate Resident */}
      {step === 'validate' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Step 1: Validate Resident in Database
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> The applicant must be registered in the Residents Database 
                  before submitting an application. If the resident is not found, please register them first 
                  using the Residents Database or Walk-in Registration feature.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Resident by Name, ID, or Contact Number *
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchPerformed(false);
                      setValidatedResident(null);
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter exact name, resident ID, or contact number..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Validate
                </button>
              </div>
            </div>

            {/* Validation Result */}
            {searchPerformed && validatedResident && (
              <div className="mt-6 border-2 border-green-500 rounded-lg p-6 bg-green-50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                      ✓ Resident Validated Successfully
                    </h3>
                    <div className="grid grid-cols-2 gap-3 bg-white rounded-lg p-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Resident ID</p>
                        <p className="font-medium text-gray-900">{validatedResident.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium text-gray-900">{validatedResident.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="text-gray-900">{validatedResident.age} years old</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="text-gray-900">{validatedResident.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact Number</p>
                        <p className="text-gray-900">{validatedResident.contactNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Primary Sector</p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {validatedResident.sector}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-900">{validatedResident.address}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleProceedToApplication}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Proceed to Application Form
                    </button>
                  </div>
                </div>
              </div>
            )}

            {searchPerformed && !validatedResident && searchQuery && (
              <div className="mt-6 border-2 border-red-500 rounded-lg p-6 bg-red-50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      ✗ Resident Not Found in Database
                    </h3>
                    <p className="text-red-800 mb-4">
                      The resident "{searchQuery}" is not registered in the Barangay Residents Database.
                      Please register the resident first before submitting an application.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => window.location.href = '/dashboard/residents-database'}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Go to Residents Database
                      </button>
                      <button
                        onClick={() => window.location.href = '/dashboard/walk-in-registration'}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Walk-in Registration
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Search Suggestions */}
          {!searchPerformed && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Residents:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockResidents.slice(0, 4).map((resident) => (
                  <button
                    key={resident.id}
                    onClick={() => {
                      setSearchQuery(resident.fullName);
                      setSearchPerformed(false);
                    }}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-medium text-gray-900 text-sm">{resident.fullName}</p>
                    <p className="text-xs text-gray-500">ID: {resident.id} • {resident.sector}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Application Form */}
      {step === 'apply' && validatedResident && (
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Step 2: Submit Assistance Application
            </h2>

            {/* Validated Resident Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Validated Resident Information</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-blue-700">Name:</span>{' '}
                  <span className="font-medium text-blue-900">{validatedResident.fullName}</span>
                </div>
                <div>
                  <span className="text-blue-700">ID:</span>{' '}
                  <span className="font-medium text-blue-900">{validatedResident.id}</span>
                </div>
                <div>
                  <span className="text-blue-700">Age:</span>{' '}
                  <span className="font-medium text-blue-900">{validatedResident.age}</span>
                </div>
                <div>
                  <span className="text-blue-700">Contact:</span>{' '}
                  <span className="font-medium text-blue-900">{validatedResident.contactNumber}</span>
                </div>
              </div>
            </div>

            {/* Assistance Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Assistance Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Assistance Requested *
                  </label>
                  <select
                    value={formData.assistanceType}
                    onChange={(e) => setFormData({ ...formData, assistanceType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Assistance Type</option>
                    <option value="Financial Assistance">Financial Assistance</option>
                    <option value="Medical Assistance">Medical Assistance</option>
                    <option value="Educational Assistance">Educational Assistance</option>
                    <option value="Food Assistance">Food Assistance</option>
                    <option value="Livelihood Assistance">Livelihood Assistance</option>
                    <option value="Skills Training">Skills Training</option>
                    <option value="Emergency Assistance">Emergency Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Request *
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    placeholder="Provide detailed information about the assistance needed..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Sector Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sector Selection *</h3>
              <p className="text-sm text-gray-600 mb-3">
                Primary sector ({validatedResident.sector}) is pre-selected. You can add additional sectors if applicable.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Senior Citizen', 'PWD', 'Solo Parent', 'Women', 'Youth', 'Disaster Affected'].map((sector) => (
                  <label key={sector} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sector.includes(sector)}
                      onChange={() => handleSectorChange(sector)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{sector}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Upload *</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload supporting documents</p>
                <p className="text-sm text-gray-500 mb-4">Medical Certificate, Prescription, Receipts, etc.</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Choose Files
                </label>

                {uploadedDocuments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedDocuments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
