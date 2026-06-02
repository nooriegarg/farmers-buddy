// =============================================================
// Recommendations.jsx — Crop Recommendations Page
// =============================================================
// Displays static crop recommendation cards for farmers.
// Each card shows the recommended crop, the best growing season,
// and the suggested fertilizer for optimal yield.
//
// The recommendations array is defined locally (static data).
// No API calls are made — this is a purely informational page.
// =============================================================

import FarmerSidebar from "../components/FarmerSidebar"

function Recommendations() {

  // -------------------------
  // Static Recommendations Data
  // -------------------------
  // In a production system, this would be fetched from the
  // CropRecommendationController at GET /api/recommendations.
  const recommendations = [
    {
      crop: "Wheat",
      season: "Winter",
      fertilizer: "Nitrogen Rich Fertilizer",
    },
    {
      crop: "Rice",
      season: "Monsoon",
      fertilizer: "Urea + Organic Compost",
    },
    {
      crop: "Sugarcane",
      season: "Summer",
      fertilizer: "Potassium Fertilizer",
    },
  ]

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar navigation */}
      <FarmerSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Crop Recommendations 🌾
        </h1>

        {/* ----------------------------- */}
        {/* Recommendation Cards Grid     */}
        {/* ----------------------------- */}
        {/* Iterates over the recommendations array and renders one card per entry */}
        <div className="grid md:grid-cols-3 gap-6">

          {recommendations.map((item, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >

              <h2 className="text-2xl font-bold text-green-700">
                {item.crop}
              </h2>

              <p className="mt-3 text-gray-600">

                <span className="font-semibold">
                  Best Season:
                </span>{" "}
                {item.season}

              </p>

              <p className="mt-2 text-gray-600">

                <span className="font-semibold">
                  Recommended Fertilizer:
                </span>{" "}
                {item.fertilizer}

              </p>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Recommendations
