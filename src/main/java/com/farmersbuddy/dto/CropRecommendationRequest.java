package com.farmersbuddy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CropRecommendationRequest {

    @NotBlank(message = "Crop name is required")
    @Size(max = 100)
    private String cropName;

    @NotBlank(message = "Title is required")
    @Size(max = 200)
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @Size(max = 100)
    private String season;

    @Size(max = 100)
    private String soilType;

    @Size(max = 100)
    private String region;

    private String tips;
}