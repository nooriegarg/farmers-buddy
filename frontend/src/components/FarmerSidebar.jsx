// =============================================================
// FarmerSidebar.jsx — Sidebar Navigation for Farmer Role
// =============================================================
// This component renders the left-side navigation panel shown on
// all farmer-accessible pages. Each button uses React Router's
// useNavigate hook to perform client-side navigation without a
// full page reload.
//
// Navigation Links:
//   - Dashboard      → /farmer-dashboard  (main query management page)
//   - Recommendations → /recommendations  (crop recommendation cards)
//   - Soil Analysis  → /soil-analysis     (soil type + region based suggestions)
//   - Awareness Drives → /awareness       (government schemes information)
//   - Tools Catalog  → /tools             (farming tools reference)
//   - Community Forum → /forum            (discussion board with replies)
// =============================================================

import { useNavigate } from "react-router-dom"

function FarmerSidebar() {

  const navigate = useNavigate()

  return (

    <div className="w-72 bg-green-800 text-white p-8 min-h-screen">

      {/* Sidebar brand header */}
      <h1 className="text-3xl font-bold mb-12">
        Farmers Buddy 🌾
      </h1>

      {/* Navigation menu items */}
      <div className="space-y-4 text-lg">

        {/* Dashboard — main farmer page */}
        <button
          onClick={() =>
            navigate("/farmer-dashboard")
          }
          className="w-full text-left hover:bg-green-700 p-4 rounded-xl transition"
        >
          Dashboard
        </button>

        {/* Crop Recommendations page */}
        <button
          onClick={() =>
            navigate("/recommendations")
          }
          className="w-full text-left hover:bg-green-700 p-4 rounded-xl transition"
        >
          Recommendations
        </button>

        {/* Soil Analysis tool */}
        <button
          onClick={() =>
            navigate("/soil-analysis")
          }
          className="w-full text-left hover:bg-green-700 p-4 rounded-xl transition"
        >
          Soil Analysis
        </button>

        {/* Government scheme awareness drives */}
        <button
          onClick={() =>
            navigate("/awareness")
          }
          className="w-full text-left hover:bg-green-700 p-4 rounded-xl transition"
        >
          Awareness Drives
        </button>

        {/* Farming tools catalog */}
        <button
          onClick={() =>
            navigate("/tools")
          }
          className="w-full text-left hover:bg-green-700 p-4 rounded-xl transition"
        >
          Tools Catalog
        </button>

        {/* Community Forum — peer discussion board */}
        <button
          onClick={() =>
            navigate("/forum")
          }
          className="w-full text-left hover:bg-green-700 p-4 rounded-xl transition"
        >
          Community Forum
        </button>

      </div>

    </div>
  )
}

export default FarmerSidebar
