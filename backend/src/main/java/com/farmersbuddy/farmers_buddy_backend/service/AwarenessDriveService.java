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
// =============================================================

@Service
public class AwarenessDriveService {

    @Autowired
    private AwarenessDriveRepository repository;

    // Save a new awareness drive to the DB (admin/officer action)
    public AwarenessDrive createDrive(AwarenessDrive drive) {
        return repository.save(drive);
    }

    // Return all awareness drives (farmer view)
    public List<AwarenessDrive> getAllDrives() {
        return repository.findAll();
    }

    // Delete an awareness drive by ID (admin action)
    public void deleteDrive(Long id) {
        repository.deleteById(id);
    }
}
