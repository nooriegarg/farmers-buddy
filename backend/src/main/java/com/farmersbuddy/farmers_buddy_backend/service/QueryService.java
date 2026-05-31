package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.Query;
import com.farmersbuddy.farmers_buddy_backend.repository.QueryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public Query createQuery(Query query) {
        query.setStatus("PENDING");
        return queryRepository.save(query);
    }

    public Query saveQuery(Query query) {

        return queryRepository.save(query);
    }

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Query getQueryById(Long id) {

        return queryRepository.findById(id).orElse(null);
    }

    public List<Query> getQueriesByFarmerName(String farmerName) {

        return queryRepository.findByFarmerName(farmerName);
    }
}