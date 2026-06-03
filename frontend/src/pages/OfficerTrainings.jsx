import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import OfficerSidebar from "../components/OfficerSidebar"
import TrainingCard   from "../components/TrainingCard"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState     from "../components/EmptyState"

import {
  createTraining,
  getAllTrainings,
} from "../services/trainingService"

import { FaCalendarAlt, FaPlus } from "react-icons/fa"

function OfficerTrainings() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [trainings, setTrainings]     = useState([])
  const [fetching, setFetching]       = useState(true)
  const [posting, setPosting]         = useState(false)
  const [showForm, setShowForm]       = useState(false)

  const [form, setForm] = useState({
    title: "", description: "", location: "",
    date: "", time: "", officerName: user?.name || "",
    maxParticipants: "", status: "UPCOMING"
  })

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTrainings()
        setTrainings(data)
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.date.trim()) return
    setPosting(true)
    try {
      await createTraining({ ...form, maxParticipants: Number(form.maxParticipants) || 0 })
      toast.success("Training session created ✅")
      const updated = await getAllTrainings()
      setTrainings(updated)
      setForm({ title: "", description: "", location: "", date: "", time: "", officerName: user?.name || "", maxParticipants: "", status: "UPCOMING" })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to create training ❌")
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <OfficerSidebar />

      <div className="flex-1 flex flex-col">

        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #2563eb 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-blue-300 text-sm font-medium mb-1">Officer Panel</p>
            <h1 className="text-3xl font-extrabold text-white">Training Sessions 📅</h1>
            <p className="text-blue-200 text-sm mt-1">
              Create and manage agriculture training sessions for farmers.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 text-white rounded-xl text-sm font-bold transition shadow-md"
            >
              <FaPlus className="text-xs" />
              {showForm ? "Cancel" : "Create New Training"}
            </button>

            {showForm && (
              <form onSubmit={handleCreate} className="mt-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 max-w-2xl">

                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2.5 rounded-xl">
                    <FaCalendarAlt className="text-blue-700 text-lg" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">New Training Session</h2>
                </div>

                <input
                  type="text" name="title" placeholder="Training title"
                  value={form.title} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />

                <textarea
                  name="description" rows="3" placeholder="Describe what will be covered..."
                  value={form.description} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                />

                <div className="flex gap-3">
                  <input
                    type="text" name="location" placeholder="Location (e.g. Krishi Bhavan, Delhi)"
                    value={form.location} onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                  <input
                    type="text" name="maxParticipants" placeholder="Max participants"
                    value={form.maxParticipants} onChange={handleChange}
                    className="w-36 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date</label>
                    <input
                      type="date" name="date"
                      value={form.date} onChange={handleChange} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Time</label>
                    <input
                      type="time" name="time"
                      value={form.time} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={posting}
                  className={`px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                    posting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800"
                  }`}
                >
                  {posting ? "Creating..." : "Create Training"}
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">All Training Sessions</h2>
            {!fetching && (
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">
                {trainings.length} sessions
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading training sessions..." />
          ) : trainings.length === 0 ? (
            <EmptyState
              icon="📅"
              message="No training sessions yet"
              subtext="Create a training session using the button above"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {trainings.map((training) => (
                <TrainingCard
                  key={training.id}
                  training={training}
                  enrolled={false}
                  onEnroll={null}
                  isOfficer={true}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default OfficerTrainings
