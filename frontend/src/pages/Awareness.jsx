// =============================================================
// Awareness.jsx — Government Schemes Awareness Page
// =============================================================
// Displays informational cards about government agricultural
// schemes and programs that benefit farmers.
//
// The schemes array is static data defined locally in the component.
// Each card shows the scheme name and a brief description.
// No API calls — purely an informational reference page.
// =============================================================

import FarmerSidebar from "../components/FarmerSidebar"

function Awareness() {

  // -------------------------
  // Static Schemes Data
  // -------------------------
  // List of government agricultural schemes shown as awareness cards
  const schemes = [

    {
      title: "PM Kisan Samman Nidhi",
      description:
        "Provides ₹6000 yearly financial support to farmers.",
    },

    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description:
        "Crop insurance scheme for protection against crop failure.",
    },

    {
      title: "Kisan Credit Card",
      description:
        "Provides low-interest agricultural loans to farmers.",
    },

    {
      title: "Organic Farming Awareness",
      description:
        "Training and awareness programs for sustainable farming.",
    },
  ]

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar navigation */}
      <FarmerSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Awareness Drives 📢
      </h1>

      {/* ----------------------------- */}
      {/* Scheme Cards Grid             */}
      {/* ----------------------------- */}
      <div className="grid md:grid-cols-2 gap-6">

        {schemes.map((scheme, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-green-700">
              {scheme.title}
            </h2>

            <p className="text-gray-700 mt-4">
              {scheme.description}
            </p>

          </div>
        ))}

      </div>
      </div>
    </div>
  )
}

export default Awareness
