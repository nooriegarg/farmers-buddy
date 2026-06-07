import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar  from "../../components/FarmerSidebar"
import QueryCard      from "../../components/QueryCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { createQuery, getQueriesByFarmer, deleteQuery } from "../../services/queryService"

import { FaPaperPlane, FaPlus } from "react-icons/fa"

function MyQueries() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [queries, setQueries]     = useState([])
  const [fetching, setFetching]   = useState(true)
  const [posting, setPosting]     = useState(false)
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState({ title: "", description: "" })

  useEffect(() => {
    getQueriesByFarmer(user.id)
      .then(setQueries)
      .catch(console.error)
      .finally(() => setFetching(false))
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setPosting(true)
    try {
      const newQuery = await createQuery({
        farmerId:    user.id,
        farmerName:  user.name,
        title:       form.title,
        description: form.description,
      })
      toast.success("Query submitted ✅")
      setQueries([newQuery, ...queries])
      setForm({ title: "", description: "" })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to submit query ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this query? This cannot be undone.")) return
    try {
      await deleteQuery(id)
      toast.success("Query deleted ✅")
      setQueries(queries.filter((q) => q.id !== id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete ❌")
    }
  }

  const pending  = queries.filter((q) => q.status === "PENDING").length
  const resolved = queries.filter((q) => q.status === "RESOLVED").length

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <FarmerSidebar />

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-green-300 text-sm font-medium mb-1">Support Center</p>
            <h1 className="text-3xl font-extrabold text-white">My Queries ❓</h1>
            <p className="text-green-200 text-sm mt-1">
              Submit agriculture questions and track responses from officers and experts.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          {/* Header row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Query Management</h2>
              {!fetching && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {queries.length} total · {resolved} resolved · {pending} pending
                </p>
              )}
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 text-white rounded-xl text-sm font-bold transition shadow-md"
            >
              <FaPlus className="text-xs" />
              {showForm ? "Cancel" : "New Query"}
            </button>
          </div>

          {/* Submission form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-green-100 p-2.5 rounded-xl">
                  <FaPaperPlane className="text-green-700 text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Submit New Query</h3>
                  <p className="text-xs text-gray-400">Describe your agriculture problem in detail</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Query title (e.g. Crop disease in wheat field)"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe your issue — soil type, crop variety, symptoms, region..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 resize-none"
                />
                <button
                  type="submit"
                  disabled={posting}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition shadow-md ${
                    posting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800"
                  }`}
                >
                  <FaPaperPlane className="text-xs" />
                  {posting ? "Submitting..." : "Submit Query"}
                </button>
              </form>
            </div>
          )}

          {/* Queries list */}
          {fetching ? (
            <LoadingSpinner message="Loading your queries..." />
          ) : queries.length === 0 ? (
            <EmptyState
              icon="🌱"
              message="No queries submitted yet"
              subtext="Click 'New Query' above to submit your first agriculture question"
            />
          ) : (
            <div className="space-y-4">
              {queries.map((query) => (
                <QueryCard
                  key={query.id}
                  query={query}
                  accentColor="green"
                  onDelete={() => handleDelete(query.id)}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default MyQueries
