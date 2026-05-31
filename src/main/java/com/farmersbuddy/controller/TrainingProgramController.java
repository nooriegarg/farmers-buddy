package com.farmersbuddy.controller;

import com.farmersbuddy.dto.ApiResponse;
import com.farmersbuddy.dto.TrainingProgramRequest;
import com.farmersbuddy.dto.TrainingProgramResponse;
import com.farmersbuddy.service.TrainingProgramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Training Program endpoints.
 * Base: /api/training-programs
 */
@RestController
@RequestMapping("/api/training-programs")
@RequiredArgsConstructor
@Slf4j
public class TrainingProgramController {

    private final TrainingProgramService trainingService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> create(
            @Valid @RequestBody TrainingProgramRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        TrainingProgramResponse response = trainingService.create(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Training program created", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Training program fetched", trainingService.getById(id)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("All training programs", trainingService.getAllActive()));
    }

    @GetMapping("/upcoming")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getUpcoming() {
        return ResponseEntity.ok(ApiResponse.success("Upcoming programs", trainingService.getUpcoming()));
    }

    @GetMapping("/topic/{topic}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<List<TrainingProgramResponse>>> getByTopic(@PathVariable String topic) {
        return ResponseEntity.ok(ApiResponse.success("Programs by topic", trainingService.getByTopic(topic)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> update(
            @PathVariable Long id, @Valid @RequestBody TrainingProgramRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Program updated", trainingService.update(id, request)));
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> toggleActive(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Status toggled", trainingService.toggleActive(id)));
    }

    @PatchMapping("/{id}/enroll")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ApiResponse<TrainingProgramResponse>> enroll(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Enrolled successfully", trainingService.enrollParticipant(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        trainingService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Training program deleted"));
    }
}