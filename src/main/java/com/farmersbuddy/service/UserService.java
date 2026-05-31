package com.farmersbuddy.service;

import com.farmersbuddy.dto.RegisterRequest;
import com.farmersbuddy.dto.UserResponse;
import com.farmersbuddy.entity.Role;

import java.util.List;

/**
 * Service interface for User operations.
 */
public interface UserService {

    /**
     * Register a new user.
     */
    UserResponse registerUser(RegisterRequest request);

    /**
     * Get a user by ID.
     */
    UserResponse getUserById(Long id);

    /**
     * Get a user by username.
     */
    UserResponse getUserByUsername(String username);

    /**
     * Get all users.
     */
    List<UserResponse> getAllUsers();

    /**
     * Get all users by role.
     */
    List<UserResponse> getUsersByRole(Role role);

    /**
     * Update user details.
     */
    UserResponse updateUser(Long id, RegisterRequest request);

    /**
     * Enable or disable a user account.
     */
    UserResponse toggleUserStatus(Long id);

    /**
     * Delete a user by ID.
     */
    void deleteUser(Long id);

    /**
     * Check if a username already exists.
     */
    boolean existsByUsername(String username);

    /**
     * Check if an email already exists.
     */
    boolean existsByEmail(String email);
}