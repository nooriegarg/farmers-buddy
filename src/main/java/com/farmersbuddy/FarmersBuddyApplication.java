package com.farmersbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Farmers Buddy - Spring Boot Application Entry Point
 *
 * A backend REST API for managing farmers, officers, and admins
 * with JWT-based authentication and role-based access control.
 *
 * Roles:
 *   - FARMER  : Regular farmer user
 *   - OFFICER : Agriculture officer / government official
 *   - ADMIN   : System administrator
 *
 * Key endpoints:
 *   POST /api/auth/register  - Register a new user
 *   POST /api/auth/login     - Login and receive JWT token
 *   GET  /api/users          - List all users (ADMIN only)
 */
@SpringBootApplication
public class FarmersBuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(FarmersBuddyApplication.class, args);
    }
}