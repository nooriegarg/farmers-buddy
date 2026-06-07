package com.farmersbuddy.farmers_buddy_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

// =============================================================
// SecurityConfig.java — Spring Security Configuration
// =============================================================
// Configures the security rules for the Farmers Buddy REST API.
// Handles two concerns:
//   1. HTTP Security : which endpoints require authentication
//   2. CORS          : which frontend origins are allowed to call the API
//
// Current Security Policy:
//   - CSRF is disabled (safe for stateless REST APIs with no sessions)
//   - All endpoints are permitted without authentication (permitAll)
//     so that the React frontend can call all APIs freely
//   - CORS is configured to allow the React dev server (port 5173/5174)
//
// BCrypt:
//   - Passwords are hashed using BCryptPasswordEncoder during registration
//   - BCrypt.matches() is used to verify during login
//
// Viva Tip:
//   CORS (Cross-Origin Resource Sharing) is needed because the React
//   frontend runs on a different port (5173) than Spring Boot (8080).
//   Without this config, the browser would block API requests.
// =============================================================

@Configuration
public class SecurityConfig {

    // -------------------------
    // BCrypt Password Encoder Bean
    // -------------------------
    // Provides BCrypt hashing throughout the application.
    // Injected by @Autowired wherever password encoding is needed.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // -------------------------
    // HTTP Security Filter Chain
    // -------------------------
    // Defines the security rules applied to every incoming HTTP request.
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // Enable CORS using the corsConfigurationSource bean defined below
                .cors(cors -> {})

                // Disable CSRF protection — not needed for stateless REST APIs
                .csrf(csrf -> csrf.disable())

                // Allow all requests without authentication
                // Role-based access is handled at the frontend (ProtectedRoute)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    // -------------------------
    // CORS Configuration
    // -------------------------
    // Specifies which origins, HTTP methods, and headers are permitted
    // for cross-origin requests from the React frontend.
    @Bean
    public CorsConfigurationSource
    corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        // Allow requests from any origin — matches @CrossOrigin("*") on all controllers
        configuration.addAllowedOriginPattern("*");

        // Allow the standard HTTP methods used by REST APIs
        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE")
        );

        // Allow all request headers (e.g. Content-Type, Authorization)
        configuration.setAllowedHeaders(
                List.of("*")
        );

        // Apply this CORS configuration to all URL patterns ("/**")
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}
