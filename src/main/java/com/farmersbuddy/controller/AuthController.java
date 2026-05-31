package com.farmersbuddy.controller;

import com.farmersbuddy.dto.ApiResponse;
import com.farmersbuddy.dto.AuthRequest;
import com.farmersbuddy.dto.AuthResponse;
import com.farmersbuddy.dto.RegisterRequest;
import com.farmersbuddy.dto.UserResponse;
import com.farmersbuddy.service.AuthService;
import com.farmersbuddy.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth endpoints:
 *   POST /api/auth/register  - Register (FARMER | OFFICER | ADMIN)
 *   POST /api/auth/login     - Login → JWT token
 *   GET  /api/auth/me        - Current user profile (JWT required)
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        log.info("POST /api/auth/register username={} role={}", request.getUsername(), request.getRole());
        UserResponse user = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody AuthRequest request) {
        log.info("POST /api/auth/login username={}", request.getUsername());
        AuthResponse auth = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", auth));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails) {
        log.info("GET /api/auth/me username={}", userDetails.getUsername());
        UserResponse user = userService.getUserByUsername(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profile fetched successfully", user));
    }
}