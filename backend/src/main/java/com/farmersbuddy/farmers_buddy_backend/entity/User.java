package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;

// =============================================================
// User.java — JPA Entity for the "users" Database Table
// =============================================================
// Represents a registered user in the Farmers Buddy system.
// JPA maps this class to the "users" table in MySQL.
// Each field corresponds to a column in the table.
//
// Roles:
//   - FARMER  : can submit queries and view replies
//   - OFFICER : can view all queries and reply to them
//   - ADMIN   : has access to the admin dashboard
//
// JPA Annotations:
//   @Entity        : marks this class as a JPA-managed entity
//   @Table(name)   : maps to the "users" table in MySQL
//   @Id            : marks the primary key field
//   @GeneratedValue: auto-increments the ID on each insert
//   @Column(unique): enforces a UNIQUE constraint on the email column
//
// Viva Tip:
//   Hibernate uses this class to auto-generate the "users" table
//   when spring.jpa.hibernate.ddl-auto=update is set.
// =============================================================

@Entity
@Table(name = "users")
public class User {

    // Primary key — auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Full name of the user
    private String name;

    // Email must be unique across all users — used as login identifier
    @Column(unique = true)
    private String email;

    // Password stored as plain text (current version)
    private String password;

    // User role: FARMER | OFFICER | ADMIN
    private String role;

    // -------------------------
    // Constructors
    // -------------------------

    public User() {
    }

    public User(Long id, String name, String email, String password, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
