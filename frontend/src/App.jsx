// =============================================================
// App.jsx — Root Application Component & Route Definitions
// =============================================================
// This is the top-level component that wraps the entire application.
// It sets up:
//   - BrowserRouter: enables client-side routing via React Router
//   - Toaster: global toast notification provider (top-right)
//   - Navbar: persistent navigation bar shown on every page
//   - Routes: maps URL paths to their corresponding page components
//
// Route Protection:
//   - Public routes (/, /login, /register) are accessible by everyone
//   - Protected routes (/farmer-dashboard, /officer-dashboard, /admin-dashboard)
//     are wrapped in <ProtectedRoute> which checks localStorage for a valid session
//   - Feature routes (/recommendations, /soil-analysis, etc.) are open pages
// =============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import FarmerDashboard from "./pages/FarmerDashboard"
import OfficerDashboard from "./pages/OfficerDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Recommendations from "./pages/Recommendations"
import SoilAnalysis from "./pages/SoilAnalysis"
import Awareness from "./pages/Awareness"
import ToolsCatalog from "./pages/ToolsCatalog"
import Forum from "./pages/Forum"
import AdminDashboard from "./pages/AdminDashboard"
import { Toaster } from "react-hot-toast"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>

      {/* Global toast notification container — displays success/error messages */}
      <Toaster position="top-right" />

      {/* Persistent top navigation bar rendered on every page */}
      <Navbar />

      <Routes>

        {/* ----------------------------- */}
        {/* Public Routes — No login needed */}
        {/* ----------------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ----------------------------- */}
        {/* Protected Routes — Require authentication */}
        {/* ProtectedRoute checks localStorage for "user" before rendering */}
        {/* ----------------------------- */}

        {/* Farmer Dashboard — accessible only to logged-in FARMER role */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Officer Dashboard — accessible only to logged-in OFFICER role */}
        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ----------------------------- */}
        {/* Feature Routes — Open pages (no auth guard) */}
        {/* ----------------------------- */}

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/soil-analysis"
          element={<SoilAnalysis />}
        />

        <Route
          path="/awareness"
          element={<Awareness />}
        />

        <Route
          path="/tools"
          element={<ToolsCatalog />}
        />

        <Route
          path="/forum"
          element={<Forum />}
        />

        {/* Admin Dashboard — accessible only to logged-in ADMIN role */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
