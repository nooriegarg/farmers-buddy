package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.Tool;
import com.farmersbuddy.farmers_buddy_backend.service.ToolService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// ToolController.java — REST Controller for Tools Catalog Module
// =============================================================
// Exposes HTTP endpoints for managing the farming tools catalog.
//
// Base URL: /api/tools
//
// Endpoints:
//   POST   /api/tools        → admin adds a new tool to the catalog
//   GET    /api/tools        → all users browse the tools catalog
//   DELETE /api/tools/{id}   → admin removes a tool from the catalog
// =============================================================

@RestController
@RequestMapping("/api/tools")
@CrossOrigin("*")
public class ToolController {

    @Autowired
    private ToolService toolService;

    // -------------------------
    // POST /api/tools
    // -------------------------
    // Admin adds a new farming tool/equipment to the catalog.
    @PostMapping
    public Tool addTool(@RequestBody Tool tool) {
        return toolService.addTool(tool);
    }

    // -------------------------
    // GET /api/tools
    // -------------------------
    // Returns all tools — used by farmers to browse the catalog.
    @GetMapping
    public List<Tool> getAllTools() {
        return toolService.getAllTools();
    }

    // -------------------------
    // DELETE /api/tools/{id}
    // -------------------------
    // Admin removes a tool from the catalog by ID.
    @DeleteMapping("/{id}")
    public void deleteTool(@PathVariable Long id) {
        toolService.deleteTool(id);
    }
}
