import { useState, useEffect } from 'react';
import { Plus, Edit, X, Eye, FileText, File, Image as ImageIcon, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { programStore, Program } from '../../utils/programStore';

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const loadPrograms = () => {
      setPrograms(programStore.getAll());
    };

    loadPrograms();
    const unsubscribe = programStore.subscribe(loadPrograms);
    return unsubscribe;
  }, []);

  const handleToggleStatus = (programId: string, currentStatus: Program['status']) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    programStore.update(programId, { status: newStatus });
    alert(`Program ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleDelete = (programId: string, programName: string) => {
    if (confirm(`Are you sure you want to delete "${programName}"? This action cannot be undone.`)) {
      programStore.delete(programId);
      alert('Program deleted successfully!');
    }
  };

  const handleViewDetails = (program: Program) => {
    setSelectedProgram(program);
    setShowDetailsModal(true);
  };

  const stats = programStore.getStats();
  const totalBudget = programs.reduce((sum, p) => sum + p.budgetAllocation, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Program Management</h1>
          <p className="text-gray-500 mt-1">View and manage all assistance programs</p>
        </div>
        <Link
          to="/mswdo-head/program-creation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create New Program
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Programs</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Active Programs</h3>
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Draft Programs</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Edit className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budget</h3>
              <p className="text-2xl font-bold text-purple-600">₱{totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Programs</h2>
          <p className="text-sm text-gray-500 mt-1">
            {programs.length} program{programs.length !== 1 ? 's' : ''} created
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirements
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
              {programs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    No programs created yet. Click "Create New Program" to get started.
                  </td>
                </tr>
              ) : (
                programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {program.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="max-w-xs">
                        <p className="font-semibold">{program.programName}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {program.programDescription}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {program.targetSector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.assistanceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₱{program.maxAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{program.budgetAllocation.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {program.requirements.length} docs
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        program.status === 'Active' ? 'bg-green-100 text-green-800' :
                        program.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(program)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(program.id, program.status)}
                          className={`p-2 rounded-lg transition-colors ${
                            program.status === 'Active'
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={program.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {program.status === 'Active' ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(program.id, program.programName)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Program"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Details Modal */}
      {showDetailsModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl flex items-center justify-between sticky top-0">
              <div>
                <h2 className="text-2xl font-bold">{selectedProgram.programName}</h2>
                <p className="text-blue-100 text-sm mt-1">{selectedProgram.id}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Program Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Target Sector</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedProgram.targetSector}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Assistance Type</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedProgram.assistanceType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Maximum Amount</label>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      ₱{selectedProgram.maxAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Total Budget</label>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      ₱{selectedProgram.budgetAllocation.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Start Date</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedProgram.startDate}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">End Date</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedProgram.endDate}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                    <p className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedProgram.status === 'Active' ? 'bg-green-100 text-green-800' :
                        selectedProgram.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedProgram.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Program Description</h3>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">
                  {selectedProgram.programDescription}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Eligibility Criteria</h3>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">
                  {selectedProgram.eligibilityCriteria}
                </p>
              </div>

              {/* Document Requirements */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Document Requirements ({selectedProgram.requirements.length})
                </h3>
                <div className="space-y-4">
                  {selectedProgram.requirements.map((req, index) => (
                    <div key={req.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{index + 1}. {req.name}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              req.isMandatory
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {req.isMandatory ? 'Mandatory' : 'Optional'}
                            </span>
                          </div>
                          {req.description && (
                            <p className="text-sm text-gray-600">{req.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Placeholder File */}
                      {req.placeholderFile && (
                        <div className="mt-3 bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            {req.placeholderFile.type.startsWith('image/') ? (
                              <ImageIcon className="w-8 h-8 text-blue-600" />
                            ) : (
                              <File className="w-8 h-8 text-blue-600" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                Placeholder File: {req.placeholderFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Uploaded on {new Date(req.placeholderFile.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {req.placeholderFile.type.startsWith('image/') && (
                            <div className="mt-3">
                              <img
                                src={req.placeholderFile.url}
                                alt={req.name}
                                className="max-w-full h-48 object-contain rounded border border-gray-200"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta Information */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <span>Created by:</span> <span className="font-medium text-gray-700">{selectedProgram.createdBy}</span>
                  </div>
                  <div>
                    <span>Created on:</span> <span className="font-medium text-gray-700">{selectedProgram.createdAt}</span>
                  </div>
                  <div>
                    <span>Last updated:</span> <span className="font-medium text-gray-700">{selectedProgram.updatedAt}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
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
