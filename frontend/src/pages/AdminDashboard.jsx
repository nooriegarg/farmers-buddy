// =============================================================
// AdminDashboard.jsx — Admin Panel Dashboard (Enhanced)
// =============================================================
// Overview cards for User Management, System Monitoring, Reports.
// Colored metric headers and progress bar placeholders.
// =============================================================

import { useNavigate } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import { FaUsers, FaChartBar, FaClipboardList, FaCheckCircle, FaBullhorn, FaTools } from "react-icons/fa"

// Admin metric cards data
const metricCards = [
  {
    icon: <FaUsers className="text-2xl text-white" />,
    bg: "bg-gradient-to-br from-blue-600 to-blue-500",
    title: "User Management",
    desc: "Manage farmer and officer accounts on the platform.",
    metric: "Active Users",
    value: "—",
  },
  {
    icon: <FaChartBar className="text-2xl text-white" />,
    bg: "bg-gradient-to-br from-purple-600 to-purple-500",
    title: "System Monitoring",
    desc: "Monitor platform activities, logins, and system health.",
    metric: "Uptime",
    value: "99.9%",
  },
  {
    icon: <FaClipboardList className="text-2xl text-white" />,
    bg: "bg-gradient-to-br from-green-600 to-green-500",
    title: "Query Reports",
    desc: "Analyze agriculture support data and query trends.",
    metric: "Resolved Rate",
    value: "—",
  },
]

// Activity summary rows
const activityItems = [
  { icon: <FaUsers className="text-blue-600" />,       label: "Total Registered Users",     badge: "—",     badgeColor: "bg-blue-100 text-blue-700"  },
  { icon: <FaCheckCircle className="text-green-600" />, label: "Queries Resolved Today",     badge: "—",     badgeColor: "bg-green-100 text-green-700" },
  { icon: <FaBullhorn className="text-amber-600" />,    label: "Active Awareness Campaigns", badge: "4",     badgeColor: "bg-amber-100 text-amber-700" },
  { icon: <FaTools className="text-purple-600" />,      label: "Tools in Catalog",           badge: "6",     badgeColor: "bg-purple-100 text-purple-700"},
]

function AdminDashboard() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        {/* ---- Welcome Banner ---- */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-red-300 text-sm font-medium mb-1">System Administrator</p>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome, {user.name}
            </h1>
            <p className="text-red-200 text-sm mt-1">
              Manage the Farmers Buddy platform from this admin panel.
            </p>
          </div>
        </div>

        {/* ---- Main Content ---- */}
        <div className="flex-1 p-8 space-y-8">

          {/* ---- Metric Cards ---- */}
          <div className="grid md:grid-cols-3 gap-5">
            {metricCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Colored header strip */}
                <div className={`${card.bg} px-5 py-4 flex items-center gap-3`}>
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    {card.icon}
                  </div>
                  <h3 className="text-white font-bold">{card.title}</h3>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <p className="text-gray-500 text-sm">{card.desc}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{card.metric}</span>
                    <span className="text-2xl font-extrabold text-gray-800">{card.value}</span>
                  </div>

                  {/* CSS-only progress bar placeholder */}
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${card.bg} rounded-full w-2/3 opacity-60`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---- Platform Activity Summary ---- */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <h2 className="text-lg font-bold text-gray-800 mb-5">
              Platform Activity Overview
            </h2>

            <div className="divide-y divide-gray-100">
              {activityItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{item.icon}</div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className={`${item.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ---- Quick Actions ---- */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <h2 className="text-lg font-bold text-gray-800 mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-4 gap-3">
              {[
                { emoji: "👤", label: "View Users",          path: "/admin/users"     },
                { emoji: "💬", label: "Community Forum",     path: "/admin/forum"     },
                { emoji: "📢", label: "Manage Awareness",    path: "/admin/awareness" },
                { emoji: "🔧", label: "Resource Management", path: "/admin/tools"     },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-xl py-4 px-3 text-sm font-medium text-gray-700 hover:text-red-700 transition-all duration-150"
                >
                  <span className="text-2xl">{action.emoji}</span>
                  {action.label}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
