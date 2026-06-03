package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.ExpertSolution;
import com.farmersbuddy.farmers_buddy_backend.repository.ExpertSolutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpertSolutionService {

    @Autowired
    private ExpertSolutionRepository repository;

    public ExpertSolution addSolution(ExpertSolution solution) {
        return repository.save(solution);
    }

    public List<ExpertSolution> getAllSolutions() {
        return repository.findAll();
    }

    public List<ExpertSolution> getMySolutions(Long expertId) {
        return repository.findByExpertId(expertId);
    }

    public void deleteSolution(Long id) {
        repository.deleteById(id);
    }
}
