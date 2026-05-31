package com.farmersbuddy.controller;

import com.farmersbuddy.dto.RegisterRequest;
import com.farmersbuddy.dto.UserResponse;
import com.farmersbuddy.entity.Role;
import com.farmersbuddy.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for User management.
 * All endpoints require JWT. Roles enforced via @PreAuthorize.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    /** GET /api/users - ADMIN only */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        log.info("GET /api/users");
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /** GET /api/users/{id} - ADMIN only */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        log.info("GET /api/users/{}", id);
        return ResponseEntity.ok(userService.getUserById(id));
    }

    /** GET /api/users/username/{username} - ADMIN only */
    @GetMapping("/username/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username) {
        log.info("GET /api/users/username/{}", username);
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    /** GET /api/users/role/{role} - ADMIN, OFFICER */
    @GetMapping("/role/{role}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<List<UserResponse>> getUsersByRole(@PathVariable Role role) {
        log.info("GET /api/users/role/{}", role);
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    /** PUT /api/users/{id} - ADMIN only */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody RegisterRequest request) {
        log.info("PUT /api/users/{}", id);
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    /** PATCH /api/users/{id}/toggle-status - ADMIN only */
    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> toggleUserStatus(@PathVariable Long id) {
        log.info("PATCH /api/users/{}/toggle-status", id);
        return ResponseEntity.ok(userService.toggleUserStatus(id));
    }

    /** DELETE /api/users/{id} - ADMIN only */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("DELETE /api/users/{}", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}