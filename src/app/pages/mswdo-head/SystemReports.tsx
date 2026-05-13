import { useState, useMemo, useEffect } from 'react';
import { Download, FileText, Filter, Calendar, TrendingUp, Users, DollarSign, CheckCircle, BarChart } from 'lucide-react';
import { applicationStore, Application } from '../../utils/applicationStore';
import { programStore } from '../../utils/programStore';
import { exportToExcel, exportToJSON } from '../../utils/exportUtils';
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

type ReportType = 'applications' | 'disbursements' | 'beneficiaries' | 'programs' | 'sectors' | 'financial';

export default function SystemReports() {
  const [reportType, setReportType] = useState<ReportType>('applications');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year' | 'all'>('month');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setApplications(await applicationStore.getAll());
      setPrograms(programStore.getAll());
    };

    loadData();
    const unsubscribe = applicationStore.subscribe(loadData);
    return unsubscribe;
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const byStatus = {
      received: applications.filter(a => a.status === 'Received').length,
      underEvaluation: applications.filter(a => a.status === 'Under Evaluation').length,
      recommended: applications.filter(a => a.status === 'Recommended').length,
      approved: applications.filter(a => a.status === 'Approved').length,
      funded: applications.filter(a => a.status === 'Funded').length,
      scheduled: applications.filter(a => a.status === 'Scheduled').length,
      paid: applications.filter(a => a.status === 'Paid').length,
      rejected: applications.filter(a => a.status === 'Rejected').length
    };
    const totalAmount = applications.reduce((sum, app) => {
      if (app.status === 'Paid') {
        return sum + app.recommendedAmount;
      }
      return sum;
    }, 0);

    const sectorBreakdown = applications.reduce((acc, app) => {
      acc[app.sector] = (acc[app.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalApplications: applications.length,
      totalDisbursed: totalAmount,
      beneficiariesPaid: byStatus.paid,
      activePrograms: programs.filter(p => p.status === 'Active').length,
      byStatus,
      sectorBreakdown
    };
  }, [applications, programs]);

  // Application trend data
  const applicationTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    return months.map(month => ({
      month,
      applications: Math.floor(Math.random() * 50) + 20,
      approved: Math.floor(Math.random() * 30) + 10,
      disbursed: Math.floor(Math.random() * 25) + 8
    }));
  }, []);

  // Sector distribution
  const sectorData = useMemo(() => {
    return Object.entries(stats.sectorBreakdown).map(([sector, count]) => ({
      sector,
      count
    }));
  }, [stats.sectorBreakdown]);

  // Status distribution
  const statusData = [
    { name: 'Recommended', value: stats.byStatus.recommended, color: '#F59E0B' },
    { name: 'Approved', value: stats.byStatus.approved, color: '#8B5CF6' },
    { name: 'Funded', value: stats.byStatus.funded, color: '#3B82F6' },
    { name: 'Paid', value: stats.byStatus.paid, color: '#10B981' },
  ];

  const handleExportJSON = () => {
    const reportData = applications.map(app => ({
      'Application ID': app.id,
      'Reference Number': app.referenceNumber || 'N/A',
      'Applicant Name': app.applicantName,
      'Sector': app.sector,
      'Program': app.program,
      'Amount': app.recommendedAmount,
      'Status': app.status,
      'Date Received': app.dateReceived,
      'Date Funded': app.dateFunded || 'N/A',
      'Date Disbursed': app.dateDisbursed || 'N/A'
    }));

    exportToJSON(reportData, `system-report-${reportType}`);
  };

  const handleExportExcel = () => {
    const reportData = applications.map(app => ({
      'Application ID': app.id,
      'Reference Number': app.referenceNumber || 'N/A',
      'Applicant Name': app.applicantName,
      'Sector': app.sector,
      'Program': app.program,
      'Amount': `₱${app.recommendedAmount.toLocaleString()}`,
      'Status': app.status,
      'Date Received': app.dateReceived,
      'Date Funded': app.dateFunded || 'N/A',
      'Date Disbursed': app.dateDisbursed || 'N/A'
    }));

    exportToExcel(reportData, `system-report-${reportType}`);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">System Reports</h1>
          <p className="text-gray-500 mt-1">Generate comprehensive reports and analytics</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Download className="w-5 h-5" />
            Export to Excel
          </button>
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            Export to JSON
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Report Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="applications">Applications Report</option>
              <option value="disbursements">Disbursements Report</option>
              <option value="beneficiaries">Beneficiaries Report</option>
              <option value="programs">Programs Report</option>
              <option value="sectors">Sector Analysis</option>
              <option value="financial">Financial Summary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector Filter</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="PWD">PWD</option>
              <option value="Solo Parent">Solo Parent</option>
              <option value="Women">Women</option>
              <option value="Youth">Youth</option>
              <option value="ECCD">ECCD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Date</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Total Applications</p>
              <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-blue-100 mt-3">All time</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Beneficiaries Paid</p>
              <p className="text-3xl font-bold mt-2">{stats.beneficiariesPaid}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-green-100 mt-3">Successfully disbursed</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">Total Disbursed</p>
              <p className="text-2xl font-bold mt-2">₱{stats.totalDisbursed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-purple-100 mt-3">Funds released</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-100">Active Programs</p>
              <p className="text-3xl font-bold mt-2">{stats.activePrograms}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <BarChart className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-orange-100 mt-3">Currently running</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Application Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Trend (Monthly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} name="Applications" />
              <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} name="Approved" />
              <Line type="monotone" dataKey="disbursed" stroke="#8B5CF6" strokeWidth={2} name="Disbursed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Applications by Sector</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBar data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" name="Applications" />
            </RechartsBar>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                <span className="font-medium text-gray-800">Recommended</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{stats.byStatus.recommended}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="font-medium text-gray-800">Approved</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.byStatus.approved}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="font-medium text-gray-800">Funded</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.byStatus.funded}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="font-medium text-gray-800">Paid</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.byStatus.paid}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Detailed {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {applications.length} record{applications.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.slice(0, 10).map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {app.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.assistanceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₱{app.recommendedAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      app.status === 'Funded' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Approved' ? 'bg-purple-100 text-purple-800' :
                      app.status === 'Recommended' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.dateReceived}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
