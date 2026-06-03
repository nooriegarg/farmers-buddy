package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.AwarenessDrive;
import com.farmersbuddy.farmers_buddy_backend.service.AwarenessDriveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// AwarenessDriveController.java — REST Controller for Awareness Module
// =============================================================
// Exposes HTTP endpoints for publishing and managing awareness drives.
//
// Base URL: /api/awareness
//
// Endpoints:
//   POST   /api/awareness        → admin/officer publishes awareness drive
//   GET    /api/awareness        → all users view drives
//   DELETE /api/awareness/{id}   → admin deletes a drive
// =============================================================

@RestController
@RequestMapping("/api/awareness")
@CrossOrigin("*")
public class AwarenessDriveController {

    @Autowired
    private AwarenessDriveService awarenessDriveService;

    // -------------------------
    // POST /api/awareness
    // -------------------------
    // Admin or Officer publishes a new awareness drive.
    @PostMapping
    public AwarenessDrive createDrive(@RequestBody AwarenessDrive drive) {
        return awarenessDriveService.createDrive(drive);
    }

    // -------------------------
    // GET /api/awareness
    // -------------------------
    // Returns all published awareness drives — visible to all users.
    @GetMapping
    public List<AwarenessDrive> getAllDrives() {
        return awarenessDriveService.getAllDrives();
    }

    // -------------------------
    // DELETE /api/awareness/{id}
    // -------------------------
    // Admin deletes an awareness drive by its ID.
    @DeleteMapping("/{id}")
    public void deleteDrive(@PathVariable Long id) {
        awarenessDriveService.deleteDrive(id);
    }
}
