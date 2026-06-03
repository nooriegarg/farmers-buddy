package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;

// =============================================================
// ForumReply.java — JPA Entity for the "forum_replies" Table
// =============================================================
// Represents a reply to a Community Forum post.
// Replies are linked to their parent post via the postId field.
//
// Relationship:
//   One ForumPost → Many ForumReplies (one-to-many conceptually)
//   The relationship is maintained via postId (no @ManyToOne JPA join)
//   and queried using findByPostId() in the ForumReplyRepository.
//
// Fields:
//   - id      : auto-incremented primary key
//   - postId  : ID of the parent ForumPost this reply belongs to
//   - author  : name of the user who wrote the reply
//   - content : the reply text (up to 1000 characters)
// =============================================================

@Entity
@Table(name = "forum_replies")
public class ForumReply {

    // Primary key — auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign reference to the parent forum post
    private Long postId;

    // Name of the user who wrote this reply
    private String author;

    // Role of the user who replied (FARMER / OFFICER / EXPERT / ADMIN)
    private String authorRole;

    // Reply content — @Column(length=1000) sets VARCHAR(1000) in MySQL
    @Column(length = 1000)
    private String content;

    // -------------------------
    // Constructors
    // -------------------------

    public ForumReply() {
    }

    public ForumReply(Long id,
                       Long postId,
                       String author,
                       String content) {

        this.id = id;
        this.postId = postId;
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

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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
