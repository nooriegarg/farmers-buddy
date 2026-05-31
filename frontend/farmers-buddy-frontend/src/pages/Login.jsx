import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../services/authService"

import toast from "react-hot-toast"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await loginUser(formData)

      console.log(response)

      if (response) {

        localStorage.setItem(
          "user",
          JSON.stringify(response)
        )

        toast.success("Login Successful ✅")

        if (response.role === "FARMER") {
            navigate("/farmer-dashboard")
    } else if (response.role === "OFFICER") {
            navigate("/officer-dashboard")
            }

      } else {

        toast.success("Invalid Credentials ❌")
      }

    } catch (error) {

      console.error(error)

      toast.success("Login Failed ❌")
    }
  }

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

          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-xl font-semibold text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
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