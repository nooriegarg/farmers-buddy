import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import FarmerSidebar  from "../../components/FarmerSidebar"
import StatsCard      from "../../components/StatsCard"

import { getQueriesByFarmer }  from "../../services/queryService"
import { getAllTrainings, getMyEnrollments } from "../../services/trainingService"

import {
  FaCheckCircle, FaClock, FaClipboardList,
  FaCalendarAlt, FaLightbulb, FaTools,
  FaComments, FaRupeeSign, FaBullhorn, FaArrowRight,
} from "react-icons/fa"

function FarmerDashboard() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const [queries, setQueries]       = useState([])
  const [enrolledCount, setEnrolledCount] = useState(0)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [qs, enrollments] = await Promise.all([
          getQueriesByFarmer(user.id),
          getMyEnrollments(user.id),
        ])
        setQueries(qs)
        setEnrolledCount(enrollments.length)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalQueries    = queries.length
  const resolvedQueries = queries.filter((q) => q.status === "RESOLVED").length
  const pendingQueries  = queries.filter((q) => q.status === "PENDING").length

  const quickActions = [
    { emoji: "❓", label: "My Queries",      path: "/farmer/queries"        },
    { emoji: "📅", label: "Trainings",       path: "/farmer/trainings"      },
    { emoji: "💰", label: "Mandi Prices",    path: "/farmer/mandi"          },
    { emoji: "📢", label: "Awareness",       path: "/farmer/awareness"      },
    { emoji: "💡", label: "Expert Guidance", path: "/farmer/expert-guidance"},
    { emoji: "🔧", label: "Tools Catalog",   path: "/farmer/tools"          },
    { emoji: "💬", label: "Community Forum", path: "/farmer/forum"          },
    { emoji: "🌱", label: "Crop Guide",      path: "/farmer/recommendations"},
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <FarmerSidebar />

      <div className="flex-1 flex flex-col">

        {/* Welcome Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-8 right-32 w-24 h-24 bg-amber-400/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-green-300 text-sm font-medium mb-1">Good day 🌱</p>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome, {user.name}
            </h1>
            <p className="text-green-200 text-sm mt-1">
              Your agriculture support dashboard — track your queries and access all resources.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-8">

          {/* Query Stats */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Query Overview</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <StatsCard icon={<FaClipboardList />} label="Total Queries"    value={loading ? "…" : totalQueries}    color="green" />
              <StatsCard icon={<FaCheckCircle />}   label="Resolved"         value={loading ? "…" : resolvedQueries} color="green" />
              <StatsCard icon={<FaClock />}          label="Pending"          value={loading ? "…" : pendingQueries}  color="yellow" />
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Activity Summary</h2>
            <div className="divide-y divide-gray-100">
              {[
                { icon: <FaClipboardList className="text-green-600" />, label: "Queries Submitted",       value: loading ? "…" : totalQueries,    color: "bg-green-100 text-green-700"  },
                { icon: <FaCheckCircle className="text-emerald-600" />, label: "Queries Resolved",        value: loading ? "…" : resolvedQueries,  color: "bg-emerald-100 text-emerald-700"},
                { icon: <FaCalendarAlt className="text-blue-600" />,    label: "Training Sessions Joined", value: loading ? "…" : enrolledCount,   color: "bg-blue-100 text-blue-700"    },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{row.icon}</div>
                    <span className="text-sm text-gray-700">{row.label}</span>
                  </div>
                  <span className={`${row.color} text-xs font-bold px-3 py-1 rounded-full min-w-[2rem] text-center`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* My Queries shortcut */}
            <button
              onClick={() => navigate("/farmer/queries")}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 transition"
            >
              View all my queries <FaArrowRight className="text-xs" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Quick Access</h2>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-xl py-4 px-3 text-sm font-medium text-gray-700 hover:text-green-700 transition-all duration-150"
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

export default FarmerDashboard
