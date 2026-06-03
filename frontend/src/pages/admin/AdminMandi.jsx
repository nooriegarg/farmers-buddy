import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import AdminSidebar   from "../../components/AdminSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllMandiPrices, addMandiPrice, deleteMandiPrice } from "../../services/mandiService"

import { FaRupeeSign, FaPlus, FaTrash } from "react-icons/fa"

function AdminMandi() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [prices, setPrices]     = useState([])
  const [fetching, setFetching] = useState(true)
  const [posting, setPosting]   = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    cropName: "", marketName: "", price: "", unit: "per quintal",
    state: "", lastUpdated: "", publishedBy: user?.name || ""
  })

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllMandiPrices()
        setPrices(data)
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
    if (!form.cropName.trim() || !form.price.trim()) return
    setPosting(true)
    try {
      const today = new Date().toISOString().split("T")[0]
      await addMandiPrice({ ...form, lastUpdated: form.lastUpdated || today })
      toast.success("Mandi price published ✅")
      const updated = await getAllMandiPrices()
      setPrices(updated)
      setForm({ cropName: "", marketName: "", price: "", unit: "per quintal", state: "", lastUpdated: "", publishedBy: user?.name || "" })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to publish price ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteMandiPrice(id)
      toast.success("Price entry removed ✅")
      setPrices(prices.filter((p) => p.id !== id))
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
            <h1 className="text-3xl font-extrabold text-white">Mandi Prices 💰</h1>
            <p className="text-red-200 text-sm mt-1">
              Publish and manage current crop market prices across India.
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
              {showForm ? "Cancel" : "Add Mandi Price"}
            </button>

            {showForm && (
              <form onSubmit={handleAdd} className="mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 max-w-2xl">

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-red-100 p-2.5 rounded-xl">
                    <FaRupeeSign className="text-red-700 text-lg" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Publish New Price Entry</h2>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text" name="cropName" placeholder="Crop name (e.g. Wheat)"
                    value={form.cropName} onChange={handleChange} required
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                  <input
                    type="text" name="marketName" placeholder="Market name (e.g. Azadpur Mandi)"
                    value={form.marketName} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    type="text" name="price" placeholder="Price (e.g. ₹2,100)"
                    value={form.price} onChange={handleChange} required
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                  <select
                    name="unit" value={form.unit} onChange={handleChange}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  >
                    <option value="per quintal">per quintal</option>
                    <option value="per kg">per kg</option>
                    <option value="per tonne">per tonne</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text" name="state" placeholder="State (e.g. Punjab)"
                    value={form.state} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                  />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Last Updated</label>
                    <input
                      type="date" name="lastUpdated"
                      value={form.lastUpdated} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={posting}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                    posting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800"
                  }`}
                >
                  {posting ? "Publishing..." : "Publish Price"}
                </button>
              </form>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading mandi prices..." />
          ) : prices.length === 0 ? (
            <EmptyState icon="💰" message="No mandi prices yet" subtext="Use the button above to add today's market prices" />
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Current Market Prices</h2>
                <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
                  {prices.length} entries
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Crop</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Market</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Price</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">State</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Last Updated</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {prices.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">{p.cropName}</td>
                        <td className="px-6 py-4 text-gray-600">{p.marketName || "—"}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 font-bold text-red-700">
                            <FaRupeeSign className="text-xs" />
                            {p.price}
                          </span>
                          <span className="text-xs text-gray-400 ml-1">{p.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{p.state || "—"}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{p.lastUpdated || "—"}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-lg px-2.5 py-1 transition"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminMandi
