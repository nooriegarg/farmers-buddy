import { useNavigate, useLocation } from "react-router-dom"
import {
  FaTachometerAlt,
  FaSeedling,
  FaCalendarAlt,
  FaBullhorn,
  FaUserCircle,
} from "react-icons/fa"

const navItems = [
  { label: "Dashboard",        icon: <FaTachometerAlt />, path: "/officer-dashboard"       },
  { label: "Recommendations",  icon: <FaSeedling />,      path: "/officer/recommendations" },
  { label: "Trainings",        icon: <FaCalendarAlt />,   path: "/officer/trainings"       },
  { label: "Awareness Drives", icon: <FaBullhorn />,      path: "/officer/awareness"       },
  { label: "My Profile",       icon: <FaUserCircle />,    path: "/officer/profile"         },
]

function OfficerSidebar() {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col min-h-screen shrink-0">

      <div className="px-6 py-8 border-b border-blue-700">
        <h1 className="text-xl font-extrabold tracking-wide">
          👨‍🌾 Officer <span className="text-amber-300">Panel</span>
        </h1>
        <p className="text-blue-300 text-xs mt-1">Agriculture Support</p>
      </div>

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
                  : "text-blue-100 hover:bg-blue-700/60"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="px-6 py-4 border-t border-blue-700">
        <span className="text-xs text-blue-300">Logged in as</span>
        <p className="text-sm font-bold text-amber-300 mt-0.5">OFFICER</p>
      </div>

    </div>
  )
}

export default OfficerSidebar
