import { useState } from 'react';
import { Download, Calendar, FileText, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { pwdApplications } from '../../../data/sectorData';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function SectorReports() {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('thisMonth');

  // Calculate statistics
  const totalApplications = pwdApplications.length;
  const totalAmount = pwdApplications.reduce((sum, app) => sum + app.amount, 0);
  
  // Disability type distribution
  const disabilityTypeCounts: Record<string, number> = {};
  pwdApplications.forEach(app => {
    disabilityTypeCounts[app.disabilityType] = (disabilityTypeCounts[app.disabilityType] || 0) + 1;
  });
  const disabilityTypeData = Object.entries(disabilityTypeCounts).map(([type, count], index) => ({ 
    id: `disability-${index}`, 
    type, 
    count 
  }));

  // Assistance type distribution
  const assistanceTypeCounts: Record<string, number> = {};
  pwdApplications.forEach(app => {
    assistanceTypeCounts[app.assistanceType] = (assistanceTypeCounts[app.assistanceType] || 0) + 1;
  });
  const assistanceTypeData = Object.entries(assistanceTypeCounts).map(([type, count], index) => ({ 
    id: `assistance-${index}`, 
    type, 
    count 
  }));

  // Applications by barangay
  const barangayCounts: Record<string, number> = {};
  pwdApplications.forEach(app => {
    barangayCounts[app.barangay] = (barangayCounts[app.barangay] || 0) + 1;
  });
  const barangayData = Object.entries(barangayCounts).map(([barangay, count], index) => ({ 
    id: `barangay-${index}`, 
    barangay, 
    count 
  }));

  // Gender distribution
  const genderCounts: Record<string, number> = {};
  pwdApplications.forEach(app => {
    genderCounts[app.gender] = (genderCounts[app.gender] || 0) + 1;
  });
  const genderData = Object.entries(genderCounts).map(([gender, count], index) => ({ 
    id: `gender-${index}`, 
    gender, 
    count 
  }));

  // Monthly trend
  const monthlyTrend = [
    { id: 'trend-jan', month: 'Jan', applications: 8, amount: 64000 },
    { id: 'trend-feb', month: 'Feb', applications: 11, amount: 88000 },
    { id: 'trend-mar', month: 'Mar', applications: 15, amount: 120000 },
    { id: 'trend-apr', month: 'Apr', applications: 12, amount: 96000 },
    { id: 'trend-may', month: 'May', applications: 10, amount: 80000 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sector Reports</h1>
        <p className="text-gray-500 mt-1">Comprehensive reports and analytics for PWD sector</p>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Overview Report</option>
              <option value="disbursement">Disbursement Report</option>
              <option value="beneficiary">Beneficiary Report</option>
              <option value="demographic">Demographic Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₱{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{Math.floor(totalApplications * 0.4)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{Math.floor(totalApplications * 0.6)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Disability Type Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications by Disability Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={disabilityTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({type, percent}) => `${type} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {disabilityTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Assistance Type Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications by Assistance Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assistanceTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Applications by Barangay */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications by Barangay</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barangayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="barangay" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10B981" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Application Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} name="Applications" />
              <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} name="Amount (₱)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Application Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disability Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assistance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pwdApplications.slice(0, 10).map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.disabilityType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assistanceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.barangay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱{application.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status}
                    </span>
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