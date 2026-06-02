// =============================================================
// Register.jsx — New User Registration Page
// =============================================================
// Allows new users to create an account with role selection.
// Roles: FARMER (default, open), OFFICER (requires passkey), ADMIN (requires passkey)
//
// Registration Flow:
//   1. User fills in name, email, password, and selects a role
//   2. If OFFICER or ADMIN is selected, a passkey modal opens for verification
//   3. On correct passkey → role is set; on incorrect → role falls back to FARMER
//   4. handleSubmit() calls registerUser() from authService.js
//   5. Axios sends POST /api/auth/register to Spring Boot backend
//   6. Backend checks for duplicate email, saves user, returns saved User object
//   7. On success → redirect to /login
//
// Passkey Logic:
//   - OFFICER_PASSKEY = "ADMIN123"    (hardcoded frontend guard)
//   - ADMIN_PASSKEY   = "SUPERADMIN123"
//   - These prevent arbitrary users from registering as privileged roles
// =============================================================

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { registerUser } from "../services/authService"

import toast from "react-hot-toast"

function Register() {

  // Passkeys used to verify privileged role selection
  const OFFICER_PASSKEY = "ADMIN123"
  const ADMIN_PASSKEY = "SUPERADMIN123"

  const navigate = useNavigate()

  // -------------------------
  // Form State
  // -------------------------
  // Default role is FARMER — the most common user type
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FARMER",
  })

  // Controls visibility of the passkey verification modal
  const [showPasskeyModal, setShowPasskeyModal] =
  useState(false)

  // Stores the passkey entered by the user in the modal
  const [officerPasskey, setOfficerPasskey] =
    useState("")

  // -------------------------
  // Handle Input Changes
  // -------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Tracks which role was selected (OFFICER or ADMIN) before the modal opens
  const [selectedRole, setSelectedRole] =
  useState("")

  // -------------------------
  // Handle Form Submission
  // -------------------------
  const handleSubmit = async (e) => {

    e.preventDefault()

    console.log("FORM SUBMITTED")

    try {

      // Frontend validation: password must be at least 6 characters
      if (formData.password.length < 6) {

        toast.error(
          "Password must be at least 6 characters"
        )

        return
      }

      // Send registration data to the backend
      const response = await registerUser(formData)

      console.log(response)

      toast.success("Registration Successful ✅")

      // Redirect to login after successful registration
      navigate("/login")

    } catch (error) {

      console.error(error)

      // Show a specific message if the email is already registered
      if (
            error.response?.data?.message?.includes(
              "User already exists"
            )
          ) {

            toast.error("User already exists ❌")

          } else {

            toast.error("Registration Failed ❌")
          }
    }
  }

  // -------------------------
  // Render Registration Form
  // -------------------------
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

          {/* Name Input */}
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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
             onChange={(e) => {

                  const selectedRole = e.target.value

                  // If a privileged role is selected, open the passkey verification modal
                  if (
                    selectedRole === "OFFICER" ||
                    selectedRole === "ADMIN"
                  ) {

                    setShowPasskeyModal(true)

                    setSelectedRole(selectedRole)

                    return
                  }

                  // FARMER role requires no verification — update directly
                  setFormData({
                    ...formData,
                    role: selectedRole,
                  })
                }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="FARMER">FARMER</option>
              <option value="OFFICER">OFFICER</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-xl font-semibold text-lg"
          >
            Register
          </button>
        </form>

        {/* Redirect to Login */}
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

      {/* ----------------------------- */}
      {/* Passkey Verification Modal     */}
      {/* ----------------------------- */}
      {/* Shown when OFFICER or ADMIN role is selected.
          The user must enter the correct passkey to proceed with that role.
          If incorrect, the role is reset to FARMER. */}
      {showPasskeyModal && (

  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

      <h2 className="text-2xl font-bold text-green-700 mb-5">
        Officer Verification 🔐
      </h2>

      <input
        type="password"
        placeholder="Enter Officer Passkey"
        value={officerPasskey}
        onChange={(e) =>
          setOfficerPasskey(e.target.value)
        }
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="flex gap-4 mt-6">

        {/* Verify button — checks passkey and sets or rejects the role */}
        <button
          onClick={() => {

            // Select the correct passkey based on which role was chosen
            const correctPasskey =

                selectedRole === "OFFICER"
                  ? OFFICER_PASSKEY
                  : ADMIN_PASSKEY

              if (
                officerPasskey === correctPasskey
              ) {

                // Correct passkey — apply the selected role
                setFormData({
                  ...formData,
                  role: selectedRole,
                })

                toast.success(
                  `${selectedRole} Access Granted ✅`
                )

              } else {

                // Wrong passkey — fall back to FARMER role
                setFormData({
                  ...formData,
                  role: "FARMER",
                })

                toast.error(
                  "Invalid Passkey ❌"
                )
              }

            setOfficerPasskey("")
            setShowPasskeyModal(false)

          }}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition"
        >
          Verify
        </button>

        {/* Cancel button — closes modal and resets role to FARMER */}
        <button
          onClick={() => {

            setShowPasskeyModal(false)

            setOfficerPasskey("")

            setFormData({
              ...formData,
              role: "FARMER"
            })
          }}
          className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl transition"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  )
}

export default Register
