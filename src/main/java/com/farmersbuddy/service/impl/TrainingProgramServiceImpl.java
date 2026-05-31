package com.farmersbuddy.service.impl;

import com.farmersbuddy.dto.TrainingProgramRequest;
import com.farmersbuddy.dto.TrainingProgramResponse;
import com.farmersbuddy.entity.TrainingProgram;
import com.farmersbuddy.entity.User;
import com.farmersbuddy.repository.TrainingProgramRepository;
import com.farmersbuddy.repository.UserRepository;
import com.farmersbuddy.service.TrainingProgramService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TrainingProgramServiceImpl implements TrainingProgramService {

    private final TrainingProgramRepository trainingRepo;
    private final UserRepository userRepository;

    @Override
    public TrainingProgramResponse create(TrainingProgramRequest req, String officerUsername) {
        User officer = findUser(officerUsername);
        TrainingProgram tp = TrainingProgram.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .venue(req.getVenue())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .maxParticipants(req.getMaxParticipants())
                .topic(req.getTopic())
                .trainerName(req.getTrainerName())
                .registrationDeadline(req.getRegistrationDeadline())
                .createdBy(officer)
                .active(true)
                .build();
        return TrainingProgramResponse.fromEntity(trainingRepo.save(tp));
    }

    @Override
    @Transactional(readOnly = true)
    public TrainingProgramResponse getById(Long id) {
        return TrainingProgramResponse.fromEntity(findById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingProgramResponse> getAll() {
        return trainingRepo.findAll().stream()
                .map(TrainingProgramResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingProgramResponse> getAllActive() {
        return trainingRepo.findAllByActiveTrue().stream()
                .map(TrainingProgramResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingProgramResponse> getUpcoming() {
        return trainingRepo.findAllByActiveTrueAndStartDateGreaterThanEqual(LocalDate.now()).stream()
                .map(TrainingProgramResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingProgramResponse> getByTopic(String topic) {
        return trainingRepo.findAllByTopicIgnoreCaseAndActiveTrue(topic).stream()
                .map(TrainingProgramResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    public TrainingProgramResponse update(Long id, TrainingProgramRequest req) {
        TrainingProgram tp = findById(id);
        tp.setTitle(req.getTitle());
        tp.setDescription(req.getDescription());
        tp.setVenue(req.getVenue());
        tp.setStartDate(req.getStartDate());
        tp.setEndDate(req.getEndDate());
        tp.setMaxParticipants(req.getMaxParticipants());
        tp.setTopic(req.getTopic());
        tp.setTrainerName(req.getTrainerName());
        tp.setRegistrationDeadline(req.getRegistrationDeadline());
        return TrainingProgramResponse.fromEntity(trainingRepo.save(tp));
    }

    @Override
    public TrainingProgramResponse toggleActive(Long id) {
        TrainingProgram tp = findById(id);
        tp.setActive(!tp.isActive());
        return TrainingProgramResponse.fromEntity(trainingRepo.save(tp));
    }

    @Override
    public TrainingProgramResponse enrollParticipant(Long id) {
        TrainingProgram tp = findById(id);
        if (tp.getMaxParticipants() != null && tp.getCurrentParticipants() >= tp.getMaxParticipants()) {
            throw new IllegalArgumentException("Training program is full: " + id);
        }
        tp.setCurrentParticipants(tp.getCurrentParticipants() + 1);
        return TrainingProgramResponse.fromEntity(trainingRepo.save(tp));
    }

    @Override
    public void delete(Long id) {
        trainingRepo.delete(findById(id));
    }

    private TrainingProgram findById(Long id) {
        return trainingRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Training program not found: " + id));
    }

    private User findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }
}