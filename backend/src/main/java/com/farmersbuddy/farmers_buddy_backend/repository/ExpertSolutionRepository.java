package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.ExpertSolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpertSolutionRepository extends JpaRepository<ExpertSolution, Long> {

    List<ExpertSolution> findByExpertId(Long expertId);
}
