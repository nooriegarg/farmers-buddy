package com.farmersbuddy.dto;

import com.farmersbuddy.entity.CropRecommendation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CropRecommendationResponse {

    private Long id;
    private String cropName;
    private String title;
    private String description;
    private String season;
    private String soilType;
    private String region;
    private String tips;
    private boolean active;
    private Long createdById;
    private String createdByUsername;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CropRecommendationResponse fromEntity(CropRecommendation rec) {
        return CropRecommendationResponse.builder()
                .id(rec.getId())
                .cropName(rec.getCropName())
                .title(rec.getTitle())
                .description(rec.getDescription())
                .season(rec.getSeason())
                .soilType(rec.getSoilType())
                .region(rec.getRegion())
                .tips(rec.getTips())
                .active(rec.isActive())
                .createdById(rec.getCreatedBy() != null ? rec.getCreatedBy().getId() : null)
                .createdByUsername(rec.getCreatedBy() != null ? rec.getCreatedBy().getUsername() : null)
                .createdAt(rec.getCreatedAt())
                .updatedAt(rec.getUpdatedAt())
                .build();
    }
}