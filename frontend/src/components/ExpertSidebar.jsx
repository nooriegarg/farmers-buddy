import { useNavigate, useLocation } from "react-router-dom"
import {
  FaTachometerAlt,
  FaLightbulb,
  FaTools,
  FaUserCircle,
} from "react-icons/fa"

const navItems = [
  { label: "Dashboard",    icon: <FaTachometerAlt />, path: "/expert-dashboard" },
  { label: "My Solutions", icon: <FaLightbulb />,     path: "/expert/solutions" },
  { label: "Upload Tools", icon: <FaTools />,         path: "/expert/tools"     },
  { label: "My Profile",   icon: <FaUserCircle />,    path: "/expert/profile"   },
]

function ExpertSidebar() {

  const navigate  = useNavigate()
  const location  = useLocation()

  return (
    <div className="w-64 bg-gradient-to-b from-violet-900 to-violet-800 text-white flex flex-col min-h-screen shrink-0">

      <div className="px-6 py-8 border-b border-violet-700">
        <h1 className="text-xl font-extrabold tracking-wide">
          🧑‍🔬 Expert <span className="text-amber-300">Panel</span>
        </h1>
        <p className="text-violet-300 text-xs mt-1">Agriculture Specialist</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-violet-100 hover:bg-violet-700/60"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="px-6 py-4 border-t border-violet-700">
        <span className="text-xs text-violet-300">Logged in as</span>
        <p className="text-sm font-bold text-amber-300 mt-0.5">EXPERT</p>
      </div>

    </div>
  )
}

export default ExpertSidebar
