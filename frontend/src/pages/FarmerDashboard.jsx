// =============================================================
// FarmerDashboard.jsx — Farmer's Main Dashboard (Enhanced)
// =============================================================
// Uses reusable StatsCard and QueryCard components.
// - Banner: welcome header with background texture
// - Stats: Total / Resolved / Pending query counts
// - Form: submit a new agriculture query
// - List: all farmer's queries with status and officer replies
// =============================================================

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar from "../components/FarmerSidebar"
import StatsCard     from "../components/StatsCard"
import QueryCard     from "../components/QueryCard"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState    from "../components/EmptyState"

import { createQuery, getQueriesByFarmer } from "../services/queryService"

import {
  FaCheckCircle,
  FaClock,
  FaClipboardList,
  FaPaperPlane,
} from "react-icons/fa"

function FarmerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"))

  // ---- State ----
  const [formData, setFormData] = useState({ title: "", description: "" })
  const [queries, setQueries]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [fetching, setFetching] = useState(true)

  // ---- Load farmer's queries on mount ----
  useEffect(() => {
    const loadQueries = async () => {
      try {
        const response = await getQueriesByFarmer(user.id)
        setQueries(response)
      } catch (error) {
        console.error(error)
      } finally {
        setFetching(false)
      }
    }
    loadQueries()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ---- Submit new query ----
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const queryData = {
        farmerId:    user.id,
        farmerName:  user.name,
        title:       formData.title,
        description: formData.description,
      }
      await createQuery(queryData)
      toast.success("Query Submitted Successfully ✅")

      // Re-fetch updated list after submission
      const updatedQueries = await getQueriesByFarmer(user.id)
      setQueries(updatedQueries)
      setFormData({ title: "", description: "" })
    } catch (error) {
      console.error(error)
      toast.error("Failed To Submit Query ❌")
    } finally {
      setLoading(false)
    }
  }

  // ---- Derived stats from queries array ----
  const totalQueries    = queries.length
  const resolvedQueries = queries.filter((q) => q.status === "RESOLVED").length
  const pendingQueries  = queries.filter((q) => q.status === "PENDING").length

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <FarmerSidebar />

      <div className="flex-1 flex flex-col">

        {/* ---- Welcome Banner ---- */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-8 right-32 w-24 h-24 bg-amber-400/10 rounded-full" />

          <div className="relative z-10">
            <p className="text-green-300 text-sm font-medium mb-1">Good day 🌱</p>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome, {user.name}
            </h1>
            <p className="text-green-200 text-sm mt-1">
              Manage your agriculture queries and track officer responses here.
            </p>
          </div>
        </div>

        {/* ---- Main Content ---- */}
        <div className="flex-1 p-8 space-y-8">

          {/* ---- Stats Cards ---- */}
          <div className="grid md:grid-cols-3 gap-5">
            <StatsCard
              icon={<FaClipboardList />}
              label="Total Queries"
              value={totalQueries}
              color="green"
            />
            <StatsCard
              icon={<FaCheckCircle />}
              label="Resolved"
              value={resolvedQueries}
              color="green"
            />
            <StatsCard
              icon={<FaClock />}
              label="Pending"
              value={pendingQueries}
              color="yellow"
            />
          </div>

          {/* ---- Query Submission Form ---- */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2.5 rounded-xl">
                <FaPaperPlane className="text-green-700 text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Submit New Query
                </h2>
                <p className="text-gray-400 text-xs">
                  Describe your agriculture problem and get expert help
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="title"
                placeholder="Query title (e.g. Crop disease in wheat field)"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
              />

              <textarea
                name="description"
                rows="4"
                placeholder="Describe your issue in detail — soil type, crop variety, symptoms, region..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition shadow-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 shadow-green-200"
                }`}
              >
                <FaPaperPlane className="text-xs" />
                {loading ? "Submitting..." : "Submit Query"}
              </button>

            </form>
          </div>

          {/* ---- My Queries List ---- */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">My Queries</h2>
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                {totalQueries} total
              </span>
            </div>

            {fetching ? (
              <LoadingSpinner message="Loading your queries..." />
            ) : queries.length === 0 ? (
              <EmptyState
                icon="🌱"
                message="No queries submitted yet"
                subtext="Use the form above to submit your first agriculture question"
              />
            ) : (
              <div className="space-y-4">
                {queries.map((query) => (
                  <QueryCard
                    key={query.id}
                    query={query}
                    accentColor="green"
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard
