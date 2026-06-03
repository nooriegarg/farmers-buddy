package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.AwarenessDrive;
import com.farmersbuddy.farmers_buddy_backend.repository.AwarenessDriveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// AwarenessDriveService.java — Business Logic for Awareness Module
// =============================================================
// Handles creating, fetching, and deleting awareness drives.
// Sits between AwarenessDriveController and AwarenessDriveRepository.
//
// Architecture: Controller → AwarenessDriveService → Repository → MySQL
//
// Notifications:
//   createDrive → notifies all FARMER users about the new drive.
//   createDrive → also notifies OFFICERs and EXPERTs (admin-level event).
// =============================================================

@Service
public class AwarenessDriveService {

    @Autowired
    private AwarenessDriveRepository repository;

    // Injected to auto-generate notifications when a drive is published
    @Autowired
    private NotificationService notificationService;

    // -------------------------
    // Create a new awareness drive (admin/officer action)
    // -------------------------
    // Notifies farmers, officers, and experts about the new drive.
    public AwarenessDrive createDrive(AwarenessDrive drive) {
        AwarenessDrive saved = repository.save(drive);
        String msg = "New awareness drive published: \"" + saved.getTitle() + "\" — visit the Awareness page for details.";
        notificationService.notifyAllFarmers(msg);
        notificationService.notifyByRole("OFFICER", "Admin published a new awareness drive: \"" + saved.getTitle() + "\".");
        notificationService.notifyByRole("EXPERT",  "Admin published a new awareness drive: \"" + saved.getTitle() + "\".");
        return saved;
    }

    // -------------------------
    // Return all awareness drives (farmer view)
    // -------------------------
    public List<AwarenessDrive> getAllDrives() {
        return repository.findAll();
    }

    // -------------------------
    // Delete an awareness drive by ID (admin action)
    // -------------------------
    public void deleteDrive(Long id) {
        repository.deleteById(id);
    }
}
