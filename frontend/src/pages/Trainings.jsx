import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar  from "../components/FarmerSidebar"
import TrainingCard   from "../components/TrainingCard"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState     from "../components/EmptyState"

import { getAllTrainings, enrollTraining, getMyEnrollments } from "../services/trainingService"

function Trainings() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [trainings, setTrainings]     = useState([])
  const [enrolledIds, setEnrolledIds] = useState(new Set())
  const [enrolling, setEnrolling]     = useState(null) // holds the trainingId being enrolled
  const [fetching, setFetching]       = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [data, enrollments] = await Promise.all([
          getAllTrainings(),
          getMyEnrollments(user.id),
        ])
        setTrainings(data)
        setEnrolledIds(new Set(enrollments.map((e) => e.trainingId)))
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  // ---- Farmer enrolls in a training ----
  const handleEnroll = async (trainingId) => {
    if (enrolling) return // prevent double-click while in flight
    setEnrolling(trainingId)
    try {
      await enrollTraining({ trainingId, farmerName: user.name, farmerId: user.id })
      toast.success("Enrolled successfully ✅")
      setEnrolledIds((prev) => new Set([...prev, trainingId]))
    } catch (err) {
      console.error(err)
      toast.error("Enrollment failed ❌")
    } finally {
      setEnrolling(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <FarmerSidebar />

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-green-300 text-sm font-medium mb-1">Learning & Development</p>
            <h1 className="text-3xl font-extrabold text-white">Training Sessions 📅</h1>
            <p className="text-green-200 text-sm mt-1">
              Join training sessions organized by agriculture officers.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Available Trainings</h2>
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
              subtext="Check back later for upcoming training sessions"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {trainings.map((training) => (
                <TrainingCard
                  key={training.id}
                  training={training}
                  enrolled={enrolledIds.has(training.id)}
                  onEnroll={() => handleEnroll(training.id)}
                  isOfficer={false}
                  enrolling={enrolling === training.id}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Trainings
