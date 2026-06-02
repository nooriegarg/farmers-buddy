package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// =============================================================
// UserRepository.java — Data Access Layer for User Entity
// =============================================================
// This interface extends JpaRepository, giving it full CRUD
// operations (save, findById, findAll, delete, etc.) automatically
// implemented by Spring Data JPA at runtime — no SQL needed.
//
// JpaRepository<User, Long>:
//   - User : the entity type this repository manages
//   - Long : the data type of the primary key (id field)
//
// Custom Query Method:
//   findByEmail(String email) — Spring Data JPA automatically
//   generates the SQL: SELECT * FROM users WHERE email = ?
//   from the method name alone (method name derived queries).
//
// Used by: AuthService (for login validation and duplicate email check)
// =============================================================

public interface UserRepository extends JpaRepository<User, Long> {

    // Custom derived query — finds a user by their email address.
    // Returns Optional<User> to safely handle cases where no user is found.
    Optional<User> findByEmail(String email);
}
