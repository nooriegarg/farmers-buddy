package com.farmersbuddy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Mandi (agricultural market) price entry for a crop on a specific date.
 * Posted by OFFICERs; visible to all FARMERs.
 */
@Entity
@Table(name = "mandi_prices",
        indexes = {
                @Index(name = "idx_mandi_crop", columnList = "crop_name"),
                @Index(name = "idx_mandi_market", columnList = "market_name"),
                @Index(name = "idx_mandi_date", columnList = "price_date")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MandiPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crop_name", nullable = false, length = 100)
    private String cropName;

    @Column(name = "market_name", nullable = false, length = 150)
    private String marketName;

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    private String district;

    @Column(name = "min_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal minPrice;

    @Column(name = "max_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal maxPrice;

    @Column(name = "modal_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal modalPrice;

    @Column(length = 20)
    @Builder.Default
    private String unit = "Quintal";

    @Column(name = "price_date", nullable = false)
    private LocalDate priceDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by_id", nullable = false)
    private User postedBy;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}