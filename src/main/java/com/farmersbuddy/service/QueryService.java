package com.farmersbuddy.service;

import com.farmersbuddy.dto.QueryAnswerRequest;
import com.farmersbuddy.dto.QueryRequest;
import com.farmersbuddy.dto.QueryResponse;
import com.farmersbuddy.entity.QueryStatus;

import java.util.List;

public interface QueryService {
    QueryResponse createQuery(QueryRequest request, String farmerUsername);
    QueryResponse getQueryById(Long id);
    List<QueryResponse> getAllQueries();
    List<QueryResponse> getQueriesByFarmer(Long farmerId);
    List<QueryResponse> getQueriesByOfficer(Long officerId);
    List<QueryResponse> getQueriesByStatus(QueryStatus status);
    QueryResponse answerQuery(Long queryId, QueryAnswerRequest request, String officerUsername);
    QueryResponse assignOfficer(Long queryId, Long officerId);
    QueryResponse updateStatus(Long queryId, QueryStatus status);
    void deleteQuery(Long id);
}