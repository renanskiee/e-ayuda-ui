import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  QrCode,
  DollarSign,
  BarChart3,
  FileBarChart,
  ClipboardCheck,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

export default function DisbursementLayout() {
  const location = useLocation();
  // For now, default to MSWDO Head role - this can be enhanced later with actual role management
  const [userRole] = useState<'mswdo-head' | 'payout-officer' | 'treasurer'>('mswdo-head');

  // Menu items based on user role
  const getMenuItems = () => {
    if (userRole === 'mswdo-head') {
      return [
        { path: '/disbursement/authorization', icon: LayoutDashboard, label: 'Disbursement Authorization' },
        { path: '/disbursement/monitoring', icon: TrendingUp, label: 'Payout Monitoring' },
        { path: '/disbursement/transactions', icon: FileText, label: 'Transaction Logs' },
        { path: '/disbursement/liquidation', icon: FileBarChart, label: 'Liquidation Report' },
        { path: '/disbursement/audit', icon: ClipboardCheck, label: 'Final Audit Report' },
      ];
    } else if (userRole === 'payout-officer') {
      return [
        { path: '/disbursement/payout', icon: QrCode, label: 'QR Payout Verification' },
        { path: '/disbursement/monitoring', icon: TrendingUp, label: 'Payout Monitoring' },
        { path: '/disbursement/transactions', icon: FileText, label: 'Transaction Logs' },
      ];
    } else if (userRole === 'treasurer') {
      return [
        { path: '/disbursement/treasurer', icon: DollarSign, label: 'Financial Dashboard' },
        { path: '/disbursement/monitoring', icon: TrendingUp, label: 'Payout Monitoring' },
        { path: '/disbursement/transactions', icon: FileText, label: 'Transaction Logs' },
        { path: '/disbursement/liquidation', icon: FileBarChart, label: 'Liquidation Report' },
        { path: '/disbursement/audit', icon: ClipboardCheck, label: 'Final Audit Report' },
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  const getRoleLabel = () => {
    if (userRole === 'mswdo-head') return 'MSWDO Head';
    if (userRole === 'payout-officer') return 'Payout Officer';
    if (userRole === 'treasurer') return 'Municipal Treasurer';
    return '';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">E-Ayuda System</h1>
              <p className="text-xs text-gray-500">Disbursement Module</p>
            </div>
          </div>
          <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-blue-800">{getRoleLabel()}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}