// =============================================================
// FarmerSidebar.jsx — Left Navigation Sidebar (Farmer Role)
// =============================================================
// Shown on all farmer-accessible pages.
// - Active route is highlighted using useLocation
// - Icons from react-icons for each nav item
// =============================================================

import { useNavigate, useLocation } from "react-router-dom"
import {
  FaTachometerAlt,
  FaSeedling,
  FaFlask,
  FaBullhorn,
  FaTools,
  FaComments,
  FaCalendarAlt,
  FaRupeeSign,
  FaLightbulb,
  FaUserCircle,
} from "react-icons/fa"

// Nav items: each has a label, icon, and target route
const navItems = [
  { label: "Dashboard",        icon: <FaTachometerAlt />, path: "/farmer-dashboard"        },
  { label: "Recommendations",  icon: <FaSeedling />,      path: "/farmer/recommendations"  },
  { label: "Soil Analysis",    icon: <FaFlask />,         path: "/farmer/soil-analysis"    },
  { label: "Trainings",        icon: <FaCalendarAlt />,   path: "/farmer/trainings"        },
  { label: "Mandi Prices",     icon: <FaRupeeSign />,     path: "/farmer/mandi"            },
  { label: "Awareness Drives", icon: <FaBullhorn />,      path: "/farmer/awareness"        },
  { label: "Expert Guidance",  icon: <FaLightbulb />,     path: "/farmer/expert-guidance"  },
  { label: "Tools Catalog",    icon: <FaTools />,         path: "/farmer/tools"            },
  { label: "Community Forum",  icon: <FaComments />,      path: "/farmer/forum"            },
  { label: "My Profile",       icon: <FaUserCircle />,    path: "/farmer/profile"          },
]

function FarmerSidebar() {

  const navigate  = useNavigate()
  const location  = useLocation()

  return (
    <div className="w-64 bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col min-h-screen shrink-0">

      {/* ---- Brand header ---- */}
      <div className="px-6 py-8 border-b border-green-700">
        <h1 className="text-xl font-extrabold tracking-wide">
          🌾 Farmers <span className="text-amber-300">Buddy</span>
        </h1>
        <p className="text-green-300 text-xs mt-1">Agriculture Support</p>
      </div>

      {/* ---- Navigation items ---- */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {

          // Highlight the item whose path matches the current URL
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-green-100 hover:bg-green-700/60"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* ---- Footer role badge ---- */}
      <div className="px-6 py-4 border-t border-green-700">
        <span className="text-xs text-green-300">Logged in as</span>
        <p className="text-sm font-bold text-amber-300 mt-0.5">FARMER</p>
      </div>

    </div>
  )
}

export default FarmerSidebar
