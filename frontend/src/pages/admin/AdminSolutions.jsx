import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import AdminSidebar   from "../../components/AdminSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllSolutions, deleteSolution } from "../../services/expertSolutionService"

import { FaLightbulb, FaTrash } from "react-icons/fa"

const categoryColor = {
  "Pest Control": "bg-red-100 text-red-700",
  "Irrigation":   "bg-blue-100 text-blue-700",
  "Fertilizer":   "bg-green-100 text-green-700",
  "Crop Disease": "bg-orange-100 text-orange-700",
  "Other":        "bg-gray-100 text-gray-700",
}

function AdminSolutions() {

  const [solutions, setSolutions] = useState([])
  const [fetching, setFetching]   = useState(true)

  useEffect(() => {
    getAllSolutions()
      .then(setSolutions)
      .catch(console.error)
      .finally(() => setFetching(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expert solution? This cannot be undone.")) return
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

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-red-300 text-sm font-medium mb-1">Admin Panel</p>
            <h1 className="text-3xl font-extrabold text-white">Expert Solutions 💡</h1>
            <p className="text-red-200 text-sm mt-1">
              View and moderate all expert-posted farming guidance on the platform.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">All Expert Solutions</h2>
            {!fetching && (
              <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
                {solutions.length} {solutions.length === 1 ? "solution" : "solutions"}
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading expert solutions..." />
          ) : solutions.length === 0 ? (
            <EmptyState
              icon="💡"
              message="No expert solutions posted yet"
              subtext="Agriculture experts post farming tips and guidance here"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {solutions.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">

                  {/* Header */}
                  <div className="bg-gradient-to-r from-violet-700 to-violet-600 px-5 py-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FaLightbulb className="text-amber-300 shrink-0" />
                        <h3 className="text-white font-bold text-sm leading-snug">{s.title}</h3>
                      </div>
                      <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full bg-white/20 text-white`}>
                        {s.category}
                      </span>
                    </div>
                    {s.postedBy && (
                      <p className="text-violet-200 text-xs mt-1">By {s.postedBy}</p>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{s.description}</p>

                    <div className="flex items-center justify-between mt-4">
                      {s.createdDate && (
                        <p className="text-xs text-gray-400">{s.createdDate}</p>
                      )}
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[s.category] || "bg-gray-100 text-gray-600"}`}>
                        {s.category}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="mt-4 flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition"
                    >
                      <FaTrash className="text-xs" />
                      Remove Solution
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSolutions
