// =============================================================
// Navbar.jsx — Top Navigation Bar (Enhanced)
// =============================================================
// Persistent navigation bar shown on every page.
// - Guest view: Home | Login | Register
// - Logged-in view: Bell (notifications) | Username (→ dashboard) | Logout
// =============================================================

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaLeaf, FaBell } from "react-icons/fa"
import { getNotifications, markNotificationRead } from "../services/notificationService"

function Navbar() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const [notifications, setNotifications] = useState([])
  const [showDrop, setShowDrop]           = useState(false)
  const dropRef = useRef(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Poll every 30 seconds while logged in
  useEffect(() => {
    if (!user?.id) return
    const fetchNotifs = async () => {
      try {
        const data = await getNotifications(user.id)
        setNotifications(data)
      } catch (e) {
        
            console.error(e);
            
      }
    }
    fetchNotifs()
    const interval = setInterval(fetchNotifs, 30000)
    return () => clearInterval(interval)
  }, [user?.id])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDrop(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleMarkRead = async (id) => {
    try {
      const updated = await markNotificationRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? updated : n)))
    } catch (e) {

      console.error(e);
      
    }
  }

  const handleMarkAllRead = () => {
    notifications.filter((n) => !n.read).forEach((n) => handleMarkRead(n.id))
  }

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

            // Authenticated: bell + user name + logout
            <>
              {/* Notification Bell */}
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setShowDrop(!showDrop)}
                  className="relative flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl transition"
                >
                  <FaBell className="text-base" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full px-1 leading-none">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showDrop && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-green-700 font-semibold hover:text-green-900"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                      {notifications.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-6">No notifications yet</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => !n.read && handleMarkRead(n.id)}
                            className={`px-4 py-3 cursor-pointer transition ${
                              n.read ? "bg-white" : "bg-green-50 hover:bg-green-100"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {!n.read && (
                                <span className="mt-1.5 w-2 h-2 bg-green-600 rounded-full shrink-0" />
                              )}
                              <div className={!n.read ? "" : "pl-4"}>
                                <p className="text-sm text-gray-700 leading-snug">{n.message}</p>
                                {n.createdAt && (
                                  <p className="text-xs text-gray-400 mt-0.5">{n.createdAt}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                )}
              </div>

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
