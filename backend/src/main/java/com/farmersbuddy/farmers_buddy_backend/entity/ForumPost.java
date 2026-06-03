package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;

// =============================================================
// ForumPost.java — JPA Entity for the "forum_posts" Table
// =============================================================
// Represents a discussion post in the Community Forum.
// Farmers and officers can create posts to discuss agriculture topics.
//
// Each post has an author (user's name) and content text.
// Replies to posts are stored separately in the ForumReply entity,
// linked by postId.
//
// Fields:
//   - id      : auto-incremented primary key
//   - author  : name of the user who created the post
//   - content : the discussion text (up to 1000 characters)
// =============================================================

@Entity
@Table(name = "forum_posts")
public class ForumPost {

    // Primary key — auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the user who posted this discussion
    private String author;

    // Role of the user who posted (FARMER / OFFICER / EXPERT / ADMIN)
    private String authorRole;

    // Post content — @Column(length=1000) sets VARCHAR(1000) in MySQL
    @Column(length = 1000)
    private String content;

    // -------------------------
    // Constructors
    // -------------------------

    public ForumPost() {
    }

    public ForumPost(Long id,
                      String author,
                      String content) {

        this.id = id;
        this.author = author;
        this.content = content;
    }

    // -------------------------
    // Getters and Setters
    // -------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthorRole() {
        return authorRole;
    }

    public void setAuthorRole(String authorRole) {
        this.authorRole = authorRole;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
