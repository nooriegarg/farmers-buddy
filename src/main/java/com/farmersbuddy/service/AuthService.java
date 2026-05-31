package com.farmersbuddy.service;

import com.farmersbuddy.dto.AuthRequest;
import com.farmersbuddy.dto.AuthResponse;
import com.farmersbuddy.dto.RegisterRequest;
import com.farmersbuddy.dto.UserResponse;

/**
 * Service interface for authentication operations.
 */
public interface AuthService {

    /**
     * Authenticate a user and return a JWT token.
     */
    AuthResponse login(AuthRequest request);

    /**
     * Register a new user and return user details.
     */
    UserResponse register(RegisterRequest request);
}