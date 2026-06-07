package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.dto.RegisterRequest;
import com.farmersbuddy.farmers_buddy_backend.entity.User;
import com.farmersbuddy.farmers_buddy_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.farmersbuddy.farmers_buddy_backend.dto.LoginRequest;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

// =============================================================
// AuthService.java — Business Logic Layer for Authentication
// =============================================================
// Handles the core authentication logic for registration and login.
// Sits between the AuthController (API layer) and UserRepository (DB layer).
//
// Password Security:
//   - Passwords are hashed with BCrypt during registration
//   - BCrypt.matches() is used during login to verify the plain-text
//     input against the stored hash
//   - Raw passwords are NEVER stored in the database
//
// Architecture Position:
//   AuthController → AuthService → UserRepository → MySQL
// =============================================================

@Service
public class AuthService {

    // Simple RFC-compliant email pattern: local@domain.tld
    private static final Pattern EMAIL_PATTERN =
        Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    // Injected by Spring — provides access to the users table in MySQL
    @Autowired
    private UserRepository userRepository;

    // Injected BCryptPasswordEncoder bean from SecurityConfig
    @Autowired
    private PasswordEncoder passwordEncoder;

    // =========================================================
    // Register a New User
    // =========================================================
    // Validates email and password, checks for duplicate email,
    // hashes the password with BCrypt, then saves the user.
    public User register(RegisterRequest request) {

        // Validate email format
        if (request.getEmail() == null || !EMAIL_PATTERN.matcher(request.getEmail().trim()).matches()) {
            throw new RuntimeException("Invalid email format");
        }

        // Validate password strength: min 6 chars, 1 uppercase, 1 lowercase, 1 digit
        String pwd = request.getPassword() == null ? "" : request.getPassword();
        if (pwd.length() < 6
                || !pwd.chars().anyMatch(Character::isUpperCase)
                || !pwd.chars().anyMatch(Character::isLowerCase)
                || !pwd.chars().anyMatch(Character::isDigit)) {
            throw new RuntimeException("Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number");
        }

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
        // Hash the password before storing — never store plain text
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        // Persist the new user to MySQL and return the saved entity (with generated ID)
        return userRepository.save(user);
    }

    // =========================================================
    // Login an Existing User
    // =========================================================
    // Looks up the user by email, then verifies the password.
    // Supports both BCrypt-hashed passwords (new accounts) and
    // plain-text passwords (accounts created before hashing was added).
    // On a successful plain-text match, the password is silently
    // re-hashed and saved — so the account migrates automatically.
    public User login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();
            String stored = user.getPassword();

            // BCrypt hashes always start with "$2a$" or "$2b$"
            boolean isHashed = stored != null && stored.startsWith("$2");

            if (isHashed) {
                // Normal path: verify against BCrypt hash
                if (passwordEncoder.matches(request.getPassword(), stored)) {
                    return user;
                }
            } else {
                // Legacy path: plain-text password in DB
                if (stored != null && stored.equals(request.getPassword())) {
                    // Migrate: re-hash and save so future logins use BCrypt
                    user.setPassword(passwordEncoder.encode(request.getPassword()));
                    userRepository.save(user);
                    return user;
                }
            }
        }

        return null;
    }

    // =========================================================
    // Get All Users
    // =========================================================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // =========================================================
    // Get User By ID
    // =========================================================
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

    // =========================================================
    // Delete User Account
    // =========================================================
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
