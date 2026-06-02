package com.farmersbuddy.farmers_buddy_backend.dto;

// =============================================================
// RegisterRequest.java — Data Transfer Object for Registration
// =============================================================
// A DTO used to receive new user registration data from the
// React frontend in POST /api/auth/register requests.
// Jackson deserializes the incoming JSON body into this object.
//
// This class is separate from the User entity to follow the
// principle of not exposing internal entity fields directly
// in the API layer.
//
// Fields:
//   - name     : full name of the new user
//   - email    : email address (must be unique in the database)
//   - password : plain-text password (stored as-is in current version)
//   - role     : user role — "FARMER", "OFFICER", or "ADMIN"
// =============================================================

public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private String role;

    // -------------------------
    // Constructors
    // -------------------------

    public RegisterRequest() {
    }

    public RegisterRequest(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // -------------------------
    // Getters and Setters
    // -------------------------
    // Required by Jackson for JSON deserialization

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
