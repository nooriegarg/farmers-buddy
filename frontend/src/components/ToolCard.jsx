// =============================================================
// ToolCard.jsx — Reusable Farming Tool Card Component
// =============================================================
// Displays a single farming tool with category, description, price, and image.
// Used in: ToolsCatalog.jsx
//
// Props:
//   tool      — Tool object { name, category, description, imageUrl, price, addedBy }
//   isAdmin   — boolean — shows delete button if true
//   onDelete  — function() — called when admin clicks delete
// =============================================================

import { FaTrash, FaTag } from "react-icons/fa"

// Map category names to Tailwind gradient classes
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

function ToolCard({ tool, isAdmin = false, onDelete }) {

  const headerBg = categoryColors[tool.category] || defaultBg

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
        {tool.price && (
          <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {tool.price}
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

        <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>

        {tool.addedBy && (
          <p className="text-xs text-gray-400 mt-3">
            Added by <span className="font-semibold text-gray-500">{tool.addedBy}</span>
          </p>
        )}

        {/* Delete button — admin only */}
        {isAdmin && (
          <button
            onClick={onDelete}
            className="mt-4 flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition"
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
