package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.Tool;
import com.farmersbuddy.farmers_buddy_backend.repository.ToolRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// =============================================================
// ToolService.java — Business Logic for Tools Catalog Module
// =============================================================
// Handles adding, fetching, and deleting tools from the catalog.
// Sits between ToolController and ToolRepository.
//
// Architecture: ToolController → ToolService → ToolRepository → MySQL
// =============================================================

@Service
public class ToolService {

    @Autowired
    private ToolRepository toolRepository;

    // Save a new tool to the catalog (admin action)
    public Tool addTool(Tool tool) {
        return toolRepository.save(tool);
    }

    // Return all tools in the catalog (farmer view)
    public List<Tool> getAllTools() {
        return toolRepository.findAll();
    }

    // Remove a tool by ID (admin action)
    public void deleteTool(Long id) {
        toolRepository.deleteById(id);
    }
}
