import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { FaLeaf } from "react-icons/fa"

function Navbar() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    navigate("/login")
  }

  const handleDashboard = () => {
    if (user?.role === "FARMER")  navigate("/farmer-dashboard")
    if (user?.role === "OFFICER") navigate("/officer-dashboard")
    if (user?.role === "ADMIN")   navigate("/admin-dashboard")
    if (user?.role === "EXPERT")  navigate("/expert-dashboard")
  }

  return (
    <nav className="bg-gradient-to-r from-green-900 to-green-700 text-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* ---- Brand / Logo ---- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-white/15 p-2 rounded-xl group-hover:bg-white/25 transition">
            <FaLeaf className="text-green-200 text-xl" />
          </div>
          <span className="text-xl font-extrabold tracking-wide">
            Farmers <span className="text-amber-300">Buddy</span>
          </span>
        </Link>

        {/* ---- Navigation Links ---- */}
        <div className="flex items-center gap-4 text-sm font-medium">

          <Link
            to="/"
            className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
          >
            Home
          </Link>

          {!user ? (

            // Guest: show login + register links
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-xl font-semibold transition shadow-md"
              >
                Get Started
              </Link>
            </>

          ) : (

            // Authenticated: user name + logout
            <>
              <button
                onClick={handleDashboard}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
              >
                <span className="w-7 h-7 bg-amber-400 text-green-900 rounded-full flex items-center justify-center font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-white text-green-800 hover:bg-green-100 px-4 py-2 rounded-xl font-semibold transition"
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
