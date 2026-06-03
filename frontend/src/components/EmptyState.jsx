// =============================================================
// EmptyState.jsx — Empty / No-Data Placeholder
// =============================================================
// Shown when a list has no items to display — e.g., no queries
// match the current filter, or no forum posts exist yet.
//
// Props:
//   icon    — optional emoji or icon (defaults to 📭)
//   message — main message text
//   subtext — optional smaller hint text
// =============================================================

function EmptyState({ icon = "📭", message = "Nothing here yet", subtext = "" }) {

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <div className="text-6xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-500">
        {message}
      </h3>

      {subtext && (
        <p className="text-gray-400 mt-2 text-sm max-w-xs">
          {subtext}
        </p>
      )}

    </div>
  )
}

export default EmptyState
