import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { applicationStore } from '../../utils/applicationStore';
import { programStore } from '../../utils/programStore';

export default function FundMonitoring() {
  const [timeRange, setTimeRange] = useState('month');
  const [applications, setApplications] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

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

  // Calculate fund statistics
  const totalAllocatedBudget = 5000000;
  const totalDisbursed = applications
    .filter(app => app.status === 'Paid')
    .reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);

  const totalFunded = applications
    .filter(app => ['Funded', 'Scheduled', 'Paid'].includes(app.status))
    .reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);

  const totalPending = applications
    .filter(app => app.status === 'Approved')
    .reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);

  const availableFunds = totalAllocatedBudget - totalFunded;
  const utilizationRate = totalAllocatedBudget > 0 ? (totalFunded / totalAllocatedBudget) * 100 : 0;

  // Fund allocation by sector
  const sectorFunds = applications
    .filter(app => ['Funded', 'Scheduled', 'Paid'].includes(app.status))
    .reduce((acc: any, app) => {
      const sector = app.sector || 'Unknown';
      if (!acc[sector]) {
        acc[sector] = 0;
      }
      acc[sector] += app.recommendedAmount || 0;
      return acc;
    }, {});

  const sectorData = Object.entries(sectorFunds).map(([name, value]) => ({
    name,
    value
  }));

  // Fund allocation by program
  const programFunds = programs.map(program => {
    const programApps = applications.filter(
      app => app.program === program.programName && ['Funded', 'Scheduled', 'Paid'].includes(app.status)
    );
    const allocated = programApps.reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);
    const budget = program.budgetAllocation || 500000;
    return {
      name: program.programName || 'Unnamed Program',
      allocated,
      budget,
      utilization: budget > 0 ? (allocated / budget) * 100 : 0
    };
  });

  // Monthly fund trends
  const monthlyData = [
    { month: 'Jan', allocated: 320000, disbursed: 280000 },
    { month: 'Feb', allocated: 450000, disbursed: 390000 },
    { month: 'Mar', allocated: 520000, disbursed: 480000 },
    { month: 'Apr', allocated: 610000, disbursed: 550000 },
    { month: 'May', allocated: totalFunded, disbursed: totalDisbursed }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Fund Monitoring</h1>
            <p className="text-gray-500 mt-1">Track budget allocation, utilization, and available funds</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Allocated Budget</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">₱{(totalAllocatedBudget / 1000000).toFixed(1)}M</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Annual budget allocation</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Funded</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₱{(totalFunded / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${Math.min(100, utilizationRate)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{utilizationRate.toFixed(1)}% of total budget</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Funds</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">₱{(availableFunds / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{totalAllocatedBudget > 0 ? ((availableFunds / totalAllocatedBudget) * 100).toFixed(1) : 0}% remaining</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approval</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">₱{(totalPending / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Awaiting funding confirmation</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Fund Trends</h2>
          <p className="text-sm text-gray-500 mt-1">Allocated vs Disbursed funds over time</p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: any) => `₱${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="allocated" stroke="#3B82F6" strokeWidth={2} name="Allocated Funds" />
              <Line type="monotone" dataKey="disbursed" stroke="#10B981" strokeWidth={2} name="Disbursed Funds" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fund Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* By Sector */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Fund Distribution by Sector</h2>
            <p className="text-sm text-gray-500 mt-1">How funds are allocated across sectors</p>
          </div>
          <div className="p-6">
            {sectorData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `₱${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-12">No fund distribution data yet</p>
            )}
          </div>
        </div>

        {/* By Program */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Program Budget Utilization</h2>
            <p className="text-sm text-gray-500 mt-1">Allocated vs Budget per program</p>
          </div>
          <div className="p-6">
            {programFunds.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programFunds}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: any) => `₱${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="allocated" fill="#3B82F6" name="Allocated" />
                  <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-12">No programs created yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Program Details Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Program Fund Details</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed breakdown of fund allocation per program</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allocated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programFunds.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No programs available
                  </td>
                </tr>
              ) : (
                programFunds.map((program, index) => {
                  const remaining = program.budget - program.allocated;
                  const isOverBudget = remaining < 0;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {program.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₱{program.budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ₱{program.allocated.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        isOverBudget ? 'text-red-600' : 'text-green-600'
                      }`}>
                        ₱{Math.abs(remaining).toLocaleString()}
                        {isOverBudget && ' (Over)'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                program.utilization > 90 ? 'bg-red-600' :
                                program.utilization > 70 ? 'bg-yellow-600' :
                                'bg-green-600'
                              }`}
                              style={{ width: `${Math.min(100, program.utilization)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700">
                            {program.utilization.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isOverBudget
                            ? 'bg-red-100 text-red-800'
                            : program.utilization > 70
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {isOverBudget ? 'Over Budget' : program.utilization > 70 ? 'High Utilization' : 'On Track'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
