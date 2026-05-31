package com.farmersbuddy.service;

import com.farmersbuddy.dto.TrainingProgramRequest;
import com.farmersbuddy.dto.TrainingProgramResponse;

import java.util.List;

public interface TrainingProgramService {
    TrainingProgramResponse create(TrainingProgramRequest request, String officerUsername);
    TrainingProgramResponse getById(Long id);
    List<TrainingProgramResponse> getAll();
    List<TrainingProgramResponse> getAllActive();
    List<TrainingProgramResponse> getUpcoming();
    List<TrainingProgramResponse> getByTopic(String topic);
    TrainingProgramResponse update(Long id, TrainingProgramRequest request);
    TrainingProgramResponse toggleActive(Long id);
    TrainingProgramResponse enrollParticipant(Long id);
    void delete(Long id);
}