import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar  from "../components/FarmerSidebar"
import OfficerSidebar from "../components/OfficerSidebar"
import AdminSidebar   from "../components/AdminSidebar"
import ExpertSidebar  from "../components/ExpertSidebar"
import LoadingSpinner from "../components/LoadingSpinner"

import { getProfile, updateProfile } from "../services/profileService"

import { FaUserCircle, FaSave, FaPhone, FaMapMarkerAlt, FaInfoCircle, FaImage } from "react-icons/fa"

// Role → sidebar component map
const sidebars = {
  FARMER:  <FarmerSidebar />,
  OFFICER: <OfficerSidebar />,
  ADMIN:   <AdminSidebar />,
  EXPERT:  <ExpertSidebar />,
}

// Role → banner gradient
const bannerStyle = {
  FARMER:  "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)",
  OFFICER: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #2563eb 100%)",
  ADMIN:   "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)",
  EXPERT:  "linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #7c3aed 100%)",
}

// Role → ring color for avatar
const avatarRing = {
  FARMER:  "ring-green-500",
  OFFICER: "ring-blue-500",
  ADMIN:   "ring-red-500",
  EXPERT:  "ring-violet-500",
}

// Role → save button gradient
const saveButtonStyle = {
  FARMER:  "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800",
  OFFICER: "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800",
  ADMIN:   "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800",
  EXPERT:  "bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-800",
}

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [form, setForm]       = useState({
    name: "", phone: "", location: "", bio: "", profileImageUrl: ""
  })
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving]     = useState(false)

  // Load full profile from backend on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProfile(user.id)
        if (data) {
          setForm({
            name:            data.name            || "",
            phone:           data.phone           || "",
            location:        data.location        || "",
            bio:             data.bio             || "",
            profileImageUrl: data.profileImageUrl || "",
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast.error("Name is required")
      return
    }
    setSaving(true)
    try {
      const updated = await updateProfile(user.id, form)
      // Update localStorage so Navbar reflects new name immediately
      const updatedUser = { ...user, name: updated.name, profileImageUrl: updated.profileImageUrl }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      toast.success("Profile saved ✅")
    } catch (err) {
      console.error(err)
      toast.error("Failed to save profile ❌")
    } finally {
      setSaving(false)
    }
  }

  const Sidebar = sidebars[user?.role] || <FarmerSidebar />
  const btnStyle = saveButtonStyle[user?.role] || saveButtonStyle.FARMER

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {Sidebar}

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: bannerStyle[user?.role] || bannerStyle.FARMER }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-white/60 text-sm font-medium mb-1">Account Settings</p>
            <h1 className="text-3xl font-extrabold text-white">My Profile 👤</h1>
            <p className="text-white/70 text-sm mt-1">
              View and update your personal information.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8">

          {fetching ? (
            <LoadingSpinner message="Loading profile..." />
          ) : (
            <div className="max-w-2xl space-y-6">

              {/* Profile card */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

                {/* Avatar + read-only info */}
                <div className="flex items-center gap-5 mb-6">
                  <div className={`ring-4 ${avatarRing[user?.role] || "ring-green-500"} rounded-full`}>
                    {form.profileImageUrl ? (
                      <img
                        src={form.profileImageUrl}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-extrabold text-gray-400">
                          {form.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{form.name || "—"}</h2>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                    <span className="inline-block mt-1 text-xs font-bold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                      {user?.role}
                    </span>
                  </div>
                </div>

                {/* Edit form */}
                <form onSubmit={handleSave} className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder="Your full name"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text" name="location" value={form.location} onChange={handleChange}
                        placeholder="Village, District, State"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">About / Bio</label>
                    <div className="relative">
                      <FaInfoCircle className="absolute left-4 top-4 text-gray-400 text-sm" />
                      <textarea
                        name="bio" value={form.bio} onChange={handleChange} rows="3"
                        placeholder="Tell others a bit about yourself..."
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 resize-none"
                      />
                    </div>
                  </div>

                  {/* Profile Image URL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile Image URL</label>
                    <div className="relative">
                      <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text" name="profileImageUrl" value={form.profileImageUrl} onChange={handleChange}
                        placeholder="https://example.com/photo.jpg (optional)"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Read-only email info */}
                  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Email (read-only)</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>

                  <button
                    type="submit" disabled={saving}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition shadow-md ${
                      saving ? "bg-gray-400 cursor-not-allowed" : btnStyle
                    }`}
                  >
                    <FaSave className="text-xs" />
                    {saving ? "Saving..." : "Save Profile"}
                  </button>

                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
