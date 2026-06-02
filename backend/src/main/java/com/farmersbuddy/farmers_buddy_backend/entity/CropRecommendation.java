package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// CropRecommendation.java — JPA Entity for "crop_recommendations"
// =============================================================
// Represents a crop recommendation record stored in MySQL.
// Officers or admins can add recommendations that farmers can view.
//
// Lombok's @Getter and @Setter annotations at class level automatically
// generate getters and setters for all fields — no boilerplate needed.
//
// Fields:
//   - id             : auto-incremented primary key
//   - cropName       : name of the recommended crop (e.g., "Wheat")
//   - season         : optimal growing season (e.g., "Winter")
//   - recommendation : detailed recommendation text (up to 1000 characters)
// =============================================================

@Entity
@Table(name = "crop_recommendations")
@Getter
@Setter
public class CropRecommendation {

    // Primary key — auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the crop being recommended
    private String cropName;

    // The growing season for this crop (e.g., "Winter", "Monsoon", "Summer")
    private String season;

    // Detailed recommendation or advice for growing this crop
    @Column(length = 1000)
    private String recommendation;
}
