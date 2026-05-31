package com.farmersbuddy.service.impl;

import com.farmersbuddy.dto.QueryAnswerRequest;
import com.farmersbuddy.dto.QueryRequest;
import com.farmersbuddy.dto.QueryResponse;
import com.farmersbuddy.entity.Query;
import com.farmersbuddy.entity.QueryStatus;
import com.farmersbuddy.entity.User;
import com.farmersbuddy.repository.QueryRepository;
import com.farmersbuddy.repository.UserRepository;
import com.farmersbuddy.service.QueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class QueryServiceImpl implements QueryService {

    private final QueryRepository queryRepository;
    private final UserRepository userRepository;

    @Override
    public QueryResponse createQuery(QueryRequest request, String farmerUsername) {
        User farmer = findUserByUsername(farmerUsername);
        Query query = Query.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .farmer(farmer)
                .status(QueryStatus.OPEN)
                .build();
        return QueryResponse.fromQuery(queryRepository.save(query));
    }

    @Override
    @Transactional(readOnly = true)
    public QueryResponse getQueryById(Long id) {
        return QueryResponse.fromQuery(findQueryById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<QueryResponse> getAllQueries() {
        return queryRepository.findAll().stream()
                .map(QueryResponse::fromQuery).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<QueryResponse> getQueriesByFarmer(Long farmerId) {
        return queryRepository.findAllByFarmerId(farmerId).stream()
                .map(QueryResponse::fromQuery).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<QueryResponse> getQueriesByOfficer(Long officerId) {
        return queryRepository.findAllByAssignedOfficerId(officerId).stream()
                .map(QueryResponse::fromQuery).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<QueryResponse> getQueriesByStatus(QueryStatus status) {
        return queryRepository.findAllByStatus(status).stream()
                .map(QueryResponse::fromQuery).collect(Collectors.toList());
    }

    @Override
    public QueryResponse answerQuery(Long queryId, QueryAnswerRequest request, String officerUsername) {
        Query query = findQueryById(queryId);
        User officer = findUserByUsername(officerUsername);
        query.setAnswer(request.getAnswer());
        query.setAssignedOfficer(officer);
        query.setStatus(QueryStatus.RESOLVED);
        query.setResolvedAt(LocalDateTime.now());
        return QueryResponse.fromQuery(queryRepository.save(query));
    }

    @Override
    public QueryResponse assignOfficer(Long queryId, Long officerId) {
        Query query = findQueryById(queryId);
        User officer = userRepository.findById(officerId)
                .orElseThrow(() -> new IllegalArgumentException("Officer not found: " + officerId));
        query.setAssignedOfficer(officer);
        query.setStatus(QueryStatus.IN_PROGRESS);
        return QueryResponse.fromQuery(queryRepository.save(query));
    }

    @Override
    public QueryResponse updateStatus(Long queryId, QueryStatus status) {
        Query query = findQueryById(queryId);
        query.setStatus(status);
        if (status == QueryStatus.RESOLVED) query.setResolvedAt(LocalDateTime.now());
        return QueryResponse.fromQuery(queryRepository.save(query));
    }

    @Override
    public void deleteQuery(Long id) {
        queryRepository.delete(findQueryById(id));
    }

    private Query findQueryById(Long id) {
        return queryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Query not found: " + id));
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }
}