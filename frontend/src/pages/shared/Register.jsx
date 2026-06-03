// =============================================================
// Register.jsx — New User Registration Page (Enhanced)
// =============================================================
// Split-screen layout matching Login.jsx for consistency.
// Left: farming image overlay.
// Right: multi-field registration form with role selection.
//
// Passkey modal guards OFFICER, ADMIN, and EXPERT role selection.
// OFFICER_PASSKEY = "ADMIN123"
// ADMIN_PASSKEY   = "SUPERADMIN123"
// EXPERT_PASSKEY  = "EXPERT123"
// =============================================================

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../services/authService"
import toast from "react-hot-toast"
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa"

// Valid email: local@domain.tld — domain must have a dot and a TLD
const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

function validatePassword(pwd) {
  if (pwd.length < 6)               return "Password must be at least 6 characters"
  if (!/[A-Z]/.test(pwd))           return "Password must contain at least 1 uppercase letter"
  if (!/[a-z]/.test(pwd))           return "Password must contain at least 1 lowercase letter"
  if (!/[0-9]/.test(pwd))           return "Password must contain at least 1 number"
  return null
}

function Register() {

  const OFFICER_PASSKEY = "ADMIN123"
  const ADMIN_PASSKEY   = "SUPERADMIN123"
  const EXPERT_PASSKEY  = "EXPERT123"

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FARMER",
  })

  const [loading, setLoading] = useState(false)

  // Passkey modal state
  const [showPasskeyModal, setShowPasskeyModal] = useState(false)
  const [officerPasskey, setOfficerPasskey]     = useState("")
  const [selectedRole, setSelectedRole]         = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // -------------------------
  // Handle Registration Submission
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      toast.error("Please enter a valid email address (e.g. user@gmail.com)")
      return
    }

    const pwdError = validatePassword(formData.password)
    if (pwdError) {
      toast.error(pwdError)
      return
    }

    setLoading(true)

    try {

      const response = await registerUser(formData)
      console.log(response)
      toast.success("Registration Successful ✅")
      navigate("/login")

    } catch (error) {

      console.error(error)

      const msg = error.response?.data?.message || ""
      if (msg.includes("User already exists")) {
        toast.error("An account with this email already exists ❌")
      } else if (msg.includes("Invalid email")) {
        toast.error("Please enter a valid email address ❌")
      } else if (msg.includes("Password must")) {
        toast.error(msg + " ❌")
      } else {
        toast.error("Registration Failed ❌")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ================================================================ */}
      {/* LEFT SIDE — Farming background                                    */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/85 to-amber-900/60" />

        <div className="relative z-10 text-white text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-amber-500 p-3 rounded-2xl shadow-xl">
              <FaLeaf className="text-white text-2xl" />
            </div>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Join <span className="text-amber-400">Farmers Buddy</span>
          </h2>

          <p className="text-green-100 text-lg leading-relaxed max-w-md">
            Register as a Farmer or Officer and become part of India's growing agriculture support network.
          </p>

          <div className="mt-10 space-y-3 text-left max-w-xs mx-auto">
            {[
              "Free account — no subscription needed",
              "Secure role-based dashboards",
              "Direct access to agriculture experts",
              "Query tracking & history",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-green-100">
                <span className="text-amber-400 mt-0.5">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* RIGHT SIDE — Registration form                                    */}
      {/* ================================================================ */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <FaLeaf className="text-green-700 text-2xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Join Farmers Buddy today — it's free
            </p>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Min 6 chars, uppercase, lowercase, number"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                  />
                </div>
                {formData.password && validatePassword(formData.password) && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {validatePassword(formData.password)}
                  </p>
                )}
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Role</label>
                <div className="relative">
                  <FaUserTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) => {
                      const role = e.target.value
                      if (role === "OFFICER" || role === "ADMIN" || role === "EXPERT") {
                        setShowPasskeyModal(true)
                        setSelectedRole(role)
                        return
                      }
                      setFormData({ ...formData, role })
                    }}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 appearance-none"
                  >
                    <option value="FARMER">🌱 Farmer</option>
                    <option value="OFFICER">👨‍🌾 Agriculture Officer</option>
                    <option value="ADMIN">👨‍💼 Admin</option>
                    <option value="EXPERT">🧑‍🔬 Agriculture Expert</option>
                  </select>
                </div>

                {/* Role description */}
                <p className="text-xs text-gray-400 mt-1.5 ml-1">
                  {formData.role === "FARMER"  && "Submit and track your agriculture queries"}
                  {formData.role === "OFFICER" && "Review and respond to farmer queries"}
                  {formData.role === "ADMIN"   && "Manage platform users and content"}
                  {formData.role === "EXPERT"  && "Upload farming tools and solutions for the community"}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white text-sm transition shadow-md mt-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700"
                }`}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Already have an account?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link
              to="/login"
              className="block w-full py-3 text-center border-2 border-green-600 text-green-700 rounded-xl font-bold text-sm hover:bg-green-50 transition"
            >
              Sign In Instead
            </Link>

          </div>

        </div>
      </div>

      {/* ================================================================ */}
      {/* PASSKEY VERIFICATION MODAL                                        */}
      {/* ================================================================ */}
      {showPasskeyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-3">
                <span className="text-2xl">🔐</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedRole === "ADMIN" ? "Admin" : selectedRole === "EXPERT" ? "Expert" : "Officer"} Verification
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Enter the access passkey to register as {selectedRole}
              </p>
            </div>

            <input
              type="password"
              placeholder={`Enter ${selectedRole} passkey`}
              value={officerPasskey}
              onChange={(e) => setOfficerPasskey(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />

            <div className="flex gap-3">

              {/* Verify button */}
              <button
                onClick={() => {
                  const correctPasskey =
                    selectedRole === "OFFICER" ? OFFICER_PASSKEY :
                    selectedRole === "EXPERT"  ? EXPERT_PASSKEY  : ADMIN_PASSKEY
                  if (officerPasskey === correctPasskey) {
                    setFormData({ ...formData, role: selectedRole })
                    toast.success(`${selectedRole} Access Granted ✅`)
                  } else {
                    setFormData({ ...formData, role: "FARMER" })
                    toast.error("Invalid Passkey ❌")
                  }
                  setOfficerPasskey("")
                  setShowPasskeyModal(false)
                }}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold text-sm transition"
              >
                Verify Access
              </button>

              {/* Cancel button — resets role to FARMER */}
              <button
                onClick={() => {
                  setShowPasskeyModal(false)
                  setOfficerPasskey("")
                  setFormData({ ...formData, role: "FARMER" })
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm transition"
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
