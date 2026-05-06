import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ClipboardList, 
  Send, 
  Database, 
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  User,
  UserPlus
} from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/34ff9788541332a9d014c14a8f6f9b5c494e5892.png';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    message: 'Application APP-2024-007 returned by MSWDO - Missing documents',
    date: '2024-03-11',
    time: '11:15 AM',
    read: false,
    type: 'returned',
    applicationId: 'APP-2024-007',
    details: 'Please upload Barangay Clearance and Income Certificate'
  },
  {
    id: 2,
    message: 'Request APP-2024-001 has been approved by MSWDO',
    date: '2024-03-11',
    time: '10:30 AM',
    read: false,
    type: 'approved',
    applicationId: 'APP-2024-001'
  },
  {
    id: 3,
    message: 'New assistance program available for Senior Citizens',
    date: '2024-03-10',
    time: '2:15 PM',
    read: false,
    type: 'info'
  },
  {
    id: 4,
    message: 'Application APP-2024-002 is under evaluation',
    date: '2024-03-10',
    time: '9:00 AM',
    read: true,
    type: 'info'
  },
  {
    id: 5,
    message: 'Beneficiary database updated successfully',
    date: '2024-03-09',
    time: '4:45 PM',
    read: true,
    type: 'info'
  }
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/applications', label: 'Online Registration', icon: FileText },
    { path: '/dashboard/walk-in-registration', label: 'Walk-in Registration', icon: UserPlus },
    { path: '/dashboard/validation-queue', label: 'Validation Queue', icon: ClipboardList },
    { path: '/dashboard/forwarded-applications', label: 'Forwarded Applications', icon: Send },
    { path: '/dashboard/residents-database', label: 'Residents Database', icon: Database },
    { path: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-200">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-800"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-3">
              <img src={logo} alt="E-Ayuda Logo" className="w-12 h-12 object-contain" />
              <div className="hidden sm:block">
                <h1 className="font-semibold text-gray-800">Barangay San Jose</h1>
                <p className="text-xs text-gray-500">BSWDO Portal</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[500px] overflow-y-auto z-50">
                  <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-blue-600">{unreadCount} unread</span>
                      )}
                    </div>
                  </div>
                  <div>
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'returned' ? 'bg-red-500' :
                            notification.type === 'approved' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 break-words">{notification.message}</p>
                            {notification.details && (
                              <p className="text-xs text-gray-600 mt-1 break-words">{notification.details}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <p className="text-xs text-gray-500">{notification.date} at {notification.time}</p>
                              {notification.type === 'returned' && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">Needs Action</span>
                              )}
                              {notification.type === 'approved' && (
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Approved</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200 sticky bottom-0 bg-white">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <span className="hidden sm:block text-sm font-medium text-gray-700">BSWDO Staff</span>
            </div>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 border-r border-gray-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}