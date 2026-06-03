// =============================================================
// StatsCard.jsx — Reusable Dashboard Statistics Card
// =============================================================
// Displays a single metric on the dashboard (e.g., Total Queries,
// Resolved, Pending). Accepts an icon, label, value, and color.
//
// Props:
//   icon    — React icon element (from react-icons)
//   label   — stat label text (e.g., "Total Queries")
//   value   — numeric value to display
//   color   — Tailwind color key: "green" | "blue" | "yellow" | "red"
// =============================================================

function StatsCard({ icon, label, value, color = "green" }) {

  // Map color prop to Tailwind classes for icon + value text
  const colorMap = {
    green:  { text: "text-green-700",  bg: "bg-green-50",  icon: "text-green-500"  },
    blue:   { text: "text-blue-700",   bg: "bg-blue-50",   icon: "text-blue-500"   },
    yellow: { text: "text-yellow-700", bg: "bg-yellow-50", icon: "text-yellow-500" },
    red:    { text: "text-red-700",    bg: "bg-red-50",    icon: "text-red-500"    },
    amber:  { text: "text-amber-700",  bg: "bg-amber-50",  icon: "text-amber-500"  },
  }

  const c = colorMap[color] || colorMap.green

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-200">

      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
          {label}
        </p>

        <h2 className={`text-4xl font-bold mt-1 ${c.text}`}>
          {value}
        </h2>
      </div>

      {/* Icon container with soft colored background */}
      <div className={`${c.bg} p-4 rounded-2xl`}>
        <span className={`text-4xl ${c.icon}`}>
          {icon}
        </span>
      </div>

    </div>
  )
}

export default StatsCard
