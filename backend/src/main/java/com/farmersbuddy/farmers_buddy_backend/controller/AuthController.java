package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.dto.RegisterRequest;
import com.farmersbuddy.farmers_buddy_backend.entity.User;
import com.farmersbuddy.farmers_buddy_backend.service.AuthService;
import com.farmersbuddy.farmers_buddy_backend.dto.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// =============================================================
// AuthController.java — REST Controller for Authentication APIs
// =============================================================
// Exposes two HTTP endpoints for user registration and login.
// Delegates all business logic to AuthService.
//
// Base URL: /api/auth
//
// Endpoints:
//   POST /api/auth/register → registers a new user
//   POST /api/auth/login    → authenticates an existing user
//
// Annotations:
//   @RestController  : marks this as a REST controller; methods return JSON
//   @RequestMapping  : sets the base URL path for all endpoints in this class
//   @CrossOrigin("*"): allows cross-origin requests from any origin
//                      (overrides the global CORS config for this controller)
//   @Autowired       : injects the AuthService bean automatically
//   @PostMapping     : maps HTTP POST requests to handler methods
//   @RequestBody     : deserializes the incoming JSON body into a DTO object
//
// API Flow (Register):
//   React → POST /api/auth/register (JSON) → AuthController → AuthService → UserRepository → MySQL
//
// API Flow (Login):
//   React → POST /api/auth/login (JSON) → AuthController → AuthService → UserRepository → MySQL → User (response)
// =============================================================

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    // Injected by Spring — handles registration and login business logic
    @Autowired
    private AuthService authService;

    // -------------------------
    // POST /api/auth/register
    // -------------------------
    // Accepts a RegisterRequest JSON body (name, email, password, role).
    // Returns the saved User entity (including generated ID) on success.
    // Throws RuntimeException if the email is already registered.
    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    // -------------------------
    // POST /api/auth/login
    // -------------------------
    // Accepts a LoginRequest JSON body (email, password).
    // Returns the full User object (including role) on successful login.
    // Returns null if credentials are invalid — frontend handles this case.
    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest request) {

        return authService.login(request);
    }
}
