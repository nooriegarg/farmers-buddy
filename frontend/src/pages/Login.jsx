// =============================================================
// Login.jsx — User Login Page (Enhanced)
// =============================================================
// Split-screen layout:
//   Left side  — farming background image with overlay + quote
//   Right side — login card with form
//
// Login Flow:
//   POST /api/auth/login → get user object → save to localStorage
//   → redirect to role-specific dashboard (FARMER / OFFICER / ADMIN)
// =============================================================

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import toast from "react-hot-toast"
import { FaLeaf, FaEnvelope, FaLock } from "react-icons/fa"

function Login() {

  const navigate = useNavigate()

  // Controlled form state — updates on every keystroke
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // -------------------------
  // Handle Login Submission
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const response = await loginUser(formData)

      console.log(response)

      // Persist full user object (id, name, role) in localStorage
      localStorage.setItem("user", JSON.stringify(response))

      toast.success("Login Successful ✅")

      // Role-based redirect
      if (response.role === "FARMER")       navigate("/farmer-dashboard")
      else if (response.role === "OFFICER") navigate("/officer-dashboard")
      else if (response.role === "ADMIN")   navigate("/admin-dashboard")
      else if (response.role === "EXPERT")  navigate("/expert-dashboard")

    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        toast.error("Invalid email or password ❌")
      } else {
        toast.error("Login Failed ❌")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ================================================================ */}
      {/* LEFT SIDE — Farming background with overlay                       */}
      {/* ================================================================ */}
      <div
        className="hidden lg:flex flex-1 relative items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/85 to-green-800/70" />

        {/* Quote card */}
        <div className="relative z-10 text-white text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-amber-500 p-3 rounded-2xl shadow-xl">
              <FaLeaf className="text-white text-2xl" />
            </div>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Farmers <span className="text-amber-400">Buddy</span>
          </h2>

          <p className="text-green-100 text-lg leading-relaxed max-w-md">
            "Connecting farmers with agriculture experts for a better tomorrow."
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            {[["500+", "Farmers"], ["50+", "Officers"], ["1000+", "Queries"]].map(([num, lbl]) => (
              <div key={lbl} className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2">
                <p className="text-2xl font-bold text-amber-400">{num}</p>
                <p className="text-green-200 text-xs mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* RIGHT SIDE — Login form                                           */}
      {/* ================================================================ */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <FaLeaf className="text-green-700 text-2xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Login to your Farmers Buddy account
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white text-sm transition shadow-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 shadow-green-200"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">New to Farmers Buddy?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Register Link */}
            <Link
              to="/register"
              className="block w-full py-3 text-center border-2 border-green-600 text-green-700 rounded-xl font-bold text-sm hover:bg-green-50 transition"
            >
              Create Free Account
            </Link>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
