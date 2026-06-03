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
// Notifications:
//   saveQuery (reply workflow) → notifies the specific farmer when
//   their query status changes to RESOLVED.
// =============================================================

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    // Injected to auto-generate a notification when an officer replies
    @Autowired
    private NotificationService notificationService;

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
    // Called by the officer reply flow. When the query becomes RESOLVED,
    // a notification is automatically sent to the farmer who owns it.
    public Query saveQuery(Query query) {
        Query saved = queryRepository.save(query);
        if ("RESOLVED".equals(saved.getStatus()) && saved.getFarmerId() != null) {
            notificationService.notifyUser(
                saved.getFarmerId(),
                "Your query \"" + saved.getTitle() + "\" has been answered by an officer."
            );
        }
        return saved;
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
