package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.ExpertSolution;
import com.farmersbuddy.farmers_buddy_backend.service.ExpertSolutionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solutions")
@CrossOrigin("*")
public class ExpertSolutionController {

    @Autowired
    private ExpertSolutionService expertSolutionService;

    @PostMapping
    public ExpertSolution addSolution(@RequestBody ExpertSolution solution) {
        return expertSolutionService.addSolution(solution);
    }

    @GetMapping
    public List<ExpertSolution> getAllSolutions() {
        return expertSolutionService.getAllSolutions();
    }

    @GetMapping("/expert/{expertId}")
    public List<ExpertSolution> getMySolutions(@PathVariable Long expertId) {
        return expertSolutionService.getMySolutions(expertId);
    }

    @DeleteMapping("/{id}")
    public void deleteSolution(@PathVariable Long id) {
        expertSolutionService.deleteSolution(id);
    }
}
