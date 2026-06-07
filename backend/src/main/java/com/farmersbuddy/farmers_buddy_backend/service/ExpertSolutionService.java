package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.ExpertSolution;
import com.farmersbuddy.farmers_buddy_backend.repository.ExpertSolutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// ExpertSolutionService.java — Business Logic for Expert Solutions
// =============================================================
// Handles CRUD for expert-posted farming solutions.
// =============================================================

@Service
public class ExpertSolutionService {

    @Autowired
    private ExpertSolutionRepository repository;

    // -------------------------
    // Post a new solution (expert action)
    // -------------------------
    public ExpertSolution addSolution(ExpertSolution solution) {
        return repository.save(solution);
    }

    // -------------------------
    // Get all solutions (farmer/all view)
    // -------------------------
    public List<ExpertSolution> getAllSolutions() {
        return repository.findAll();
    }

    // -------------------------
    // Get solutions posted by a specific expert
    // -------------------------
    public List<ExpertSolution> getMySolutions(Long expertId) {
        return repository.findByExpertId(expertId);
    }

    // -------------------------
    // Delete a solution (expert action)
    // -------------------------
    public void deleteSolution(Long id) {
        repository.deleteById(id);
    }

    // -------------------------
    // Update a solution (expert action)
    // -------------------------
    public ExpertSolution updateSolution(Long id, ExpertSolution updated) {
        ExpertSolution existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solution not found"));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setCategory(updated.getCategory());
        return repository.save(existing);
    }
}
