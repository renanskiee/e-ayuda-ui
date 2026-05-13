import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  DollarSign, 
  Database, 
  FolderKanban, 
  BarChart3, 
  FileText,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Briefcase,
  AlertTriangle,
  Plus,
  PieChart
} from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/34ff9788541332a9d014c14a8f6f9b5c494e5892.png';

export default function MswdoHeadLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = localStorage.getItem('username') || 'MSWDO Head';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/');
  };

  const menuItems = [
    { path: '/mswdo-head/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/mswdo-head/sector-monitoring', label: 'Sector Monitoring', icon: Users },
    { path: '/mswdo-head/awaiting-approval', label: 'Awaiting Approval', icon: FileCheck },
    { path: '/mswdo-head/beneficiary-database', label: 'Beneficiary Database', icon: Database },
    { path: '/mswdo-head/duplicate-detection', label: 'Duplicate Detection', icon: AlertTriangle },
    { path: '/mswdo-head/program-creation', label: 'Program Creation', icon: Plus },
    { path: '/mswdo-head/program-management', label: 'Program Management', icon: FolderKanban },
    { path: '/mswdo-head/budget-allocation', label: 'Budget Allocation', icon: PieChart },
    { path: '/mswdo-head/gad-reports', label: 'GAD Reports', icon: BarChart3 },
    { path: '/mswdo-head/system-reports', label: 'System Reports', icon: FileText },
    { path: '/mswdo-head/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo and System Name */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img src={logo} alt="E-Ayuda Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="font-bold text-gray-800 text-lg">E-Ayuda</h1>
                <p className="text-xs text-gray-500">MSWDO Head</p>
              </div>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-6 right-6 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasNotification = item.path === '/mswdo-head/awaiting-approval';
                const notificationCount = 28; // Number of pending applications

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
                        ${isActive(item.path)
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm flex-1">{item.label}</span>
                      {hasNotification && notificationCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {notificationCount}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{username}</p>
                <p className="text-xs text-gray-500">Municipal Head</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <img src={logo} alt="E-Ayuda Logo" className="w-14 h-14 object-contain" />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    San Pascual LGU
                  </h2>
                  <p className="text-sm text-gray-500">E-Ayuda Management and Monitoring System</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}