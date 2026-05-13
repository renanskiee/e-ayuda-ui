import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Download, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { applicationStore } from '../../utils/applicationStore';
import { programStore } from '../../utils/programStore';

export default function AuditReports() {
  const [applications, setApplications] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const loadData = async () => {
      try {
        setApplications((await applicationStore.getAll()) || []);
        setPrograms(programStore.getAll() || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();

    const unsubscribe1 = applicationStore.subscribe(async () => {
      try {
        setApplications((await applicationStore.getAll()) || []);
      } catch (error) {
        console.error('Error updating applications:', error);
      }
    });

    const unsubscribe2 = programStore.subscribe(() => {
      try {
        setPrograms(programStore.getAll() || []);
      } catch (error) {
        console.error('Error updating programs:', error);
      }
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  // Audit Statistics
  const totalApplications = applications.length;
  const approvedApps = applications.filter(app => ['Approved', 'Funded', 'Scheduled', 'Paid'].includes(app.status));
  const rejectedApps = applications.filter(app => app.status === 'Rejected');
  const paidApps = applications.filter(app => app.status === 'Paid');

  const totalFunded = applications
    .filter(app => ['Funded', 'Scheduled', 'Paid'].includes(app.status))
    .reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);

  const approvalRate = totalApplications > 0 ? (approvedApps.length / totalApplications) * 100 : 0;
  const disbursementRate = approvedApps.length > 0 ? (paidApps.length / approvedApps.length) * 100 : 0;

  // Audit Findings
  const auditFindings = [];

  // Check for duplicate beneficiaries
  const beneficiaryNames = applications.map(app => (app.applicantName || '').toLowerCase());
  const duplicates = beneficiaryNames.filter((name, index) => beneficiaryNames.indexOf(name) !== index);
  if (duplicates.length > 0) {
    auditFindings.push({
      severity: 'warning',
      title: 'Potential Duplicate Beneficiaries',
      description: `Found ${duplicates.length} potential duplicate entries that need review`,
      recommendation: 'Review duplicate detection system for verification'
    });
  }

  // Check for programs over budget
  const overBudgetPrograms = programs.filter(program => {
    const programApps = applications.filter(
      app => app.program === program.programName && ['Funded', 'Scheduled', 'Paid'].includes(app.status)
    );
    const allocated = programApps.reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);
    return program.budgetAllocation && allocated > program.budgetAllocation;
  });

  if (overBudgetPrograms.length > 0) {
    auditFindings.push({
      severity: 'critical',
      title: 'Programs Over Budget',
      description: `${overBudgetPrograms.length} program(s) have exceeded allocated budget`,
      recommendation: 'Review budget allocations and implement stricter controls'
    });
  }

  // Add positive findings
  if (approvalRate >= 85 && approvalRate <= 95) {
    auditFindings.push({
      severity: 'success',
      title: 'Healthy Approval Rate',
      description: `Approval rate of ${approvalRate.toFixed(1)}% is within optimal range`,
      recommendation: 'Continue current evaluation standards'
    });
  }

  if (disbursementRate >= 90) {
    auditFindings.push({
      severity: 'success',
      title: 'High Disbursement Efficiency',
      description: `${disbursementRate.toFixed(1)}% of approved applications successfully disbursed`,
      recommendation: 'Maintain current disbursement procedures'
    });
  }

  // Monthly audit data
  const monthlyAuditData = [
    { month: 'Jan', applications: 45, approved: 38, funded: 35, disbursed: 32 },
    { month: 'Feb', applications: 52, approved: 44, funded: 41, disbursed: 38 },
    { month: 'Mar', applications: 48, approved: 40, funded: 38, disbursed: 36 },
    { month: 'Apr', applications: 61, approved: 52, funded: 49, disbursed: 46 },
    { month: 'May', applications: totalApplications, approved: approvedApps.length, funded: applications.filter(app => ['Funded', 'Scheduled', 'Paid'].includes(app.status)).length, disbursed: paidApps.length }
  ];

  // Compliance metrics
  const complianceMetrics = [
    { metric: 'Documentation Complete', score: 95, status: 'pass' },
    { metric: 'Approval Authorization', score: 100, status: 'pass' },
    { metric: 'Budget Compliance', score: overBudgetPrograms.length === 0 ? 100 : 75, status: overBudgetPrograms.length === 0 ? 'pass' : 'warning' },
    { metric: 'Disbursement Records', score: 98, status: 'pass' },
    { metric: 'Audit Trail Complete', score: 100, status: 'pass' }
  ];

  const handleExport = () => {
    const auditData = {
      generatedDate: new Date().toISOString(),
      period: selectedPeriod,
      summary: {
        totalApplications,
        approvedApplications: approvedApps.length,
        rejectedApplications: rejectedApps.length,
        paidApplications: paidApps.length,
        totalFunded,
        approvalRate,
        disbursementRate
      },
      findings: auditFindings,
      complianceMetrics,
      monthlyData: monthlyAuditData
    };

    const jsonStr = JSON.stringify(auditData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Audit Reports</h1>
            <p className="text-gray-500 mt-1">Comprehensive audit reports for financial oversight and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Audit Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Processed this period</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approval Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{approvalRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{approvedApps.length} approved</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Disbursement Rate</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{disbursementRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{paidApps.length} disbursed</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Audit Findings</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{auditFindings.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Items flagged</p>
        </div>
      </div>

      {/* Audit Findings */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Audit Findings & Recommendations</h2>
          <p className="text-sm text-gray-500 mt-1">Key observations and suggested actions</p>
        </div>
        <div className="p-6">
          {auditFindings.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">No audit findings - All systems operating normally</p>
            </div>
          ) : (
            <div className="space-y-4">
              {auditFindings.map((finding, index) => (
                <div
                  key={index}
                  className={`border-l-4 rounded-lg p-4 ${
                    finding.severity === 'critical'
                      ? 'border-red-500 bg-red-50'
                      : finding.severity === 'warning'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {finding.severity === 'critical' ? (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      ) : finding.severity === 'warning' ? (
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        finding.severity === 'critical'
                          ? 'text-red-900'
                          : finding.severity === 'warning'
                          ? 'text-yellow-900'
                          : 'text-green-900'
                      }`}>
                        {finding.title}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        finding.severity === 'critical'
                          ? 'text-red-800'
                          : finding.severity === 'warning'
                          ? 'text-yellow-800'
                          : 'text-green-800'
                      }`}>
                        {finding.description}
                      </p>
                      <p className={`text-xs ${
                        finding.severity === 'critical'
                          ? 'text-red-700'
                          : finding.severity === 'warning'
                          ? 'text-yellow-700'
                          : 'text-green-700'
                      }`}>
                        <strong>Recommendation:</strong> {finding.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Processing Trends */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Application Processing Trends</h2>
          <p className="text-sm text-gray-500 mt-1">Monthly workflow progression</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyAuditData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#8B5CF6" name="Applications" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" stroke="#3B82F6" name="Approved" strokeWidth={2} />
              <Line type="monotone" dataKey="funded" stroke="#F59E0B" name="Funded" strokeWidth={2} />
              <Line type="monotone" dataKey="disbursed" stroke="#10B981" name="Disbursed" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Compliance Scorecard</h2>
          <p className="text-sm text-gray-500 mt-1">System compliance with audit standards</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {complianceMetrics.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.status === 'pass' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {item.status === 'pass' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.metric}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className={`h-2 rounded-full ${
                            item.status === 'pass' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.score}%</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'pass'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'pass' ? 'Pass' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
