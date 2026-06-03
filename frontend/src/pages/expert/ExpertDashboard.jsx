import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ExpertSidebar  from "../../components/ExpertSidebar"
import StatsCard      from "../../components/StatsCard"
import LoadingSpinner from "../../components/LoadingSpinner"

import { getMySolutions } from "../../services/expertSolutionService"
import { getAllTools }     from "../../services/toolService"

import { FaLightbulb, FaTools, FaArrowRight } from "react-icons/fa"

function ExpertDashboard() {

  const navigate = useNavigate()
  const user     = JSON.parse(localStorage.getItem("user"))

  const [solutionCount, setSolutionCount] = useState(0)
  const [toolCount, setToolCount]         = useState(0)
  const [fetching, setFetching]           = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [solutions, tools] = await Promise.all([
          getMySolutions(user.id),
          getAllTools(),
        ])
        setSolutionCount(solutions.length)
        // Count only tools added by this expert
        setToolCount(tools.filter((t) => t.addedBy === user.name).length)
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <ExpertSidebar />

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #7c3aed 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-8 right-32 w-24 h-24 bg-amber-400/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-violet-300 text-sm font-medium mb-1">Agriculture Specialist</p>
            <h1 className="text-3xl font-extrabold text-white">
              Welcome, {user.name}
            </h1>
            <p className="text-violet-200 text-sm mt-1">
              Share your expertise — upload tools and farming solutions for the community.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-8">

          {fetching ? (
            <LoadingSpinner message="Loading your stats..." />
          ) : (
            <>
              {/* Stats */}
              <div className="grid md:grid-cols-2 gap-5">
                <StatsCard icon={<FaLightbulb />} label="Solutions Uploaded" value={solutionCount} color="purple" />
                <StatsCard icon={<FaTools />}      label="Tools Uploaded"     value={toolCount}     color="purple" />
              </div>

              {/* Quick actions */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-violet-100 p-3 rounded-xl w-fit mb-4">
                    <FaLightbulb className="text-violet-700 text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">My Farming Solutions</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Post articles and tips on pest control, irrigation, fertilizer use, and crop diseases.
                  </p>
                  <button
                    onClick={() => navigate("/expert/solutions")}
                    className="flex items-center gap-2 text-sm font-bold text-violet-700 hover:text-violet-900 transition"
                  >
                    Manage Solutions <FaArrowRight className="text-xs" />
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-amber-100 p-3 rounded-xl w-fit mb-4">
                    <FaTools className="text-amber-700 text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Upload Farming Tools</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    List farming equipment and tools with descriptions and pricing for farmers to discover.
                  </p>
                  <button
                    onClick={() => navigate("/expert/tools")}
                    className="flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition"
                  >
                    Manage Tools <FaArrowRight className="text-xs" />
                  </button>
                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default ExpertDashboard
