package com.farmersbuddy.service.impl;

import com.farmersbuddy.dto.RegisterRequest;
import com.farmersbuddy.dto.UserResponse;
import com.farmersbuddy.entity.Role;
import com.farmersbuddy.entity.User;
import com.farmersbuddy.repository.UserRepository;
import com.farmersbuddy.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of UserService.
 * Handles all business logic for user management.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // =============================================
    // Register
    // =============================================

    @Override
    public UserResponse registerUser(RegisterRequest request) {
        log.info("Registering new user with username: {}", request.getUsername());

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists: " + request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole())
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());
        return UserResponse.fromUser(savedUser);
    }

    // =============================================
    // Read
    // =============================================

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        log.debug("Fetching user by ID: {}", id);
        return UserResponse.fromUser(findUserById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByUsername(String username) {
        log.debug("Fetching user by username: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found with username: " + username));
        return UserResponse.fromUser(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        log.debug("Fetching all users");
        return userRepository.findAll()
                .stream()
                .map(UserResponse::fromUser)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getUsersByRole(Role role) {
        log.debug("Fetching users with role: {}", role);
        return userRepository.findAllByRole(role)
                .stream()
                .map(UserResponse::fromUser)
                .collect(Collectors.toList());
    }

    // =============================================
    // Update
    // =============================================

    @Override
    public UserResponse updateUser(Long id, RegisterRequest request) {
        log.info("Updating user with ID: {}", id);
        User user = findUserById(id);

        if (!user.getUsername().equals(request.getUsername())
                && userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken: " + request.getUsername());
        }
        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already taken: " + request.getEmail());
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        User updated = userRepository.save(user);
        log.info("User updated successfully: ID={}", updated.getId());
        return UserResponse.fromUser(updated);
    }

    @Override
    public UserResponse toggleUserStatus(Long id) {
        log.info("Toggling enabled status for user ID: {}", id);
        User user = findUserById(id);
        user.setEnabled(!user.isEnabled());
        User updated = userRepository.save(user);
        log.info("User ID: {} is now {}", id, updated.isEnabled() ? "ENABLED" : "DISABLED");
        return UserResponse.fromUser(updated);
    }

    // =============================================
    // Delete
    // =============================================

    @Override
    public void deleteUser(Long id) {
        log.info("Deleting user with ID: {}", id);
        User user = findUserById(id);
        userRepository.delete(user);
        log.info("User deleted successfully: ID={}", id);
    }

    // =============================================
    // Existence Checks
    // =============================================

    @Override
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // =============================================
    // Private Helper
    // =============================================

    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
    }
}