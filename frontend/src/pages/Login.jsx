// =============================================================
// Login.jsx — User Login Page
// =============================================================
// Handles user authentication for Farmers Buddy.
// Sends credentials to the Spring Boot AuthController via Axios,
// receives the User object back, stores it in localStorage,
// and redirects to the appropriate role-based dashboard.
//
// Login Flow:
//   1. User fills in email + password and submits the form
//   2. handleSubmit() calls loginUser() from authService.js
//   3. Axios sends POST /api/auth/login to Spring Boot backend
//   4. Backend validates credentials and returns the User object
//   5. User object (including role) is saved to localStorage as "user"
//   6. React Router navigates to the correct dashboard based on role:
//      - FARMER  → /farmer-dashboard
//      - OFFICER → /officer-dashboard
//      - ADMIN   → /admin-dashboard
// =============================================================

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../services/authService"

import toast from "react-hot-toast"

function Login() {

  const navigate = useNavigate()

  // -------------------------
  // Form State
  // -------------------------
  // Controlled form — every keystroke updates the state via handleChange
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // -------------------------
  // Handle Input Changes
  // -------------------------
  // Uses computed property [e.target.name] to update the correct field
  // regardless of which input triggered the event
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // -------------------------
  // Handle Form Submission
  // -------------------------
  const handleSubmit = async (e) => {

    // Prevent default browser form submission (page reload)
    e.preventDefault()

    try {

      // Call the login API — sends POST /api/auth/login with email + password
      const response = await loginUser(formData)

      console.log(response)

      if (response) {

        // Persist the full user object (id, name, email, role) in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(response)
        )

        toast.success("Login Successful ✅")

        // Role-based redirect: send each user to their designated dashboard
        if (response.role === "FARMER") {
            navigate("/farmer-dashboard")
    } else if (response.role === "OFFICER") {
            navigate("/officer-dashboard")
    }else if (response.role === "ADMIN") {

            navigate("/admin-dashboard")
          }

      } else {

        toast.success("Invalid Credentials ❌")
      }

    } catch (error) {

      console.error(error)

      toast.success("Login Failed ❌")
    }
  }

  // -------------------------
  // Render Login Form
  // -------------------------
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-700">
            Welcome Back 🌾
          </h1>

          <p className="text-gray-500 mt-3">
            Login to your Farmers Buddy account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-xl font-semibold text-lg"
          >
            Login
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
