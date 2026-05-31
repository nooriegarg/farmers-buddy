package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.Query;
import com.farmersbuddy.farmers_buddy_backend.service.QueryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin("*")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @PostMapping
    public Query createQuery(@RequestBody Query query) {
        return queryService.createQuery(query);
    }

    @GetMapping
    public List<Query> getAllQueries() {
        return queryService.getAllQueries();
    }

    @GetMapping("/farmer/{farmerName}")
    public List<Query> getQueriesByFarmer(
            @PathVariable String farmerName
    ) {

        return queryService.getQueriesByFarmerName(farmerName);
    }

    @PutMapping("/{id}/reply")
    public Query replyToQuery(
            @PathVariable Long id,
            @RequestBody Query updatedQuery
    ) {

        Query query =
                queryService.getQueryById(id);

        query.setOfficerReply(
                updatedQuery.getOfficerReply()
        );

        query.setStatus("RESOLVED");

        return queryService.saveQuery(query);
    }
}