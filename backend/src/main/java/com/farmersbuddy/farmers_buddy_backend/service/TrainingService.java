package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.Training;
import com.farmersbuddy.farmers_buddy_backend.entity.TrainingEnrollment;
import com.farmersbuddy.farmers_buddy_backend.repository.TrainingRepository;
import com.farmersbuddy.farmers_buddy_backend.repository.TrainingEnrollmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// TrainingService.java — Business Logic for Training Module
// =============================================================
// Handles all training and enrollment operations.
// Sits between TrainingController and the repositories.
//
// Architecture: TrainingController → TrainingService → Repositories → MySQL
//
// Notifications:
//   createTraining → notifies all FARMER users automatically
// =============================================================

@Service
public class TrainingService {

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private TrainingEnrollmentRepository enrollmentRepository;

    // Injected to auto-generate notifications on key events
    @Autowired
    private NotificationService notificationService;

    // -------------------------
    // Create a new training session (officer action)
    // -------------------------
    // After saving, notifies all farmers so they know a new session is available.
    public Training createTraining(Training training) {
        Training saved = trainingRepository.save(training);
        notificationService.notifyAllFarmers(
            "New training session available: \"" + saved.getTitle() + "\" — check the Trainings page to enroll."
        );
        return saved;
    }

    // -------------------------
    // Fetch all training sessions (farmer/officer view)
    // -------------------------
    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    // -------------------------
    // Enroll a farmer into a training (farmer action)
    // -------------------------
    public TrainingEnrollment enrollFarmer(TrainingEnrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    // -------------------------
    // Get all enrollments made by a specific farmer
    // -------------------------
    public List<TrainingEnrollment> getEnrollmentsByFarmer(Long farmerId) {
        return enrollmentRepository.findByFarmerId(farmerId);
    }

    // -------------------------
    // Get all enrollments for a specific training (officer view)
    // -------------------------
    public List<TrainingEnrollment> getEnrollmentsByTraining(Long trainingId) {
        return enrollmentRepository.findByTrainingId(trainingId);
    }

    // -------------------------
    // Delete a training session (officer action)
    // -------------------------
    public void deleteTraining(Long id) {
        trainingRepository.deleteById(id);
    }

    // -------------------------
    // Mark training as COMPLETED (officer action)
    // -------------------------
    public Training markCompleted(Long id) {
        Training training = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training not found"));
        training.setStatus("COMPLETED");
        return trainingRepository.save(training);
    }
}
