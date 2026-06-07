package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// Query.java — JPA Entity for the "queries" Database Table
// =============================================================
// Represents an agriculture query submitted by a farmer.
// Mapped to the "queries" table in MySQL by Hibernate/JPA.
//
// Lifecycle:
//   1. Farmer submits query → status set to "PENDING", officerReply is null
//   2. Officer replies → officerReply is populated, status changes to "RESOLVED"
//
// Lombok Annotations:
//   @Getter / @Setter on each field auto-generate getters and setters,
//   eliminating repetitive boilerplate code.
//
// Fields:
//   - id          : auto-incremented primary key
//   - farmerName  : name of the farmer who submitted the query
//   - farmerId    : ID of the farmer (for filtering queries by farmer)
//   - title       : short title/subject of the query
//   - description : detailed description of the farming issue
//   - officerReply: the officer's reply (null until replied)
//   - status      : "PENDING" (initial) or "RESOLVED" (after reply)
// =============================================================

@Entity
@Table(name = "queries")
public class Query {

    // Primary key — auto-incremented by MySQL
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the farmer who submitted this query
    @Getter
    @Setter
    private String farmerName;

    // ID of the farmer — used by getQueriesByFarmerId() for filtering
    @Getter
    @Setter
    private Long farmerId;

    // Short title summarizing the query
    @Setter
    @Getter
    private String title;

    // Full description of the farming problem or question
    @Getter
    @Setter
    private String description;

    // Officer's reply text — null until the officer responds
    @Getter
    @Setter
    private String officerReply;

    // Expert's reply text — null until an expert responds
    @Getter
    @Setter
    private String expertReply;

    // Query lifecycle status: "PENDING" → "RESOLVED"
    @Setter
    @Getter
    private String status;


    // -------------------------
    // Constructors
    // -------------------------

    public Query() {
    }

    public Query(Long id, String farmerName, String title, String description, String officerReply,
                 String status) {
        this.id = id;
        this.farmerName = farmerName;
        this.title = title;
        this.description = description;
        this.officerReply = officerReply;
        this.status = status;
    }

}
