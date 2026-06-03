package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.Training;
import com.farmersbuddy.farmers_buddy_backend.entity.TrainingEnrollment;
import com.farmersbuddy.farmers_buddy_backend.service.TrainingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// TrainingController.java — REST Controller for Training Module
// =============================================================
// Exposes HTTP endpoints for creating training sessions (officers),
// enrolling farmers, and viewing enrollments.
//
// Base URL: /api/trainings
//
// Endpoints:
//   POST   /api/trainings                           → officer creates training
//   GET    /api/trainings                           → all users view trainings
//   POST   /api/trainings/enroll                    → farmer enrolls in training
//   GET    /api/trainings/farmer/{farmerId}         → farmer's own enrollments
//   GET    /api/trainings/{trainingId}/enrollments  → officer views who joined
// =============================================================

@RestController
@RequestMapping("/api/trainings")
@CrossOrigin("*")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    // -------------------------
    // POST /api/trainings
    // -------------------------
    // Officer creates a new training session.
    @PostMapping
    public Training createTraining(@RequestBody Training training) {
        return trainingService.createTraining(training);
    }

    // -------------------------
    // GET /api/trainings
    // -------------------------
    // Returns all training sessions — used by farmer and officer views.
    @GetMapping
    public List<Training> getAllTrainings() {
        return trainingService.getAllTrainings();
    }

    // -------------------------
    // POST /api/trainings/enroll
    // -------------------------
    // Farmer joins a training session. Saves enrollment with status PENDING.
    @PostMapping("/enroll")
    public TrainingEnrollment enrollFarmer(@RequestBody TrainingEnrollment enrollment) {
        return trainingService.enrollFarmer(enrollment);
    }

    // -------------------------
    // GET /api/trainings/farmer/{farmerId}
    // -------------------------
    // Returns all enrollments made by a specific farmer.
    // Used by the farmer to check which trainings they joined.
    @GetMapping("/farmer/{farmerId}")
    public List<TrainingEnrollment> getMyEnrollments(@PathVariable Long farmerId) {
        return trainingService.getEnrollmentsByFarmer(farmerId);
    }

    // -------------------------
    // GET /api/trainings/{trainingId}/enrollments
    // -------------------------
    // Returns all farmers who enrolled in a specific training.
    // Used by the officer to see participation.
    @GetMapping("/{trainingId}/enrollments")
    public List<TrainingEnrollment> getTrainingEnrollments(@PathVariable Long trainingId) {
        return trainingService.getEnrollmentsByTraining(trainingId);
    }

    // -------------------------
    // DELETE /api/trainings/{id}
    // -------------------------
    // Officer deletes a training session they created.
    @DeleteMapping("/{id}")
    public void deleteTraining(@PathVariable Long id) {
        trainingService.deleteTraining(id);
    }

    // -------------------------
    // PUT /api/trainings/{id}/complete
    // -------------------------
    // Officer marks a training session as COMPLETED.
    @PutMapping("/{id}/complete")
    public Training markCompleted(@PathVariable Long id) {
        return trainingService.markCompleted(id);
    }
}
