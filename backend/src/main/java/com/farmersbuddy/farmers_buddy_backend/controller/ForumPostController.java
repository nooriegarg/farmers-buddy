package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.ForumPost;
import com.farmersbuddy.farmers_buddy_backend.service.ForumPostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// ForumPostController.java — REST Controller for Forum Posts
// =============================================================
// Exposes HTTP endpoints for creating and retrieving community forum posts.
// Delegates all business logic to ForumPostService.
//
// Base URL: /api/forum
//
// Endpoints:
//   POST /api/forum → create a new forum discussion post
//   GET  /api/forum → retrieve all forum posts
//
// Used by:
//   - Forum.jsx (frontend) via forumService.js for both creating and loading posts
//   - AdminForum.jsx (admin view of the same forum)
// =============================================================

@RestController
@RequestMapping("/api/forum")
@CrossOrigin("*")
public class ForumPostController {

    // Injected by Spring — handles forum post creation and retrieval
    @Autowired
    private ForumPostService forumPostService;

    // -------------------------
    // POST /api/forum
    // -------------------------
    // Creates a new community forum post.
    // Accepts a ForumPost JSON body (author, content).
    // Returns the saved entity with the auto-generated ID.
    @PostMapping
    public ForumPost createPost(
            @RequestBody ForumPost forumPost
    ) {

        return forumPostService.createPost(
                forumPost
        );
    }

    // -------------------------
    // GET /api/forum
    // -------------------------
    // Returns all forum posts in the database.
    // The frontend fetches replies separately for each post after this call.
    @GetMapping
    public List<ForumPost> getAllPosts() {

        return forumPostService.getAllPosts();
    }
}
