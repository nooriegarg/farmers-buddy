// =============================================================
// ProtectedRoute.jsx — Route Authentication + Role Guard
// =============================================================
// Behavior:
//   1. No session (no localStorage user) → redirect to /login
//   2. Session exists but role not in allowedRoles → redirect to
//      the user's own dashboard (prevents cross-role URL access)
//   3. Session exists and role is allowed → render the page
//
// Usage in App.jsx:
//   <ProtectedRoute allowedRoles={["FARMER"]}>
//     <FarmerDashboard />
//   </ProtectedRoute>
//
// If allowedRoles is omitted, only the login check applies.
// =============================================================

import { Navigate } from "react-router-dom"

// Maps each role to its own dashboard path
const roleDashboard = {
  FARMER:  "/farmer-dashboard",
  OFFICER: "/officer-dashboard",
  ADMIN:   "/admin-dashboard",
  EXPERT:  "/expert-dashboard",
}

function ProtectedRoute({ children, allowedRoles }) {

  const stored = localStorage.getItem("user")

  // Not logged in — send to login
  if (!stored) {
    return <Navigate to="/login" />
  }

  const user = JSON.parse(stored)

  // Role check — if allowedRoles is specified and user's role isn't in it,
  // redirect them to their own dashboard instead of showing an error
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirectTo = roleDashboard[user.role] || "/login"
    return <Navigate to={redirectTo} />
  }

  return children
}

export default ProtectedRoute
