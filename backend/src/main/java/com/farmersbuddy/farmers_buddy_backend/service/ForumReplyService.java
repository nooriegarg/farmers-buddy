package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.ForumReply;

import com.farmersbuddy.farmers_buddy_backend.repository.ForumReplyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// ForumReplyService.java — Business Logic Layer for Forum Replies
// =============================================================
// Handles business logic for creating and retrieving replies to forum posts.
// Acts as the intermediary between ForumReplyController and ForumReplyRepository.
//
// Architecture Position:
//   ForumReplyController → ForumReplyService → ForumReplyRepository → MySQL
//
// Replies are linked to their parent post via the postId field,
// and fetched using the findByPostId() derived query in the repository.
// =============================================================

@Service
public class ForumReplyService {

    // Injected by Spring — provides access to the forum_replies table in MySQL
    @Autowired
    private ForumReplyRepository forumReplyRepository;

    // -------------------------
    // Create a New Forum Reply
    // -------------------------
    // Saves a reply to a specific forum post and returns the saved entity.
    // The forumReply object must include postId, author, and content.
    public ForumReply createReply(
            ForumReply forumReply
    ) {

        return forumReplyRepository.save(
                forumReply
        );
    }

    // -------------------------
    // Get Replies by Post ID
    // -------------------------
    // Fetches all replies belonging to a specific forum post.
    // Delegates to the custom findByPostId() method in the repository,
    // which Spring Data JPA resolves to: SELECT * FROM forum_replies WHERE post_id = ?
    public List<ForumReply> getRepliesByPostId(
            Long postId
    ) {

        return forumReplyRepository.findByPostId(
                postId
        );
    }

    // -------------------------
    // Delete a Forum Reply
    // -------------------------
    public void deleteReply(Long id) {
        forumReplyRepository.deleteById(id);
    }
}
