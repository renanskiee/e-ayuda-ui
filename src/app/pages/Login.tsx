import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Eye, EyeOff } from 'lucide-react';
import logo from 'figma:asset/34ff9788541332a9d014c14a8f6f9b5c494e5892.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to determine role and sector from staff ID
  const determineUserRole = (staffId: string): { role: string; sector?: string } => {
    const id = staffId.toLowerCase().trim();

    // BSWDO Staff: bswd-XXXXX or bswdo-XXXXX
    if (id.startsWith('bswd-') || id.startsWith('bswdo-')) {
      return { role: 'bswdo' };
    }

    // MSWDO Sector Staff: sector-sc-XXXXX, sector-pwd-XXXXX, etc.
    if (id.startsWith('sector-')) {
      const parts = id.split('-');
      if (parts.length >= 3) {
        const sectorCode = parts[1];
        const sectorMap: { [key: string]: string } = {
          'sc': 'senior-citizen',
          'senior': 'senior-citizen',
          'pwd': 'pwd',
          'sp': 'solo-parent',
          'solo': 'solo-parent',
          'women': 'women',
          'youth': 'youth',
          'eccd': 'eccd'
        };
        const sector = sectorMap[sectorCode];
        if (sector) {
          return { role: 'mswdo-sector', sector };
        }
      }
    }

    // MSWDO Head: mswdo-head-XXXXX or head-XXXXX
    if (id.startsWith('mswdo-head-') || id.startsWith('head-')) {
      return { role: 'mswdo-head' };
    }

    // Disbursement Officer: disbursement-XXXXX or disb-XXXXX
    if (id.startsWith('disbursement-') || id.startsWith('disb-')) {
      return { role: 'disbursement-officer' };
    }

    // Treasurer: treasurer-XXXXX or tres-XXXXX
    if (id.startsWith('treasurer-') || id.startsWith('tres-')) {
      return { role: 'treasurer' };
    }

    // Default: return empty to show error
    return { role: '' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Determine role and sector from username (staff ID)
    const { role, sector } = determineUserRole(username);

    // Validate that role was determined
    if (!role) {
      setError('Invalid Staff ID format. Please check your credentials.');
      return;
    }

    // Allow any username and password to login
    // Store login state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    if (sector) {
      localStorage.setItem('userSector', sector);
    }

    // Redirect based on role
    if (role === 'bswdo') {
      navigate('/dashboard');
    } else if (role === 'mswdo-sector') {
      // Redirect to sector dashboard based on determined sector
      if (sector === 'senior-citizen') {
        navigate('/sector/senior-citizen');
      } else if (sector === 'pwd') {
        navigate('/sector/pwd');
      } else if (sector === 'solo-parent') {
        navigate('/sector/solo-parent');
      } else if (sector === 'women') {
        navigate('/sector/women');
      } else if (sector === 'youth') {
        navigate('/sector/youth');
      } else if (sector === 'eccd') {
        navigate('/sector/eccd');
      }
    } else if (role === 'mswdo-head') {
      navigate('/mswdo-head/dashboard');
    } else if (role === 'disbursement-officer') {
      navigate('/disbursement-officer/dashboard');
    } else if (role === 'treasurer') {
      navigate('/treasurer/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - System Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-lg text-center">
          {/* Large Logo */}
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full mb-8 shadow-2xl">
            <img src={logo} alt="E-Ayuda Logo" className="w-20 h-20 object-contain" />
          </div>

          {/* System Title */}
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            E-Ayuda Management and Monitoring System
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-blue-100 mb-6 font-medium">
            Municipal Assistance Management Platform
          </p>

          {/* Description */}
          <p className="text-lg text-blue-200 leading-relaxed">
            This system supports the efficient management, evaluation, and distribution of social assistance programs for residents across all barangays.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only shown on small screens */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <img src={logo} alt="E-Ayuda Logo" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              E-Ayuda System
            </h2>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Card Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">User Login</h2>
              <p className="text-gray-600">Access your account to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Staff ID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Staff ID
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your staff ID"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-600 text-center mb-2">
                Demo Staff IDs (password: password)
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p className="text-center">BSWDO: <span className="font-medium">bswd-11223</span></p>
                <p className="text-center">Sector PWD: <span className="font-medium">sector-pwd-001</span></p>
                <p className="text-center">Sector Senior: <span className="font-medium">sector-sc-001</span></p>
                <p className="text-center">MSWDO Head: <span className="font-medium">head-001</span></p>
                <p className="text-center">Disbursement: <span className="font-medium">disb-001</span></p>
                <p className="text-center">Treasurer: <span className="font-medium">tres-001</span></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-gray-600 font-medium">
              Municipal Social Welfare and Development Office
            </p>
            <p className="text-xs text-gray-500">
              Powered by the LGU Digital Assistance Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}