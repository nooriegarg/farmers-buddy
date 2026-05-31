import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { FiLogOut, FiUser, FiMenu, FiBell } from 'react-icons/fi';

const roleColors = {
  FARMER: 'bg-green-100 text-green-700',
  OFFICER: 'bg-blue-100 text-blue-700',
  ADMIN: 'bg-purple-100 text-purple-700',
};

const roleEmoji = { FARMER: '👨‍🌾', OFFICER: '👷', ADMIN: '🛡️' };

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-4 lg:px-6 sticky top-0 z-40" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      {/* Left: Logo + Mobile menu toggle */}
      <div className="flex items-center gap-3 min-w-0">
        {isAuthenticated && (
          <button onClick={onToggleSidebar} className="btn-ghost p-2 lg:hidden">
            <FiMenu size={20} />
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-white font-bold text-sm shadow-sm">🌾</div>
          <span className="font-bold text-slate-800 text-base hidden sm:block">
            Farmers <span className="text-green-600">Buddy</span>
          </span>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {isAuthenticated ? (
          <>
            {/* Notification bell */}
            <button className="btn-ghost p-2 relative">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
            </button>

            {/* User avatar dropdown */}
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-white text-sm font-bold">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-700 leading-tight">{user?.username}</p>
                  <p className="text-xs text-slate-400">{user?.role}</p>
                </div>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 fade-in">
                  <div className="px-4 py-3 border-b border-slate-50">
                    <p className="text-sm font-semibold text-slate-800">{user?.fullName || user?.username}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
                    <span className={`badge mt-2 ${roleColors[user?.role]}`}>
                      {roleEmoji[user?.role]} {user?.role}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      <FiUser size={15} /> My Profile
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <FiLogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn-secondary text-sm py-1.5 px-4">Sign In</Link>
            <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Get Started</Link>
          </div>
        )}
      </div>

      {/* Overlay to close dropdown */}
      {showDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />}
    </header>
  );
};
export default Navbar;