package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// =============================================================
// Tool.java — JPA Entity for the "tools" Table
// =============================================================
// Represents a farming tool or equipment entry in the tools catalog.
// Admins can add or remove tools from the catalog.
// Farmers can browse the catalog on the Tools Catalog page.
//
// Examples: Tractor, Sprinkler System, Soil Testing Kit, Drone Sprayer
// =============================================================

@Entity
@Table(name = "tools")
public class Tool {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Display name of the tool (e.g. "Tractor", "Drone Sprayer")
    @Getter @Setter
    private String name;

    // Category of the tool (e.g. "Cultivation", "Irrigation", "Analysis")
    @Getter @Setter
    private String category;

    // Detailed description of the tool's purpose and usage
    @Getter @Setter
    @Column(length = 1000)
    private String description;

    // Optional image URL for the tool
    @Getter @Setter
    private String imageUrl;

    // Price range or cost info (stored as String, e.g. "₹50,000 - ₹2,00,000")
    @Getter @Setter
    private String price;

    // Name of admin/expert who added this tool
    @Getter @Setter
    private String addedBy;

    // Brand or manufacturer name (e.g. "Mahindra", "John Deere")
    @Getter @Setter
    private String brand;

    // External buy/source link (e.g. Amazon, Flipkart, official site)
    @Getter @Setter
    private String sourceUrl;

    public Tool() {}
}
