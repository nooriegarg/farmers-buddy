import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

// Public pages
import Home     from "./pages/shared/Home"
import Login    from "./pages/shared/Login"
import Register from "./pages/shared/Register"

// Farmer pages
import FarmerDashboard       from "./pages/farmer/FarmerDashboard"
import Recommendations       from "./pages/farmer/Recommendations"
import SoilAnalysis          from "./pages/farmer/SoilAnalysis"
import Trainings             from "./pages/farmer/Trainings"
import MandiPrices           from "./pages/farmer/MandiPrices"
import Awareness             from "./pages/farmer/Awareness"
import ToolsCatalog          from "./pages/farmer/ToolsCatalog"
import Forum                 from "./pages/farmer/Forum"
import FarmerExpertSolutions from "./pages/farmer/FarmerExpertSolutions"

// Officer pages
import OfficerDashboard       from "./pages/officer/OfficerDashboard"
import OfficerRecommendations from "./pages/officer/OfficerRecommendations"
import OfficerTrainings       from "./pages/officer/OfficerTrainings"
import OfficerAwareness       from "./pages/officer/OfficerAwareness"

// Admin pages
import AdminDashboard  from "./pages/admin/AdminDashboard"
import AdminForum      from "./pages/admin/AdminForum"
import AdminAwareness  from "./pages/admin/AdminAwareness"
import AdminTools      from "./pages/admin/AdminTools"
import AdminMandi      from "./pages/admin/AdminMandi"
import AdminUsers      from "./pages/admin/AdminUsers"
import AdminTrainings  from "./pages/admin/AdminTrainings"
import AdminSolutions  from "./pages/admin/AdminSolutions"

// Expert pages
import ExpertDashboard from "./pages/expert/ExpertDashboard"
import ExpertSolutions from "./pages/expert/ExpertSolutions"
import ExpertTools     from "./pages/expert/ExpertTools"

// Shared pages
import Profile from "./pages/shared/Profile"

function App() {
  return (
    <BrowserRouter>

      <Toaster position="top-right" />
      <Navbar />

      <Routes>

        {/* ----------------------------- */}
        {/* Public Routes                 */}
        {/* ----------------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ----------------------------- */}
        {/* Farmer Routes — /farmer/*     */}
        {/* ----------------------------- */}
        <Route path="/farmer-dashboard" element={<ProtectedRoute allowedRoles={["FARMER"]}><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/farmer/recommendations" element={<ProtectedRoute allowedRoles={["FARMER"]}><Recommendations /></ProtectedRoute>} />
        <Route path="/farmer/soil-analysis"   element={<ProtectedRoute allowedRoles={["FARMER"]}><SoilAnalysis /></ProtectedRoute>} />
        <Route path="/farmer/trainings"        element={<ProtectedRoute allowedRoles={["FARMER"]}><Trainings /></ProtectedRoute>} />
        <Route path="/farmer/mandi"            element={<ProtectedRoute allowedRoles={["FARMER"]}><MandiPrices /></ProtectedRoute>} />
        <Route path="/farmer/awareness"        element={<ProtectedRoute allowedRoles={["FARMER"]}><Awareness /></ProtectedRoute>} />
        <Route path="/farmer/tools"            element={<ProtectedRoute allowedRoles={["FARMER"]}><ToolsCatalog /></ProtectedRoute>} />
        <Route path="/farmer/forum"            element={<ProtectedRoute allowedRoles={["FARMER"]}><Forum /></ProtectedRoute>} />
        <Route path="/farmer/expert-guidance"  element={<ProtectedRoute allowedRoles={["FARMER"]}><FarmerExpertSolutions /></ProtectedRoute>} />
        <Route path="/farmer/profile"          element={<ProtectedRoute allowedRoles={["FARMER"]}><Profile /></ProtectedRoute>} />

        {/* ----------------------------- */}
        {/* Officer Routes — /officer/*   */}
        {/* ----------------------------- */}
        <Route path="/officer-dashboard"         element={<ProtectedRoute allowedRoles={["OFFICER"]}><OfficerDashboard /></ProtectedRoute>} />
        <Route path="/officer/recommendations"   element={<ProtectedRoute allowedRoles={["OFFICER"]}><OfficerRecommendations /></ProtectedRoute>} />
        <Route path="/officer/trainings"         element={<ProtectedRoute allowedRoles={["OFFICER"]}><OfficerTrainings /></ProtectedRoute>} />
        <Route path="/officer/awareness"         element={<ProtectedRoute allowedRoles={["OFFICER"]}><OfficerAwareness /></ProtectedRoute>} />
        <Route path="/officer/forum"             element={<ProtectedRoute allowedRoles={["OFFICER"]}><Forum /></ProtectedRoute>} />
        <Route path="/officer/profile"           element={<ProtectedRoute allowedRoles={["OFFICER"]}><Profile /></ProtectedRoute>} />

        {/* ----------------------------- */}
        {/* Admin Routes — /admin/*       */}
        {/* ----------------------------- */}
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/forum"     element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminForum /></ProtectedRoute>} />
        <Route path="/admin/awareness" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminAwareness /></ProtectedRoute>} />
        <Route path="/admin/tools"     element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminTools /></ProtectedRoute>} />
        <Route path="/admin/mandi"     element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminMandi /></ProtectedRoute>} />
        <Route path="/admin/users"      element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/trainings"  element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminTrainings /></ProtectedRoute>} />
        <Route path="/admin/solutions"  element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminSolutions /></ProtectedRoute>} />
        <Route path="/admin/profile"    element={<ProtectedRoute allowedRoles={["ADMIN"]}><Profile /></ProtectedRoute>} />

        {/* ----------------------------- */}
        {/* Expert Routes — /expert/*     */}
        {/* ----------------------------- */}
        <Route path="/expert-dashboard" element={<ProtectedRoute allowedRoles={["EXPERT"]}><ExpertDashboard /></ProtectedRoute>} />
        <Route path="/expert/solutions" element={<ProtectedRoute allowedRoles={["EXPERT"]}><ExpertSolutions /></ProtectedRoute>} />
        <Route path="/expert/tools"     element={<ProtectedRoute allowedRoles={["EXPERT"]}><ExpertTools /></ProtectedRoute>} />
        <Route path="/expert/forum"     element={<ProtectedRoute allowedRoles={["EXPERT"]}><Forum /></ProtectedRoute>} />
        <Route path="/expert/profile"   element={<ProtectedRoute allowedRoles={["EXPERT"]}><Profile /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
