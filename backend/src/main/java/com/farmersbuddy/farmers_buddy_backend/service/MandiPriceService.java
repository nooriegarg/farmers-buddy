package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.MandiPrice;
import com.farmersbuddy.farmers_buddy_backend.repository.MandiPriceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// MandiPriceService.java — Business Logic for Mandi Prices Module
// =============================================================
// Handles publishing, fetching, and deleting mandi price entries.
// Sits between MandiPriceController and MandiPriceRepository.
//
// Architecture: MandiPriceController → MandiPriceService → Repository → MySQL
// =============================================================

@Service
public class MandiPriceService {

    @Autowired
    private MandiPriceRepository repository;

    // Save a new mandi price entry (admin action)
    public MandiPrice addPrice(MandiPrice price) {
        return repository.save(price);
    }

    // Return all published mandi prices (farmer view)
    public List<MandiPrice> getAllPrices() {
        return repository.findAll();
    }

    // Delete a mandi price entry by ID (admin action)
    public void deletePrice(Long id) {
        repository.deleteById(id);
    }
}
