// =============================================================
// ToolsCatalog.jsx — Farming Tools Reference Page
// =============================================================
// Displays a catalog of common agricultural tools with their purpose.
// This is a static informational page — no API calls or state management.
//
// Each tool card shows the tool name and its primary agricultural use.
// =============================================================

import FarmerSidebar from "../components/FarmerSidebar"

function ToolsCatalog() {

  // -------------------------
  // Static Tools Data
  // -------------------------
  // List of farming tools displayed as reference cards
  const tools = [

    {
      name: "Tractor",
      purpose: "Used for ploughing and cultivation.",
    },

    {
      name: "Sprinkler System",
      purpose: "Efficient irrigation for crops.",
    },

    {
      name: "Soil Testing Kit",
      purpose: "Analyzes soil nutrients and quality.",
    },

    {
      name: "Water Pump",
      purpose: "Used for irrigation water supply.",
    },

  ]

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar navigation */}
      <FarmerSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Farmer Tools Catalog 🛠️
      </h1>

      {/* ----------------------------- */}
      {/* Tool Cards Grid               */}
      {/* ----------------------------- */}
      <div className="grid md:grid-cols-2 gap-6">

        {tools.map((tool, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-green-700">
              {tool.name}
            </h2>

            <p className="text-gray-700 mt-4">
              {tool.purpose}
            </p>

          </div>
        ))}

      </div>
      </div>
    </div>
  )
}

export default ToolsCatalog
