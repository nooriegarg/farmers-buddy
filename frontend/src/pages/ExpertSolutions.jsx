import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import ExpertSidebar  from "../components/ExpertSidebar"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState     from "../components/EmptyState"

import { addSolution, getMySolutions, deleteSolution } from "../services/expertSolutionService"

import { FaLightbulb, FaPlus, FaTrash } from "react-icons/fa"

const categoryColor = {
  "Pest Control":  "bg-red-100 text-red-700",
  "Irrigation":    "bg-blue-100 text-blue-700",
  "Fertilizer":    "bg-green-100 text-green-700",
  "Crop Disease":  "bg-orange-100 text-orange-700",
  "Other":         "bg-gray-100 text-gray-700",
}

function ExpertSolutions() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [solutions, setSolutions] = useState([])
  const [fetching, setFetching]   = useState(true)
  const [posting, setPosting]     = useState(false)
  const [showForm, setShowForm]   = useState(false)

  const [form, setForm] = useState({
    title: "", description: "", category: "Pest Control",
    postedBy: user?.name || "", expertId: user?.id || 0
  })

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMySolutions(user.id)
        setSolutions(data)
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setPosting(true)
    try {
      const today = new Date().toISOString().split("T")[0]
      await addSolution({ ...form, createdDate: today })
      toast.success("Solution posted ✅")
      const updated = await getMySolutions(user.id)
      setSolutions(updated)
      setForm({ title: "", description: "", category: "Pest Control", postedBy: user?.name || "", expertId: user?.id || 0 })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to post solution ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteSolution(id)
      toast.success("Solution removed ✅")
      setSolutions(solutions.filter((s) => s.id !== id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <ExpertSidebar />

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #7c3aed 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-violet-300 text-sm font-medium mb-1">Expert Panel</p>
            <h1 className="text-3xl font-extrabold text-white">My Farming Solutions 💡</h1>
            <p className="text-violet-200 text-sm mt-1">
              Share farming tips, guides, and solutions with the community.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          {/* Add solution button */}
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-800 text-white rounded-xl text-sm font-bold transition shadow-md"
            >
              <FaPlus className="text-xs" />
              {showForm ? "Cancel" : "Post New Solution"}
            </button>

            {showForm && (
              <form onSubmit={handleAdd} className="mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 max-w-2xl">

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-violet-100 p-2.5 rounded-xl">
                    <FaLightbulb className="text-violet-700 text-lg" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">New Farming Solution</h2>
                </div>

                <input
                  type="text" name="title" placeholder="Solution title"
                  value={form.title} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                />

                <textarea
                  name="description" rows="4" placeholder="Describe the solution in detail..."
                  value={form.description} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 resize-none"
                />

                <select
                  name="category" value={form.category} onChange={handleChange}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                >
                  <option value="Pest Control">Pest Control</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Crop Disease">Crop Disease</option>
                  <option value="Other">Other</option>
                </select>

                <button
                  type="submit" disabled={posting}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                    posting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-800"
                  }`}
                >
                  {posting ? "Posting..." : "Post Solution"}
                </button>
              </form>
            )}
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">My Solutions</h2>
            {!fetching && (
              <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-3 py-1 rounded-full">
                {solutions.length} posted
              </span>
            )}
          </div>

          {/* Solutions grid */}
          {fetching ? (
            <LoadingSpinner message="Loading your solutions..." />
          ) : solutions.length === 0 ? (
            <EmptyState
              icon="💡"
              message="No solutions posted yet"
              subtext="Click 'Post New Solution' to share your farming expertise"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {solutions.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-base leading-snug">{s.title}</h3>
                      <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[s.category] || "bg-gray-100 text-gray-600"}`}>
                        {s.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="flex-shrink-0 flex items-center gap-1 text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-lg px-2.5 py-1.5 transition"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{s.description}</p>

                  {s.createdDate && (
                    <p className="text-xs text-gray-400 mt-3">{s.createdDate}</p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ExpertSolutions
