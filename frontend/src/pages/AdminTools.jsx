import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import AdminSidebar   from "../components/AdminSidebar"
import ToolCard       from "../components/ToolCard"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState     from "../components/EmptyState"

import { getAllTools, addTool, deleteTool } from "../services/toolService"

import { FaTools, FaPlus } from "react-icons/fa"

function AdminTools() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [tools, setTools]       = useState([])
  const [fetching, setFetching] = useState(true)
  const [posting, setPosting]   = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: "", category: "Cultivation", description: "",
    imageUrl: "", price: "", addedBy: user?.name || ""
  })

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTools()
        setTools(data)
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
      toast.success("Tool added to catalog ✅")
      const updated = await getAllTools()
      setTools(updated)
      setForm({ name: "", category: "Cultivation", description: "", imageUrl: "", price: "", addedBy: user?.name || "" })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to add tool ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTool(id)
      toast.success("Tool removed ✅")
      setTools(tools.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to remove tool ❌")
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
            <h1 className="text-3xl font-extrabold text-white">Resource Management 🛠️</h1>
            <p className="text-red-200 text-sm mt-1">
              Add, manage, and remove farming tools from the catalog.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 text-white rounded-xl text-sm font-bold transition shadow-md"
            >
              <FaPlus className="text-xs" />
              {showForm ? "Cancel" : "Add New Tool"}
            </button>

            {showForm && (
              <form onSubmit={handleAdd} className="mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 max-w-2xl">

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-red-100 p-2.5 rounded-xl">
                    <FaTools className="text-red-700 text-lg" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Add New Tool</h2>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text" name="name" placeholder="Tool name (e.g. Tractor)"
                    value={form.name} onChange={handleChange} required
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                  <select
                    name="category" value={form.category} onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 resize-none"
                />

                <div className="flex gap-3">
                  <input
                    type="text" name="price" placeholder="Price (e.g. ₹50,000)"
                    value={form.price} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                  <input
                    type="text" name="imageUrl" placeholder="Image URL (optional)"
                    value={form.imageUrl} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                </div>

                <button
                  type="submit" disabled={posting}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                    posting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800"
                  }`}
                >
                  {posting ? "Adding..." : "Add Tool"}
                </button>
              </form>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading tools catalog..." />
          ) : tools.length === 0 ? (
            <EmptyState icon="🛠️" message="No tools in the catalog yet" subtext="Use the button above to add farming equipment" />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {tools.map((tool) => (
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

export default AdminTools
