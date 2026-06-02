package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.ForumReply;

import com.farmersbuddy.farmers_buddy_backend.service.ForumReplyService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// ForumReplyController.java — REST Controller for Forum Replies
// =============================================================
// Exposes HTTP endpoints for creating replies and fetching replies
// for a specific forum post. Delegates logic to ForumReplyService.
//
// Base URL: /api/forum-replies
//
// Endpoints:
//   POST /api/forum-replies          → create a reply to a forum post
//   GET  /api/forum-replies/{postId} → fetch all replies for a specific post
//
// Used by:
//   - Forum.jsx (frontend) via forumReplyService.js
//   - getRepliesByPostId is called for each post after loading all posts
//     to build the threaded discussion view
// =============================================================

@RestController
@RequestMapping("/api/forum-replies")
@CrossOrigin("*")
public class ForumReplyController {

    // Injected by Spring — handles reply creation and retrieval
    @Autowired
    private ForumReplyService forumReplyService;

    // -------------------------
    // POST /api/forum-replies
    // -------------------------
    // Creates a new reply to a forum post.
    // Accepts a ForumReply JSON body (postId, author, content).
    // Returns the saved reply entity with auto-generated ID.
    @PostMapping
    public ForumReply createReply(
            @RequestBody ForumReply forumReply
    ) {

        return forumReplyService.createReply(
                forumReply
        );
    }

    // -------------------------
    // GET /api/forum-replies/{postId}
    // -------------------------
    // Returns all replies for a specific forum post identified by postId.
    // @PathVariable extracts the postId from the URL (e.g., /forum-replies/3 → postId=3)
    @GetMapping("/{postId}")
    public List<ForumReply> getRepliesByPostId(
            @PathVariable Long postId
    ) {

        return forumReplyService
                .getRepliesByPostId(postId);
    }
}
