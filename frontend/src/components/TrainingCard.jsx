// =============================================================
// TrainingCard.jsx — Reusable Training Session Card Component
// =============================================================
// Displays a single training session with its details.
// Used in: Trainings.jsx (farmer and officer views)
//
// Props:
//   training   — Training object { title, description, location, date,
//                                  time, officerName, maxParticipants, status }
//   enrolled   — boolean — true if the current farmer has already joined
//   onEnroll   — function() — called when the farmer clicks "Join Training"
//   isOfficer  — boolean — hides enroll button for officer role
// =============================================================

import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUserTie, FaUsers } from "react-icons/fa"

function TrainingCard({ training, enrolled = false, onEnroll, isOfficer = false, enrolling = false }) {

  const isUpcoming = training.status === "UPCOMING"

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">

      {/* Colored header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-base leading-tight">{training.title}</h3>
          <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
            isUpcoming
              ? "bg-amber-400 text-amber-900"
              : "bg-gray-300 text-gray-700"
          }`}>
            {training.status || "UPCOMING"}
          </span>
        </div>
        <p className="text-blue-200 text-xs mt-1 flex items-center gap-1">
          <FaUserTie className="text-xs" />
          {training.officerName}
        </p>
      </div>

      {/* Card body */}
      <div className="p-5">

        {training.description && (
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{training.description}</p>
        )}

        {/* Info row */}
        <div className="space-y-2 mb-4">

          {training.date && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt className="text-blue-500 text-xs shrink-0" />
              <span>{training.date}</span>
            </div>
          )}

          {training.time && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaClock className="text-blue-500 text-xs shrink-0" />
              <span>{training.time}</span>
            </div>
          )}

          {training.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-blue-500 text-xs shrink-0" />
              <span>{training.location}</span>
            </div>
          )}

          {training.maxParticipants > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaUsers className="text-blue-500 text-xs shrink-0" />
              <span>Max {training.maxParticipants} participants</span>
            </div>
          )}
        </div>

        {/* Enroll button — only for farmers, only for upcoming trainings */}
        {!isOfficer && (
          enrolled ? (
            <div className="w-full text-center py-2.5 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
              ✅ Enrolled
            </div>
          ) : isUpcoming ? (
            <button
              onClick={onEnroll}
              disabled={enrolling}
              className={`w-full py-2.5 rounded-xl text-sm font-bold transition shadow-md shadow-blue-100 ${
                enrolling
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white"
              }`}
            >
              {enrolling ? "Enrolling..." : "Join Training"}
            </button>
          ) : (
            <div className="w-full text-center py-2.5 bg-gray-100 text-gray-500 rounded-xl text-sm font-medium">
              Training Completed
            </div>
          )
        )}

      </div>
    </div>
  )
}

export default TrainingCard
