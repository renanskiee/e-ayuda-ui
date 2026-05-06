import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardList, 
  CheckCircle, 
  Users, 
  DollarSign, 
  History, 
  BarChart3,
  Bell, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import logo from 'figma:asset/34ff9788541332a9d014c14a8f6f9b5c494e5892.png';

interface SectorLayoutProps {
  sectorName: string;
}

export default function SectorLayout({ sectorName }: SectorLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine the base path based on sector name
  const basePath = sectorName === 'Senior Citizen' 
    ? '/sector/senior-citizen' 
    : sectorName === 'PWD'
    ? '/sector/pwd'
    : sectorName === 'Solo Parent'
    ? '/sector/solo-parent'
    : sectorName === 'Women'
    ? '/sector/women'
    : sectorName === 'Youth'
    ? '/sector/youth'
    : sectorName === 'Disaster'
    ? '/sector/disaster'
    : '/sector/senior-citizen';

  const menuItems = [
    { name: 'Dashboard', path: basePath, icon: LayoutDashboard },
    { name: 'Received Applications', path: `${basePath}/applications`, icon: FileText },
    { name: 'Evaluation Queue', path: `${basePath}/evaluation`, icon: ClipboardList },
    { name: 'Approved Beneficiaries', path: `${basePath}/approved`, icon: CheckCircle },
    { name: 'Sector Beneficiary Records', path: `${basePath}/records`, icon: Users },
    { name: 'Fund Monitoring', path: `${basePath}/funds`, icon: DollarSign },
    { name: 'Transaction History', path: `${basePath}/transactions`, icon: History },
    { name: 'Sector Reports', path: `${basePath}/reports`, icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-800">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <img src={logo} alt="E-Ayuda Logo" className="w-12 h-12 object-contain" />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    E-Ayuda Management and Monitoring System
                  </h2>
                  <p className="text-sm text-green-600 font-medium">{sectorName} Sector</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">Sector Staff</p>
                    <p className="text-xs text-gray-500">{sectorName}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SC</span>
                  </div>
                </div>
                <Link
                  to="/"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}