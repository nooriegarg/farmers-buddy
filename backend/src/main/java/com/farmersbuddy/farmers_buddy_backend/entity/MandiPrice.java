package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// MandiPrice.java — JPA Entity for the "mandi_prices" Table
// =============================================================
// Represents a crop price entry published by an Admin.
// Farmers can view current market (mandi) prices for different
// crops across different states and markets on the Mandi Prices page.
//
// Admins publish entries manually and can delete outdated ones.
// =============================================================

@Entity
@Table(name = "mandi_prices")
public class MandiPrice {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the crop (e.g. "Wheat", "Rice", "Cotton")
    @Getter @Setter
    private String cropName;

    // Name of the market/mandi (e.g. "Azadpur Mandi", "Vashi APMC")
    @Getter @Setter
    private String marketName;

    // Price of the crop (e.g. "₹2,100")
    @Getter @Setter
    private String price;

    // Unit of price measurement (e.g. "per quintal", "per kg")
    @Getter @Setter
    private String unit;

    // State where this mandi is located (e.g. "Maharashtra", "Punjab")
    @Getter @Setter
    private String state;

    // Date when this price was last updated (e.g. "2024-03-15")
    @Getter @Setter
    private String lastUpdated;

    // Name of the admin who published this price entry
    @Getter @Setter
    private String publishedBy;

    public MandiPrice() {}
}
