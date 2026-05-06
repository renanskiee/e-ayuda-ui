import { useState } from 'react';
import { Search, Eye, History, Plus, Edit, FileText, Upload, X, Save, AlertCircle } from 'lucide-react';
import { mockResidents, mockApplications, type Resident, type ResidentDocument } from '../data/mockData';

export default function ResidentsDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewDocumentsModal, setViewDocumentsModal] = useState(false);
  const [residents, setResidents] = useState<Resident[]>(mockResidents);

  const [formData, setFormData] = useState<Partial<Resident>>({
    fullName: '',
    gender: '',
    birthdate: '',
    age: 0,
    address: '',
    contactNumber: '',
    barangay: 'San Jose',
    sector: '',
    documents: [],
    dateRegistered: new Date().toISOString().split('T')[0],
    registeredBy: 'BSWDO Staff'
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const filteredResidents = residents.filter(resident =>
    resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.contactNumber.includes(searchTerm)
  );

  const getResidentApplications = (residentId: string) => {
    return mockApplications.filter(app => app.residentId === residentId);
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResident: Resident = {
      id: `RES-2024-${String(residents.length + 1).padStart(3, '0')}`,
      fullName: formData.fullName || '',
      gender: formData.gender || '',
      birthdate: formData.birthdate || '',
      age: calculateAge(formData.birthdate || ''),
      address: formData.address || '',
      contactNumber: formData.contactNumber || '',
      barangay: formData.barangay || 'San Jose',
      sector: formData.sector || '',
      documents: uploadedFiles.map((file, index) => ({
        id: `DOC-2024-${String(Date.now() + index).slice(-6)}`,
        type: 'Valid ID',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadedDate: new Date().toISOString().split('T')[0]
      })),
      dateRegistered: new Date().toISOString().split('T')[0],
      registeredBy: 'BSWDO Staff'
    };

    setResidents([...residents, newResident]);
    setIsAddModalOpen(false);
    resetForm();
    alert(`Resident ${newResident.fullName} has been successfully registered!`);
  };

  const handleEditResident = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedResident) {
      const updatedResidents = residents.map(r => 
        r.id === selectedResident.id 
          ? {
              ...r,
              ...formData,
              age: calculateAge(formData.birthdate || r.birthdate)
            }
          : r
      );
      
      setResidents(updatedResidents);
      setIsEditModalOpen(false);
      setSelectedResident(null);
      resetForm();
      alert('Resident information updated successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      gender: '',
      birthdate: '',
      age: 0,
      address: '',
      contactNumber: '',
      barangay: 'San Jose',
      sector: '',
      documents: [],
      dateRegistered: new Date().toISOString().split('T')[0],
      registeredBy: 'BSWDO Staff'
    });
    setUploadedFiles([]);
  };

  const openEditModal = (resident: Resident) => {
    setSelectedResident(resident);
    setFormData({
      fullName: resident.fullName,
      gender: resident.gender,
      birthdate: resident.birthdate,
      age: resident.age,
      address: resident.address,
      contactNumber: resident.contactNumber,
      barangay: resident.barangay,
      sector: resident.sector,
    });
    setIsEditModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Residents Database</h1>
          <p className="text-gray-500 mt-1">Manage resident profiles and track assistance history</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Resident
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800">
              <strong>Database Purpose:</strong> This is the official barangay resident database. All residents must be registered here before applying for assistance. 
              Use this to validate applicants and prevent duplicate registrations.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, ID, contact number, or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Residents</p>
          <p className="text-2xl font-semibold text-gray-800">{residents.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">With Applications</p>
          <p className="text-2xl font-semibold text-blue-600">
            {residents.filter(r => getResidentApplications(r.id).length > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Registered This Month</p>
          <p className="text-2xl font-semibold text-green-600">
            {residents.filter(r => r.dateRegistered?.includes('2024-03')).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Documents Uploaded</p>
          <p className="text-2xl font-semibold text-purple-600">
            {residents.reduce((sum, r) => sum + (r.documents?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Residents Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resident ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResidents.map((resident) => {
                const applications = getResidentApplications(resident.id);
                return (
                  <tr key={resident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resident.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resident.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resident.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resident.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resident.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {resident.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setSelectedResident(resident);
                          setViewDocumentsModal(true);
                        }}
                        className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{resident.documents?.length || 0} files</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedResident(resident)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Profile"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openEditModal(resident)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit Profile"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setSelectedResident(resident)}
                          className="text-purple-600 hover:text-purple-800"
                          title="View Assistance History"
                        >
                          <History className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredResidents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No residents found</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Add your first resident
            </button>
          </div>
        )}
      </div>

      {/* Add Resident Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Add New Resident</h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddResident} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birthdate *
                    </label>
                    <input
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
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
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      placeholder="09XXXXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complete Address *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Barangay *
                    </label>
                    <input
                      type="text"
                      value={formData.barangay}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sector Category *
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Sector</option>
                      <option value="Senior Citizen">Senior Citizen</option>
                      <option value="PWD">PWD</option>
                      <option value="Solo Parent">Solo Parent</option>
                      <option value="Women">Women</option>
                      <option value="Youth">Youth</option>
                      <option value="Children">Children</option>
                      <option value="Disaster Affected">Disaster Affected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Upload</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-center text-gray-600 mb-2">Upload Valid ID and other documents</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload-add"
                    accept="image/*,.pdf"
                  />
                  <label
                    htmlFor="file-upload-add"
                    className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors mx-auto w-fit"
                  >
                    Choose Files
                  </label>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
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

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Register Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Resident Modal */}
      {isEditModalOpen && selectedResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Edit Resident Information</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedResident(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditResident} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Birthdate *
                  </label>
                  <input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
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
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="09XXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sector Category *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Sector</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="PWD">PWD</option>
                    <option value="Solo Parent">Solo Parent</option>
                    <option value="Women">Women</option>
                    <option value="Youth">Youth</option>
                    <option value="Children">Children</option>
                    <option value="Disaster Affected">Disaster Affected</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedResident(null);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Documents Modal */}
      {viewDocumentsModal && selectedResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Documents - {selectedResident.fullName}
              </h2>
              <button
                onClick={() => {
                  setViewDocumentsModal(false);
                  setSelectedResident(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {selectedResident.documents && selectedResident.documents.length > 0 ? (
                <div className="space-y-4">
                  {selectedResident.documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="w-10 h-10 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.type}</p>
                            <p className="text-sm text-gray-600">{doc.fileName}</p>
                            <p className="text-xs text-gray-500 mt-1">Uploaded: {doc.uploadedDate}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No documents uploaded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resident Profile View Modal */}
      {selectedResident && !viewDocumentsModal && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Resident Profile</h2>
              <button
                onClick={() => setSelectedResident(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-gray-500">Resident ID</p>
                    <p className="text-gray-900 font-medium">{selectedResident.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900 font-medium">{selectedResident.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-900">{selectedResident.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-gray-900">{selectedResident.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Birthdate</p>
                    <p className="text-gray-900">{selectedResident.birthdate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="text-gray-900">{selectedResident.contactNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{selectedResident.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Barangay</p>
                    <p className="text-gray-900">{selectedResident.barangay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sector</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {selectedResident.sector}
                    </span>
                  </div>
                  {selectedResident.dateRegistered && (
                    <div>
                      <p className="text-sm text-gray-500">Date Registered</p>
                      <p className="text-gray-900">{selectedResident.dateRegistered}</p>
                    </div>
                  )}
                  {selectedResident.registeredBy && (
                    <div>
                      <p className="text-sm text-gray-500">Registered By</p>
                      <p className="text-gray-900">{selectedResident.registeredBy}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Uploaded Documents</h3>
                {selectedResident.documents && selectedResident.documents.length > 0 ? (
                  <div className="space-y-2">
                    {selectedResident.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                            <p className="text-xs text-gray-500">{doc.fileName}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No documents uploaded</p>
                  </div>
                )}
              </div>

              {/* Assistance History */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Assistance History</h3>
                {getResidentApplications(selectedResident.id).length > 0 ? (
                  <div className="space-y-3">
                    {getResidentApplications(selectedResident.id).map((app) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{app.assistanceType}</p>
                            <p className="text-sm text-gray-600">{app.reason}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            app.status === 'Pending Validation' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'Validated by Barangay' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'Forwarded to Municipal MSWDO' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>ID: {app.id}</span>
                          <span>Date: {app.submissionDate}</span>
                          <span>Sector: {app.sector}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <History className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No assistance history found</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    openEditModal(selectedResident);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setSelectedResident(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
