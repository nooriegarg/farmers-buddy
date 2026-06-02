// =============================================================
// AdminDashboard.jsx — Admin Panel Main Page
// =============================================================
// The landing page for users with the ADMIN role.
// Displays a high-level admin overview with three management panels:
//   - User Management   : manage farmer and officer accounts
//   - System Monitoring : observe platform activities
//   - Reports           : view aggregated agriculture support data
//
// The admin user's name is read from localStorage (set during login).
// AdminSidebar provides role-specific navigation for admin pages.
// =============================================================

import AdminSidebar from "../components/AdminSidebar"

function AdminDashboard() {

  // Read the logged-in admin's details from localStorage
  const user =
    JSON.parse(localStorage.getItem("user"))

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar with admin navigation links */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-red-700 mb-10">

          Welcome Admin, {user.name} 👨‍💼

        </h1>

        {/* ----------------------------- */}
        {/* Admin Overview Cards          */}
        {/* ----------------------------- */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* User Management Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold text-red-700">
              User Management
            </h2>

            <p className="mt-4 text-gray-600">
              Manage farmers and officers.
            </p>

          </div>

          {/* System Monitoring Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold text-red-700">
              System Monitoring
            </h2>

            <p className="mt-4 text-gray-600">
              Monitor platform activities.
            </p>

          </div>

          {/* Reports Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold text-red-700">
              Reports
            </h2>

            <p className="mt-4 text-gray-600">
              Analyze agriculture support data.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard
