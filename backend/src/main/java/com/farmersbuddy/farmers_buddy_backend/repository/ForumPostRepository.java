package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.ForumPost;

import org.springframework.data.jpa.repository.JpaRepository;

// =============================================================
// ForumPostRepository.java — Data Access Layer for ForumPost Entity
// =============================================================
// Extends JpaRepository to provide standard CRUD operations
// for the ForumPost entity (forum_posts table in MySQL).
//
// No custom query methods are needed here — the standard
// JpaRepository methods (save, findAll, findById, etc.)
// are sufficient for forum post operations.
//
// Key methods inherited from JpaRepository:
//   - save(ForumPost)        : inserts a new post
//   - findAll()              : retrieves all forum posts
//
// Used by: ForumPostService
// =============================================================

public interface ForumPostRepository
        extends JpaRepository<ForumPost, Long> {
}
