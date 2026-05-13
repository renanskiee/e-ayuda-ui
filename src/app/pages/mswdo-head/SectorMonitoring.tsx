import { useState } from 'react';
import { Eye } from 'lucide-react';
import SectorDetailsModal from '../../components/SectorDetailsModal';

const sectorData = [
  {
    sector: "Senior Citizen",
    pending: 6,
    recommended: 8,
    approved: 35,
    disbursed: 32,
    totalApplications: 85
  },
  {
    sector: "PWD",
    pending: 4,
    recommended: 5,
    approved: 28,
    disbursed: 25,
    totalApplications: 54
  },
  {
    sector: "Solo Parent",
    pending: 3,
    recommended: 3,
    approved: 22,
    disbursed: 20,
    totalApplications: 42
  },
  {
    sector: "Women",
    pending: 2,
    recommended: 1,
    approved: 15,
    disbursed: 14,
    totalApplications: 36
  },
  {
    sector: "Youth",
    pending: 1,
    recommended: 1,
    approved: 10,
    disbursed: 9,
    totalApplications: 31
  },
  {
    sector: "ECCD",
    pending: 2,
    recommended: 2,
    approved: 12,
    disbursed: 11,
    totalApplications: 28
  }
];

export default function SectorMonitoring() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (sector: string) => {
    setSelectedSector(sector);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSector(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sector Monitoring</h1>
        <p className="text-gray-500 mt-1">Monitor all sector activities and performance</p>
      </div>

      {/* Sector Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Sectors</h3>
          <p className="text-3xl font-bold text-gray-800">6</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600">276</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Review</h3>
          <p className="text-3xl font-bold text-yellow-600">18</p>
        </div>
      </div>

      {/* Detailed Sector Monitoring Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Sector Performance Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Click on a sector to view detailed activities</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Applications
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending Evaluation
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommended
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disbursed
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectorData.map((item) => (
                <tr key={item.sector} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {item.sector.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.sector}</div>
                        <div className="text-xs text-gray-500">Sector</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-gray-900">{item.totalApplications}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {item.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {item.recommended}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {item.approved}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {item.disbursed}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleViewDetails(item.sector)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Details Modal */}
      {selectedSector && (
        <SectorDetailsModal
          sector={selectedSector}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
