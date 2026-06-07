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
// =============================================================

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    // -------------------------
    // Create a New Query
    // -------------------------
    public Query createQuery(Query query) {
        query.setStatus("PENDING");
        return queryRepository.save(query);
    }

    // -------------------------
    // Save / Update a Query
    // -------------------------
    public Query saveQuery(Query query) {
        return queryRepository.save(query);
    }

    // -------------------------
    // Get All Queries
    // -------------------------
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // -------------------------
    // Get Query by ID
    // -------------------------
    public Query getQueryById(Long id) {
        return queryRepository.findById(id).orElse(null);
    }

    // -------------------------
    // Get Queries by Farmer Name
    // -------------------------
    public List<Query> getQueriesByFarmerName(String farmerName) {
        return queryRepository.findByFarmerName(farmerName);
    }

    // -------------------------
    // Get Queries by Farmer ID
    // -------------------------
    public List<Query> getQueriesByFarmerId(Long farmerId) {
        return queryRepository.findByFarmerId(farmerId);
    }

    // -------------------------
    // Delete a Query
    // -------------------------
    public void deleteQuery(Long id) {
        queryRepository.deleteById(id);
    }
}
