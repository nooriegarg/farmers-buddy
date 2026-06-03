import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

// Public pages
import Home     from "./pages/Home"
import Login    from "./pages/Login"
import Register from "./pages/Register"

// Farmer pages
import FarmerDashboard    from "./pages/FarmerDashboard"
import Recommendations    from "./pages/Recommendations"
import SoilAnalysis       from "./pages/SoilAnalysis"
import Trainings          from "./pages/Trainings"
import MandiPrices        from "./pages/MandiPrices"
import Awareness          from "./pages/Awareness"
import ToolsCatalog       from "./pages/ToolsCatalog"
import Forum              from "./pages/Forum"
import FarmerExpertSolutions from "./pages/FarmerExpertSolutions"

// Officer pages
import OfficerDashboard      from "./pages/OfficerDashboard"
import OfficerRecommendations from "./pages/OfficerRecommendations"
import OfficerTrainings      from "./pages/OfficerTrainings"
import OfficerAwareness      from "./pages/OfficerAwareness"

// Admin pages
import AdminDashboard from "./pages/AdminDashboard"
import AdminForum     from "./pages/AdminForum"
import AdminAwareness from "./pages/AdminAwareness"
import AdminTools     from "./pages/AdminTools"
import AdminMandi     from "./pages/AdminMandi"
import AdminUsers     from "./pages/AdminUsers"

// Expert pages
import ExpertDashboard  from "./pages/ExpertDashboard"
import ExpertSolutions  from "./pages/ExpertSolutions"
import ExpertTools      from "./pages/ExpertTools"

// Shared pages
import Profile from "./pages/Profile"

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
        <Route path="/farmer-dashboard" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/farmer/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
        <Route path="/farmer/soil-analysis"   element={<ProtectedRoute><SoilAnalysis /></ProtectedRoute>} />
        <Route path="/farmer/trainings"        element={<ProtectedRoute><Trainings /></ProtectedRoute>} />
        <Route path="/farmer/mandi"            element={<ProtectedRoute><MandiPrices /></ProtectedRoute>} />
        <Route path="/farmer/awareness"        element={<ProtectedRoute><Awareness /></ProtectedRoute>} />
        <Route path="/farmer/tools"            element={<ProtectedRoute><ToolsCatalog /></ProtectedRoute>} />
        <Route path="/farmer/forum"            element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/farmer/expert-guidance"  element={<ProtectedRoute><FarmerExpertSolutions /></ProtectedRoute>} />
        <Route path="/farmer/profile"          element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* ----------------------------- */}
        {/* Officer Routes — /officer/*   */}
        {/* ----------------------------- */}
        <Route path="/officer-dashboard"         element={<ProtectedRoute><OfficerDashboard /></ProtectedRoute>} />
        <Route path="/officer/recommendations"   element={<ProtectedRoute><OfficerRecommendations /></ProtectedRoute>} />
        <Route path="/officer/trainings"         element={<ProtectedRoute><OfficerTrainings /></ProtectedRoute>} />
        <Route path="/officer/awareness"         element={<ProtectedRoute><OfficerAwareness /></ProtectedRoute>} />
        <Route path="/officer/profile"           element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* ----------------------------- */}
        {/* Admin Routes — /admin/*       */}
        {/* ----------------------------- */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/forum"     element={<ProtectedRoute><AdminForum /></ProtectedRoute>} />
        <Route path="/admin/awareness" element={<ProtectedRoute><AdminAwareness /></ProtectedRoute>} />
        <Route path="/admin/tools"     element={<ProtectedRoute><AdminTools /></ProtectedRoute>} />
        <Route path="/admin/mandi"     element={<ProtectedRoute><AdminMandi /></ProtectedRoute>} />
        <Route path="/admin/users"     element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* ----------------------------- */}
        {/* Expert Routes — /expert/*     */}
        {/* ----------------------------- */}
        <Route path="/expert-dashboard" element={<ProtectedRoute><ExpertDashboard /></ProtectedRoute>} />
        <Route path="/expert/solutions" element={<ProtectedRoute><ExpertSolutions /></ProtectedRoute>} />
        <Route path="/expert/tools"     element={<ProtectedRoute><ExpertTools /></ProtectedRoute>} />
        <Route path="/expert/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
