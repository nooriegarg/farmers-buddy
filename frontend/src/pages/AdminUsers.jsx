import { useEffect, useState } from "react"

import AdminSidebar   from "../components/AdminSidebar"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState     from "../components/EmptyState"

import API from "../services/api"

import { FaUsers, FaUserTie, FaTractor, FaShieldAlt, FaFlask } from "react-icons/fa"

const roleBadge = {
  FARMER:  { label: "Farmer",  color: "bg-green-100 text-green-700",   icon: <FaTractor className="text-xs" /> },
  OFFICER: { label: "Officer", color: "bg-blue-100 text-blue-700",    icon: <FaUserTie className="text-xs" /> },
  ADMIN:   { label: "Admin",   color: "bg-red-100 text-red-700",      icon: <FaShieldAlt className="text-xs" /> },
  EXPERT:  { label: "Expert",  color: "bg-violet-100 text-violet-700", icon: <FaFlask className="text-xs" /> },
}

function AdminUsers() {

  const [users, setUsers]       = useState([])
  const [fetching, setFetching] = useState(true)
  const [search, setSearch]     = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/auth/users")
        setUsers(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const farmers  = users.filter((u) => u.role === "FARMER").length
  const officers = users.filter((u) => u.role === "OFFICER").length
  const admins   = users.filter((u) => u.role === "ADMIN").length
  const experts  = users.filter((u) => u.role === "EXPERT").length

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-red-300 text-sm font-medium mb-1">Admin Panel</p>
            <h1 className="text-3xl font-extrabold text-white">User Management 👥</h1>
            <p className="text-red-200 text-sm mt-1">
              View all registered farmers, officers, and admins on the platform.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          {/* Summary stats */}
          {!fetching && (
            <div className="grid md:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl"><FaTractor className="text-green-700 text-xl" /></div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-800">{farmers}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Farmers</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl"><FaUserTie className="text-blue-700 text-xl" /></div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-800">{officers}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Officers</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-xl"><FaShieldAlt className="text-red-700 text-xl" /></div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-800">{admins}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Admins</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="bg-violet-100 p-3 rounded-xl"><FaFlask className="text-violet-700 text-xl" /></div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-800">{experts}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Experts</p>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">All Registered Users</h2>
              {!fetching && (
                <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
                  {users.length} total
                </span>
              )}
            </div>

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 mb-4"
            />

            {fetching ? (
              <LoadingSpinner message="Loading users..." />
            ) : filtered.length === 0 ? (
              <EmptyState icon="👥" message="No users found" subtext="Try adjusting your search" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">ID</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Name</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((u) => {
                      const badge = roleBadge[u.role] || { label: u.role, color: "bg-gray-100 text-gray-700", icon: <FaUsers className="text-xs" /> }
                      return (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-400 text-xs">{u.id}</td>
                          <td className="px-4 py-3 font-semibold text-gray-800">{u.name}</td>
                          <td className="px-4 py-3 text-gray-500">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${badge.color}`}>
                              {badge.icon} {badge.label}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
