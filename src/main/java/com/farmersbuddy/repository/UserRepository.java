package com.farmersbuddy.repository;

import com.farmersbuddy.entity.Role;
import com.farmersbuddy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity.
 * Provides CRUD operations and custom query methods.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by username (used for Spring Security authentication).
     */
    Optional<User> findByUsername(String username);

    /**
     * Find a user by email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if a username already exists.
     */
    boolean existsByUsername(String username);

    /**
     * Check if an email already exists.
     */
    boolean existsByEmail(String email);

    /**
     * Find all users by role.
     */
    List<User> findAllByRole(Role role);

    /**
     * Find all enabled users.
     */
    List<User> findAllByEnabled(boolean enabled);
}