import { Users, CheckCircle, Clock, AlertCircle, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

export default function DisbursementDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Weekly disbursement trend data
  const weeklyTrendData = [
    { day: 'Mon', disbursed: 45000, scheduled: 50000 },
    { day: 'Tue', disbursed: 52000, scheduled: 55000 },
    { day: 'Wed', disbursed: 38000, scheduled: 42000 },
    { day: 'Thu', disbursed: 61000, scheduled: 63000 },
    { day: 'Fri', disbursed: 47000, scheduled: 51000 },
    { day: 'Sat', disbursed: 28000, scheduled: 30000 },
    { day: 'Sun', disbursed: 15000, scheduled: 18000 }
  ];

  // Sector performance data
  const sectorPerformanceData = [
    { sector: 'Senior Citizen', completed: 35, pending: 5 },
    { sector: 'PWD', completed: 28, pending: 7 },
    { sector: 'Solo Parent', completed: 22, pending: 4 },
    { sector: 'Women', completed: 18, pending: 3 },
    { sector: 'Youth', completed: 12, pending: 4 }
  ];

  // Upcoming schedule
  const upcomingSchedule = [
    { time: '09:00 AM', count: 15, sector: 'Senior Citizen' },
    { time: '10:00 AM', count: 12, sector: 'PWD' },
    { time: '11:00 AM', count: 18, sector: 'Solo Parent' },
    { time: '01:00 PM', count: 10, sector: 'Women' },
    { time: '02:00 PM', count: 8, sector: 'Youth' }
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Disbursement Dashboard</h1>
            <p className="text-gray-500 mt-1">Payout processing and verification overview</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Today: Friday, March 13, 2026</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Scheduled Today</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Beneficiaries scheduled for payout</p>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% from yesterday
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beneficiaries Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">95</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <Link to="/disbursement-officer/transactions" className="text-sm text-green-600 hover:text-green-800 mt-2 inline-block">
            View transactions →
          </Link>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '79%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">79% completion rate</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <Link to="/disbursement-officer/authorized" className="text-sm text-yellow-600 hover:text-yellow-800 mt-2 inline-block">
            Process now →
          </Link>
          <p className="text-xs text-gray-500 mt-3">Next scheduled: 09:00 AM</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unclaimed</p>
              <p className="text-3xl font-bold text-red-600 mt-2">2</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Beneficiaries who didn't claim</p>
          <p className="text-xs text-red-600 mt-3">Requires rescheduling</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Financial Summary</h2>
          <DollarSign className="w-8 h-8 opacity-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-200 text-sm mb-1">Total Disbursed</p>
            <p className="text-3xl font-bold">₱285,000</p>
            <p className="text-xs text-blue-200 mt-1">From 95 transactions</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm mb-1">Remaining Budget</p>
            <p className="text-3xl font-bold">₱815,000</p>
            <p className="text-xs text-blue-200 mt-1">23 pending payouts</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm mb-1">Average Payout</p>
            <p className="text-3xl font-bold">₱3,000</p>
            <p className="text-xs text-blue-200 mt-1">Per beneficiary</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Disbursement Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Disbursement Trend</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyTrendData}>
              <defs>
                <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value: any) => '₱' + value.toLocaleString()} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="disbursed" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorDisbursed)"
                name="Disbursed Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sector Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sectorPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Payout Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { time: '10:30 AM', name: 'Juan Dela Cruz', amount: '₱5,000', status: 'Paid', sector: 'Senior Citizen' },
                { time: '10:25 AM', name: 'Maria Santos', amount: '₱3,500', status: 'Paid', sector: 'PWD' },
                { time: '10:20 AM', name: 'Pedro Garcia', amount: '₱4,000', status: 'Paid', sector: 'Senior Citizen' },
                { time: '10:15 AM', name: 'Rosa Reyes', amount: '₱2,500', status: 'Paid', sector: 'Solo Parent' },
                { time: '10:10 AM', name: 'Carlos Mendoza', amount: '₱15,000', status: 'Paid', sector: 'PWD' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.name}</p>
                      <p className="text-xs text-gray-500">{activity.sector} • {activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{activity.amount}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/disbursement-officer/transactions"
              className="block text-center mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Transactions →
            </Link>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{schedule.time}</p>
                      <p className="text-xs text-gray-500">{schedule.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{schedule.count}</p>
                    <p className="text-xs text-gray-500">beneficiaries</p>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/disbursement-officer/payout-processing"
              className="block text-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Processing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}