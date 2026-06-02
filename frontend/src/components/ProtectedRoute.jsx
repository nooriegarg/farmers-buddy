// =============================================================
// ProtectedRoute.jsx — Route Authentication Guard
// =============================================================
// This component acts as a gatekeeper for all protected pages.
// It checks whether the user has an active session by looking for
// the "user" key in localStorage (set during login).
//
// Behavior:
//   - If "user" exists in localStorage → render the requested page (children)
//   - If "user" is missing (not logged in) → redirect to /login
//
// Usage in App.jsx:
//   <ProtectedRoute>
//     <FarmerDashboard />
//   </ProtectedRoute>
//
// Viva Tip: This is client-side route protection. The backend also
// independently validates requests. This prevents UI access to
// protected pages when the user is not logged in.
// =============================================================

import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

  // Read the user session from localStorage
  const user = localStorage.getItem("user")

  // If no session found, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />
  }

  // Session exists — render the protected child component
  return children
}

export default ProtectedRoute
