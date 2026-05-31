package com.farmersbuddy.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MandiPriceRequest {

    @NotBlank(message = "Crop name is required")
    private String cropName;

    @NotBlank(message = "Market name is required")
    private String marketName;

    private String state;
    private String district;

    @NotNull(message = "Min price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Min price must be positive")
    private BigDecimal minPrice;

    @NotNull(message = "Max price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Max price must be positive")
    private BigDecimal maxPrice;

    @NotNull(message = "Modal price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Modal price must be positive")
    private BigDecimal modalPrice;

    private String unit;

    @NotNull(message = "Price date is required")
    private LocalDate priceDate;
}