import { X, User, Calendar, MapPin, FileText, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface AssistanceRecord {
  program: string;
  amount?: string;
  date: string;
  status: string;
}

interface ResidentProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  resident: any;
  sector: string;
  onUpdate?: (data: any) => void;
}

export function ResidentProfilePanel({ isOpen, onClose, resident, sector, onUpdate }: ResidentProfilePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(resident || {});

  if (!isOpen || !resident) return null;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editData);
    }
    setIsEditing(false);
  };

  // Mock assistance history
  const assistanceHistory: AssistanceRecord[] = [
    {
      program: 'Medical Assistance',
      amount: '₱5,000',
      date: 'Mar 10, 2026',
      status: 'Completed'
    },
    {
      program: 'Food Assistance',
      amount: '₱2,500',
      date: 'Feb 15, 2026',
      status: 'Completed'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>

      {/* Centered Modal */}
      <div className="relative bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">Resident Profile</h2>
              <p className="text-blue-100 text-sm">{sector} Sector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit Information
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(resident);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.fullName || editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{resident.fullName || resident.name || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sex/Gender</label>
                <p className="text-gray-800 font-medium">{resident.sex || resident.gender || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Birthday</label>
                <p className="text-gray-800 font-medium">{resident.birthday || resident.birthdate || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                <p className="text-gray-800 font-medium">{resident.age || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Barangay</label>
                <p className="text-gray-800 font-medium">{resident.barangay || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Address / Purok</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.purok || editData.address || ''}
                    onChange={(e) => setEditData({ ...editData, purok: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{resident.purok || resident.address || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sector Specific Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Sector Information - {sector}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Senior Citizen Fields */}
              {sector === 'Senior Citizen' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">ID Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.idNumber || ''}
                        onChange={(e) => setEditData({ ...editData, idNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.idNumber || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Pensioner</label>
                    <p className="text-gray-800 font-medium">{resident.pensioner || 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">PWD</label>
                    <p className="text-gray-800 font-medium">{resident.pwd || 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">4Ps</label>
                    <p className="text-gray-800 font-medium">{resident.fourPs || 'No'}</p>
                  </div>
                </>
              )}

              {/* PWD Fields */}
              {sector === 'PWD' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Type of Disability</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.disabilityType || ''}
                        onChange={(e) => setEditData({ ...editData, disabilityType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.disabilityType || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.occupation || ''}
                        onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.occupation || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Educational Attainment</label>
                    <p className="text-gray-800 font-medium">{resident.educationalAttainment || 'N/A'}</p>
                  </div>
                </>
              )}

              {/* Solo Parent Fields */}
              {sector === 'Solo Parent' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Civil Status</label>
                    {isEditing ? (
                      <select
                        value={editData.civilStatus || ''}
                        onChange={(e) => setEditData({ ...editData, civilStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Separated">Separated</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.civilStatus || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Source of Income</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.sourceOfIncome || ''}
                        onChange={(e) => setEditData({ ...editData, sourceOfIncome: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.sourceOfIncome || 'N/A'}</p>
                    )}
                  </div>
                </>
              )}

              {/* Women Fields */}
              {sector === 'Women' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Active Status</label>
                    {isEditing ? (
                      <select
                        value={editData.active || ''}
                        onChange={(e) => setEditData({ ...editData, active: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.active || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Birthplace</label>
                    <p className="text-gray-800 font-medium">{resident.birthplace || 'N/A'}</p>
                  </div>
                </>
              )}

              {/* Children Fields */}
              {sector === 'Children' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Educational Status</label>
                    {isEditing ? (
                      <select
                        value={editData.educationalStatus || ''}
                        onChange={(e) => setEditData({ ...editData, educationalStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="In School">In School</option>
                        <option value="Out of School">Out of School</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.educationalStatus || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">With Disability</label>
                    <p className="text-gray-800 font-medium">{resident.withDisability || 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">4Ps Beneficiary</label>
                    <p className="text-gray-800 font-medium">{resident.fourPsBeneficiary || 'No'}</p>
                  </div>
                </>
              )}

              {/* ECCD Fields */}
              {sector === 'ECCD' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Weight (kg)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.1"
                        value={editData.weight || ''}
                        onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.weight || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Height (cm)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.1"
                        value={editData.height || ''}
                        onChange={(e) => setEditData({ ...editData, height: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{resident.height || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nutritional Classification</label>
                    <p className="text-gray-800 font-medium">{resident.nutritionalClass || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Age in Months</label>
                    <p className="text-gray-800 font-medium">{resident.ageInMonths || 'N/A'}</p>
                  </div>
                </>
              )}

              {/* Remarks - Common to all */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Remarks</label>
                {isEditing ? (
                  <textarea
                    value={editData.remarks || ''}
                    onChange={(e) => setEditData({ ...editData, remarks: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{resident.remarks || 'None'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Assistance History */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Assistance History
            </h3>

            <div className="space-y-3">
              {assistanceHistory.map((record, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{record.program}</p>
                    <div className="flex items-center gap-4 mt-1">
                      {record.amount && (
                        <span className="text-sm text-gray-600">Amount: {record.amount}</span>
                      )}
                      <span className="text-sm text-gray-500">{record.date}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {record.status}
                  </span>
                </div>
              ))}
              {assistanceHistory.length === 0 && (
                <p className="text-gray-500 text-center py-4">No assistance history available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
