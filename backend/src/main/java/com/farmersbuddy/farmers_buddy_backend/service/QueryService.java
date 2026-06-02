package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.Query;
import com.farmersbuddy.farmers_buddy_backend.repository.QueryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// QueryService.java — Business Logic Layer for Query Management
// =============================================================
// Handles all business logic related to farmer queries.
// Acts as the intermediary between QueryController and QueryRepository.
//
// Architecture Position:
//   QueryController → QueryService → QueryRepository → MySQL
//
// Responsibilities:
//   - Set default status "PENDING" when a new query is created
//   - Provide data retrieval methods for both farmer and officer views
//   - Support the reply workflow (officer updates a query via saveQuery)
// =============================================================

@Service
public class QueryService {

    // Injected by Spring — provides access to the queries table in MySQL
    @Autowired
    private QueryRepository queryRepository;

    // -------------------------
    // Create a New Query
    // -------------------------
    // Sets the initial status to "PENDING" before saving.
    // This ensures every new query starts in the PENDING state.
    public Query createQuery(Query query) {
        query.setStatus("PENDING");
        return queryRepository.save(query);
    }

    // -------------------------
    // Save / Update a Query
    // -------------------------
    // General-purpose save used when updating an existing query
    // (e.g., after an officer submits a reply via the controller).
    public Query saveQuery(Query query) {

        return queryRepository.save(query);
    }

    // -------------------------
    // Get All Queries
    // -------------------------
    // Returns every query in the database — used by the Officer Dashboard
    // to display all farmer queries across the platform.
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // -------------------------
    // Get Query by ID
    // -------------------------
    // Fetches a single query by its primary key.
    // Returns null if not found — used before updating (e.g., officer reply).
    public Query getQueryById(Long id) {

        return queryRepository.findById(id).orElse(null);
    }

    // -------------------------
    // Get Queries by Farmer Name
    // -------------------------
    // Fetches queries filtered by the farmer's name string.
    // Calls the derived query method in QueryRepository.
    public List<Query> getQueriesByFarmerName(String farmerName) {

        return queryRepository.findByFarmerName(farmerName);
    }

    // -------------------------
    // Get Queries by Farmer ID
    // -------------------------
    // Fetches queries filtered by the farmer's numeric ID.
    // Preferred method — used by the Farmer Dashboard to load
    // only the logged-in farmer's own queries.
    public List<Query> getQueriesByFarmerId(Long farmerId) {

    return queryRepository.findByFarmerId(farmerId);
}
}
