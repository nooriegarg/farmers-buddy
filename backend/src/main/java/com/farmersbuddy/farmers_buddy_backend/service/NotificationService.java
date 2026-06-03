package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.entity.Notification;
import com.farmersbuddy.farmers_buddy_backend.entity.User;
import com.farmersbuddy.farmers_buddy_backend.repository.NotificationRepository;
import com.farmersbuddy.farmers_buddy_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

// =============================================================
// NotificationService.java — Business Logic for Notifications
// =============================================================
// Handles creating, reading, and marking notifications as read.
//
// Event-driven helpers (notifyUser, notifyAllFarmers, notifyRoles)
// are called by other services when platform events occur:
//
//   QueryService      → notifyUser(farmerId)         when officer replies
//   TrainingService   → notifyAllFarmers()           when training is created
//   AwarenessDriveService → notifyAllFarmers()       when drive is published
//   ExpertSolutionService → notifyAllFarmers()       when solution is posted
//   MandiPriceService → notifyAllFarmers()           when prices are updated
//   AwarenessDriveService → notifyRoles(OFFICER,EXPERT) for admin updates
// =============================================================

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // -------------------------
    // Notify a specific user
    // -------------------------
    // Used when an event targets one farmer (e.g. officer replies to their query).
    public void notifyUser(Long userId, String message) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setMessage(message);
        n.setCreatedAt(LocalDate.now().toString());
        notificationRepository.save(n);
    }

    // -------------------------
    // Notify all farmers
    // -------------------------
    // Used for platform-wide farmer events: new training, awareness drive,
    // expert solution, mandi price update.
    public void notifyAllFarmers(String message) {
        notifyByRole("FARMER", message);
    }

    // -------------------------
    // Notify all users of given roles
    // -------------------------
    // Used for admin-level events that officers and experts should know about.
    public void notifyByRole(String role, String message) {
        List<User> users = userRepository.findByRole(role);
        String today = LocalDate.now().toString();
        for (User user : users) {
            Notification n = new Notification();
            n.setUserId(user.getId());
            n.setMessage(message);
            n.setCreatedAt(today);
            notificationRepository.save(n);
        }
    }

    // -------------------------
    // Get all notifications for a user
    // -------------------------
    public List<Notification> getForUser(Long userId) {
        return notificationRepository.findForUser(userId);
    }

    // -------------------------
    // Mark a notification as read
    // -------------------------
    public Notification markRead(Long id) {
        Notification n = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setRead(true);
        return notificationRepository.save(n);
    }

    // -------------------------
    // Delete a notification
    // -------------------------
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
