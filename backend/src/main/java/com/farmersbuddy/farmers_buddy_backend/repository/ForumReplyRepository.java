package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.ForumReply;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// =============================================================
// ForumReplyRepository.java — Data Access Layer for ForumReply Entity
// =============================================================
// Extends JpaRepository to provide standard CRUD operations
// for the ForumReply entity (forum_replies table in MySQL).
//
// Custom Derived Query Method:
//   findByPostId(Long postId)
//     → SELECT * FROM forum_replies WHERE post_id = ?
//     → Used to fetch all replies belonging to a specific forum post
//     → Spring Data JPA generates this SQL from the method name automatically
//
// Used by: ForumReplyService
// =============================================================

public interface ForumReplyRepository
        extends JpaRepository<ForumReply, Long> {

    // Find all replies for a specific forum post by its ID
    List<ForumReply> findByPostId(Long postId);
}
