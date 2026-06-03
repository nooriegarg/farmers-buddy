// =============================================================
// OfficerDashboard.jsx — Agriculture Officer Dashboard (Enhanced)
// =============================================================
// Uses StatsCard, QueryCard, EmptyState, LoadingSpinner components.
// - Stats: all queries across all farmers
// - Search by title + filter by status (ALL / PENDING / RESOLVED)
// - Reply form per query via QueryCard
// =============================================================

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import OfficerSidebar from "../components/OfficerSidebar"
import StatsCard      from "../components/StatsCard"
import QueryCard      from "../components/QueryCard"
import EmptyState     from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

import { getAllQueries, replyToQuery } from "../services/queryService"

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
} from "react-icons/fa"

function OfficerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"))

  // ---- State ----
  const [queries, setQueries]         = useState([])
  const [replyText, setReplyText]     = useState({})
  const [searchTerm, setSearchTerm]   = useState("")
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [fetching, setFetching]       = useState(true)

  // ---- Load all queries on mount ----
  useEffect(() => {
    const loadQueries = async () => {
      try {
        const data = await getAllQueries()
        setQueries(data)
      } catch (error) {
        console.error(error)
      } finally {
        setFetching(false)
      }
    }
    loadQueries()
  }, [])

  // ---- Officer submits reply ----
  const handleReply = async (queryId) => {
    if (!replyText[queryId]?.trim()) {
      toast.error("Please write a reply before submitting")
      return
    }
    try {
      const replyData = { officerReply: replyText[queryId] }
      await replyToQuery(queryId, replyData)
      toast.success("Reply Submitted ✅")
      // Clear only this query's reply text
      setReplyText((prev) => ({ ...prev, [queryId]: "" }))
      const updatedQueries = await getAllQueries()
      setQueries(updatedQueries)
    } catch (error) {
      console.error(error)
      toast.error("Failed To Submit Reply ❌")
    }
  }

  // ---- Derived stats ----
  const totalQueries    = queries.length
  const resolvedQueries = queries.filter((q) => q.status === "RESOLVED").length
  const pendingQueries  = queries.filter((q) => q.status === "PENDING").length

  // ---- Search + filter ----
  const filteredQueries = queries.filter((query) => {
    const matchesSearch = query.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "ALL" ? true : query.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <OfficerSidebar />

      {/* ---- Main Content ---- */}
      <div className="flex-1 flex flex-col">

        {/* Welcome Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #2563eb 100%)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-8 right-32 w-24 h-24 bg-amber-400/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-blue-300 text-sm font-medium mb-1">Agriculture Officer</p>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome, {user.name}
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              Review and respond to farmer queries from your dashboard.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-8">

          {/* ---- Stats Cards ---- */}
          <div className="grid md:grid-cols-3 gap-5">
            <StatsCard icon={<FaClipboardList />} label="Total Queries"    value={totalQueries}    color="blue"   />
            <StatsCard icon={<FaCheckCircle />}   label="Resolved"         value={resolvedQueries} color="green"  />
            <StatsCard icon={<FaClock />}          label="Pending"          value={pendingQueries}  color="yellow" />
          </div>

          {/* ---- Query Section ---- */}
          <div>

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">Farmer Queries</h2>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">
                {filteredQueries.length} shown
              </span>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search queries by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>

              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-11 pr-6 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white appearance-none cursor-pointer"
                >
                  <option value="ALL">All Queries</option>
                  <option value="PENDING">Pending</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>

            </div>

            {/* Query Cards */}
            {fetching ? (
              <LoadingSpinner message="Loading queries..." />
            ) : filteredQueries.length === 0 ? (
              <EmptyState
                icon="🔍"
                message="No queries found"
                subtext={
                  searchTerm || filterStatus !== "ALL"
                    ? "Try adjusting your search or filter"
                    : "No queries have been submitted yet"
                }
              />
            ) : (
              <div className="space-y-4">
                {filteredQueries.map((query) => (
                  <QueryCard
                    key={query.id}
                    query={query}
                    showFarmerName={true}
                    accentColor="blue"
                    replyText={replyText[query.id] || ""}
                    onReplyChange={(text) =>
                      setReplyText({ ...replyText, [query.id]: text })
                    }
                    onReply={() => handleReply(query.id)}
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

export default OfficerDashboard
