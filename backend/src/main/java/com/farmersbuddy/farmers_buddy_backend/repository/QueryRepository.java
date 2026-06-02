package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.Query;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// =============================================================
// QueryRepository.java — Data Access Layer for Query Entity
// =============================================================
// Extends JpaRepository to provide standard CRUD operations
// for the Query entity (queries table in MySQL).
//
// Custom Derived Query Methods:
//   Spring Data JPA generates SQL automatically from method names:
//
//   findByFarmerName(String farmerName)
//     → SELECT * FROM queries WHERE farmer_name = ?
//     → Used for looking up queries by farmer's name string
//
//   findByFarmerId(Long farmerId)
//     → SELECT * FROM queries WHERE farmer_id = ?
//     → Used by the Farmer Dashboard to load only the logged-in farmer's queries
//
// Used by: QueryService
// =============================================================

public interface QueryRepository extends JpaRepository<Query, Long> {

    // Find all queries submitted by a specific farmer (by name)
    List<Query> findByFarmerName(String farmerName);

    // Find all queries submitted by a specific farmer (by ID)
    // Preferred over findByFarmerName for accuracy when IDs are available
    List<Query> findByFarmerId(Long farmerId);

}
