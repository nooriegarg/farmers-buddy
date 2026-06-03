import { useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar from "../components/FarmerSidebar"
import LoadingSpinner from "../components/LoadingSpinner"

import { analyzeSoil } from "../services/soilAnalysisService"

import { FaFlask, FaCheckCircle } from "react-icons/fa"

function SoilAnalysis() {

  const [soilType, setSoilType] = useState("")
  const [region, setRegion]     = useState("")
  const [season, setSeason]     = useState("")
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!soilType || !region || !season) {
      toast.error("Please select all three fields")
      return
    }
    setLoading(true)
    try {
      const data = await analyzeSoil({ soilType, region, season })
      setResult(data)
    } catch (err) {
      console.error(err)
      toast.error("Analysis failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
            <p className="text-green-300 text-sm font-medium mb-1">Smart Farming Tool</p>
            <h1 className="text-3xl font-extrabold text-white">Soil Analysis 🌱</h1>
            <p className="text-green-200 text-sm mt-1">
              Get crop and fertilizer advice based on your soil type, region, and season.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8">

          <div className="max-w-2xl space-y-6">

            {/* Selection Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2.5 rounded-xl">
                  <FaFlask className="text-green-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Select Your Parameters</h2>
                  <p className="text-gray-400 text-xs">Choose all three fields to get a personalized recommendation</p>
                </div>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-4">

                {/* Soil Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Soil Type</label>
                  <select
                    value={soilType}
                    onChange={(e) => { setSoilType(e.target.value); setResult(null) }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                  >
                    <option value="">Choose soil type...</option>
                    <option value="Loamy">🟤 Loamy Soil</option>
                    <option value="Clay">🔵 Clay Soil</option>
                    <option value="Sandy">🟡 Sandy Soil</option>
                    <option value="Black">⚫ Black Soil</option>
                    <option value="Red">🔴 Red Soil</option>
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Region</label>
                  <select
                    value={region}
                    onChange={(e) => { setRegion(e.target.value); setResult(null) }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                  >
                    <option value="">Choose region...</option>
                    <option value="North India">🌾 North India</option>
                    <option value="South India">🌴 South India</option>
                    <option value="East India">🌿 East India</option>
                    <option value="West India">🏜️ West India</option>
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Season</label>
                  <select
                    value={season}
                    onChange={(e) => { setSeason(e.target.value); setResult(null) }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                  >
                    <option value="">Choose season...</option>
                    <option value="Winter">❄️ Winter (Rabi)</option>
                    <option value="Summer">☀️ Summer (Zaid)</option>
                    <option value="Monsoon">🌧️ Monsoon (Kharif)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading || !soilType || !region || !season}
                  className={`w-full py-3 rounded-xl font-bold text-white text-sm transition shadow-md flex items-center justify-center gap-2 ${
                    loading || !soilType || !region || !season
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FaFlask className="text-sm" />
                      Analyze Soil
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Result Card */}
            {result && (
              <div className="bg-white rounded-2xl shadow-md border border-green-200 overflow-hidden">

                {/* Green header */}
                <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4 flex items-center gap-3">
                  <FaCheckCircle className="text-white text-xl" />
                  <div>
                    <h2 className="text-white font-bold">Recommended Solution</h2>
                    <p className="text-green-200 text-xs">{soilType} soil · {region} · {season}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">

                  <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
                    <span className="text-sm font-semibold text-gray-500">Recommended Crop</span>
                    <span className="text-lg font-extrabold text-green-700">{result.crop}</span>
                  </div>

                  <div className="flex items-center justify-between bg-amber-50 rounded-xl px-4 py-3">
                    <span className="text-sm font-semibold text-gray-500">Fertilizer Suggestion</span>
                    <span className="text-sm font-bold text-amber-700 text-right max-w-[60%]">{result.fertilizer}</span>
                  </div>

                  {result.tip && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Farming Tip</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{result.tip}</p>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SoilAnalysis
