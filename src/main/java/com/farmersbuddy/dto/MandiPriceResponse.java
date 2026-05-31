package com.farmersbuddy.dto;

import com.farmersbuddy.entity.MandiPrice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MandiPriceResponse {

    private Long id;
    private String cropName;
    private String marketName;
    private String state;
    private String district;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal modalPrice;
    private String unit;
    private LocalDate priceDate;
    private Long postedById;
    private String postedByUsername;
    private LocalDateTime createdAt;

    public static MandiPriceResponse fromEntity(MandiPrice mp) {
        return MandiPriceResponse.builder()
                .id(mp.getId())
                .cropName(mp.getCropName())
                .marketName(mp.getMarketName())
                .state(mp.getState())
                .district(mp.getDistrict())
                .minPrice(mp.getMinPrice())
                .maxPrice(mp.getMaxPrice())
                .modalPrice(mp.getModalPrice())
                .unit(mp.getUnit())
                .priceDate(mp.getPriceDate())
                .postedById(mp.getPostedBy() != null ? mp.getPostedBy().getId() : null)
                .postedByUsername(mp.getPostedBy() != null ? mp.getPostedBy().getUsername() : null)
                .createdAt(mp.getCreatedAt())
                .build();
    }
}