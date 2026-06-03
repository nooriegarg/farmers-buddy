package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// Training.java — JPA Entity for the "trainings" Table
// =============================================================
// Represents a training session created by an Agriculture Officer.
// Officers schedule trainings with a date, location, and max participants.
// Farmers can then enroll via TrainingEnrollment.
//
// Status lifecycle: "UPCOMING" → "COMPLETED"
// =============================================================

@Entity
@Table(name = "trainings")
public class Training {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of the training session
    @Getter @Setter
    private String title;

    // Detailed description of what will be covered
    @Getter @Setter
    @Column(length = 1000)
    private String description;

    // Physical or online location of the training
    @Getter @Setter
    private String location;

    // Date of training (stored as String, e.g. "2024-03-15")
    @Getter @Setter
    private String date;

    // Time of training (stored as String, e.g. "10:00 AM")
    @Getter @Setter
    private String time;

    // Name of the officer who created this training
    @Getter @Setter
    private String officerName;

    // Maximum number of farmers who can join
    @Getter @Setter
    private int maxParticipants;

    // Status: "UPCOMING" initially, "COMPLETED" after the training date
    @Getter @Setter
    private String status;

    public Training() {
        this.status = "UPCOMING";
    }
}
