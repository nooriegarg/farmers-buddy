package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.Query;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QueryRepository extends JpaRepository<Query, Long> {

    List<Query> findByFarmerName(String farmerName);

}