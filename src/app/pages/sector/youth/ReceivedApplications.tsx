import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router';

const applications = [
  { id: "YC-501", applicantName: "Mark Dela Cruz", barangay: "Pacol", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 12 2026", status: "Pending" },
  { id: "YC-502", applicantName: "Jenny Santos", barangay: "Santa Cruz", schoolName: "San Pascual Elementary School", programCategory: "Scholarship Support", submissionDate: "Mar 11 2026", status: "Pending" },
  { id: "YC-503", applicantName: "Ryan Flores", barangay: "San Rafael", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 10 2026", status: "Pending" },
  { id: "YC-504", applicantName: "Maria Garcia", barangay: "San Antonio", schoolName: "San Pascual Elementary School", programCategory: "Scholarship Support", submissionDate: "Mar 9 2026", status: "Under Review" },
  { id: "YC-505", applicantName: "Carlos Reyes", barangay: "Malaking Ilog", schoolName: "San Pascual National High School", programCategory: "Educational Assistance", submissionDate: "Mar 8 2026", status: "Pending" }
];

export default function ReceivedApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarangay, setFilterBarangay] = useState('');
  const [filterSchool, setFilterSchool] = useState('');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Received Applications</h1>
        <p className="text-gray-500 mt-1">Applications forwarded from barangay BSWDO offices</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search applicant name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Barangay</label>
            <select value={filterBarangay} onChange={(e) => setFilterBarangay(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Barangays</option>
              <option value="Pacol">Pacol</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="San Rafael">San Rafael</option>
              <option value="San Antonio">San Antonio</option>
              <option value="Malaking Ilog">Malaking Ilog</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by School Name</label>
            <select value={filterSchool} onChange={(e) => setFilterSchool(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Schools</option>
              <option value="San Pascual National High School">San Pascual National High School</option>
              <option value="San Pascual Elementary School">San Pascual Elementary School</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Applications</h2>
          <p className="text-sm text-gray-500 mt-1">Total: {applications.length} applications</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.barangay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.schoolName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.programCategory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.submissionDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{application.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                    <Link to="/sector/youth/evaluation" className="text-green-600 hover:text-green-800 font-medium">Evaluate</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
