// =============================================================
// forumReplyService.js — Forum Reply API Calls
// =============================================================
// Handles HTTP requests for creating and fetching replies on forum posts.
// Communicates with Spring Boot ForumReplyController at /api/forum-replies.
//
// API Flow:
//   createReply        → POST /api/forum-replies          → Save a reply to a specific post
//   getRepliesByPostId → GET  /api/forum-replies/{postId} → Fetch all replies for one post
// =============================================================

import API from "./api"

// -------------------------
// Create a reply to a forum post
// -------------------------
// Called when a user submits a reply under a specific discussion post.
// Payload includes: postId (which post is being replied to), author, content.
export const createReply =
  async (replyData) => {

    const response =
      await API.post(
        "/forum-replies",
        replyData
      )

    return response.data
}

// -------------------------
// Get all replies for a specific post
// -------------------------
// Fetches all replies belonging to a given postId.
// Used in Forum.jsx to display threaded discussions under each post.
export const getRepliesByPostId =
  async (postId) => {

    const response =
      await API.get(
        `/forum-replies/${postId}`
      )

    return response.data
}
