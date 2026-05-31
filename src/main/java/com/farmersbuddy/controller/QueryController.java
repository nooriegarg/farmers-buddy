package com.farmersbuddy.controller;

import com.farmersbuddy.dto.ApiResponse;
import com.farmersbuddy.dto.QueryAnswerRequest;
import com.farmersbuddy.dto.QueryRequest;
import com.farmersbuddy.dto.QueryResponse;
import com.farmersbuddy.entity.QueryStatus;
import com.farmersbuddy.service.QueryService;
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
 * Query endpoints — farmers raise queries, officers answer them.
 * Base: /api/queries
 */
@RestController
@RequestMapping("/api/queries")
@RequiredArgsConstructor
@Slf4j
public class QueryController {

    private final QueryService queryService;

    @PostMapping
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ApiResponse<QueryResponse>> create(
            @Valid @RequestBody QueryRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        QueryResponse response = queryService.createQuery(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Query created successfully", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER','FARMER')")
    public ResponseEntity<ApiResponse<QueryResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Query fetched", queryService.getQueryById(id)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<List<QueryResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("All queries", queryService.getAllQueries()));
    }

    @GetMapping("/farmer/{farmerId}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<List<QueryResponse>>> getByFarmer(@PathVariable Long farmerId) {
        return ResponseEntity.ok(ApiResponse.success("Farmer queries", queryService.getQueriesByFarmer(farmerId)));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ApiResponse<List<QueryResponse>>> getMyQueries(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success("My queries",
                queryService.getQueriesByFarmer(null)));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<List<QueryResponse>>> getByStatus(@PathVariable QueryStatus status) {
        return ResponseEntity.ok(ApiResponse.success("Queries by status", queryService.getQueriesByStatus(status)));
    }

    @PutMapping("/{id}/answer")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<QueryResponse>> answerQuery(
            @PathVariable Long id,
            @Valid @RequestBody QueryAnswerRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        QueryResponse response = queryService.answerQuery(id, request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Query answered", response));
    }

    @PutMapping("/{id}/assign/{officerId}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<QueryResponse>> assignOfficer(
            @PathVariable Long id, @PathVariable Long officerId) {
        return ResponseEntity.ok(ApiResponse.success("Officer assigned", queryService.assignOfficer(id, officerId)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<ApiResponse<QueryResponse>> updateStatus(
            @PathVariable Long id, @RequestParam QueryStatus status) {
        return ResponseEntity.ok(ApiResponse.success("Status updated", queryService.updateStatus(id, status)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        queryService.deleteQuery(id);
        return ResponseEntity.ok(ApiResponse.success("Query deleted"));
    }
}