package com.farmersbuddy.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JWT Utility — handles token generation, validation, and claim extraction.
 *
 * Token structure:
 *   Header : { alg: HS256, typ: JWT }
 *   Payload: { sub: username, role: ROLE_XXX, iat: ..., exp: ... }
 *   Signature: HMACSHA256(secret)
 */
@Component
@Slf4j
public class JwtUtils {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private long jwtExpirationMs;

    // ─────────────────────────────────────────
    // Token Generation
    // ─────────────────────────────────────────

    /**
     * Generate a token for the given user.
     * Includes username as subject and role as a custom claim.
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Store the role string (e.g. "ROLE_FARMER") in the token
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("");
        claims.put("role", role);
        return buildToken(claims, userDetails.getUsername(), jwtExpirationMs);
    }

    /**
     * Internal token builder.
     */
    private String buildToken(Map<String, Object> extraClaims,
                               String subject,
                               long expirationMs) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ─────────────────────────────────────────
    // Token Validation
    // ─────────────────────────────────────────

    /**
     * Returns true if the token is valid for the given user and not expired.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return username.equals(userDetails.getUsername())
                    && !isTokenExpired(token);
        } catch (ExpiredJwtException e) {
            log.warn("JWT token expired: {}", e.getMessage());
            return false;
        } catch (UnsupportedJwtException e) {
            log.warn("Unsupported JWT token: {}", e.getMessage());
            return false;
        } catch (MalformedJwtException e) {
            log.warn("Malformed JWT token: {}", e.getMessage());
            return false;
        } catch (IllegalArgumentException e) {
            log.warn("JWT claims string is empty: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Returns true if the token has passed its expiration date.
     */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ─────────────────────────────────────────
    // Claim Extraction
    // ─────────────────────────────────────────

    /** Extract username (subject) from token. */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /** Extract expiration date from token. */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /** Extract role claim from token. */
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    /** Extract issued-at date from token. */
    public Date extractIssuedAt(String token) {
        return extractClaim(token, Claims::getIssuedAt);
    }

    /** Generic claim extractor using a resolver function. */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /** Parse and return all claims from token. */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ─────────────────────────────────────────
    // Signing Key
    // ─────────────────────────────────────────

    /**
     * Build the HMAC-SHA256 signing key from the configured secret string.
     * Uses raw UTF-8 bytes — secret must be at least 32 characters for HS256.
     */
    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}