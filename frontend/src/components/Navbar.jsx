// =============================================================
// Navbar.jsx — Top Navigation Bar
// =============================================================
// Persistent navigation bar displayed on every page of the app.
// Reads the current user from localStorage to conditionally render:
//   - Guest view: Home | Login | Register links
//   - Logged-in view: Username button (navigates to dashboard) | Logout button
//
// Role-based navigation:
//   - FARMER → navigates to /farmer-dashboard on username click
//   - OFFICER → navigates to /officer-dashboard on username click
//
// Logout Flow:
//   1. Remove "user" key from localStorage (clears session)
//   2. Show success toast notification
//   3. Redirect to /login via React Router's useNavigate
// =============================================================

import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Navbar() {

  const navigate = useNavigate()

  // Read the logged-in user from localStorage (set during login)
  const user = JSON.parse(localStorage.getItem("user"))

  // -------------------------
  // Logout Handler
  // -------------------------
  // Clears the session, shows a toast, and redirects to login
  const handleLogout = () => {

    localStorage.removeItem("user")

    toast.success("Logged Out Successfully ✅")

    navigate("/login")
  }

  return (
    <nav className="bg-green-700 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand / Logo — clicking navigates to home */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          Farmers Buddy 🌾
        </Link>

        <div className="flex gap-6 text-lg items-center">

          <Link
            to="/"
            className="hover:text-green-200 transition"
          >
            Home
          </Link>

          {/* Conditional rendering: show login/register for guests, dashboard/logout for users */}
          {!user ? (

            // Guest links — shown when no user session exists
            <>
              <Link
                to="/login"
                className="hover:text-green-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-green-200 transition"
              >
                Register
              </Link>
            </>
          ) : (

            // Authenticated user controls
            <>
              {/* Username button — navigates to the role-specific dashboard */}
              <button
                    onClick={() => {

                      if (user.role === "FARMER") {
                        navigate("/farmer-dashboard")
                      } else if (user.role === "OFFICER") {
                        navigate("/officer-dashboard")
                      }
                    }}
                    className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition"
                  >
                    {user.name}
              </button>

              {/* Logout button — clears session and redirects */}
              <button
                onClick={handleLogout}
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}

export default Navbar
