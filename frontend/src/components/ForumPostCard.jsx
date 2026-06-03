// =============================================================
// ForumPostCard.jsx — Community Forum Post with Threaded Replies
// =============================================================
// Displays a single forum post, all its replies, and a reply input.
//
// Props:
//   post          — ForumPost object { id, author, authorRole, content }
//   replies       — array of reply objects for this post
//   replyText     — current reply textarea value for this post
//   onReplyChange — function(text) — called on textarea change
//   onReply       — function()     — called when Reply button is clicked
// =============================================================

// Role → display label and badge color
const roleBadge = {
  FARMER:  { label: "Community Member",    style: "bg-green-100 text-green-700"   },
  OFFICER: { label: "Agriculture Officer", style: "bg-blue-100 text-blue-700"     },
  EXPERT:  { label: "Agriculture Expert",  style: "bg-violet-100 text-violet-700" },
  ADMIN:   { label: "Platform Admin",      style: "bg-red-100 text-red-700"       },
}
const defaultBadge = { label: "Community Member", style: "bg-gray-100 text-gray-600" }

function ForumPostCard({ post, replies = [], replyText = "", onReplyChange, onReply }) {

  const postBadge  = roleBadge[post.authorRole]  || defaultBadge

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">

      {/* ---- Post header ---- */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4">
        <div className="flex items-center gap-3">

          {/* Author avatar circle */}
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
            {post.author ? post.author.charAt(0).toUpperCase() : "?"}
          </div>

          <div>
            <p className="text-white font-semibold text-sm">
              {post.author}
            </p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${postBadge.style}`}>
              {postBadge.label}
            </span>
          </div>
        </div>
      </div>

      {/* ---- Post content ---- */}
      <div className="px-6 py-4">
        <p className="text-gray-700 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* ---- Replies section ---- */}
      {replies.length > 0 && (
        <div className="px-6 pb-4 space-y-3">

          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
            💬 {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
          </p>

          {replies.map((reply) => {
            const replyBadge = roleBadge[reply.authorRole] || defaultBadge
            return (
              <div
                key={reply.id}
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-bold text-green-700">
                    {reply.author}
                  </p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${replyBadge.style}`}>
                    {replyBadge.label}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reply.content}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* ---- Reply input ---- */}
      <div className="px-6 pb-6 border-t border-gray-100 pt-4">
        <textarea
          rows="2"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => onReplyChange && onReplyChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />

        <button
          onClick={onReply}
          className="mt-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
        >
          Reply
        </button>
      </div>

    </div>
  )
}

export default ForumPostCard
