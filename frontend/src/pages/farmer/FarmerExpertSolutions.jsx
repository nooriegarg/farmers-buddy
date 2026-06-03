import { useEffect, useState } from "react"

import FarmerSidebar  from "../../components/FarmerSidebar"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllSolutions } from "../../services/expertSolutionService"

import { FaLightbulb, FaChevronDown, FaChevronUp } from "react-icons/fa"

const categoryStyle = {
  "Pest Control":         { tag: "bg-red-100 text-red-700"    },
  "Irrigation":           { tag: "bg-blue-100 text-blue-700"  },
  "Fertilizer":           { tag: "bg-yellow-100 text-yellow-700" },
  "Crop Disease":         { tag: "bg-orange-100 text-orange-700" },
  "Organic Farming":      { tag: "bg-green-100 text-green-700" },
  "Other":                { tag: "bg-gray-100 text-gray-700"  },
}
const defaultTagStyle = "bg-violet-100 text-violet-700"

function FarmerExpertSolutions() {

  const [solutions, setSolutions] = useState([])
  const [fetching, setFetching]   = useState(true)
  const [expanded, setExpanded]   = useState({})

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllSolutions()
        setSolutions(data)
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
            <p className="text-green-300 text-sm font-medium mb-1">Knowledge Base</p>
            <h1 className="text-3xl font-extrabold text-white">Expert Guidance 💡</h1>
            <p className="text-green-200 text-sm mt-1">
              Farming tips, techniques, and solutions published by agriculture experts.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Published Guidance</h2>
            {!fetching && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                {solutions.length} {solutions.length === 1 ? "article" : "articles"}
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading expert guidance..." />
          ) : solutions.length === 0 ? (
            <EmptyState
              icon="💡"
              message="No expert guidance published yet"
              subtext="Agriculture experts will post farming tips and solutions here"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {solutions.map((s) => {
                const tagStyle = (categoryStyle[s.category] || {}).tag || defaultTagStyle
                const isExpanded = !!expanded[s.id]
                const longDesc = s.description && s.description.length > 160
                return (
                  <div key={s.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-xl text-green-700">
                          <FaLightbulb />
                        </div>
                        <h3 className="font-bold text-gray-800 leading-snug">{s.title}</h3>
                      </div>
                      {s.category && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${tagStyle}`}>
                          {s.category}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {longDesc && !isExpanded
                        ? s.description.slice(0, 160) + "…"
                        : s.description}
                    </p>

                    {longDesc && (
                      <button
                        onClick={() => toggleExpand(s.id)}
                        className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900 transition"
                      >
                        {isExpanded ? <><FaChevronUp className="text-xs" /> Show Less</> : <><FaChevronDown className="text-xs" /> Read More</>}
                      </button>
                    )}

                    {s.postedBy && (
                      <p className="text-xs text-gray-400 mt-4">
                        By <span className="font-semibold text-gray-500">{s.postedBy}</span>
                        {s.createdDate && <span className="ml-2">· {s.createdDate}</span>}
                      </p>
                    )}

                  </div>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default FarmerExpertSolutions
