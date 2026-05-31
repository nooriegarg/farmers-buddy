package com.farmersbuddy.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT Authentication Filter — executes once per HTTP request.
 *
 * Flow:
 *   1. Read "Authorization: Bearer <token>" header
 *   2. Extract username from JWT
 *   3. Load UserDetails from database
 *   4. Validate token
 *   5. Set authentication in SecurityContext
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader(AUTH_HEADER);

        // Step 1: Skip if no Bearer token
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(BEARER_PREFIX.length());
        final String username = extractUsername(jwt, request);

        if (username == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Step 2: Only authenticate if not already authenticated
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            authenticateUser(jwt, username, request);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Safely extract username from JWT, logging specific error types.
     * Returns null if extraction fails.
     */
    private String extractUsername(String jwt, HttpServletRequest request) {
        try {
            return jwtUtils.extractUsername(jwt);
        } catch (ExpiredJwtException e) {
            log.warn("[{}] JWT expired: {}", request.getRequestURI(), e.getMessage());
        } catch (MalformedJwtException e) {
            log.warn("[{}] JWT malformed: {}", request.getRequestURI(), e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("[{}] JWT unsupported: {}", request.getRequestURI(), e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("[{}] JWT empty/null: {}", request.getRequestURI(), e.getMessage());
        } catch (Exception e) {
            log.warn("[{}] JWT parse error: {}", request.getRequestURI(), e.getMessage());
        }
        return null;
    }

    /**
     * Load user from DB, validate token, and set SecurityContext.
     */
    private void authenticateUser(String jwt, String username, HttpServletRequest request) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtils.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.debug("Authenticated user '{}' with roles: {}",
                        username, userDetails.getAuthorities());
            } else {
                log.warn("JWT token invalid for user: {}", username);
            }
        } catch (UsernameNotFoundException e) {
            log.warn("User from JWT not found in DB: {}", username);
        }
    }
}