package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.MandiPrice;
import com.farmersbuddy.farmers_buddy_backend.service.MandiPriceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// MandiPriceController.java — REST Controller for Mandi Prices Module
// =============================================================
// Exposes HTTP endpoints for publishing and managing mandi (market) prices.
//
// Base URL: /api/mandi
//
// Endpoints:
//   POST   /api/mandi        → admin publishes a new price entry
//   GET    /api/mandi        → all users view current mandi prices
//   DELETE /api/mandi/{id}   → admin removes an outdated price entry
// =============================================================

@RestController
@RequestMapping("/api/mandi")
@CrossOrigin("*")
public class MandiPriceController {

    @Autowired
    private MandiPriceService mandiPriceService;

    // -------------------------
    // POST /api/mandi
    // -------------------------
    // Admin publishes a new crop market price entry.
    @PostMapping
    public MandiPrice addPrice(@RequestBody MandiPrice price) {
        return mandiPriceService.addPrice(price);
    }

    // -------------------------
    // GET /api/mandi
    // -------------------------
    // Returns all published mandi prices — visible to farmers.
    @GetMapping
    public List<MandiPrice> getAllPrices() {
        return mandiPriceService.getAllPrices();
    }

    // -------------------------
    // DELETE /api/mandi/{id}
    // -------------------------
    // Admin removes an outdated price entry by ID.
    @DeleteMapping("/{id}")
    public void deletePrice(@PathVariable Long id) {
        mandiPriceService.deletePrice(id);
    }
}
