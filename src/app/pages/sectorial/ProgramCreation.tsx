import { useState } from 'react';
import { Briefcase, Save, FileText } from 'lucide-react';

export default function ProgramCreation() {
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [targetSector, setTargetSector] = useState('');
  const [assistanceType, setAssistanceType] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [budgetAllocation, setBudgetAllocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  const [status, setStatus] = useState('active');

  const handleCreateProgram = () => {
    alert('Program created successfully!');
    // Reset form
    setProgramName('');
    setDescription('');
    setTargetSector('');
    setAssistanceType('');
    setMaxAmount('');
    setBudgetAllocation('');
    setStartDate('');
    setEndDate('');
    setEligibilityCriteria('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Program Creation</h1>
        <p className="text-gray-500 mt-1">Create new assistance programs for municipal sectors</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">New Assistance Program Form</h2>
            <p className="text-sm text-gray-500">Fill in the details to create a new program</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Name *</label>
            <input type="text" value={programName} onChange={(e) => setProgramName(e.target.value)} placeholder="e.g., Senior Citizen Medical Aid" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Sector *</label>
            <select value={targetSector} onChange={(e) => setTargetSector(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              <option value="">Select target sector</option>
              <option value="senior-citizen">Senior Citizen</option>
              <option value="pwd">PWD</option>
              <option value="solo-parent">Solo Parent</option>
              <option value="women">Women</option>
              <option value="youth">Youth / Children</option>
              <option value="disaster">Disaster-Affected Families</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe the purpose and coverage of this program..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type of Assistance *</label>
            <select value={assistanceType} onChange={(e) => setAssistanceType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              <option value="">Select assistance type</option>
              <option value="financial">Financial Assistance</option>
              <option value="medical">Medical Assistance</option>
              <option value="educational">Educational Assistance</option>
              <option value="livelihood">Livelihood Assistance</option>
              <option value="emergency">Emergency Assistance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Assistance Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
              <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="5000" className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector Budget Allocation *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
              <input type="number" value={budgetAllocation} onChange={(e) => setBudgetAllocation(e.target.value)} placeholder="300000" className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Status *</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Start Date *</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program End Date *</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria *</label>
            <textarea value={eligibilityCriteria} onChange={(e) => setEligibilityCriteria(e.target.value)} rows={3} placeholder="e.g., Verified senior citizen resident with medical needs" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Valid ID</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Barangay Certificate</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Medical Certificate</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Proof of Income</span></label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button onClick={handleCreateProgram} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <Save className="w-5 h-5" />Create Program
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2">
            <FileText className="w-5 h-5" />Save Draft
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">Cancel</button>
        </div>
      </div>
    </div>
  );
}
