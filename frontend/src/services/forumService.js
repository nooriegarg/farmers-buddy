// =============================================================
// forumService.js — Community Forum Post API Calls
// =============================================================
// Handles HTTP requests for creating and fetching forum posts.
// Communicates with Spring Boot ForumPostController at /api/forum.
//
// API Flow:
//   createForumPost  → POST /api/forum → Save a new discussion post to DB
//   getAllForumPosts  → GET  /api/forum → Fetch all posts for the Forum page
// =============================================================

import API from "./api"

// -------------------------
// Create a new forum post
// -------------------------
// Called when a logged-in user submits a new discussion in the Community Forum.
// Payload includes: author (user name) and content (post text).
export const createForumPost =
  async (postData) => {

    const response =
      await API.post(
        "/forum",
        postData
      )

    return response.data
}

// -------------------------
// Get all forum posts
// -------------------------
// Loads all community posts from the database.
// After loading posts, the Forum page also fetches replies for each post.
export const getAllForumPosts =
  async () => {

    const response =
      await API.get("/forum")

    return response.data
}
