import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import ExpertSidebar  from "../../components/ExpertSidebar"
import QueryCard      from "../../components/QueryCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import EmptyState     from "../../components/EmptyState"

import { getAllQueries, expertReplyToQuery } from "../../services/queryService"

function ExpertQueries() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [queries, setQueries]     = useState([])
  const [fetching, setFetching]   = useState(true)
  const [replies, setReplies]     = useState({})   // { queryId: replyText }
  const [submitting, setSubmitting] = useState(null) // queryId currently being submitted

  useEffect(() => {
    getAllQueries()
      .then(setQueries)
      .catch(console.error)
      .finally(() => setFetching(false))
  }, [])

  const handleReplyChange = (id, text) => {
    setReplies((prev) => ({ ...prev, [id]: text }))
  }

  const handleReply = async (query) => {
    const text = replies[query.id]?.trim()
    if (!text) {
      toast.error("Please enter a reply before submitting")
      return
    }
    setSubmitting(query.id)
    try {
      const updated = await expertReplyToQuery(query.id, { expertReply: text })
      setQueries(queries.map((q) => (q.id === query.id ? updated : q)))
      setReplies((prev) => ({ ...prev, [query.id]: "" }))
      toast.success("Reply submitted ✅")
    } catch (err) {
      console.error(err)
      toast.error("Failed to submit reply ❌")
    } finally {
      setSubmitting(null)
    }
  }

  const pending  = queries.filter((q) => q.status === "PENDING").length
  const resolved = queries.filter((q) => q.status === "RESOLVED").length

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <ExpertSidebar />

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-violet-300 text-sm font-medium mb-1">Expert Panel</p>
            <h1 className="text-3xl font-extrabold text-white">Farmer Queries ❓</h1>
            <p className="text-violet-200 text-sm mt-1">
              Review farmer questions and provide expert agricultural guidance.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">All Farmer Queries</h2>
              {!fetching && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {queries.length} total · {resolved} resolved · {pending} awaiting response
                </p>
              )}
            </div>
            {!fetching && (
              <span className="text-xs bg-violet-100 text-violet-700 font-semibold px-3 py-1 rounded-full">
                {queries.length} {queries.length === 1 ? "query" : "queries"}
              </span>
            )}
          </div>

          {fetching ? (
            <LoadingSpinner message="Loading farmer queries..." />
          ) : queries.length === 0 ? (
            <EmptyState
              icon="❓"
              message="No queries submitted yet"
              subtext="Farmer queries will appear here for you to respond to"
            />
          ) : (
            <div className="space-y-4">
              {queries.map((query) => (
                <QueryCard
                  key={query.id}
                  query={query}
                  showFarmerName={true}
                  accentColor="violet"
                  replyLabel="Expert Reply"
                  replyText={submitting === query.id ? "" : (replies[query.id] || "")}
                  onReplyChange={(text) => handleReplyChange(query.id, text)}
                  onReply={() => handleReply(query)}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ExpertQueries
