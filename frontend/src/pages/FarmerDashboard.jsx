// =============================================================
// FarmerDashboard.jsx — Farmer's Main Dashboard Page
// =============================================================
// The primary workspace for logged-in FARMER users.
// Provides two core features:
//   1. Submit a new agriculture query
//   2. View all previously submitted queries with their status and officer replies
//
// Data Flow:
//   - On mount: useEffect fetches farmer's queries via GET /api/queries/farmer/{id}
//   - On submit: POST /api/queries → backend saves query with status "PENDING"
//   - After submit: re-fetches updated query list to reflect the new entry
//
// State Management (React Hooks):
//   - formData   : controlled form fields (title, description)
//   - queries    : array of Query objects fetched from backend
//   - loading    : boolean to disable the submit button while API call is in progress
//
// Stats Calculation:
//   - totalQueries   : queries.length
//   - resolvedQueries: queries filtered by status === "RESOLVED"
//   - pendingQueries : queries filtered by status === "PENDING"
// =============================================================

import { useEffect, useState } from "react"

import toast from "react-hot-toast"

import { motion } from "framer-motion"

//import { useNavigate } from "react-router-dom"

import FarmerSidebar from "../components/FarmerSidebar"

import {
  createQuery,
  getQueriesByFarmer
} from "../services/queryService"

import {
  FaCheckCircle,
  FaClock,
  FaClipboardList
} from "react-icons/fa"

function FarmerDashboard() {

  //const navigate = useNavigate()

  // Read the logged-in farmer's details from localStorage
  const user = JSON.parse(localStorage.getItem("user"))

  // -------------------------
  // State Declarations
  // -------------------------

  // Controlled form state for query submission
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  // Array of queries belonging to the logged-in farmer
  const [queries, setQueries] = useState([])

  // Loading state to prevent duplicate submissions
  const [loading, setLoading] = useState(false)

  // -------------------------
  // Load Farmer's Queries on Mount
  // -------------------------
  // useEffect runs once after the component mounts (empty dependency array []).
  // Fetches queries filtered by the farmer's name from the backend.
  useEffect(() => {

    const loadQueries = async () => {

      try {

        const response =
          await getQueriesByFarmer(user.name)

        setQueries(response)

      } catch (error) {

        console.error(error)
      }
    }

    loadQueries()

  }, [])

  // -------------------------
  // Handle Form Input Changes
  // -------------------------
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // -------------------------
  // Handle Query Submission
  // -------------------------
  // Builds the query payload, calls the API, refreshes the query list,
  // and resets the form on success.
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      // Build the query object with farmer identity and form data
      const queryData = {
          farmerId: user.id,
          farmerName: user.name,
          title: formData.title,
          description: formData.description,
        }

      await createQuery(queryData)

      toast.success("Query Submitted Successfully ✅")

      // Re-fetch updated queries list after submission
      const updatedQueries =
        await getQueriesByFarmer(user.id)

      setQueries(updatedQueries)

      // Clear the form fields
      setFormData({
        title: "",
        description: "",
      })

    } catch (error) {

      console.error(error)

      toast.success("Failed To Submit Query ❌")
    } finally {

        setLoading(false)
    }
  }

  // -------------------------
  // Dashboard Statistics
  // -------------------------
  // Derived from the queries array — no separate API call needed
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
  // Render
  // -------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar navigation for farmer pages */}
      <FarmerSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Welcome, {user.name} 🌱
        </h1>

        {/* ----------------------------- */}
        {/* Stats Cards Row               */}
        {/* ----------------------------- */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* Total Queries Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">

            <div>
              <p className="text-gray-500">
                Total Queries
              </p>

              <h2 className="text-4xl font-bold text-green-700 mt-2">
                {totalQueries}
              </h2>
            </div>

            <FaClipboardList className="text-5xl text-green-600" />
          </div>

          {/* Resolved Queries Card */}
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

          {/* Pending Queries Card */}
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
        {/* Query Submission Form         */}
        {/* ----------------------------- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Ask Agriculture Query
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Query title input */}
            <input
              type="text"
              name="title"
              placeholder="Query Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Query description textarea */}
            <textarea
              name="description"
              rows="5"
              placeholder="Describe your issue..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Submit button — disabled with visual feedback while loading */}
            <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
                    loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                }`}
                >
                {loading ? "Submitting..." : "Submit Query"}
            </button>

          </form>
        </div>

        {/* ----------------------------- */}
        {/* My Queries List               */}
        {/* ----------------------------- */}
        {/* Renders each query as an animated card.
            Framer Motion adds a fade-in + slide-up animation on load
            and a subtle hover lift effect. */}
        <div>

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            My Queries
          </h2>

          <div className="grid gap-6">

            {queries.map((query) => (

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

                {/* Query header: title + status badge */}
                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-green-700">
                    {query.title}
                  </h3>

                  {/* Status badge: green for RESOLVED, yellow for PENDING */}
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

                {/* Query description text */}
                <p className="text-gray-700 mt-4">
                  {query.description}
                </p>

                {/* Officer reply section — only shown if officerReply is not null */}
                {query.officerReply && (

                  <div className="bg-green-50 border border-green-200 mt-5 p-5 rounded-xl">

                    <h4 className="font-bold text-green-700 mb-2">
                      Officer Reply
                    </h4>

                    <p className="text-gray-700">
                      {query.officerReply}
                    </p>

                  </div>
                )}

              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}

export default FarmerDashboard
