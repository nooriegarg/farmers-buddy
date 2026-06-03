import { useEffect, useState } from "react"

import FarmerSidebar  from "../../components/FarmerSidebar"
import ToolCard       from "../../components/ToolCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllTools } from "../../services/toolService"

function ToolsCatalog() {

  const [tools, setTools]       = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllTools()
        setTools(data)
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

      <FarmerSidebar />

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-green-300 text-sm font-medium mb-1">Equipment Reference</p>
            <h1 className="text-3xl font-extrabold text-white">Farmer Tools Catalog 🛠️</h1>
            <p className="text-green-200 text-sm mt-1">
              Browse essential farming equipment and their agricultural uses.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Farming Equipment</h2>
            {!fetching && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                {tools.length} {tools.length === 1 ? "tool" : "tools"}
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading tools catalog..." />
          ) : tools.length === 0 ? (
            <EmptyState icon="🛠️" message="No tools in the catalog yet" subtext="Tools added by admins and experts will appear here" />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isAdmin={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToolsCatalog
