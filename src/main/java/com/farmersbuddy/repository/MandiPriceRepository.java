package com.farmersbuddy.repository;

import com.farmersbuddy.entity.MandiPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MandiPriceRepository extends JpaRepository<MandiPrice, Long> {

    List<MandiPrice> findAllByCropNameIgnoreCase(String cropName);

    List<MandiPrice> findAllByMarketNameIgnoreCase(String marketName);

    List<MandiPrice> findAllByPriceDate(LocalDate priceDate);

    List<MandiPrice> findAllByStateIgnoreCase(String state);

    List<MandiPrice> findAllByCropNameIgnoreCaseAndPriceDate(String cropName, LocalDate priceDate);

    List<MandiPrice> findAllByPriceDateBetween(LocalDate from, LocalDate to);

    List<MandiPrice> findAllByPostedById(Long officerId);
}