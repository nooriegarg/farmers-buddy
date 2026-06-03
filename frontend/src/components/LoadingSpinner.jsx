// =============================================================
// LoadingSpinner.jsx — Centered Loading Indicator
// =============================================================
// Displays a spinning loader while data is being fetched from
// the backend. Keeps the UX smooth during async operations.
//
// Props:
//   message — optional text below the spinner (default: "Loading...")
// =============================================================

function LoadingSpinner({ message = "Loading..." }) {

  return (
    <div className="flex flex-col items-center justify-center py-20">

      {/* CSS spinner ring using Tailwind animate-spin */}
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />

      <p className="mt-4 text-gray-500 text-sm">
        {message}
      </p>

    </div>
  )
}

export default LoadingSpinner
