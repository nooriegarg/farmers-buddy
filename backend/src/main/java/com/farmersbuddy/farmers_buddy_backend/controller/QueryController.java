package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.Query;
import com.farmersbuddy.farmers_buddy_backend.service.QueryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// QueryController.java — REST Controller for Query Management APIs
// =============================================================
// Exposes HTTP endpoints for creating, retrieving, and replying to queries.
// Delegates business logic to QueryService.
//
// Base URL: /api/queries
//
// Endpoints:
//   POST   /api/queries                    → farmer creates a new query
//   GET    /api/queries                    → officer fetches all queries
//   GET    /api/queries/farmer/{farmerId}  → farmer fetches their own queries
//   PUT    /api/queries/{id}/reply         → officer submits a reply
//
// Query Lifecycle (handled in replyToQuery):
//   1. Fetch the existing query by ID
//   2. Set the officerReply text from the request body
//   3. Update status to "RESOLVED"
//   4. Save and return the updated query
//
// Viva Tip:
//   @PathVariable extracts the ID from the URL path (e.g., /queries/5/reply → id=5)
//   @RequestBody deserializes the incoming JSON into a Query object
// =============================================================

@RestController
@RequestMapping("/api/queries")
@CrossOrigin("*")
public class QueryController {

    // Injected by Spring — handles query CRUD and reply business logic
    @Autowired
    private QueryService queryService;

    // -------------------------
    // POST /api/queries
    // -------------------------
    // Farmer submits a new agriculture query.
    // QueryService sets the status to "PENDING" automatically.
    @PostMapping
    public Query createQuery(@RequestBody Query query) {
        return queryService.createQuery(query);
    }

    // -------------------------
    // GET /api/queries
    // -------------------------
    // Returns all queries from all farmers — used by the Officer Dashboard.
    @GetMapping
    public List<Query> getAllQueries() {
        return queryService.getAllQueries();
    }

    // -------------------------
    // GET /api/queries/farmer/{farmerId}
    // -------------------------
    // Returns queries belonging to a specific farmer, identified by farmerId.
    // Used by the Farmer Dashboard to load the logged-in farmer's queries only.
    @GetMapping("/farmer/{farmerId}")
    public List<Query> getQueriesByFarmer(
                @PathVariable Long farmerId
        ) {

            return queryService.getQueriesByFarmerId(farmerId);
        }

    // -------------------------
    // PUT /api/queries/{id}/reply
    // -------------------------
    // Officer submits a reply to a specific query.
    // Fetches the query, updates the officerReply and status, then saves it.
    @PutMapping("/{id}/reply")
    public Query replyToQuery(
            @PathVariable Long id,
            @RequestBody Query updatedQuery
    ) {

        Query query = queryService.getQueryById(id);
        query.setOfficerReply(updatedQuery.getOfficerReply());
        query.setStatus("RESOLVED");
        return queryService.saveQuery(query);
    }

    // -------------------------
    // PUT /api/queries/{id}/expert-reply
    // -------------------------
    // Expert submits a reply to a specific query.
    // Sets expertReply and marks as RESOLVED (if not already).
    @PutMapping("/{id}/expert-reply")
    public Query expertReplyToQuery(
            @PathVariable Long id,
            @RequestBody Query updatedQuery
    ) {

        Query query = queryService.getQueryById(id);
        query.setExpertReply(updatedQuery.getExpertReply());
        query.setStatus("RESOLVED");
        return queryService.saveQuery(query);
    }

    // -------------------------
    // DELETE /api/queries/{id}
    // -------------------------
    // Farmer deletes their own query.
    @DeleteMapping("/{id}")
    public void deleteQuery(@PathVariable Long id) {
        queryService.deleteQuery(id);
    }
}
