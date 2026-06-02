// =============================================================
// OfficerDashboard.jsx — Agriculture Officer's Dashboard Page
// =============================================================
// The primary workspace for logged-in OFFICER users.
// Provides the following capabilities:
//   1. View all farmer queries (from all farmers) with stats overview
//   2. Search queries by title keyword
//   3. Filter queries by status (ALL / PENDING / RESOLVED)
//   4. Submit replies to pending queries
//
// Data Flow:
//   - On mount: useEffect fetches ALL queries via GET /api/queries
//   - On reply: PUT /api/queries/{id}/reply → backend sets officerReply + status "RESOLVED"
//   - After reply: re-fetches updated query list to reflect the resolved status
//
// State Management (React Hooks):
//   - queries      : full list of all farmer queries from backend
//   - replyText    : object map { queryId: replyString } — tracks per-query reply input
//   - searchTerm   : string used to filter queries by title
//   - filterStatus : "ALL" | "PENDING" | "RESOLVED" — dropdown filter value
//
// Filtering Logic:
//   filteredQueries = queries where title matches searchTerm AND status matches filterStatus
// =============================================================

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { motion } from "framer-motion"

import { useNavigate } from "react-router-dom"

import {
  getAllQueries,
  replyToQuery
} from "../services/queryService"

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock
} from "react-icons/fa"

