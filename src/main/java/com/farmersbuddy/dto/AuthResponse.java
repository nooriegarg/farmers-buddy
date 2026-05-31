package com.farmersbuddy.dto;

import com.farmersbuddy.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO returned after successful authentication.
 * Contains the JWT token and basic user info.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String tokenType;
    private Long userId;
    private String username;
    private String email;
    private Role role;

    public static AuthResponse of(String token, Long userId, String username, String email, Role role) {
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(userId)
                .username(username)
                .email(email)
                .role(role)
                .build();
    }
}