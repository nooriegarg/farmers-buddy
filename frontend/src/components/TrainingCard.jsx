// =============================================================
// TrainingCard.jsx — Reusable Training Session Card Component
// =============================================================
// Props:
//   training       — Training object
//   enrolled       — boolean — true if farmer already joined
//   onEnroll       — function() — farmer clicks "Join Training"
//   isOfficer      — boolean — shows officer actions instead of enroll button
//   enrolling      — boolean — disables enroll button while request is in flight
//   onDelete       — function() — officer deletes this training
//   onMarkComplete — function() — officer marks this training as completed
// =============================================================

import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUserTie, FaUsers, FaTrash, FaCheckCircle } from "react-icons/fa"

function TrainingCard({ training, enrolled = false, onEnroll, isOfficer = false, enrolling = false, onDelete, onMarkComplete }) {

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

        {/* Officer actions */}
        {isOfficer && (
          <div className="flex gap-2 mt-2">
            {isUpcoming && onMarkComplete && (
              <button
                onClick={onMarkComplete}
                className="flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-900 border border-green-200 hover:border-green-400 rounded-lg px-3 py-1.5 transition"
              >
                <FaCheckCircle className="text-xs" />
                Mark Complete
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition"
              >
                <FaTrash className="text-xs" />
                Delete
              </button>
            )}
          </div>
        )}

        {/* Farmer enroll button */}
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
