import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Navbar() {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {

    localStorage.removeItem("user")

    toast.success("Logged Out Successfully ✅")

    navigate("/login")
  }

  return (
    <nav className="bg-green-700 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

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

          {!user ? (
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
            <>
              <span className="text-green-100 font-medium">
                {user.name}
              </span>

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