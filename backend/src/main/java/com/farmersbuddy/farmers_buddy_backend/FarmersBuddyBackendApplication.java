package com.farmersbuddy.farmers_buddy_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// =============================================================
// FarmersBuddyBackendApplication.java — Spring Boot Entry Point
// =============================================================
// This is the main class that launches the entire Spring Boot backend.
//
// @SpringBootApplication is a convenience annotation that combines:
//   - @Configuration       : marks this class as a Spring config source
//   - @EnableAutoConfiguration : enables Spring Boot's auto-configuration
//   - @ComponentScan       : scans this package and sub-packages for beans
//
// SpringApplication.run() bootstraps the application, starts the
// embedded Tomcat server on port 8080, and initializes the
// Spring application context (all beans, controllers, services, etc.).
// =============================================================

@SpringBootApplication
public class FarmersBuddyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmersBuddyBackendApplication.class, args);
	}

}
