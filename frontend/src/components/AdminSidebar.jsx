// =============================================================
// AdminSidebar.jsx — Sidebar Navigation for Admin Role
// =============================================================
// Renders the left-side navigation panel for the Admin dashboard.
// Uses a red color theme to visually distinguish the admin panel
// from the farmer (green) and officer (blue) interfaces.
//
// All navigation buttons currently point to /admin-dashboard.
// Individual admin sub-pages can be wired up as the admin
// feature set expands in future iterations.
// =============================================================

import { useNavigate } from "react-router-dom"

function AdminSidebar() {

  const navigate = useNavigate()

  return (

    <div className="w-72 bg-red-800 text-white p-8 min-h-screen">

      {/* Sidebar brand header */}
      <h1 className="text-3xl font-bold mb-12">
        Admin Panel 👨‍💼
      </h1>

      {/* Navigation menu items */}
      <div className="space-y-4 text-lg">

        {/* Main admin dashboard */}
        <button
          onClick={() =>
            navigate("/admin-dashboard")
          }
          className="w-full text-left hover:bg-red-700 p-4 rounded-xl transition"
        >
          Dashboard
        </button>

        {/* Community Forum management */}
        <button
          onClick={() =>
            navigate("/admin-dashboard")
          }
          className="w-full text-left hover:bg-red-700 p-4 rounded-xl transition"
        >
          Community Forum
        </button>

        {/* Platform awareness content management */}
        <button
          onClick={() =>
            navigate("/admin-dashboard")
          }
          className="w-full text-left hover:bg-red-700 p-4 rounded-xl transition"
        >
         Platform Awareness
        </button>

        {/* Resource / tools management */}
        <button
          onClick={() =>
            navigate("/admin-dashboard")
          }
          className="w-full text-left hover:bg-red-700 p-4 rounded-xl transition"
        >
          Resource Management
        </button>

      </div>

    </div>
  )
}

export default AdminSidebar
