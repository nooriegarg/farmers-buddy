// =============================================================
// Forum.jsx — Community Discussion Forum Page
// =============================================================
// Allows all logged-in users to participate in a community forum.
// Users can create new discussion posts and reply to existing ones.
//
// Data Flow:
//   - On mount: fetches all forum posts via GET /api/forum
//     and for each post, fetches its replies via GET /api/forum-replies/{postId}
//   - On new post: POST /api/forum → saves post → re-fetches all posts + replies
//   - On reply: POST /api/forum-replies → saves reply → re-fetches replies for that post
//
// State Management:
//   - post       : string — current value of the new post textarea
//   - posts      : array  — all forum posts fetched from backend
//   - replyText  : object map { postId: replyString } — per-post reply input tracking
//   - replies    : object map { postId: [replyArray] } — replies grouped by postId
//
// Key Interaction:
//   fetchReplies(postId) is called for each post after loading,
//   and again after a new reply is submitted to stay in sync.
// =============================================================

import { useEffect, useState } from "react"

import FarmerSidebar from "../components/FarmerSidebar"

import {
  createForumPost,
  getAllForumPosts
} from "../services/forumService"

import {
  createReply,
  getRepliesByPostId
} from "../services/forumReplyService"

function Forum() {

  // Read the logged-in user from localStorage (for author field)
  const user =
    JSON.parse(localStorage.getItem("user"))

  // -------------------------
  // State Declarations
  // -------------------------

  // New post textarea value
  const [post, setPost] = useState("")

  // List of all forum posts
  const [posts, setPosts] = useState([])

  // Reply text per post: { [postId]: "reply string" }
  const [replyText, setReplyText] =
    useState({})

  // Replies per post: { [postId]: [reply objects] }
  const [replies, setReplies] =
    useState({})

  // -------------------------
  // Fetch Replies for a Post
  // -------------------------
  // Loads all replies for a specific postId and merges them into the replies state map.
  // Uses functional update form (prev => ...) to avoid stale closures.
  const fetchReplies = async (postId) => {

    try {

      const data =
        await getRepliesByPostId(postId)

      setReplies((prev) => ({
        ...prev,
        [postId]: data,
      }))

    } catch (error) {

      console.error(error)
    }
  }

  // -------------------------
  // Load All Posts on Mount
  // -------------------------
  // After fetching posts, immediately fetches replies for every post
  // so the forum displays a fully populated threaded view.
  useEffect(() => {

    const loadPosts = async () => {

      try {

        const data =
          await getAllForumPosts()

        setPosts(data)

        // Fetch replies for each post in parallel
        data.forEach((post) => {

          fetchReplies(post.id)
        })

      } catch (error) {

        console.error(error)
      }
    }

    loadPosts()

  }, [])

  // -------------------------
  // Create New Forum Post
  // -------------------------
  // Guards against empty submissions, posts the new discussion,
  // then re-fetches all posts and their replies to keep UI in sync.
  const handlePost = async () => {

    if (!post.trim()) return

    try {

      const postData = {

        author: user.name,
        content: post,
      }

      await createForumPost(postData)

      // Reload all posts after creating a new one
      const updatedPosts =
        await getAllForumPosts()

      setPosts(updatedPosts)

      // Re-fetch replies for all posts including the new one
      updatedPosts.forEach((post) => {

        fetchReplies(post.id)
      })

      // Clear the new post textarea
      setPost("")

    } catch (error) {

      console.error(error)
    }
  }

  // -------------------------
  // Create Reply to a Post
  // -------------------------
  // Guards against empty reply, submits the reply with author and postId,
  // then refreshes only the replies for the affected post.
  const handleReply = async (postId) => {

    if (!replyText[postId]?.trim()) return

    try {

      const replyData = {

        postId: postId,
        author: user.name,
        content: replyText[postId],
      }

      await createReply(replyData)

      // Refresh only the replies for this specific post
      fetchReplies(postId)

      // Clear the reply input for this post
      setReplyText({
        ...replyText,
        [postId]: "",
      })

    } catch (error) {

      console.error(error)
    }
  }

  // -------------------------
  // Render
  // -------------------------
  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Left sidebar for farmer navigation */}
      <FarmerSidebar />

      {/* Main content area */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Farmer Community Forum 💬
        </h1>

        {/* ----------------------------- */}
        {/* Create New Post Section       */}
        {/* ----------------------------- */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">

          <textarea
            rows="4"
            placeholder="Share your farming question or discussion..."
            value={post}
            onChange={(e) =>
              setPost(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handlePost}
            className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Post Discussion
          </button>

        </div>

        {/* ----------------------------- */}
        {/* Forum Posts List              */}
        {/* ----------------------------- */}
        {/* Each post card shows: author, content, threaded replies, and a reply input */}
        <div className="grid gap-6">

          {posts.map((item) => (

            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >

              {/* Post author and content */}
              <h2 className="text-xl font-bold text-green-700">
                {item.author}
              </h2>

              <p className="text-gray-700 mt-3">
                {item.content}
              </p>

              {/* ----------------------------- */}
              {/* Threaded Replies              */}
              {/* ----------------------------- */}
              {/* replies[item.id] holds the array of reply objects for this post */}
              <div className="mt-6 space-y-3">

                {replies[item.id]?.map((reply) => (

                  <div
                    key={reply.id}
                    className="bg-gray-100 p-4 rounded-xl"
                  >

                    <h3 className="font-bold text-green-700">
                      {reply.author}
                    </h3>

                    <p className="text-gray-700 mt-1">
                      {reply.content}
                    </p>

                  </div>
                ))}

              </div>

              {/* Reply input for this specific post */}
              {/* replyText[item.id] tracks the reply text per post individually */}
              <textarea
                rows="2"
                placeholder="Write a reply..."
                value={replyText[item.id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [item.id]: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-4"
              />

              <button
                onClick={() =>
                  handleReply(item.id)
                }
                className="mt-3 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl"
              >
                Reply
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Forum
