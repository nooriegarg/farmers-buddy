package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// AwarenessDrive.java — JPA Entity for "awareness_drives" Table
// =============================================================
// Represents an awareness campaign or scheme published by an
// Admin or Agriculture Officer on the platform.
//
// Farmers can view all published drives on the Awareness page.
// Admins can delete drives.
//
// Category values: "Scheme" | "Tip" | "Alert"
// =============================================================

@Entity
@Table(name = "awareness_drives")
public class AwarenessDrive {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of the awareness drive or scheme
    @Getter @Setter
    private String title;

    // Detailed description of the drive
    @Getter @Setter
    @Column(length = 1000)
    private String description;

    // Optional image URL to display with the drive card
    @Getter @Setter
    private String imageUrl;

    // Name of admin/officer who published this drive
    @Getter @Setter
    private String publishedBy;

    // Category: "Scheme", "Tip", or "Alert"
    @Getter @Setter
    private String category;

    // Date when this drive was created (e.g. "2024-03-15")
    @Getter @Setter
    private String createdDate;

    public AwarenessDrive() {}
}
