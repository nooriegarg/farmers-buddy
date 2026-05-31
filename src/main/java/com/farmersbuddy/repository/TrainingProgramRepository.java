package com.farmersbuddy.repository;

import com.farmersbuddy.entity.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {

    List<TrainingProgram> findAllByActiveTrue();

    List<TrainingProgram> findAllByActiveTrueAndStartDateGreaterThanEqual(LocalDate date);

    List<TrainingProgram> findAllByTopicIgnoreCaseAndActiveTrue(String topic);

    List<TrainingProgram> findAllByCreatedById(Long officerId);
}