// =============================================================
// AdminSidebar.jsx — Left Navigation Sidebar (Admin Role)
// =============================================================
// Shown on all admin-accessible pages.
// Uses a deep red/amber theme to visually distinguish admin interface.
// =============================================================

import { useNavigate, useLocation } from "react-router-dom"
import {
  FaTachometerAlt,
  FaComments,
  FaBullhorn,
  FaBoxOpen,
  FaUsers,
  FaRupeeSign,
  FaUserCircle,
  FaCalendarAlt,
  FaLightbulb,
} from "react-icons/fa"

const navItems = [
  { label: "Dashboard",          icon: <FaTachometerAlt />, path: "/admin-dashboard"   },
  { label: "Community Forum",    icon: <FaComments />,      path: "/admin/forum"       },
  { label: "Platform Awareness", icon: <FaBullhorn />,      path: "/admin/awareness"   },
  { label: "Resource Management",icon: <FaBoxOpen />,       path: "/admin/tools"       },
  { label: "Mandi Prices",       icon: <FaRupeeSign />,     path: "/admin/mandi"       },
  { label: "Trainings",          icon: <FaCalendarAlt />,   path: "/admin/trainings"   },
  { label: "Expert Solutions",   icon: <FaLightbulb />,     path: "/admin/solutions"   },
  { label: "User Management",    icon: <FaUsers />,         path: "/admin/users"       },
  { label: "My Profile",         icon: <FaUserCircle />,    path: "/admin/profile"     },
]

function AdminSidebar() {

  const navigate  = useNavigate()
  const location  = useLocation()

  return (
    <div className="w-64 bg-gradient-to-b from-red-900 to-red-800 text-white flex flex-col min-h-screen shrink-0">

      {/* ---- Brand header ---- */}
      <div className="px-6 py-8 border-b border-red-700">
        <h1 className="text-xl font-extrabold tracking-wide">
          👨‍💼 Admin <span className="text-amber-300">Panel</span>
        </h1>
        <p className="text-red-300 text-xs mt-1">System Management</p>
      </div>

      {/* ---- Navigation items ---- */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {

          const isActive = location.pathname === item.path

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-red-100 hover:bg-red-700/60"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* ---- Footer role badge ---- */}
      <div className="px-6 py-4 border-t border-red-700">
        <span className="text-xs text-red-300">Logged in as</span>
        <p className="text-sm font-bold text-amber-300 mt-0.5">ADMIN</p>
      </div>

    </div>
  )
}

export default AdminSidebar
