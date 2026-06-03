import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import AdminSidebar   from "../components/AdminSidebar"
import ForumPostCard  from "../components/ForumPostCard"
import EmptyState     from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"

import { createForumPost, getAllForumPosts }  from "../services/forumService"
import { createReply, getRepliesByPostId }    from "../services/forumReplyService"

import { FaComments, FaPaperPlane } from "react-icons/fa"

function AdminForum() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [post, setPost]             = useState("")
  const [posts, setPosts]           = useState([])
  const [replyText, setReplyText]   = useState({})
  const [replies, setReplies]       = useState({})
  const [fetching, setFetching]     = useState(true)
  const [posting, setPosting]       = useState(false)

  const fetchReplies = async (postId) => {
    try {
      const data = await getRepliesByPostId(postId)
      setReplies((prev) => ({ ...prev, [postId]: data }))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getAllForumPosts()
        setPosts(data)
        data.forEach((p) => fetchReplies(p.id))
      } catch (error) {
        console.error(error)
      } finally {
        setFetching(false)
      }
    }
    loadPosts()
  }, [])

  const handlePost = async () => {
    if (!post.trim()) return
    setPosting(true)
    try {
      const newPost = await createForumPost({ author: user.name, content: post })
      toast.success("Discussion posted ✅")
      const updatedPosts = await getAllForumPosts()
      setPosts(updatedPosts)
      // Only fetch replies for the newly created post
      if (newPost?.id) fetchReplies(newPost.id)
      setPost("")
    } catch (error) {
      console.error(error)
      toast.error("Failed to post ❌")
    } finally {
      setPosting(false)
    }
  }

  const handleReply = async (postId) => {
    if (!replyText[postId]?.trim()) return
    try {
      await createReply({ postId, author: user.name, content: replyText[postId] })
      toast.success("Reply submitted ✅")
      fetchReplies(postId)
      setReplyText({ ...replyText, [postId]: "" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to reply ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-red-300 text-sm font-medium mb-1">Admin Panel</p>
            <h1 className="text-3xl font-extrabold text-white">Community Forum 💬</h1>
            <p className="text-red-200 text-sm mt-1">
              Moderate and monitor farmer community discussions.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2.5 rounded-xl">
                <FaComments className="text-red-700 text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Post a Discussion</h2>
                <p className="text-gray-400 text-xs">Post on behalf of the platform or for moderation purposes</p>
              </div>
            </div>

            <textarea
              rows="4"
              placeholder="Share an announcement or start a discussion..."
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 focus:bg-white transition resize-none"
            />

            <button
              onClick={handlePost}
              disabled={posting || !post.trim()}
              className={`mt-3 flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                posting || !post.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800"
              }`}
            >
              <FaPaperPlane className="text-xs" />
              {posting ? "Posting..." : "Post Discussion"}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">All Discussions</h2>
              {!fetching && (
                <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
                  {posts.length} {posts.length === 1 ? "post" : "posts"}
                </span>
              )}
            </div>

            {fetching ? (
              <LoadingSpinner message="Loading discussions..." />
            ) : posts.length === 0 ? (
              <EmptyState icon="💬" message="No discussions yet" subtext="No community posts have been made yet" />
            ) : (
              <div className="space-y-5">
                {posts.map((item) => (
                  <ForumPostCard
                    key={item.id}
                    post={item}
                    replies={replies[item.id] || []}
                    replyText={replyText[item.id] || ""}
                    onReplyChange={(text) =>
                      setReplyText({ ...replyText, [item.id]: text })
                    }
                    onReply={() => handleReply(item.id)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminForum
