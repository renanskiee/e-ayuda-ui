import { useState, useEffect, useMemo } from 'react';
import { Search, AlertTriangle, X, CheckCircle, XCircle, Users, FileText, TrendingUp } from 'lucide-react';
import { applicationStore, Application } from '../../utils/applicationStore';

interface DuplicateGroup {
  id: string;
  applications: Application[];
  matchScore: number;
  matchReasons: string[];
  status: 'pending' | 'merged' | 'dismissed';
}

// Helper function to calculate string similarity (Levenshtein distance)
function similarityScore(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 100;

  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return 0;
  if (len2 === 0) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[len2][len1];
  const maxLen = Math.max(len1, len2);
  return Math.round(((maxLen - distance) / maxLen) * 100);
}

// Detect duplicates
function detectDuplicates(applications: Application[]): DuplicateGroup[] {
  const duplicateGroups: DuplicateGroup[] = [];
  const processedIds = new Set<string>();

  for (let i = 0; i < applications.length; i++) {
    if (processedIds.has(applications[i].id)) continue;

    const potentialDuplicates: Application[] = [applications[i]];
    const matchReasons: string[] = [];
    let totalScore = 0;

    for (let j = i + 1; j < applications.length; j++) {
      if (processedIds.has(applications[j].id)) continue;

      const app1 = applications[i];
      const app2 = applications[j];

      let score = 0;
      const reasons: string[] = [];

      // Check name similarity
      const nameScore = similarityScore(app1.applicantName, app2.applicantName);
      if (nameScore >= 85) {
        score += 40;
        reasons.push(`Name match: ${nameScore}%`);
      }

      // Check same barangay
      if (app1.barangay === app2.barangay) {
        score += 20;
        reasons.push('Same barangay');
      }

      // Check same sector (might be double-dipping)
      if (app1.sector === app2.sector) {
        score += 15;
        reasons.push('Same sector');
      }

      // If high match score, consider as duplicate
      if (score >= 60) {
        potentialDuplicates.push(app2);
        processedIds.add(app2.id);
        matchReasons.push(...reasons);
        totalScore = Math.max(totalScore, score);
      }
    }

    if (potentialDuplicates.length > 1) {
      duplicateGroups.push({
        id: `DUP-${String(duplicateGroups.length + 1).padStart(3, '0')}`,
        applications: potentialDuplicates,
        matchScore: totalScore,
        matchReasons: [...new Set(matchReasons)],
        status: 'pending'
      });
      processedIds.add(applications[i].id);
    }
  }

  return duplicateGroups;
}

