package com.farmersbuddy.dto;

import com.farmersbuddy.entity.Query;
import com.farmersbuddy.entity.QueryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueryResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String answer;
    private QueryStatus status;
    private Long farmerId;
    private String farmerUsername;
    private Long assignedOfficerId;
    private String assignedOfficerUsername;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;

    public static QueryResponse fromQuery(Query query) {
        return QueryResponse.builder()
                .id(query.getId())
                .title(query.getTitle())
                .description(query.getDescription())
                .category(query.getCategory())
                .answer(query.getAnswer())
                .status(query.getStatus())
                .farmerId(query.getFarmer() != null ? query.getFarmer().getId() : null)
                .farmerUsername(query.getFarmer() != null ? query.getFarmer().getUsername() : null)
                .assignedOfficerId(query.getAssignedOfficer() != null ? query.getAssignedOfficer().getId() : null)
                .assignedOfficerUsername(query.getAssignedOfficer() != null ? query.getAssignedOfficer().getUsername() : null)
                .createdAt(query.getCreatedAt())
                .updatedAt(query.getUpdatedAt())
                .resolvedAt(query.getResolvedAt())
                .build();
    }
}