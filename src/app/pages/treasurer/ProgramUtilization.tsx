import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { applicationStore } from '../../utils/applicationStore';
import { programStore } from '../../utils/programStore';

export default function ProgramUtilization() {
  const [applications, setApplications] = useState<any[]>([]);
  const [allPrograms, setAllPrograms] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setApplications((await applicationStore.getAll()) || []);
        setAllPrograms(programStore.getAll() || []);
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
        setAllPrograms(programStore.getAll() || []);
      } catch (error) {
        console.error('Error updating programs:', error);
      }
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  // Calculate program utilization from real data
  const programs = allPrograms.map(program => {
    const programApps = applications.filter(
      app => app.program === program.programName && ['Funded', 'Scheduled', 'Paid'].includes(app.status)
    );
    const used = programApps.reduce((sum, app) => sum + (app.recommendedAmount || 0), 0);
    const allocated = program.budgetAllocation || 500000;
    const remaining = allocated - used;
    const utilization = allocated > 0 ? (used / allocated) * 100 : 0;

    return {
      name: program.programName || 'Unnamed Program',
      sector: program.targetSector || 'General',
      allocated,
      used,
      remaining,
      utilization: Math.round(utilization)
    };
  });

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Program Utilization</h1>
        <p className="text-gray-500 mt-1">Monitor budget allocation and utilization across all programs</p>
      </div>

      {/* Program Utilization Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocated Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funds Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilization Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No programs available
                  </td>
                </tr>
              ) : (
                programs.map((program, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {program.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {program.sector}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      ₱{program.allocated.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      ₱{program.used.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      ₱{program.remaining.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-800 mr-2">{program.utilization}%</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className={`h-2 rounded-full ${
                              program.utilization >= 75 ? 'bg-green-600' :
                              program.utilization >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${program.utilization}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-sm font-medium text-blue-600 mb-1">Total Allocated</p>
          <p className="text-2xl font-bold text-blue-700">
            ₱{programs.reduce((sum, p) => sum + p.allocated, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <p className="text-sm font-medium text-green-600 mb-1">Total Used</p>
          <p className="text-2xl font-bold text-green-700">
            ₱{programs.reduce((sum, p) => sum + p.used, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-sm font-medium text-purple-600 mb-1">Total Remaining</p>
          <p className="text-2xl font-bold text-purple-700">
            ₱{programs.reduce((sum, p) => sum + p.remaining, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Utilization Chart */}
      {programs.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Program Fund Distribution</h2>
            <p className="text-sm text-gray-500 mt-1">Visual representation of fund usage across programs</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={programs.map(p => ({ name: p.name, value: p.used }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {programs.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `₱${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
