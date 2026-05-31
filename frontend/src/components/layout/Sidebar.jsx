import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { FiHome, FiMessageSquare, FiFeather, FiDollarSign, FiBook, FiUsers, FiUser } from 'react-icons/fi';

const navConfig = {
  FARMER: [
    { to: '/farmer/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/farmer/queries', icon: FiMessageSquare, label: 'My Queries' },
    { to: '/farmer/recommendations', icon: FiFeather, label: 'Crop Tips' },
    { to: '/farmer/mandi', icon: FiDollarSign, label: 'Mandi Prices' },
    { to: '/farmer/training', icon: FiBook, label: 'Training' },
    { to: '/profile', icon: FiUser, label: 'Profile' },
  ],
  OFFICER: [
    { to: '/officer/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/officer/queries', icon: FiMessageSquare, label: 'Queries' },
    { to: '/officer/recommendations', icon: FiFeather, label: 'Recommendations' },
    { to: '/officer/mandi', icon: FiDollarSign, label: 'Mandi Prices' },
    { to: '/officer/training', icon: FiBook, label: 'Training' },
    { to: '/profile', icon: FiUser, label: 'Profile' },
  ],
  ADMIN: [
    { to: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/admin/users', icon: FiUsers, label: 'Users' },
    { to: '/admin/queries', icon: FiMessageSquare, label: 'Queries' },
    { to: '/admin/recommendations', icon: FiFeather, label: 'Recommendations' },
    { to: '/admin/mandi', icon: FiDollarSign, label: 'Mandi Prices' },
    { to: '/admin/training', icon: FiBook, label: 'Training' },
    { to: '/profile', icon: FiUser, label: 'Profile' },
  ],
};

const roleInfo = {
  FARMER:  { label: 'Farmer Portal',  emoji: '👨‍🌾', bg: 'bg-green-50',  text: 'text-green-700' },
  OFFICER: { label: 'Officer Portal', emoji: '👷',    bg: 'bg-blue-50',   text: 'text-blue-700' },
  ADMIN:   { label: 'Admin Portal',   emoji: '🛡️',   bg: 'bg-purple-50', text: 'text-purple-700' },
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const links = navConfig[user?.role] || [];
  const info = roleInfo[user?.role] || { label: 'Portal', emoji: '🌾', bg: 'bg-green-50', text: 'text-green-700' };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel — uses CSS classes only, no window.innerWidth */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-40
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-white text-sm shadow-sm">
              🌾
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm leading-tight">Farmers Buddy</p>
              <p className={`text-xs font-medium ${info.text}`}>{info.label}</p>
            </div>
          </div>
        </div>

        {/* User pill */}
        <div className="mx-3 mt-4 mb-2">
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${info.bg}`}>
            <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.username}</p>
              <p className={`text-xs font-medium ${info.text} truncate`}>{info.emoji} {user?.role}</p>
            </div>
          </div>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Menu</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <Icon size={16} className="nav-link-icon shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-50 shrink-0">
          <p className="text-xs text-slate-400 text-center">🌾 Farmers Buddy v1.0</p>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;