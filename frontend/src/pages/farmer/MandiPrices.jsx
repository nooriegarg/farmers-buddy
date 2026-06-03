import { useEffect, useState } from "react"

import FarmerSidebar  from "../../components/FarmerSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllMandiPrices } from "../../services/mandiService"

import { FaRupeeSign } from "react-icons/fa"

function MandiPrices() {

  const [prices, setPrices]     = useState([])
  const [fetching, setFetching] = useState(true)

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
            <p className="text-green-300 text-sm font-medium mb-1">Market Information</p>
            <h1 className="text-3xl font-extrabold text-white">Mandi Prices 💰</h1>
            <p className="text-green-200 text-sm mt-1">
              Current crop market prices across India's major mandis.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          {fetching ? (
            <LoadingSpinner message="Loading mandi prices..." />
          ) : prices.length === 0 ? (
            <EmptyState
              icon="💰"
              message="No mandi prices published yet"
              subtext="Admin will publish current market prices here"
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Current Market Prices</h2>
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {prices.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">{p.cropName}</td>
                        <td className="px-6 py-4 text-gray-600">{p.marketName || "—"}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 font-bold text-green-700">
                            <FaRupeeSign className="text-xs" />
                            {p.price}
                          </span>
                          <span className="text-xs text-gray-400 ml-1">{p.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{p.state || "—"}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{p.lastUpdated || "—"}</td>
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

export default MandiPrices
