// =============================================================
// SoilAnalysis.jsx — Soil-Based Crop Recommendation Tool
// =============================================================
// An interactive tool that suggests a crop and fertilizer based
// on the farmer's selected soil type and region.
//
// Logic:
//   - getRecommendation() is a pure function that maps
//     (soilType + region) combinations to crop/fertilizer recommendations.
//   - The result is re-computed whenever soilType or region state changes,
//     because it is called during the render cycle.
//   - The recommendation result section is only displayed when both
//     soilType and region have been selected (conditional rendering).
//
// State:
//   - soilType : selected from dropdown (Loamy / Clay / Sandy)
//   - region   : selected from dropdown (North India / South India)
//
// No API calls — all recommendation logic is handled client-side.
// =============================================================

import { useState } from "react"
import FarmerSidebar from "../components/FarmerSidebar"

function SoilAnalysis() {

  // -------------------------
  // State Declarations
  // -------------------------

  const [soilType, setSoilType] = useState("")
  const [region, setRegion] = useState("")

  // -------------------------
  // Recommendation Logic
  // -------------------------
  // Returns crop + fertilizer based on soilType and region combination.
  // Falls back to Maize + Potassium Fertilizer for unmatched combinations.
  const getRecommendation = () => {

    if (
      soilType === "Loamy" &&
      region === "North India"
    ) {

      return {
        crop: "Wheat",
        fertilizer: "Nitrogen Fertilizer",
      }
    }

    if (
      soilType === "Clay" &&
      region === "South India"
    ) {

      return {
        crop: "Rice",
        fertilizer: "Organic Compost",
      }
    }

    // Default recommendation for all other combinations
    return {
      crop: "Maize",
      fertilizer: "Potassium Fertilizer",
    }
  }

  // Compute the recommendation on every render based on current selections
  const recommendation = getRecommendation()

  return (

     <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar navigation */}
      <FarmerSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Soil Analysis 🌱
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl">

        {/* Soil Type Dropdown */}
        <div className="mb-6">

          <label className="block text-lg font-semibold mb-3">
            Select Soil Type
          </label>

          <select
            value={soilType}
            onChange={(e) =>
              setSoilType(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          >

            <option value="">
              Choose Soil
            </option>

            <option value="Loamy">
              Loamy Soil
            </option>

            <option value="Clay">
              Clay Soil
            </option>

            <option value="Sandy">
              Sandy Soil
            </option>

          </select>

        </div>

        {/* Region Dropdown */}
        <div className="mb-6">

          <label className="block text-lg font-semibold mb-3">
            Select Region
          </label>

          <select
            value={region}
            onChange={(e) =>
              setRegion(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          >

            <option value="">
              Choose Region
            </option>

            <option value="North India">
              North India
            </option>

            <option value="South India">
              South India
            </option>

          </select>

        </div>

        {/* ----------------------------- */}
        {/* Recommendation Result         */}
        {/* ----------------------------- */}
        {/* Conditionally rendered — only shown after both fields are selected */}
        {soilType && region && (

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Recommended Solution ✅
            </h2>

            <p className="text-lg text-gray-700 mb-3">

              <span className="font-bold">
                Recommended Crop:
              </span>{" "}
              {recommendation.crop}

            </p>

            <p className="text-lg text-gray-700">

              <span className="font-bold">
                Fertilizer Suggestion:
              </span>{" "}
              {recommendation.fertilizer}

            </p>

          </div>
        )}

      </div>
    </div>
    </div>
  )
}

export default SoilAnalysis
