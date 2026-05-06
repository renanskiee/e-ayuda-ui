import { Search, Calendar, Download, CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { useState } from 'react';

export default function PayoutProcessing() {
  const [selectedDate, setSelectedDate] = useState('2026-03-13');
  const [selectedSector, setSelectedSector] = useState('all');
  const [processingBeneficiary, setProcessingBeneficiary] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const scheduledPayouts = [
    {
      id: 'APP-1023',
      name: 'Juan Dela Cruz',
      barangay: 'Pacol',
      sector: 'Senior Citizen',
      program: 'Senior Medical Aid',
      amount: 5000,
      scheduleDate: '2026-03-13',
      scheduleTime: '09:00 AM',
      status: 'Scheduled',
      contactNumber: '09171234567'
    },
    {
      id: 'APP-1024',
      name: 'Maria Santos',
      barangay: 'Santa Cruz',
      sector: 'PWD',
      program: 'Medical Assistance',
      amount: 3500,
      scheduleDate: '2026-03-13',
      scheduleTime: '09:30 AM',
      status: 'Scheduled',
      contactNumber: '09181234568'
    },
    {
      id: 'APP-1025',
      name: 'Pedro Garcia',
      barangay: 'San Rafael',
      sector: 'Senior Citizen',
      program: 'Senior Medical Aid',
      amount: 4000,
      scheduleDate: '2026-03-13',
      scheduleTime: '10:00 AM',
      status: 'Scheduled',
      contactNumber: '09191234569'
    },
    {
      id: 'APP-1026',
      name: 'Rosa Reyes',
      barangay: 'San Antonio',
      sector: 'Solo Parent',
      program: 'Educational Support',
      amount: 2500,
      scheduleDate: '2026-03-13',
      scheduleTime: '10:30 AM',
      status: 'Scheduled',
      contactNumber: '09201234570'
    },
    {
      id: 'APP-1027',
      name: 'Carlos Mendoza',
      barangay: 'Poblacion',
      sector: 'PWD',
      program: 'Mobility Aid',
      amount: 15000,
      scheduleDate: '2026-03-13',
      scheduleTime: '11:00 AM',
      status: 'Scheduled',
      contactNumber: '09211234571'
    },
    {
      id: 'APP-1028',
      name: 'Jennifer Cruz',
      barangay: 'Pacol',
      sector: 'Solo Parent',
      program: 'Livelihood Support',
      amount: 10000,
      scheduleDate: '2026-03-13',
      scheduleTime: '11:30 AM',
      status: 'Scheduled',
      contactNumber: '09221234572'
    }
  ];

  const filteredPayouts = scheduledPayouts.filter(payout => {
    const matchesSector = selectedSector === 'all' || payout.sector === selectedSector;
    const matchesSearch = payout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleProcessPayout = (beneficiary: any) => {
    setProcessingBeneficiary(beneficiary);
  };

  const handleConfirmPayout = () => {
    alert(`Payout confirmed for ${processingBeneficiary.name} - ₱${processingBeneficiary.amount.toLocaleString()}`);
    setProcessingBeneficiary(null);
  };

  const handleMarkUnclaimed = () => {
    alert(`${processingBeneficiary.name} marked as unclaimed. Will be rescheduled.`);
    setProcessingBeneficiary(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Payout Processing</h1>
        <p className="text-gray-500 mt-1">Process scheduled payouts for today</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Scheduled</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{scheduledPayouts.length}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Amount</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                ₱{scheduledPayouts.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending Today</p>
              <p className="text-2xl font-bold text-yellow-700 mt-1">
                {scheduledPayouts.filter(p => p.status === 'Scheduled').length}
              </p>
            </div>
            <User className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg. Per Payout</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                ₱{Math.round(scheduledPayouts.reduce((sum, p) => sum + p.amount, 0) / scheduledPayouts.length).toLocaleString()}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Schedule Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              <option value="Youth">Youth/Children</option>
              <option value="ECCD">ECCD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Payouts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            Scheduled Payouts ({filteredPayouts.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPayouts.map((payout) => (
            <div key={payout.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{payout.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Application ID: {payout.id}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {payout.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Barangay</p>
                      <p className="text-sm font-medium text-gray-900">{payout.barangay}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sector</p>
                      <p className="text-sm font-medium text-gray-900">{payout.sector}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Program</p>
                      <p className="text-sm font-medium text-gray-900">{payout.program}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Scheduled Time</p>
                      <p className="text-sm font-medium text-gray-900">{payout.scheduleTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Contact Number</p>
                        <p className="text-sm font-medium text-gray-900">{payout.contactNumber}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500">Payout Amount</p>
                        <p className="text-lg font-bold text-green-600">₱{payout.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleProcessPayout(payout)}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Process Payout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPayouts.length === 0 && (
            <div className="p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No scheduled payouts found for selected filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Processing Modal */}
      {processingBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Payout Processing</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">Beneficiary Details</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-semibold text-gray-900">{processingBeneficiary.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Application ID:</span>
                <span className="text-sm font-semibold text-gray-900">{processingBeneficiary.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Sector:</span>
                <span className="text-sm font-medium text-gray-900">{processingBeneficiary.sector}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Program:</span>
                <span className="text-sm font-medium text-gray-900">{processingBeneficiary.program}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Contact:</span>
                <span className="text-sm font-medium text-gray-900">{processingBeneficiary.contactNumber}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Payout Amount:</span>
                <span className="text-xl font-bold text-green-600">₱{processingBeneficiary.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirmPayout}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirm Payout Released
              </button>
              
              <button
                onClick={handleMarkUnclaimed}
                className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium flex items-center justify-center"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Mark as Unclaimed
              </button>
              
              <button
                onClick={() => setProcessingBeneficiary(null)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}