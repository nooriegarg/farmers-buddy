package com.farmersbuddy.service;

import com.farmersbuddy.dto.MandiPriceRequest;
import com.farmersbuddy.dto.MandiPriceResponse;

import java.time.LocalDate;
import java.util.List;

public interface MandiPriceService {
    MandiPriceResponse create(MandiPriceRequest request, String officerUsername);
    MandiPriceResponse getById(Long id);
    List<MandiPriceResponse> getAll();
    List<MandiPriceResponse> getByCrop(String cropName);
    List<MandiPriceResponse> getByMarket(String marketName);
    List<MandiPriceResponse> getByDate(LocalDate date);
    List<MandiPriceResponse> getByState(String state);
    List<MandiPriceResponse> getByDateRange(LocalDate from, LocalDate to);
    MandiPriceResponse update(Long id, MandiPriceRequest request);
    void delete(Long id);
}