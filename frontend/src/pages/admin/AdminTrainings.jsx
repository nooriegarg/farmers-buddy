import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import AdminSidebar   from "../../components/AdminSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import {
  getAllTrainings,
  deleteTraining,
  markTrainingCompleted,
  getTrainingEnrollments,
} from "../../services/trainingService"

import {
  FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUserTie,
  FaUsers, FaTrash, FaCheckCircle, FaChevronDown, FaChevronUp,
} from "react-icons/fa"

function AdminTrainings() {

  const [trainings, setTrainings]         = useState([])
  const [fetching, setFetching]           = useState(true)
  const [enrollments, setEnrollments]     = useState({})   // { trainingId: [...] }
  const [showEnroll, setShowEnroll]       = useState({})   // { trainingId: bool }
  const [loadingEnroll, setLoadingEnroll] = useState({})   // { trainingId: bool }

  useEffect(() => {
    getAllTrainings()
      .then(setTrainings)
      .catch(console.error)
      .finally(() => setFetching(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this training session? This cannot be undone.")) return
    try {
      await deleteTraining(id)
      toast.success("Training deleted ✅")
      setTrainings(trainings.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete ❌")
    }
  }

  const handleMarkComplete = async (id) => {
    try {
      const updated = await markTrainingCompleted(id)
      setTrainings(trainings.map((t) => (t.id === id ? updated : t)))
      toast.success("Marked as completed ✅")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update ❌")
    }
  }

  const toggleEnrollments = async (id) => {
    const nowOpen = !showEnroll[id]
    setShowEnroll((prev) => ({ ...prev, [id]: nowOpen }))

    // Only fetch once
    if (nowOpen && !enrollments[id]) {
      setLoadingEnroll((prev) => ({ ...prev, [id]: true }))
      try {
        const data = await getTrainingEnrollments(id)
        setEnrollments((prev) => ({ ...prev, [id]: data }))
      } catch (err) {
        console.error(err)
        toast.error("Could not load enrollments")
      } finally {
        setLoadingEnroll((prev) => ({ ...prev, [id]: false }))
      }
    }
  }

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
            <h1 className="text-3xl font-extrabold text-white">Training Sessions 📅</h1>
            <p className="text-red-200 text-sm mt-1">
              View, manage, and moderate all training sessions on the platform.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">All Training Sessions</h2>
            {!fetching && (
              <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
                {trainings.length} sessions
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading training sessions..." />
          ) : trainings.length === 0 ? (
            <EmptyState icon="📅" message="No training sessions yet" subtext="Officers create training sessions on their dashboard" />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {trainings.map((training) => {
                const isUpcoming = training.status === "UPCOMING"
                const enrolled   = enrollments[training.id] || []
                const isOpen     = !!showEnroll[training.id]
                const loading    = !!loadingEnroll[training.id]

                return (
                  <div key={training.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-bold text-base leading-tight">{training.title}</h3>
                        <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                          isUpcoming ? "bg-amber-400 text-amber-900" : "bg-gray-300 text-gray-700"
                        }`}>
                          {training.status || "UPCOMING"}
                        </span>
                      </div>
                      <p className="text-blue-200 text-xs mt-1 flex items-center gap-1">
                        <FaUserTie className="text-xs" /> {training.officerName}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      {training.description && (
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{training.description}</p>
                      )}

                      <div className="space-y-1.5 mb-4 text-sm text-gray-600">
                        {training.date && (
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500 text-xs shrink-0" />
                            <span>{training.date}</span>
                          </div>
                        )}
                        {training.time && (
                          <div className="flex items-center gap-2">
                            <FaClock className="text-blue-500 text-xs shrink-0" />
                            <span>{training.time}</span>
                          </div>
                        )}
                        {training.location && (
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-500 text-xs shrink-0" />
                            <span>{training.location}</span>
                          </div>
                        )}
                        {training.maxParticipants > 0 && (
                          <div className="flex items-center gap-2">
                            <FaUsers className="text-blue-500 text-xs shrink-0" />
                            <span>Max {training.maxParticipants} participants</span>
                          </div>
                        )}
                      </div>

                      {/* Admin actions */}
                      <div className="flex flex-wrap gap-2">
                        {isUpcoming && (
                          <button
                            onClick={() => handleMarkComplete(training.id)}
                            className="flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-900 border border-green-200 hover:border-green-400 rounded-lg px-3 py-1.5 transition"
                          >
                            <FaCheckCircle className="text-xs" /> Mark Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(training.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition"
                        >
                          <FaTrash className="text-xs" /> Delete
                        </button>
                        <button
                          onClick={() => toggleEnrollments(training.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 border border-blue-200 hover:border-blue-400 rounded-lg px-3 py-1.5 transition ml-auto"
                        >
                          <FaUsers className="text-xs" />
                          {isOpen ? "Hide Enrollments" : "View Enrollments"}
                          {isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                        </button>
                      </div>

                      {/* Enrollment list */}
                      {isOpen && (
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">
                            Enrolled Farmers
                          </p>
                          {loading ? (
                            <p className="text-xs text-gray-400">Loading...</p>
                          ) : enrolled.length === 0 ? (
                            <p className="text-xs text-gray-400 italic">No farmers enrolled yet.</p>
                          ) : (
                            <ul className="space-y-1.5">
                              {enrolled.map((e) => (
                                <li key={e.id} className="flex items-center justify-between text-sm">
                                  <span className="font-medium text-gray-700">{e.farmerName}</span>
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                    {e.status}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTrainings
