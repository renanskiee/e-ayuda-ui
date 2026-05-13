import { Search } from 'lucide-react';
import { useState } from 'react';

const programs = [
  { id: "PRG-001", name: "Senior Citizen Medical Aid", sector: "Senior Citizen", type: "Financial", allocated: 300000, used: 214500, remaining: 85500, duration: "Jan–Dec 2026", status: "Active" },
  { id: "PRG-002", name: "PWD Medical Support", sector: "PWD", type: "Financial", allocated: 250000, used: 178000, remaining: 72000, duration: "Jan–Dec 2026", status: "Active" },
  { id: "PRG-003", name: "Solo Parent Educational Aid", sector: "Solo Parent", type: "Financial", allocated: 200000, used: 134500, remaining: 65500, duration: "Jan–Dec 2026", status: "Active" },
  { id: "PRG-004", name: "Women Livelihood Support", sector: "Women", type: "Financial", allocated: 180000, used: 120500, remaining: 59500, duration: "Jan–Dec 2026", status: "Active" },
  { id: "PRG-005", name: "Youth Educational Support", sector: "Youth / Children", type: "Financial", allocated: 160000, used: 110000, remaining: 50000, duration: "Jan–Dec 2026", status: "Active" },
  { id: "PRG-006", name: "Disaster Emergency Support", sector: "Disaster-Affected Families", type: "Financial", allocated: 220000, used: 150000, remaining: 70000, duration: "Jan–Dec 2026", status: "Active" }
];

export default function ProgramManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Program Management</h1>
        <p className="text-gray-500 mt-1">View and manage all assistance programs</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Programs</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search program name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Programs</h2>
          <p className="text-sm text-gray-500 mt-1">Total: {programs.length} active programs</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget Allocation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programs.map((program) => {
                const utilizationRate = Math.round((program.used / program.allocated) * 100);
                return (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.sector}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₱{program.allocated.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">₱{program.used.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">₱{program.remaining.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{program.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                      <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
