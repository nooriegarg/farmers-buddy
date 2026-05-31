package com.farmersbuddy.service.impl;

import com.farmersbuddy.dto.AuthRequest;
import com.farmersbuddy.dto.AuthResponse;
import com.farmersbuddy.dto.RegisterRequest;
import com.farmersbuddy.dto.UserResponse;
import com.farmersbuddy.entity.User;
import com.farmersbuddy.repository.UserRepository;
import com.farmersbuddy.security.JwtUtils;
import com.farmersbuddy.service.AuthService;
import com.farmersbuddy.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

/**
 * Implementation of AuthService.
 * Handles login (JWT generation) and registration.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    /**
     * Authenticate user credentials and return a JWT token.
     */
    @Override
    public AuthResponse login(AuthRequest request) {
        log.info("Login attempt for username: {}", request.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtUtils.generateToken(user);

            log.info("Login successful for username: {}", user.getUsername());

            return AuthResponse.of(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole()
            );

        } catch (AuthenticationException ex) {
            log.warn("Login failed for username: {} - {}", request.getUsername(), ex.getMessage());
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    /**
     * Register a new user.
     */
    @Override
    public UserResponse register(RegisterRequest request) {
        log.info("Registration attempt for username: {}", request.getUsername());
        return userService.registerUser(request);
    }
}