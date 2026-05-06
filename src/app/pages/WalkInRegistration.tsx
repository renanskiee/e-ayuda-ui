import { useState } from 'react';
import { UserPlus, Upload, Save, Search, CheckCircle, XCircle, FileText, X } from 'lucide-react';
import { mockResidents, type Resident } from '../data/mockData';

export default function WalkInRegistration() {
  const [step, setStep] = useState<'search' | 'register' | 'apply'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Resident[]>([]);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [isNewResident, setIsNewResident] = useState(false);

  const [residentData, setResidentData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    birthdate: '',
    contactNumber: '',
    street: '',
    zone: '',
    barangay: 'San Jose',
    city: '',
    sector: '',
    pwdType: '',
  });

  const [applicationData, setApplicationData] = useState({
    assistanceType: '',
    reason: '',
    sector: [] as string[],
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  const [documentRequirements, setDocumentRequirements] = useState({
    barangayId: null as File | null,
    validId: null as File | null,
    proofOfResidency: null as File | null,
    otherDocuments: [] as File[],
  });

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = mockResidents.filter(
      (resident) =>
        resident.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.contactNumber.includes(searchQuery)
    );

    setSearchResults(results);
  };

  const handleSelectResident = (resident: Resident) => {
    setSelectedResident(resident);
    setStep('apply');
    // Pre-fill sector in application
    setApplicationData({
      ...applicationData,
      sector: [resident.sector],
    });
  };

  const handleNewResident = () => {
    setIsNewResident(true);
    setStep('register');
    setSearchResults([]);
  };

  const calculateAge = (birthdate: string) => {
    // Handle DD/MM/YYYY format
    const parts = birthdate.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1; // Month is 0-indexed
      const year = parseInt(parts[2]);

      const today = new Date();
      const birthDate = new Date(year, month, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    // Fallback for other formats
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRegisterAndApply = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct full name and address
    const fullName = `${residentData.firstName} ${residentData.middleName ? residentData.middleName + ' ' : ''}${residentData.lastName}`.trim();
    const fullAddress = `${residentData.street}, Zone ${residentData.zone}, ${residentData.barangay}, ${residentData.city}`;

    // Collect all documents
    const allDocuments: File[] = [];
    if (documentRequirements.barangayId) allDocuments.push(documentRequirements.barangayId);
    if (documentRequirements.validId) allDocuments.push(documentRequirements.validId);
    if (documentRequirements.proofOfResidency) allDocuments.push(documentRequirements.proofOfResidency);
    allDocuments.push(...documentRequirements.otherDocuments);

    const newResident: Resident = {
      id: `RES-2024-${String(mockResidents.length + 1).padStart(3, '0')}`,
      fullName: fullName,
      gender: residentData.gender,
      birthdate: residentData.birthdate,
      age: calculateAge(residentData.birthdate),
      address: fullAddress,
      contactNumber: residentData.contactNumber,
      barangay: residentData.barangay,
      sector: residentData.sector,
      documents: allDocuments.map((file, index) => ({
        id: `DOC-2024-${String(Date.now() + index).slice(-6)}`,
        type: 'Walk-in Document',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadedDate: new Date().toISOString().split('T')[0],
      })),
      dateRegistered: new Date().toISOString().split('T')[0],
      registeredBy: 'BSWDO Staff (Walk-in)',
    };

    const applicationId = `APP-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    alert(
      `✅ Registration and Application Successful!\n\n` +
      `Resident ID: ${newResident.id}\n` +
      `Application ID: ${applicationId}\n` +
      `Name: ${newResident.fullName}\n` +
      `Assistance: ${applicationData.assistanceType}\n\n` +
      `Status: Pending Validation`
    );

    // Reset form
    resetForm();
  };

  const handleApplyExisting = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedResident) return;

    const applicationId = `APP-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    alert(
      `✅ Application Submitted Successfully!\n\n` +
      `Application ID: ${applicationId}\n` +
      `Resident: ${selectedResident.fullName} (${selectedResident.id})\n` +
      `Assistance: ${applicationData.assistanceType}\n\n` +
      `Status: Pending Validation`
    );

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setStep('search');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedResident(null);
    setIsNewResident(false);
    setResidentData({
      firstName: '',
      lastName: '',
      middleName: '',
      gender: '',
      birthdate: '',
      contactNumber: '',
      street: '',
      zone: '',
      barangay: 'San Jose',
      city: '',
      sector: '',
      pwdType: '',
    });
    setApplicationData({
      assistanceType: '',
      reason: '',
      sector: [],
    });
    setUploadedDocuments([]);
    setDocumentRequirements({
      barangayId: null,
      validId: null,
      proofOfResidency: null,
      otherDocuments: [],
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocuments(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedDocuments(uploadedDocuments.filter((_, i) => i !== index));
  };

  const handleSectorChange = (sector: string) => {
    setApplicationData((prev) => ({
      ...prev,
      sector: prev.sector.includes(sector)
        ? prev.sector.filter((s) => s !== sector)
        : [...prev.sector, sector],
    }));
  };

  const handleDocumentUpload = (type: 'barangayId' | 'validId' | 'proofOfResidency', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentRequirements({
        ...documentRequirements,
        [type]: e.target.files[0],
      });
    }
  };

  const handleOtherDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentRequirements({
        ...documentRequirements,
        otherDocuments: [...documentRequirements.otherDocuments, ...Array.from(e.target.files)],
      });
    }
  };

  const removeOtherDocument = (index: number) => {
    setDocumentRequirements({
      ...documentRequirements,
      otherDocuments: documentRequirements.otherDocuments.filter((_, i) => i !== index),
    });
  };

  const removeSpecificDocument = (type: 'barangayId' | 'validId' | 'proofOfResidency') => {
    setDocumentRequirements({
      ...documentRequirements,
      [type]: null,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Walk-in Registration & Application</h1>
        <p className="text-gray-500 mt-1">
          Register new residents and process walk-in assistance applications
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'search' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Search Resident</span>
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Register (If New)</span>
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'apply' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Submit Application</span>
          </div>
        </div>
      </div>

      {/* Step 1: Search Resident */}
      {step === 'search' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Search for Resident</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name, ID, or Contact Number
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter name, resident ID, or contact number..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Search Results</h3>
                <div className="space-y-3">
                  {searchResults.map((resident) => (
                    <div
                      key={resident.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{resident.fullName}</p>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>ID: {resident.id}</span>
                            <span>Age: {resident.age}</span>
                            <span>Gender: {resident.gender}</span>
                            <span>Contact: {resident.contactNumber}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{resident.address}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {resident.sector}
                          </span>
                        </div>
                        <button
                          onClick={() => handleSelectResident(resident)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length === 0 && searchQuery && (
              <div className="mt-6 text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
                <XCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <p className="text-yellow-800 font-medium mb-2">No resident found</p>
                <p className="text-sm text-yellow-700 mb-4">
                  The resident is not yet registered in the database
                </p>
                <button
                  onClick={handleNewResident}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Register New Resident
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleNewResident}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Register New Resident (Skip Search)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Register New Resident + Apply */}
      {step === 'register' && isNewResident && (
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleRegisterAndApply} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Step 2 & 3: Register New Resident & Submit Application
            </h2>

            {/* Resident Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resident Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={residentData.firstName}
                    onChange={(e) => setResidentData({ ...residentData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name (Optional)</label>
                  <input
                    type="text"
                    value={residentData.middleName}
                    onChange={(e) => setResidentData({ ...residentData, middleName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={residentData.lastName}
                    onChange={(e) => setResidentData({ ...residentData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    value={residentData.gender}
                    onChange={(e) => setResidentData({ ...residentData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate (DD/MM/YYYY) *</label>
                  <input
                    type="text"
                    value={residentData.birthdate}
                    onChange={(e) => setResidentData({ ...residentData, birthdate: e.target.value })}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={residentData.contactNumber}
                    onChange={(e) =>
                      setResidentData({ ...residentData, contactNumber: e.target.value })
                    }
                    placeholder="09XXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={residentData.street}
                    onChange={(e) => setResidentData({ ...residentData, street: e.target.value })}
                    placeholder="House No., Street Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone *</label>
                  <input
                    type="text"
                    value={residentData.zone}
                    onChange={(e) => setResidentData({ ...residentData, zone: e.target.value })}
                    placeholder="Zone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barangay *</label>
                  <input
                    type="text"
                    value={residentData.barangay}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={residentData.city}
                    onChange={(e) => setResidentData({ ...residentData, city: e.target.value })}
                    placeholder="City/Municipality"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sector Category *
                  </label>
                  <select
                    value={residentData.sector}
                    onChange={(e) => setResidentData({ ...residentData, sector: e.target.value, pwdType: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Sector</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="PWD">PWD</option>
                    <option value="Solo Parent">Solo Parent</option>
                    <option value="Women">Women</option>
                    <option value="Youth/Children">Youth/Children</option>
                    <option value="ECCD">ECCD</option>
                  </select>
                </div>

                {residentData.sector === 'PWD' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Disability *
                    </label>
                    <input
                      type="text"
                      value={residentData.pwdType}
                      onChange={(e) => setResidentData({ ...residentData, pwdType: e.target.value })}
                      placeholder="e.g., Visual Impairment, Hearing Impairment, Physical Disability"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Assistance Details */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Assistance Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Assistance Requested *
                  </label>
                  <select
                    value={applicationData.assistanceType}
                    onChange={(e) =>
                      setApplicationData({ ...applicationData, assistanceType: e.target.value })
                    }
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
                    value={applicationData.reason}
                    onChange={(e) =>
                      setApplicationData({ ...applicationData, reason: e.target.value })
                    }
                    rows={4}
                    placeholder="Provide detailed information about the assistance needed..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Sector Categories
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Senior Citizen', 'PWD', 'Solo Parent', 'Women', 'Youth/Children', 'ECCD'].map(
                      (sector) => (
                        <label
                          key={sector}
                          className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={applicationData.sector.includes(sector)}
                            onChange={() => handleSectorChange(sector)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{sector}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Upload *</h3>
              <div className="space-y-4">
                {/* Barangay ID */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Barangay ID *
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleDocumentUpload('barangayId', e)}
                      className="hidden"
                      id="barangay-id-upload"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="barangay-id-upload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </label>
                  </div>
                  {documentRequirements.barangayId && (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2 rounded mt-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{documentRequirements.barangayId.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecificDocument('barangayId')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Valid ID */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Valid ID *
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleDocumentUpload('validId', e)}
                      className="hidden"
                      id="valid-id-upload"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="valid-id-upload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </label>
                  </div>
                  {documentRequirements.validId && (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2 rounded mt-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{documentRequirements.validId.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecificDocument('validId')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Proof of Residency */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Proof of Residency *
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleDocumentUpload('proofOfResidency', e)}
                      className="hidden"
                      id="proof-residency-upload"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="proof-residency-upload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </label>
                  </div>
                  {documentRequirements.proofOfResidency && (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2 rounded mt-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{documentRequirements.proofOfResidency.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecificDocument('proofOfResidency')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Other Documents */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Other Supporting Documents (Optional)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleOtherDocumentsUpload}
                      className="hidden"
                      id="other-docs-upload"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="other-docs-upload"
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </label>
                  </div>
                  {documentRequirements.otherDocuments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {documentRequirements.otherDocuments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 border border-gray-200 p-2 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeOtherDocument(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Register & Submit Application
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Apply for Existing Resident */}
      {step === 'apply' && selectedResident && !isNewResident && (
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleApplyExisting} className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Step 3: Submit Assistance Application
            </h2>

            {/* Selected Resident Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Selected Resident</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-blue-700">Name:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedResident.fullName}</span>
                </div>
                <div>
                  <span className="text-blue-700">ID:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedResident.id}</span>
                </div>
                <div>
                  <span className="text-blue-700">Age:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedResident.age}</span>
                </div>
                <div>
                  <span className="text-blue-700">Contact:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedResident.contactNumber}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-blue-700">Address:</span>{' '}
                  <span className="font-medium text-blue-900">{selectedResident.address}</span>
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
                    value={applicationData.assistanceType}
                    onChange={(e) =>
                      setApplicationData({ ...applicationData, assistanceType: e.target.value })
                    }
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
                    value={applicationData.reason}
                    onChange={(e) =>
                      setApplicationData({ ...applicationData, reason: e.target.value })
                    }
                    rows={4}
                    placeholder="Provide detailed information about the assistance needed..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector Categories *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Senior Citizen', 'PWD', 'Solo Parent', 'Women', 'Youth/Children', 'ECCD'].map(
                      (sector) => (
                        <label
                          key={sector}
                          className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={applicationData.sector.includes(sector)}
                            onChange={() => handleSectorChange(sector)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{sector}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-center text-gray-600 mb-2">
                  Upload supporting documents for this application
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload-application"
                  accept="image/*,.pdf"
                />
                <label
                  htmlFor="file-upload-application"
                  className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors mx-auto w-fit"
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
            <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
