package com.farmersbuddy.service.impl;

import com.farmersbuddy.dto.CropRecommendationRequest;
import com.farmersbuddy.dto.CropRecommendationResponse;
import com.farmersbuddy.entity.CropRecommendation;
import com.farmersbuddy.entity.User;
import com.farmersbuddy.repository.CropRecommendationRepository;
import com.farmersbuddy.repository.UserRepository;
import com.farmersbuddy.service.CropRecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CropRecommendationServiceImpl implements CropRecommendationService {

    private final CropRecommendationRepository cropRepo;
    private final UserRepository userRepository;

    @Override
    public CropRecommendationResponse create(CropRecommendationRequest req, String officerUsername) {
        User officer = findUser(officerUsername);
        CropRecommendation rec = CropRecommendation.builder()
                .cropName(req.getCropName())
                .title(req.getTitle())
                .description(req.getDescription())
                .season(req.getSeason())
                .soilType(req.getSoilType())
                .region(req.getRegion())
                .tips(req.getTips())
                .createdBy(officer)
                .active(true)
                .build();
        return CropRecommendationResponse.fromEntity(cropRepo.save(rec));
    }

    @Override
    @Transactional(readOnly = true)
    public CropRecommendationResponse getById(Long id) {
        return CropRecommendationResponse.fromEntity(findById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CropRecommendationResponse> getAll() {
        return cropRepo.findAll().stream()
                .map(CropRecommendationResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CropRecommendationResponse> getAllActive() {
        return cropRepo.findAllByActiveTrue().stream()
                .map(CropRecommendationResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CropRecommendationResponse> getByCrop(String cropName) {
        return cropRepo.findAllByCropNameIgnoreCase(cropName).stream()
                .map(CropRecommendationResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CropRecommendationResponse> getBySeason(String season) {
        return cropRepo.findAllBySeasonIgnoreCase(season).stream()
                .map(CropRecommendationResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CropRecommendationResponse> getByRegion(String region) {
        return cropRepo.findAllByRegionIgnoreCaseAndActiveTrue(region).stream()
                .map(CropRecommendationResponse::fromEntity).collect(Collectors.toList());
    }

    @Override
    public CropRecommendationResponse update(Long id, CropRecommendationRequest req) {
        CropRecommendation rec = findById(id);
        rec.setCropName(req.getCropName());
        rec.setTitle(req.getTitle());
        rec.setDescription(req.getDescription());
        rec.setSeason(req.getSeason());
        rec.setSoilType(req.getSoilType());
        rec.setRegion(req.getRegion());
        rec.setTips(req.getTips());
        return CropRecommendationResponse.fromEntity(cropRepo.save(rec));
    }

    @Override
    public CropRecommendationResponse toggleActive(Long id) {
        CropRecommendation rec = findById(id);
        rec.setActive(!rec.isActive());
        return CropRecommendationResponse.fromEntity(cropRepo.save(rec));
    }

    @Override
    public void delete(Long id) {
        cropRepo.delete(findById(id));
    }

    private CropRecommendation findById(Long id) {
        return cropRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Crop recommendation not found: " + id));
    }

    private User findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }
}