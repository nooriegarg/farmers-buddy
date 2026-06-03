import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import FarmerSidebar  from "../../components/FarmerSidebar"
import OfficerSidebar from "../../components/OfficerSidebar"
import AdminSidebar   from "../../components/AdminSidebar"
import ExpertSidebar  from "../../components/ExpertSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"

import { getProfile, updateProfile, deleteProfile } from "../../services/profileService"

import { FaUserCircle, FaSave, FaPhone, FaMapMarkerAlt, FaInfoCircle, FaCamera, FaTrash } from "react-icons/fa"

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

  const user     = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const [form, setForm]         = useState({ name: "", phone: "", location: "", bio: "", profileImageUrl: "" })
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  // Convert uploaded image file to base64 and store in form state
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setForm((prev) => ({ ...prev, profileImageUrl: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast.error("Name is required")
      return
    }
    setSaving(true)
    try {
      const updated = await updateProfile(user.id, form)
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

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteProfile(user.id)
      localStorage.removeItem("user")
      toast.success("Account deleted")
      navigate("/")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete account ❌")
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const Sidebar  = sidebars[user?.role] || <FarmerSidebar />
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

        <div className="flex-1 p-8 flex justify-center">

          {fetching ? (
            <LoadingSpinner message="Loading profile..." />
          ) : (
            <div className="w-full max-w-2xl space-y-6">

              {/* Profile card */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

                {/* Avatar + upload */}
                <div className="flex flex-col items-center mb-8">
                  <div className={`relative ring-4 ${avatarRing[user?.role] || "ring-green-500"} rounded-full mb-4`}>
                    {form.profileImageUrl ? (
                      <img
                        src={form.profileImageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-extrabold text-gray-400">
                          {form.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                    )}

                    {/* Camera overlay button */}
                    <label className="absolute bottom-0 right-0 bg-white border border-gray-200 shadow-md rounded-full p-1.5 cursor-pointer hover:bg-gray-50 transition">
                      <FaCamera className="text-gray-500 text-xs" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800">{form.name || "—"}</h2>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                  <span className="inline-block mt-1 text-xs font-bold bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full">
                    {user?.role}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">Click the camera icon to upload a profile photo</p>
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

                  {/* Read-only email */}
                  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Email (read-only)</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit" disabled={saving}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition shadow-md ${
                        saving ? "bg-gray-400 cursor-not-allowed" : btnStyle
                      }`}
                    >
                      <FaSave className="text-xs" />
                      {saving ? "Saving..." : "Save Profile"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-red-600 text-sm border-2 border-red-200 hover:bg-red-50 transition"
                    >
                      <FaTrash className="text-xs" />
                      Delete Account
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---- Delete Confirmation Modal ---- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-2xl mb-3">
                <FaTrash className="text-red-600 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Account?</h2>
              <p className="text-gray-500 text-sm mt-2">
                This will permanently delete your account and all your data. This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`flex-1 py-3 rounded-xl font-bold text-white text-sm transition ${
                  deleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
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

export default Profile
