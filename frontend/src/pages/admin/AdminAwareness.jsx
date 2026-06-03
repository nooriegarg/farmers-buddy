import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import AdminSidebar   from "../../components/AdminSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllAwarenessDrives, createAwarenessDrive, deleteAwarenessDrive } from "../../services/awarenessService"

import { FaBullhorn, FaRupeeSign, FaShieldAlt, FaLeaf, FaTrash, FaPlus } from "react-icons/fa"

const categoryStyle = {
  Scheme: { bg: "bg-gradient-to-br from-green-600 to-green-500",   tag: "bg-green-100 text-green-700"  },
  Tip:    { bg: "bg-gradient-to-br from-amber-600 to-amber-500",   tag: "bg-amber-100 text-amber-700"  },
  Alert:  { bg: "bg-gradient-to-br from-red-600 to-red-500",       tag: "bg-red-100 text-red-700"      },
}
const defaultStyle = { bg: "bg-gradient-to-br from-blue-600 to-blue-500", tag: "bg-blue-100 text-blue-700" }

const categoryIcon = {
  Scheme: <FaRupeeSign />,
  Tip:    <FaLeaf />,
  Alert:  <FaShieldAlt />,
}

function AdminAwareness() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [drives, setDrives]     = useState([])
  const [fetching, setFetching] = useState(true)
  const [posting, setPosting]   = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    title: "", description: "", category: "Scheme",
    imageUrl: "", publishedBy: user?.name || ""
  })

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllAwarenessDrives()
        setDrives(data)
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    setPosting(true)
    try {
      const today = new Date().toISOString().split("T")[0]
      await createAwarenessDrive({ ...form, createdDate: today })
      toast.success("Awareness drive published ✅")
      const updated = await getAllAwarenessDrives()
      setDrives(updated)
      setForm({ title: "", description: "", category: "Scheme", imageUrl: "", publishedBy: user?.name || "" })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to publish drive ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAwarenessDrive(id)
      toast.success("Drive removed ✅")
      setDrives(drives.filter((d) => d.id !== id))
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
            <h1 className="text-3xl font-extrabold text-white">Platform Awareness 📢</h1>
            <p className="text-red-200 text-sm mt-1">
              Manage awareness drives, schemes, tips, and alerts.
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
              {showForm ? "Cancel" : "Publish New Drive"}
            </button>

            {showForm && (
              <form onSubmit={handleCreate} className="mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 max-w-2xl">

                <h2 className="text-lg font-bold text-gray-800 mb-2">New Awareness Drive</h2>

                <input
                  type="text" name="title" placeholder="Drive title / Scheme name"
                  value={form.title} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                />

                <textarea
                  name="description" rows="3" placeholder="Detailed description..."
                  value={form.description} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 resize-none"
                />

                <div className="flex gap-3">
                  <select
                    name="category" value={form.category} onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  >
                    <option value="Scheme">Scheme</option>
                    <option value="Tip">Tip</option>
                    <option value="Alert">Alert</option>
                  </select>

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
                  {posting ? "Publishing..." : "Publish Drive"}
                </button>
              </form>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading awareness drives..." />
          ) : drives.length === 0 ? (
            <EmptyState icon="📢" message="No awareness drives yet" subtext="Publish a new drive using the button above" />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {drives.map((drive) => {
                const style = categoryStyle[drive.category] || defaultStyle
                const icon  = categoryIcon[drive.category] || <FaBullhorn />
                return (
                  <div key={drive.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`${style.bg} px-5 py-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl text-white text-lg">{icon}</div>
                        <div>
                          <h3 className="text-white font-bold">{drive.title}</h3>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 ${style.tag}`}>
                            {drive.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {drive.imageUrl && (
                      <img src={drive.imageUrl} alt={drive.title} className="w-full h-40 object-cover" />
                    )}

                    <div className="p-5">
                      <p className="text-sm text-gray-600 leading-relaxed">{drive.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          {drive.publishedBy && (
                            <p className="text-xs text-gray-400">
                              By <span className="font-semibold text-gray-500">{drive.publishedBy}</span>
                              {drive.createdDate && <span className="ml-2">· {drive.createdDate}</span>}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(drive.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-2.5 py-1.5 transition"
                        >
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminAwareness
