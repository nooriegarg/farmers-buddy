import { useEffect, useState } from "react"

import toast from "react-hot-toast"

import { motion } from "framer-motion"


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

  const user = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [queries, setQueries] = useState([])

  const [loading, setLoading] = useState(false)

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

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const queryData = {
        farmerName: user.name,
        title: formData.title,
        description: formData.description,
      }

      await createQuery(queryData)

      toast.success("Query Submitted Successfully ✅")

      const updatedQueries =
        await getQueriesByFarmer(user.name)

      setQueries(updatedQueries)

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

  const totalQueries = queries.length

  const resolvedQueries =
    queries.filter(
      (q) => q.status === "RESOLVED"
    ).length

  const pendingQueries =
    queries.filter(
      (q) => q.status === "PENDING"
    ).length

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-green-800 text-white p-8">

        <h1 className="text-3xl font-bold mb-12">
          Farmers Buddy 🌾
        </h1>

        <div className="space-y-6 text-lg">

          <div className="bg-green-700 p-4 rounded-xl">
            Dashboard
          </div>

          <div className="hover:bg-green-700 p-4 rounded-xl transition cursor-pointer">
            My Queries
          </div>

          <div className="hover:bg-green-700 p-4 rounded-xl transition cursor-pointer">
            Recommendations
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Welcome, {user.name} 🌱
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

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

        {/* Query Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Ask Agriculture Query
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Query Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="description"
              rows="5"
              placeholder="Describe your issue..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

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

        {/* Query List */}
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

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-green-700">
                    {query.title}
                  </h3>

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

                <p className="text-gray-700 mt-4">
                  {query.description}
                </p>

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