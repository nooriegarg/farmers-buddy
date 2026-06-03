// =============================================================
// QueryCard.jsx — Reusable Query Display Card
// =============================================================
// Used in both FarmerDashboard (read-only) and OfficerDashboard
// (with reply form). The reply form only appears when the
// `onReply` prop is provided and the query has no officer reply yet.
//
// Props:
//   query          — Query object { id, title, description, status, farmerName, officerReply }
//   showFarmerName — boolean: show farmer name badge (Officer view)
//   replyText      — current reply text for this query (Officer view)
//   onReplyChange  — function(text) — called when reply textarea changes
//   onReply        — function() — called when Submit Reply is clicked
//   accentColor    — "green" | "blue" (default: "green")
// =============================================================

import { motion } from "framer-motion"

function QueryCard({
  query,
  showFarmerName = false,
  replyText = "",
  onReplyChange,
  onReply,
  accentColor = "green",
}) {

  const isGreen = accentColor === "green"

  const titleColor  = isGreen ? "text-green-800"  : "text-blue-800"
  const badgeColor  = isGreen ? "text-green-700"  : "text-blue-700"
  const badgeBg     = isGreen ? "bg-green-100"    : "bg-blue-100"
  const replyBtnBg  = isGreen
    ? "bg-green-700 hover:bg-green-800"
    : "bg-blue-700 hover:bg-blue-800"
  const ringColor   = isGreen ? "focus:ring-green-400" : "focus:ring-blue-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
    >

      {/* ---- Header row: title + badges ---- */}
      <div className="flex flex-wrap items-start justify-between gap-3">

        <h3 className={`text-xl font-bold ${titleColor} leading-snug`}>
          {query.title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">

          {/* Farmer name badge (Officer view only) */}
          {showFarmerName && query.farmerName && (
            <span className={`${badgeBg} ${badgeColor} text-xs font-semibold px-3 py-1 rounded-full`}>
              👤 {query.farmerName}
            </span>
          )}

          {/* Status badge */}
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              query.status === "RESOLVED"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {query.status === "RESOLVED" ? "✅ Resolved" : "⏳ Pending"}
          </span>

        </div>
      </div>

      {/* ---- Query description ---- */}
      <p className="text-gray-600 mt-3 text-sm leading-relaxed">
        {query.description}
      </p>

      {/* ---- Officer reply section ---- */}
      {query.officerReply ? (

        // Show existing reply in a highlighted box
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">
            🌿 Officer Reply
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {query.officerReply}
          </p>
        </div>

      ) : onReply ? (

        // Show reply form for officers when no reply exists yet
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

      ) : null}

    </motion.div>
  )
}

export default QueryCard
