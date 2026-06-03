package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.entity.Notification;
import com.farmersbuddy.farmers_buddy_backend.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// =============================================================
// NotificationController — REST endpoints for Notifications
// =============================================================
// Notifications are generated AUTOMATICALLY by the backend
// when platform events occur (training created, query replied, etc.).
// The frontend only polls and marks notifications as read.
//
// GET  /api/notifications/user/{userId} → get all for a user
// PUT  /api/notifications/{id}/read     → mark one notification as read
// =============================================================

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<Notification> getForUser(@PathVariable Long userId) {
        return notificationService.getForUser(userId);
    }

    @PutMapping("/{id}/read")
    public Notification markRead(@PathVariable Long id) {
        return notificationService.markRead(id);
    }
}
