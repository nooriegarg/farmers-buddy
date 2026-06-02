package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.ForumPost;
import com.farmersbuddy.farmers_buddy_backend.repository.ForumPostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// ForumPostService.java — Business Logic Layer for Forum Posts
// =============================================================
// Handles business logic for creating and retrieving forum posts.
// Acts as the intermediary between ForumPostController and ForumPostRepository.
//
// Architecture Position:
//   ForumPostController → ForumPostService → ForumPostRepository → MySQL
//
// Currently, the business logic is straightforward (no extra validation
// or transformation), but having a service layer keeps the architecture
// clean and extensible for future enhancements.
// =============================================================

@Service
public class ForumPostService {

    // Injected by Spring — provides access to the forum_posts table in MySQL
    @Autowired
    private ForumPostRepository forumPostRepository;

    // -------------------------
    // Create a New Forum Post
    // -------------------------
    // Saves the new forum post to the database and returns the saved entity
    // (which includes the auto-generated ID).
    public ForumPost createPost(
            ForumPost forumPost
    ) {

        return forumPostRepository.save(forumPost);
    }

    // -------------------------
    // Get All Forum Posts
    // -------------------------
    // Returns all forum posts from the database.
    // Used by the Forum page to display the full community discussion feed.
    public List<ForumPost> getAllPosts() {

        return forumPostRepository.findAll();
    }
}