function OfficerDashboard() {

  const navigate = useNavigate()

  // Read the logged-in officer's details from localStorage
  const user = JSON.parse(localStorage.getItem("user"))

  // -------------------------
  // State Declarations
  // -------------------------

  // Full list of all farmer queries
  const [queries, setQueries] = useState([])

  // Tracks reply text for each query individually by query ID
  const [replyText, setReplyText] = useState({})

  // Search and filter state for the query list
  const [searchTerm, setSearchTerm] = useState("")
const [filterStatus, setFilterStatus] = useState("ALL")

  // -------------------------
  // Load All Queries on Mount
  // -------------------------
  // Officers see every farmer's queries, unlike farmers who see only their own.
  useEffect(() => {

    const loadQueries = async () => {

      try {

        const data = await getAllQueries()

        setQueries(data)

      } catch (error) {

        console.error(error)
      }
    }

    loadQueries()

  }, [])

  // -------------------------
  // Handle Officer Reply Submission
  // -------------------------
  // Sends the reply for a specific query using its ID.
  // On success, refetches the full query list to update the UI.
  const handleReply = async (queryId) => {

    try {

      // Build the reply payload from the per-query replyText state
      const replyData = {
        officerReply: replyText[queryId]
      }

      await replyToQuery(queryId, replyData)

      toast.success("Reply Submitted ✅")

      // Reload all queries to reflect the updated status (RESOLVED)
      const updatedQueries =
        await getAllQueries()

      setQueries(updatedQueries)

    } catch (error) {

      console.error(error)

      toast.success("Failed To Submit Reply ❌")
    }
  }

  // -------------------------
  // Dashboard Statistics
  // -------------------------
  // Computed from the full queries array — counts totals, resolved, and pending
  const totalQueries = queries.length

  const resolvedQueries =
    queries.filter(
      (q) => q.status === "RESOLVED"
    ).length

  const pendingQueries =
    queries.filter(
      (q) => q.status === "PENDING"
    ).length

  // -------------------------
  // Search + Filter Logic
  // -------------------------
  // Applies both search and status filter simultaneously.
  // matchesSearch: true if the query title contains the search keyword (case-insensitive)
  // matchesStatus: true if filterStatus is "ALL" or matches the query's status exactly
    const filteredQueries = queries.filter((query) => {

  const matchesSearch =
    query.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

  const matchesStatus =
    filterStatus === "ALL"
      ? true
      : query.status === filterStatus

  return matchesSearch && matchesStatus
})

  // -------------------------
  // Render
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ----------------------------- */}
      {/* Inline Officer Sidebar        */}
      {/* ----------------------------- */}
      <div className="w-72 bg-blue-800 text-white p-8">

        <h1 className="text-3xl font-bold mb-12">
          Officer Panel 👨‍🌾
        </h1>

        <div className="space-y-6 text-lg">

          {/* Active dashboard indicator */}
          <div className="bg-blue-700 p-4 rounded-xl">
            Dashboard
          </div>

          {/* Navigate to Farmer Queries view */}
          <button
          onClick={() =>
            navigate("/officer-dashboard")
          }
          className="w-full text-left hover:bg-blue-700 p-4 rounded-xl transition cursor-pointer"
        >
          Farmer Queries
        </button>

          {/* Navigate to crop recommendations */}
          <button
          onClick={() =>
            navigate("/recommendations")
          }
          className="w-full text-left hover:bg-blue-700 p-4 rounded-xl transition cursor-pointer"
        >
          Recommendations
        </button>

        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          Welcome, {user.name} 👨‍🌾
        </h1>

        {/* ----------------------------- */}
        {/* Stats Cards Row               */}
        {/* ----------------------------- */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* Total Queries */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">

            <div>
              <p className="text-gray-500">
                Total Queries
              </p>

              <h2 className="text-4xl font-bold text-blue-700 mt-2">
                {totalQueries}
              </h2>
            </div>

            <FaClipboardList className="text-5xl text-blue-600" />
          </div>

          {/* Resolved Queries */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">

            <div>
              <p className="text-gray-500">
                Resolved
              </p>

              <h2 className="text-4xl font-bold text-green-700 mt-2">
                {resolvedQueries}
              </h2>
            </div>

            <FaCheckCircle className="text-5xl text-green-600" />
          </div>

          {/* Pending Queries */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">

            <div>
              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-4xl font-bold text-yellow-600 mt-2">
                {pendingQueries}
              </h2>
            </div>

            <FaClock className="text-5xl text-yellow-500" />
          </div>

        </div>

        {/* ----------------------------- */}
        {/* Farmer Queries Section        */}
        {/* ----------------------------- */}
        <div>

          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Farmer Queries
          </h2>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Text search — filters by query title */}
        <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) =>
            setSearchTerm(e.target.value)
            }
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status filter dropdown — ALL / PENDING / RESOLVED */}
        <select
            value={filterStatus}
            onChange={(e) =>
            setFilterStatus(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="ALL">All Queries</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
        </select>

        </div>

          {/* Query Cards List — renders filteredQueries */}
          <div className="grid gap-6">

            {filteredQueries.length > 0 ? (

              filteredQueries.map((query) => (

                <motion.div
                        key={query.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{
                            scale: 1.01,
                            y: -2,
                        }}
                        className="bg-white p-6 rounded-2xl shadow-lg"
                >

                  {/* Query header: title + farmer name badge */}
                  <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-bold text-blue-700">
                      {query.title}
                    </h3>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {query.farmerName}
                    </span>

                  </div>

                  {/* Query description */}
                  <p className="text-gray-700 mt-4">
                    {query.description}
                  </p>

                  {/* Status badge */}
                  <div className="mt-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        query.status === "RESOLVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {query.status}
                    </span>

                  </div>

                  {/* Conditional: show existing reply OR reply input form */}
                  {query.officerReply ? (

                    // Display the existing officer reply (query already resolved)
                    <div className="bg-green-50 border border-green-200 mt-5 p-5 rounded-xl">

                      <h4 className="font-bold text-green-700 mb-2">
                        Officer Reply
                      </h4>

                      <p className="text-gray-700">
                        {query.officerReply}
                      </p>

                    </div>

                  ) : (

                    // Show reply form for PENDING queries
                    <div className="mt-5">

                      {/* Per-query reply textarea — tracked in replyText state map */}
                      <textarea
                        rows="3"
                        placeholder="Write your reply..."
                        onChange={(e) =>
                          setReplyText({
                            ...replyText,
                            [query.id]: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button
                        onClick={() =>
                          handleReply(query.id)
                        }
                        className="mt-3 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                      >
                        Submit Reply
                      </button>

                    </div>
                  )}

               </motion.div>
              ))

            ) : (

              // Empty state — shown when no queries match the current filter/search
              <div className="bg-white p-6 rounded-2xl shadow-lg text-gray-500">
                No queries available.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default OfficerDashboard
