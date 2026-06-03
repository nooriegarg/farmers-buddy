import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminSidebar from "../../components/AdminSidebar"
import {
  FaUsers, FaChartBar, FaClipboardList, FaCheckCircle,
  FaBullhorn, FaTools, FaCalendarAlt, FaLightbulb, FaComments, FaRupeeSign,
} from "react-icons/fa"
import API from "../../services/api"

function AdminDashboard() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const [stats, setStats] = useState({
    users: null, trainings: null, forum: null,
    awareness: null, tools: null, solutions: null,
    queries: null, mandi: null,
  })

  useEffect(() => {
    const fetchAll = async () => {
      const safe = (promise) => promise.then(r => r.data).catch(() => null)
      const [users, trainings, forum, awareness, tools, solutions, queries, mandi] = await Promise.all([
        safe(API.get("/auth/users")),
        safe(API.get("/trainings")),
        safe(API.get("/forum")),
        safe(API.get("/awareness")),
        safe(API.get("/tools")),
        safe(API.get("/solutions")),
        safe(API.get("/queries")),
        safe(API.get("/mandi")),
      ])
      setStats({
        users:     Array.isArray(users)     ? users.length     : null,
        trainings: Array.isArray(trainings) ? trainings.length : null,
        forum:     Array.isArray(forum)     ? forum.length     : null,
        awareness: Array.isArray(awareness) ? awareness.length : null,
        tools:     Array.isArray(tools)     ? tools.length     : null,
        solutions: Array.isArray(solutions) ? solutions.length : null,
        queries:   Array.isArray(queries)   ? queries.length   : null,
        mandi:     Array.isArray(mandi)     ? mandi.length     : null,
      })
    }
    fetchAll()
  }, [])

  const fmt = (n) => n === null ? "…" : n

  const metricCards = [
    {
      icon: <FaUsers className="text-2xl text-white" />,
      bg: "bg-gradient-to-br from-blue-600 to-blue-500",
      title: "Registered Users",
      desc: "Total farmer, officer, expert and admin accounts.",
      metric: "Total Users",
      value: fmt(stats.users),
    },
    {
      icon: <FaClipboardList className="text-2xl text-white" />,
      bg: "bg-gradient-to-br from-green-600 to-green-500",
      title: "Support Queries",
      desc: "All farmer queries submitted through the platform.",
      metric: "Total Queries",
      value: fmt(stats.queries),
    },
    {
      icon: <FaChartBar className="text-2xl text-white" />,
      bg: "bg-gradient-to-br from-purple-600 to-purple-500",
      title: "Training Sessions",
      desc: "Agriculture training sessions created by officers.",
      metric: "Total Sessions",
      value: fmt(stats.trainings),
    },
  ]

  const activityItems = [
    { icon: <FaUsers className="text-blue-600" />,       label: "Total Registered Users",       badge: fmt(stats.users),     badgeColor: "bg-blue-100 text-blue-700"    },
    { icon: <FaClipboardList className="text-green-600"/>, label: "Farmer Queries Submitted",   badge: fmt(stats.queries),   badgeColor: "bg-green-100 text-green-700"  },
    { icon: <FaBullhorn className="text-amber-600" />,   label: "Awareness Drives Published",   badge: fmt(stats.awareness), badgeColor: "bg-amber-100 text-amber-700"  },
    { icon: <FaTools className="text-purple-600" />,     label: "Tools in Catalog",             badge: fmt(stats.tools),     badgeColor: "bg-purple-100 text-purple-700"},
    { icon: <FaCalendarAlt className="text-blue-500" />, label: "Training Sessions",            badge: fmt(stats.trainings), badgeColor: "bg-blue-100 text-blue-600"    },
    { icon: <FaLightbulb className="text-violet-600" />, label: "Expert Solutions Posted",      badge: fmt(stats.solutions), badgeColor: "bg-violet-100 text-violet-700"},
    { icon: <FaComments className="text-teal-600" />,    label: "Community Forum Posts",        badge: fmt(stats.forum),     badgeColor: "bg-teal-100 text-teal-700"    },
    { icon: <FaRupeeSign className="text-orange-600" />, label: "Mandi Price Entries",          badge: fmt(stats.mandi),     badgeColor: "bg-orange-100 text-orange-700"},
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-red-300 text-sm font-medium mb-1">System Administrator</p>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome, {user?.name}
            </h1>
            <p className="text-red-200 text-sm mt-1">
              Manage the Farmers Buddy platform from this admin panel.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-8">

          {/* Metric Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {metricCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className={`${card.bg} px-5 py-4 flex items-center gap-3`}>
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    {card.icon}
                  </div>
                  <h3 className="text-white font-bold">{card.title}</h3>
                </div>

                <div className="p-5">
                  <p className="text-gray-500 text-sm">{card.desc}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{card.metric}</span>
                    <span className="text-2xl font-extrabold text-gray-800">{card.value}</span>
                  </div>

                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${card.bg} rounded-full w-2/3 opacity-60`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Platform Activity Summary */}
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
                  <span className={`${item.badgeColor} text-xs font-bold px-3 py-1 rounded-full min-w-[2rem] text-center`}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <h2 className="text-lg font-bold text-gray-800 mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-4 gap-3">
              {[
                { emoji: "👤", label: "View Users",          path: "/admin/users"      },
                { emoji: "💬", label: "Community Forum",     path: "/admin/forum"      },
                { emoji: "📢", label: "Manage Awareness",    path: "/admin/awareness"  },
                { emoji: "🔧", label: "Resource Management", path: "/admin/tools"      },
                { emoji: "📅", label: "Training Sessions",   path: "/admin/trainings"  },
                { emoji: "💡", label: "Expert Solutions",    path: "/admin/solutions"  },
                { emoji: "💰", label: "Mandi Prices",        path: "/admin/mandi"      },
                { emoji: "👤", label: "My Profile",          path: "/admin/profile"    },
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
