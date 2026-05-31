import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { motion } from "framer-motion"

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

  const user = JSON.parse(localStorage.getItem("user"))

  const [queries, setQueries] = useState([])
  const [replyText, setReplyText] = useState({})

  const [searchTerm, setSearchTerm] = useState("")
const [filterStatus, setFilterStatus] = useState("ALL")

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

  const handleReply = async (queryId) => {

    try {

      const replyData = {
        officerReply: replyText[queryId]
      }

      await replyToQuery(queryId, replyData)

      toast.success("Reply Submitted ✅")

      const updatedQueries =
        await getAllQueries()

      setQueries(updatedQueries)

    } catch (error) {

      console.error(error)

      toast.success("Failed To Submit Reply ❌")
    }
  }

  const totalQueries = queries.length

  const resolvedQueries =
    queries.filter(
      (q) => q.status === "RESOLVED"
    ).length

  const pendingQueries =
    queries.filter(
      (q) => q.status === "PENDING"
    ).length

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

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-blue-800 text-white p-8">

        <h1 className="text-3xl font-bold mb-12">
          Officer Panel 👨‍🌾
        </h1>

        <div className="space-y-6 text-lg">

          <div className="bg-blue-700 p-4 rounded-xl">
            Dashboard
          </div>

          <div className="hover:bg-blue-700 p-4 rounded-xl transition cursor-pointer">
            Farmer Queries
          </div>


          <div className="hover:bg-blue-700 p-4 rounded-xl transition cursor-pointer">
            Recommendations
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          Welcome, {user.name} 👨‍🌾
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

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

        {/* Query Section */}
        <div>

          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Farmer Queries
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search */}
        <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) =>
            setSearchTerm(e.target.value)
            }
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter */}
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

                  <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-bold text-blue-700">
                      {query.title}
                    </h3>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {query.farmerName}
                    </span>

                  </div>

                  <p className="text-gray-700 mt-4">
                    {query.description}
                  </p>

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

                  {query.officerReply ? (

                    <div className="bg-green-50 border border-green-200 mt-5 p-5 rounded-xl">

                      <h4 className="font-bold text-green-700 mb-2">
                        Officer Reply
                      </h4>

                      <p className="text-gray-700">
                        {query.officerReply}
                      </p>

                    </div>

                  ) : (

                    <div className="mt-5">

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