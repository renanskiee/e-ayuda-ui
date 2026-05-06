import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Bell, LogOut, LayoutDashboard, Users, AlertTriangle, Briefcase, ListChecks, DollarSign, History, FileText, Settings } from 'lucide-react';
import logo from 'figma:asset/34ff9788541332a9d014c14a8f6f9b5c494e5892.png';

interface SectorialLayoutProps {
  children: ReactNode;
}

export default function SectorialLayout({ children }: SectorialLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/');
  };

  const menuItems = [
    { path: '/sectorial', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/sectorial/beneficiaries', label: 'Central Beneficiary Database', icon: Users },
    { path: '/sectorial/duplicates', label: 'Duplicate Detection', icon: AlertTriangle },
    { path: '/sectorial/program-creation', label: 'Program Creation', icon: Briefcase },
    { path: '/sectorial/programs', label: 'Program Management', icon: ListChecks },
    { path: '/sectorial/budget', label: 'Budget Allocation', icon: DollarSign },
    { path: '/sectorial/history', label: 'Assistance History', icon: History },
    { path: '/sectorial/reports', label: 'Reports', icon: FileText },
    { path: '/sectorial/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/mswdo-head/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="E-Ayuda Logo" className="w-12 h-12 object-contain" />
            <div>
              <p className="font-bold text-gray-800 text-sm">E-Ayuda System</p>
              <p className="text-xs text-gray-500">Sectorial Management</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back to MSWDO Head Dashboard */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/mswdo-head/dashboard"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            ← Back to Main Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="E-Ayuda Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-semibold text-gray-800">Sectorial Database & Program Creation Management</h1>
                <p className="text-xs text-gray-500">Municipal Social Welfare and Development Office</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">MH</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">MSWDO Head</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}