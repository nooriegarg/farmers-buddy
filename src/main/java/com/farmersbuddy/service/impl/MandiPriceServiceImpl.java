package com.farmersbuddy.service.impl;

import com.farmersbuddy.dto.MandiPriceRequest;
import com.farmersbuddy.dto.MandiPriceResponse;
import com.farmersbuddy.entity.MandiPrice;
import com.farmersbuddy.entity.User;
import com.farmersbuddy.repository.MandiPriceRepository;
import com.farmersbuddy.repository.UserRepository;
import com.farmersbuddy.service.MandiPriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MandiPriceServiceImpl implements MandiPriceService {

    private final MandiPriceRepository mandiRepo;
    private final UserRepository userRepository;

    @Override
    public MandiPriceResponse create(MandiPriceRequest req, String officerUsername) {
        User officer = findUser(officerUsername);
        MandiPrice mp = MandiPrice.builder()
                .cropName(req.getCropName())
                .marketName(req.getMarketName())
                .state(req.getState())
                .district(req.getDistrict())
                .minPrice(req.getMinPrice())
                .maxPrice(req.getMaxPrice())
                .modalPrice(req.getModalPrice())
                .unit(req.getUnit() != null ? req.getUnit() : "Quintal")
                .priceDate(req.getPriceDate())
                .postedBy(officer)
                .build();
        return MandiPriceResponse.fromEntity(mandiRepo.save(mp));
    }

    @Override
    @Transactional(readOnly = true)
    public MandiPriceResponse getById(Long id) {
        return MandiPriceResponse.fromEntity(findById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MandiPriceResponse> getAll() {
        return mandiRepo.findAll().stream()
                .map(MandiPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MandiPriceResponse> getByCrop(String cropName) {
        return mandiRepo.findAllByCropNameIgnoreCase(cropName).stream()
                .map(MandiPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MandiPriceResponse> getByMarket(String marketName) {
        return mandiRepo.findAllByMarketNameIgnoreCase(marketName).stream()
                .map(MandiPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MandiPriceResponse> getByDate(LocalDate date) {
        return mandiRepo.findAllByPriceDate(date).stream()
                .map(MandiPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MandiPriceResponse> getByState(String state) {
        return mandiRepo.findAllByStateIgnoreCase(state).stream()
                .map(MandiPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MandiPriceResponse> getByDateRange(LocalDate from, LocalDate to) {
        return mandiRepo.findAllByPriceDateBetween(from, to).stream()
                .map(MandiPriceResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    public MandiPriceResponse update(Long id, MandiPriceRequest req) {
        MandiPrice mp = findById(id);
        mp.setCropName(req.getCropName());
        mp.setMarketName(req.getMarketName());
        mp.setState(req.getState());
        mp.setDistrict(req.getDistrict());
        mp.setMinPrice(req.getMinPrice());
        mp.setMaxPrice(req.getMaxPrice());
        mp.setModalPrice(req.getModalPrice());
        if (req.getUnit() != null) mp.setUnit(req.getUnit());
        mp.setPriceDate(req.getPriceDate());
        return MandiPriceResponse.fromEntity(mandiRepo.save(mp));
    }

    @Override
    public void delete(Long id) {
        mandiRepo.delete(findById(id));
    }

    private MandiPrice findById(Long id) {
        return mandiRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MandiPrice not found: " + id));
    }

    private User findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }
}