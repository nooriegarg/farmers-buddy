import { useEffect, useState } from "react"

import FarmerSidebar    from "../../components/FarmerSidebar"
import LoadingSpinner   from "../../components/LoadingSpinner"
import EmptyState       from "../../components/EmptyState"

import { getAllAwarenessDrives } from "../../services/awarenessService"

import { FaBullhorn, FaRupeeSign, FaShieldAlt, FaLeaf } from "react-icons/fa"

const categoryStyle = {
  Scheme: { bg: "bg-gradient-to-br from-green-600 to-green-500",   tag: "bg-green-100 text-green-700"  },
  Tip:    { bg: "bg-gradient-to-br from-amber-600 to-amber-500",   tag: "bg-amber-100 text-amber-700"  },
  Alert:  { bg: "bg-gradient-to-br from-red-600 to-red-500",       tag: "bg-red-100 text-red-700"      },
}
const defaultStyle = { bg: "bg-gradient-to-br from-blue-600 to-blue-500", tag: "bg-blue-100 text-blue-700" }

const categoryIcon = {
  Scheme: <FaRupeeSign />,
  Tip:    <FaLeaf />,
  Alert:  <FaShieldAlt />,
}

function Awareness() {

  const [drives, setDrives]     = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllAwarenessDrives()
        setDrives(data)
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
            <p className="text-green-300 text-sm font-medium mb-1">Government Initiatives</p>
            <h1 className="text-3xl font-extrabold text-white">Awareness Drives 📢</h1>
            <p className="text-green-200 text-sm mt-1">
              Government schemes, farming tips, and important alerts published by officers.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Published Drives</h2>
            {!fetching && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                {drives.length} {drives.length === 1 ? "drive" : "drives"}
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading awareness drives..." />
          ) : drives.length === 0 ? (
            <EmptyState icon="📢" message="No awareness drives yet" subtext="Check back later for government schemes and farming tips" />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {drives.map((drive) => {
                const style = categoryStyle[drive.category] || defaultStyle
                const icon  = categoryIcon[drive.category] || <FaBullhorn />
                return (
                  <div key={drive.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">

                    <div className={`${style.bg} px-5 py-4 flex items-center gap-3`}>
                      <div className="bg-white/20 p-2 rounded-xl text-white text-lg">{icon}</div>
                      <div>
                        <h3 className="text-white font-bold">{drive.title}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 ${style.tag}`}>
                          {drive.category}
                        </span>
                      </div>
                    </div>

                    {drive.imageUrl && (
                      <img src={drive.imageUrl} alt={drive.title} className="w-full h-40 object-cover" />
                    )}

                    <div className="p-5">
                      <p className="text-sm text-gray-600 leading-relaxed">{drive.description}</p>
                      {drive.publishedBy && (
                        <p className="text-xs text-gray-400 mt-3">
                          By <span className="font-semibold text-gray-500">{drive.publishedBy}</span>
                          {drive.createdDate && <span className="ml-2">· {drive.createdDate}</span>}
                        </p>
                      )}
                    </div>

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

export default Awareness
