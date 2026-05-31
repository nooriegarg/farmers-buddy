package com.farmersbuddy.controller;

import com.farmersbuddy.dto.ApiResponse;
import com.farmersbuddy.dto.MandiPriceRequest;
import com.farmersbuddy.dto.MandiPriceResponse;
import com.farmersbuddy.service.MandiPriceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Mandi Price endpoints.
 * Base: /api/mandi-prices
 */
@RestController
@RequestMapping("/api/mandi-prices")
@RequiredArgsConstructor
@Slf4j
public class MandiPriceController {

    private final MandiPriceService mandiPriceService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<MandiPriceResponse>> create(
            @Valid @RequestBody MandiPriceRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        MandiPriceResponse response = mandiPriceService.create(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Mandi price created", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<MandiPriceResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Mandi price fetched", mandiPriceService.getById(id)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<MandiPriceResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("All mandi prices", mandiPriceService.getAll()));
    }

    @GetMapping("/crop/{cropName}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<MandiPriceResponse>>> getByCrop(@PathVariable String cropName) {
        return ResponseEntity.ok(ApiResponse.success("Prices by crop", mandiPriceService.getByCrop(cropName)));
    }

    @GetMapping("/market/{marketName}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<MandiPriceResponse>>> getByMarket(@PathVariable String marketName) {
        return ResponseEntity.ok(ApiResponse.success("Prices by market", mandiPriceService.getByMarket(marketName)));
    }

    @GetMapping("/state/{state}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<MandiPriceResponse>>> getByState(@PathVariable String state) {
        return ResponseEntity.ok(ApiResponse.success("Prices by state", mandiPriceService.getByState(state)));
    }

    @GetMapping("/date/{date}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<MandiPriceResponse>>> getByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(ApiResponse.success("Prices by date", mandiPriceService.getByDate(date)));
    }

    @GetMapping("/range")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<MandiPriceResponse>>> getByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(ApiResponse.success("Prices in range", mandiPriceService.getByDateRange(from, to)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<MandiPriceResponse>> update(
            @PathVariable Long id, @Valid @RequestBody MandiPriceRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Mandi price updated", mandiPriceService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        mandiPriceService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Mandi price deleted"));
    }
}