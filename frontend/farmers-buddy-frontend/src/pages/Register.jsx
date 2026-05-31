import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { registerUser } from "../services/authService"

import toast from "react-hot-toast"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FARMER",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    console.log("FORM SUBMITTED")

    try {

      const response = await registerUser(formData)

      console.log(response)

      toast.success("Registration Successful ✅")

      navigate("/login")

    } catch (error) {

      console.error(error)

      toast.success("Registration Failed ❌")
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-700">
            Create Account 🌱
          </h1>

          <p className="text-gray-500 mt-3">
            Join Farmers Buddy today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="FARMER">FARMER</option>
              <option value="OFFICER">OFFICER</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-xl font-semibold text-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register