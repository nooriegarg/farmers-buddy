package com.farmersbuddy.farmers_buddy_backend.dto;

// =============================================================
// LoginRequest.java — Data Transfer Object for Login
// =============================================================
// A DTO (Data Transfer Object) is a plain Java class used to
// carry data between the frontend and the controller layer.
// It is NOT a JPA entity — it is never saved to the database.
//
// Purpose:
//   Receives the login form data sent from the React frontend
//   as a JSON body in POST /api/auth/login requests.
//   Jackson (Spring's JSON library) automatically deserializes
//   the JSON payload into this object.
//
// Fields:
//   - email    : the user's registered email address
//   - password : the user's plain-text password for verification
// =============================================================

public class LoginRequest {

    private String email;
    private String password;

    // -------------------------
    // Constructors
    // -------------------------

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // -------------------------
    // Getters and Setters
    // -------------------------
    // Required by Jackson for JSON deserialization

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
}