export default function DuplicateDetection() {
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<DuplicateGroup | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'merged' | 'dismissed'>('all');
  const [resolvedDuplicates, setResolvedDuplicates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadDuplicates = async () => {
      const allApplications = await applicationStore.getAll();
      const detected = detectDuplicates(allApplications);
      setDuplicateGroups(detected);
    };

    loadDuplicates();
    const unsubscribe = applicationStore.subscribe(loadDuplicates);
    return unsubscribe;
  }, []);

  const handleReview = (group: DuplicateGroup) => {
    setSelectedGroup(group);
    setShowReviewModal(true);
  };

  const handleMerge = () => {
    if (!selectedGroup) return;

    // Mark as merged (in real system, would merge the records)
    setResolvedDuplicates(prev => new Set([...prev, selectedGroup.id]));
    setDuplicateGroups(prev =>
      prev.map(g => g.id === selectedGroup.id ? { ...g, status: 'merged' } : g)
    );

    alert(`Records merged successfully! Primary record: ${selectedGroup.applications[0].id}`);
    setShowReviewModal(false);
    setSelectedGroup(null);
  };

  const handleDismiss = () => {
    if (!selectedGroup) return;

    // Mark as dismissed (separate valid records)
    setResolvedDuplicates(prev => new Set([...prev, selectedGroup.id]));
    setDuplicateGroups(prev =>
      prev.map(g => g.id === selectedGroup.id ? { ...g, status: 'dismissed' } : g)
    );

    alert('Records marked as separate valid entries.');
    setShowReviewModal(false);
    setSelectedGroup(null);
  };

  const filteredGroups = useMemo(() => {
    return duplicateGroups.filter(group => {
      // Filter by status
      if (filterStatus !== 'all' && group.status !== filterStatus) {
        return false;
      }

      // Filter by search term
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return group.applications.some(app =>
          app.applicantName.toLowerCase().includes(search) ||
          app.barangay.toLowerCase().includes(search) ||
          app.sector.toLowerCase().includes(search)
        );
      }

      return true;
    });
  }, [duplicateGroups, searchTerm, filterStatus]);

  const stats = {
    total: duplicateGroups.length,
    pending: duplicateGroups.filter(g => g.status === 'pending').length,
    merged: duplicateGroups.filter(g => g.status === 'merged').length,
    dismissed: duplicateGroups.filter(g => g.status === 'dismissed').length
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Duplicate Detection</h1>
        <p className="text-gray-500 mt-1">Identify and manage potential duplicate beneficiaries across sectors</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Duplicates Found</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Merged</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.merged}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Dismissed</p>
              <p className="text-3xl font-bold text-gray-600 mt-2">{stats.dismissed}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Card */}
      {stats.pending > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800">Duplicate Records Detected</h3>
            <p className="text-sm text-yellow-700 mt-1">
              {stats.pending} potential duplicate records found. Please review and take appropriate action to prevent double benefits.
            </p>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, barangay, or sector..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="merged">Merged</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Duplicate Records Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Potential Duplicate Records</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredGroups.length} duplicate group{filteredGroups.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beneficiary Names
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sectors Involved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barangay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {duplicateGroups.length === 0
                      ? 'No duplicate records detected. All beneficiaries are unique.'
                      : 'No records match your search criteria.'}
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {group.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        {group.applications.map((app, idx) => (
                          <div key={app.id} className="flex items-center gap-2">
                            <span className="text-gray-400">•</span>
                            <span>{app.applicantName}</span>
                            <span className="text-xs text-gray-500">({app.id})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {[...new Set(group.applications.map(app => app.sector))].map(sector => (
                          <span key={sector} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.applications[0].barangay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                          <div
                            className={`h-2 rounded-full ${
                              group.matchScore >= 80 ? 'bg-red-600' :
                              group.matchScore >= 60 ? 'bg-yellow-600' :
                              'bg-green-600'
                            }`}
                            style={{ width: `${group.matchScore}%` }}
                          />
                        </div>
                        <span className="font-medium">{group.matchScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        group.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        group.status === 'merged' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {group.status === 'pending' ? 'Pending' :
                         group.status === 'merged' ? 'Merged' :
                         'Dismissed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleReview(group)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {group.status === 'pending' ? 'Review' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl flex items-center justify-between sticky top-0">
              <div>
                <h2 className="text-2xl font-bold">Review Duplicate Record - {selectedGroup.id}</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Compare records and determine if they represent the same beneficiary
                </p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Match Analysis */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-yellow-800">Match Analysis</h3>
                  <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-bold">
                    {selectedGroup.matchScore}% Match
                  </span>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {selectedGroup.matchReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {selectedGroup.applications.map((app, idx) => (
                  <div key={app.id} className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Record {String.fromCharCode(65 + idx)} - {app.sector}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {app.id}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
                        <p className="text-sm font-medium text-gray-900">{app.applicantName}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Barangay</label>
                        <p className="text-sm text-gray-900">{app.barangay}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Sector</label>
                        <p className="text-sm text-gray-900">{app.sector}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Assistance Type</label>
                        <p className="text-sm text-gray-900">{app.assistanceType}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Amount</label>
                        <p className="text-sm font-semibold text-green-600">
                          ₱{app.recommendedAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                        <p className="text-sm">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                            {app.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Date Received</label>
                        <p className="text-sm text-gray-900">{app.dateReceived}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-red-900 mb-1">Important Decision</h5>
                    <p className="text-sm text-red-800">
                      <strong>Merging records:</strong> Will consolidate these applications into one beneficiary record.
                      The beneficiary will only receive assistance once.
                    </p>
                    <p className="text-sm text-red-800 mt-2">
                      <strong>Marking as separate:</strong> Confirms these are different people who happen to have
                      similar information. Both will remain eligible for assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedGroup.status === 'pending' ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleMerge}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium inline-flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Confirm Duplicate - Merge Records
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Mark as Separate Valid Records
                  </button>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    This duplicate has been {selectedGroup.status === 'merged' ? 'merged' : 'dismissed'}.
                  </p>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
