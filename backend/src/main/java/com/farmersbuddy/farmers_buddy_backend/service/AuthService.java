package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.dto.RegisterRequest;
import com.farmersbuddy.farmers_buddy_backend.entity.User;
import com.farmersbuddy.farmers_buddy_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farmersbuddy.farmers_buddy_backend.dto.LoginRequest;

import java.util.List;
import java.util.Optional;

// =============================================================
// AuthService.java — Business Logic Layer for Authentication
// =============================================================
// Handles the core authentication logic for registration and login.
// Sits between the AuthController (API layer) and UserRepository (DB layer).
//
// @Service: marks this class as a Spring-managed service bean.
// @Autowired: injects the UserRepository dependency automatically.
//
// Architecture Position:
//   AuthController → AuthService → UserRepository → MySQL
//
// Viva Tip:
//   The Service layer separates business logic from the controller
//   (which only handles HTTP) and the repository (which only handles DB).
//   This is the "S" in the layered architecture.
// =============================================================

@Service
public class AuthService {

    // Injected by Spring — provides access to the users table in MySQL
    @Autowired
    private UserRepository userRepository;

    // =========================================================
    // Register a New User
    // =========================================================
    // Validates that the email is not already registered,
    // maps the RegisterRequest DTO to a User entity, and saves it.
    //
    // Throws RuntimeException if the email already exists —
    // the controller returns this as an error response to the frontend.
    public User register(RegisterRequest request) {

        // Check for existing user with the same email
        Optional<User> existingUser =
        userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {

            throw new RuntimeException("User already exists");
        }

        // Map the DTO fields to a new User entity
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        // Persist the new user to MySQL and return the saved entity (with generated ID)
        return userRepository.save(user);
    }

    // =========================================================
    // Login an Existing User
    // =========================================================
    // Looks up the user by email, then verifies the password.
    // Returns the User object on success, or null on failure.
    //
    // The returned User object (including role) is sent back to the
    // React frontend, which stores it in localStorage for session management.
    public User login(LoginRequest request) {

        // Find user by email — returns empty Optional if not found
        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            // Direct password comparison (plain text — current implementation)
            if (user.getPassword().equals(request.getPassword())) {
                return user;
            }
        }

        // Return null if email not found or password does not match
        return null;
    }

    // =========================================================
    // Get All Users
    // =========================================================
    // Returns all registered users — used by the Admin panel.
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // =========================================================
    // Get User By ID
    // =========================================================
    // Returns a single user by ID — used by the Profile page.
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // =========================================================
    // Update User Profile
    // =========================================================
    // Updates editable profile fields only — does NOT change
    // email, password, or role (those require separate flows).
    public User updateProfile(Long id, User updatedUser) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setName(updatedUser.getName());
        existing.setPhone(updatedUser.getPhone());
        existing.setLocation(updatedUser.getLocation());
        existing.setBio(updatedUser.getBio());
        existing.setProfileImageUrl(updatedUser.getProfileImageUrl());

        return userRepository.save(existing);
    }
}
