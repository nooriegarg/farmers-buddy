// =============================================================
// QueryCard.jsx — Reusable Query Display Card
// =============================================================
// Props:
//   query          — Query object { id, title, description, status,
//                    farmerName, officerReply, expertReply }
//   showFarmerName — boolean: show farmer name badge (Officer/Expert view)
//   replyText      — current reply text for this card (Officer/Expert view)
//   onReplyChange  — function(text)
//   onReply        — function() — submit the reply
//   onDelete       — function() — delete the query (Farmer view)
//   accentColor    — "green" | "blue" | "violet" (default: "green")
//   replyLabel     — label shown above reply box, e.g. "Officer Reply" / "Expert Reply"
// =============================================================

import { FaTrash } from "react-icons/fa"
import { motion } from "framer-motion"

function QueryCard({
  query,
  showFarmerName = false,
  replyText = "",
  onReplyChange,
  onReply,
  onDelete,
  accentColor = "green",

}) {

  const isGreen  = accentColor === "green"
  const isViolet = accentColor === "violet"

  const titleColor = isGreen ? "text-green-800" : isViolet ? "text-violet-800" : "text-blue-800"
  const badgeBg    = isGreen ? "bg-green-100"   : isViolet ? "bg-violet-100"   : "bg-blue-100"
  const badgeColor = isGreen ? "text-green-700" : isViolet ? "text-violet-700" : "text-blue-700"
  const replyBtnBg = isGreen
    ? "bg-green-700 hover:bg-green-800"
    : isViolet
    ? "bg-violet-700 hover:bg-violet-800"
    : "bg-blue-700 hover:bg-blue-800"
  const ringColor  = isGreen ? "focus:ring-green-400" : isViolet ? "focus:ring-violet-400" : "focus:ring-blue-400"
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
    >

      {/* Header row: title + badges + delete */}
      <div className="flex flex-wrap items-start justify-between gap-3">

        <h3 className={`text-xl font-bold ${titleColor} leading-snug`}>
          {query.title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">

          {showFarmerName && query.farmerName && (
            <span className={`${badgeBg} ${badgeColor} text-xs font-semibold px-3 py-1 rounded-full`}>
              👤 {query.farmerName}
            </span>
          )}

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              query.status === "RESOLVED"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {query.status === "RESOLVED" ? "✅ Resolved" : "⏳ Pending"}
          </span>

          {onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-50"
              title="Delete query"
            >
              <FaTrash className="text-xs" />
            </button>
          )}

        </div>
      </div>

      {/* Query description */}
      <p className="text-gray-600 mt-3 text-sm leading-relaxed">
        {query.description}
      </p>

      {/* Officer reply section */}
      {query.officerReply && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">
            🌿 Agriculture Officer
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">{query.officerReply}</p>
        </div>
      )}

      {/* Expert reply section */}
      {query.expertReply && (
        <div className="mt-3 bg-violet-50 border border-violet-200 rounded-xl p-4">
          <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">
            🧑‍🔬 Agriculture Expert
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">{query.expertReply}</p>
        </div>
      )}

      {/* Reply form — shown to officers/experts when they can reply */}
      {onReply && (
        <div className="mt-4">
          <textarea
            rows="3"
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => onReplyChange && onReplyChange(e.target.value)}
            className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${ringColor} resize-none`}
          />
          <button
            onClick={onReply}
            className={`mt-2 ${replyBtnBg} text-white px-5 py-2 rounded-xl text-sm font-semibold transition`}
          >
            Submit Reply
          </button>
        </div>
      )}

    </motion.div>
  )
}

export default QueryCard
