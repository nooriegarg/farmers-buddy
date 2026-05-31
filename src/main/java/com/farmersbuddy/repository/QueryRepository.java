package com.farmersbuddy.repository;

import com.farmersbuddy.entity.Query;
import com.farmersbuddy.entity.QueryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {

    List<Query> findAllByFarmerId(Long farmerId);

    List<Query> findAllByAssignedOfficerId(Long officerId);

    List<Query> findAllByStatus(QueryStatus status);

    List<Query> findAllByFarmerIdAndStatus(Long farmerId, QueryStatus status);

    List<Query> findAllByCategoryIgnoreCase(String category);

    long countByStatus(QueryStatus status);
}