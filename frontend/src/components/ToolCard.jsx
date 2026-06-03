// =============================================================
// ToolCard.jsx — Reusable Farming Tool Card Component
// =============================================================
// Props:
//   tool      — Tool object { name, category, description, imageUrl, price, addedBy, brand, sourceUrl }
//   isAdmin   — boolean — shows delete button if true
//   onDelete  — function() — called when admin clicks delete
// =============================================================

import { FaTrash, FaTag, FaExternalLinkAlt } from "react-icons/fa"

const categoryColors = {
  "Cultivation":       "bg-gradient-to-br from-orange-600 to-amber-500",
  "Irrigation":        "bg-gradient-to-br from-sky-600 to-blue-500",
  "Analysis":          "bg-gradient-to-br from-purple-600 to-purple-500",
  "Sowing":            "bg-gradient-to-br from-green-600 to-emerald-500",
  "Precision Farming": "bg-gradient-to-br from-gray-700 to-gray-600",
  "Harvesting":        "bg-gradient-to-br from-yellow-600 to-amber-500",
  "Protection":        "bg-gradient-to-br from-red-600 to-red-500",
}

const defaultBg = "bg-gradient-to-br from-green-600 to-green-500"

function formatPrice(price) {
  if (!price) return null
  const numeric = parseFloat(String(price).replace(/[^0-9.]/g, ""))
  if (!isNaN(numeric) && String(price).replace(/[^0-9.]/g, "") === String(price).trim()) {
    return "₹" + numeric.toLocaleString("en-IN")
  }
  return String(price).startsWith("₹") ? price : "₹" + price
}

function ToolCard({ tool, isAdmin = false, onDelete }) {

  const headerBg    = categoryColors[tool.category] || defaultBg
  const priceLabel  = formatPrice(tool.price)

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">

      {/* Colored header with category badge */}
      <div className={`${headerBg} px-5 py-4 flex items-center justify-between`}>
        <div>
          <h3 className="text-white font-bold">{tool.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <FaTag className="text-white/70 text-xs" />
            <span className="text-xs text-white/80">{tool.category}</span>
          </div>
        </div>
        {priceLabel && (
          <span className="bg-white/20 text-white text-sm font-extrabold px-3 py-1 rounded-full tracking-tight">
            {priceLabel}
          </span>
        )}
      </div>

      {/* Optional tool image */}
      {tool.imageUrl && (
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Card body */}
      <div className="p-5">

        {/* Price — prominent product-style display */}
        {priceLabel && (
          <p className="text-2xl font-extrabold text-gray-800 mb-3">{priceLabel}</p>
        )}

        <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>

        {/* Brand */}
        {tool.brand && (
          <p className="text-xs text-gray-500 mt-3">
            Brand: <span className="font-semibold text-gray-700">{tool.brand}</span>
          </p>
        )}

        {tool.addedBy && (
          <p className="text-xs text-gray-400 mt-1">
            Added by <span className="font-semibold text-gray-500">{tool.addedBy}</span>
          </p>
        )}

        {/* Visit product link */}
        {tool.sourceUrl && (
          <a
            href={tool.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-lg px-3 py-1.5 transition"
          >
            <FaExternalLinkAlt className="text-xs" />
            Visit Product
          </a>
        )}

        {/* Delete button — admin only */}
        {isAdmin && (
          <button
            onClick={onDelete}
            className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition"
          >
            <FaTrash className="text-xs" />
            Remove Tool
          </button>
        )}
      </div>
    </div>
  )
}

export default ToolCard
