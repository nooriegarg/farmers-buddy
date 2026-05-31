package com.farmersbuddy.dto;

import com.farmersbuddy.entity.TrainingProgram;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrainingProgramResponse {

    private Long id;
    private String title;
    private String description;
    private String venue;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maxParticipants;
    private Integer currentParticipants;
    private String topic;
    private String trainerName;
    private LocalDate registrationDeadline;
    private boolean active;
    private boolean full;
    private Long createdById;
    private String createdByUsername;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TrainingProgramResponse fromEntity(TrainingProgram tp) {
        boolean isFull = tp.getMaxParticipants() != null
                && tp.getCurrentParticipants() >= tp.getMaxParticipants();
        return TrainingProgramResponse.builder()
                .id(tp.getId())
                .title(tp.getTitle())
                .description(tp.getDescription())
                .venue(tp.getVenue())
                .startDate(tp.getStartDate())
                .endDate(tp.getEndDate())
                .maxParticipants(tp.getMaxParticipants())
                .currentParticipants(tp.getCurrentParticipants())
                .topic(tp.getTopic())
                .trainerName(tp.getTrainerName())
                .registrationDeadline(tp.getRegistrationDeadline())
                .active(tp.isActive())
                .full(isFull)
                .createdById(tp.getCreatedBy() != null ? tp.getCreatedBy().getId() : null)
                .createdByUsername(tp.getCreatedBy() != null ? tp.getCreatedBy().getUsername() : null)
                .createdAt(tp.getCreatedAt())
                .updatedAt(tp.getUpdatedAt())
                .build();
    }
}