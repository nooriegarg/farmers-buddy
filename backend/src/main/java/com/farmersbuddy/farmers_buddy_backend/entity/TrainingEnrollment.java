package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// TrainingEnrollment.java — JPA Entity for "training_enrollments" Table
// =============================================================
// Records a farmer's request to join a training session.
// Links a farmer (by farmerId) to a training (by trainingId).
//
// Created when a farmer clicks "Join Training" on the frontend.
// Status: "PENDING" (auto-set on enrollment)
// =============================================================

@Entity
@Table(name = "training_enrollments")
public class TrainingEnrollment {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK reference to the training session being joined
    @Getter @Setter
    private Long trainingId;

    // Name of the farmer who enrolled
    @Getter @Setter
    private String farmerName;

    // ID of the farmer — used for filtering by farmer
    @Getter @Setter
    private Long farmerId;

    // Enrollment status: "PENDING" by default
    @Getter @Setter
    private String status;

    public TrainingEnrollment() {
        this.status = "PENDING";
    }
}
