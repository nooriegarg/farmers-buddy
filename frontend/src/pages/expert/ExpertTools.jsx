import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import ExpertSidebar  from "../../components/ExpertSidebar"
import ToolCard       from "../../components/ToolCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllTools, addTool, deleteTool } from "../../services/toolService"

import { FaTools, FaPlus } from "react-icons/fa"

function ExpertTools() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [myTools, setMyTools]   = useState([])
  const [fetching, setFetching] = useState(true)
  const [posting, setPosting]   = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: "", category: "Cultivation", description: "",
    imageUrl: "", price: "", addedBy: user?.name || "",
    brand: "", sourceUrl: ""
  })

  // Load all tools then filter to just this expert's uploads
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTools()
        setMyTools(data.filter((t) => t.addedBy === user.name))
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
    if (!form.name.trim() || !form.description.trim()) return
    setPosting(true)
    try {
      await addTool(form)
      toast.success("Tool uploaded ✅")
      const updated = await getAllTools()
      setMyTools(updated.filter((t) => t.addedBy === user.name))
      setForm({ name: "", category: "Cultivation", description: "", imageUrl: "", price: "", addedBy: user?.name || "", brand: "", sourceUrl: "" })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to upload tool ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTool(id)
      toast.success("Tool removed ✅")
      setMyTools(myTools.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to remove tool ❌")
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
            <h1 className="text-3xl font-extrabold text-white">Upload Farming Tools 🛠️</h1>
            <p className="text-violet-200 text-sm mt-1">
              List farming equipment for farmers to discover and use.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          {/* Add tool button */}
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-800 text-white rounded-xl text-sm font-bold transition shadow-md"
            >
              <FaPlus className="text-xs" />
              {showForm ? "Cancel" : "Add New Tool"}
            </button>

            {showForm && (
              <form onSubmit={handleAdd} className="mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 max-w-2xl">

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-violet-100 p-2.5 rounded-xl">
                    <FaTools className="text-violet-700 text-lg" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Add New Tool</h2>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text" name="name" placeholder="Tool name (e.g. Tractor)"
                    value={form.name} onChange={handleChange} required
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                  />
                  <select
                    name="category" value={form.category} onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                  >
                    <option>Cultivation</option>
                    <option>Irrigation</option>
                    <option>Analysis</option>
                    <option>Sowing</option>
                    <option>Precision Farming</option>
                    <option>Harvesting</option>
                    <option>Protection</option>
                  </select>
                </div>

                <textarea
                  name="description" rows="3" placeholder="Tool description and usage..."
                  value={form.description} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 resize-none"
                />

                <div className="flex gap-3">
                  <input
                    type="text" name="price" placeholder="Price (e.g. ₹50,000)"
                    value={form.price} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                  />
                  <input
                    type="text" name="brand" placeholder="Brand (e.g. Mahindra)"
                    value={form.brand} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    type="text" name="imageUrl" placeholder="Image URL (optional)"
                    value={form.imageUrl} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                  />
                  <input
                    type="text" name="sourceUrl" placeholder="Buy link (optional)"
                    value={form.sourceUrl} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50"
                  />
                </div>

                <button
                  type="submit" disabled={posting}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                    posting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-800"
                  }`}
                >
                  {posting ? "Uploading..." : "Upload Tool"}
                </button>
              </form>
            )}
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">My Uploaded Tools</h2>
            {!fetching && (
              <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-3 py-1 rounded-full">
                {myTools.length} tools
              </span>
            )}
          </div>

          {/* Tools grid */}
          {fetching ? (
            <LoadingSpinner message="Loading your tools..." />
          ) : myTools.length === 0 ? (
            <EmptyState
              icon="🛠️"
              message="No tools uploaded yet"
              subtext="Click 'Add New Tool' to list your first farming equipment"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {myTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isAdmin={true}
                  onDelete={() => handleDelete(tool.id)}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ExpertTools
