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
//
// Notifications:
//   addPrice → notifies all FARMER users that mandi prices have been updated.
// =============================================================

@Service
public class MandiPriceService {

    @Autowired
    private MandiPriceRepository repository;

    // Injected to auto-generate a notification when prices are published
    @Autowired
    private NotificationService notificationService;

    // -------------------------
    // Publish a new mandi price entry (admin action)
    // -------------------------
    // Notifies all farmers so they can check the updated market rates.
    public MandiPrice addPrice(MandiPrice price) {
        MandiPrice saved = repository.save(price);
        notificationService.notifyAllFarmers(
            "Mandi prices updated for " + saved.getCropName() + " — check the Mandi Prices page for latest rates."
        );
        return saved;
    }

    // -------------------------
    // Return all published mandi prices (farmer view)
    // -------------------------
    public List<MandiPrice> getAllPrices() {
        return repository.findAll();
    }

    // -------------------------
    // Delete a mandi price entry by ID (admin action)
    // -------------------------
    public void deletePrice(Long id) {
        repository.deleteById(id);
    }
}
