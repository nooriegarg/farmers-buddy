import { useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar  from "../../components/FarmerSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { suggestCrops } from "../../services/recommendationService"

import { FaSeedling, FaSun, FaCloudRain, FaLeaf, FaFlask, FaSearch } from "react-icons/fa"

// Static general guide cards (kept as reference)
const generalCrops = [
  {
    crop: "Wheat",    season: "Winter",  fertilizer: "Nitrogen Rich Fertilizer",
    icon: <FaSeedling />, bg: "bg-gradient-to-br from-amber-500 to-yellow-400",
    tip: "Sow in October–November for best yield.", badge: "Rabi", badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    crop: "Rice",     season: "Monsoon", fertilizer: "Urea + Organic Compost",
    icon: <FaCloudRain />, bg: "bg-gradient-to-br from-green-500 to-emerald-400",
    tip: "Keep fields flooded during vegetative stage.", badge: "Kharif", badgeColor: "bg-green-100 text-green-700",
  },
  {
    crop: "Sugarcane", season: "Summer", fertilizer: "Potassium Fertilizer",
    icon: <FaSun />, bg: "bg-gradient-to-br from-orange-500 to-amber-400",
    tip: "Requires high water and regular earthing-up.", badge: "Annual", badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    crop: "Mustard",  season: "Winter",  fertilizer: "DAP + Sulphur",
    icon: <FaLeaf />, bg: "bg-gradient-to-br from-yellow-600 to-yellow-400",
    tip: "Suitable for dryland farming. Requires well-drained loamy soil.", badge: "Rabi", badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    crop: "Cotton",   season: "Summer",  fertilizer: "Nitrogen + Phosphorus Mix",
    icon: <FaSeedling />, bg: "bg-gradient-to-br from-sky-500 to-blue-400",
    tip: "Grows best in black soil. Requires 6–8 months growing period.", badge: "Kharif", badgeColor: "bg-green-100 text-green-700",
  },
  {
    crop: "Soybean",  season: "Monsoon", fertilizer: "Rhizobium Biofertilizer",
    icon: <FaFlask />, bg: "bg-gradient-to-br from-lime-600 to-green-500",
    tip: "Nitrogen-fixing legume — improves soil health.", badge: "Kharif", badgeColor: "bg-green-100 text-green-700",
  },
]

function Recommendations() {

  // Smart selector state
  const [form, setForm]           = useState({ region: "", season: "", soilType: "" })
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading]     = useState(false)
  const [searched, setSearched]   = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSuggest = async (e) => {
    e.preventDefault()
    if (!form.region || !form.season || !form.soilType) {
      toast.error("Please select all three fields")
      return
    }
    setLoading(true)
    try {
      const data = await suggestCrops(form)
      setSuggestions(data)
      setSearched(true)
    } catch (err) {
      console.error(err)
      toast.error("Suggestion failed. Please try again.")
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
            <p className="text-green-300 text-sm font-medium mb-1">Expert Guidance</p>
            <h1 className="text-3xl font-extrabold text-white">Crop Recommendations 🌾</h1>
            <p className="text-green-200 text-sm mt-1">
              Get personalized suggestions or browse our general crop guide below.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-8">

          {/* ---- Smart Crop Selector Panel ---- */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="bg-green-100 p-2.5 rounded-xl">
                <FaSearch className="text-green-700 text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Smart Crop Selector</h2>
                <p className="text-gray-400 text-xs">Tell us your region, season, and soil for personalized suggestions</p>
              </div>
            </div>

            <form onSubmit={handleSuggest} className="flex flex-wrap gap-3 items-end">

              <div className="flex-1 min-w-[160px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Region</label>
                <select name="region" value={form.region} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                >
                  <option value="">Select region</option>
                  <option value="North India">North India</option>
                  <option value="South India">South India</option>
                  <option value="East India">East India</option>
                  <option value="West India">West India</option>
                </select>
              </div>

              <div className="flex-1 min-w-[160px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Season</label>
                <select name="season" value={form.season} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                >
                  <option value="">Select season</option>
                  <option value="Winter">Winter (Rabi)</option>
                  <option value="Summer">Summer (Zaid)</option>
                  <option value="Monsoon">Monsoon (Kharif)</option>
                </select>
              </div>

              <div className="flex-1 min-w-[160px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Soil Type</label>
                <select name="soilType" value={form.soilType} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                >
                  <option value="">Select soil</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Black">Black</option>
                  <option value="Red">Red</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800"
                }`}
              >
                {loading ? "Searching..." : "Get Suggestions"}
              </button>
            </form>

            {/* Dynamic suggestion results */}
            {loading && <LoadingSpinner message="Finding best crops for your conditions..." />}

            {searched && !loading && suggestions.length === 0 && (
              <EmptyState icon="🌾" message="No suggestions found" subtext="Try a different combination of region, season, and soil type" />
            )}

            {suggestions.length > 0 && (
              <div className="mt-5 space-y-3">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Suggested crops for {form.region} · {form.season} · {form.soilType} soil
                </p>
                {suggestions.map((s, idx) => (
                  <div key={idx} className="bg-green-50 border border-green-200 rounded-xl px-5 py-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-extrabold text-green-800 text-base">{s.cropName}</span>
                      <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{s.fertilizer}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- General Crop Guide (static reference) ---- */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">General Crop Guide</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {generalCrops.map((item) => (
                <div key={item.crop} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`${item.bg} px-5 py-4 flex items-center gap-3`}>
                    <div className="bg-white/20 p-2.5 rounded-xl text-white text-xl">{item.icon}</div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{item.crop}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Season</span>
                      <span className="text-sm font-bold text-gray-700">{item.season}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">Fertilizer</span>
                      <span className="text-sm font-bold text-gray-700 text-right">{item.fertilizer}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        <span className="font-semibold text-green-700">Tip: </span>{item.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Recommendations
