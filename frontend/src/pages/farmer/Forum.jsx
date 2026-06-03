import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import FarmerSidebar  from "../../components/FarmerSidebar"
import OfficerSidebar from "../../components/OfficerSidebar"
import ExpertSidebar  from "../../components/ExpertSidebar"
import AdminSidebar   from "../../components/AdminSidebar"
import ForumPostCard  from "../../components/ForumPostCard"
import EmptyState     from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"

import { createForumPost, getAllForumPosts } from "../../services/forumService"
import { createReply, getRepliesByPostId }   from "../../services/forumReplyService"

import { FaComments, FaPaperPlane } from "react-icons/fa"

// Role → sidebar component
const sidebars = {
  FARMER:  <FarmerSidebar />,
  OFFICER: <OfficerSidebar />,
  EXPERT:  <ExpertSidebar />,
  ADMIN:   <AdminSidebar />,
}

function Forum() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [post, setPost]           = useState("")
  const [posts, setPosts]         = useState([])
  const [replyText, setReplyText] = useState({})
  const [replies, setReplies]     = useState({})
  const [fetching, setFetching]   = useState(true)
  const [posting, setPosting]     = useState(false)

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
      const newPost = await createForumPost({ author: user.name, authorRole: user.role, content: post })
      toast.success("Discussion posted ✅")
      const updatedPosts = await getAllForumPosts()
      setPosts(updatedPosts)
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
      await createReply({ postId, author: user.name, authorRole: user.role, content: replyText[postId] })
      toast.success("Reply submitted ✅")
      fetchReplies(postId)
      setReplyText({ ...replyText, [postId]: "" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to reply ❌")
    }
  }

  const Sidebar = sidebars[user?.role] || <FarmerSidebar />

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {Sidebar}

      <div className="flex-1 flex flex-col">

        {/* Banner */}
        <div
          className="relative px-10 py-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <p className="text-green-300 text-sm font-medium mb-1">Community</p>
            <h1 className="text-3xl font-extrabold text-white">Community Forum 💬</h1>
            <p className="text-green-200 text-sm mt-1">
              Share questions, ideas, and guidance with the farming community.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 space-y-6">

          {/* New Post Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2.5 rounded-xl">
                <FaComments className="text-green-700 text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Start a Discussion</h2>
                <p className="text-gray-400 text-xs">Share a question, tip, or topic with the community</p>
              </div>
            </div>

            <textarea
              rows="4"
              placeholder="Share your farming question or experience..."
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition resize-none"
            />

            <button
              onClick={handlePost}
              disabled={posting || !post.trim()}
              className={`mt-3 flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white text-sm transition shadow-md ${
                posting || !post.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700"
              }`}
            >
              <FaPaperPlane className="text-xs" />
              {posting ? "Posting..." : "Post Discussion"}
            </button>

          </div>

          {/* Posts List */}
          <div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Community Discussions</h2>
              {!fetching && (
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                  {posts.length} {posts.length === 1 ? "post" : "posts"}
                </span>
              )}
            </div>

            {fetching ? (
              <LoadingSpinner message="Loading discussions..." />
            ) : posts.length === 0 ? (
              <EmptyState
                icon="💬"
                message="No discussions yet"
                subtext="Be the first to start a conversation in the community"
              />
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

export default Forum
