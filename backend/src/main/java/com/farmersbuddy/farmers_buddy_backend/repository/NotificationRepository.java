package com.farmersbuddy.farmers_buddy_backend.repository;

import com.farmersbuddy.farmers_buddy_backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Returns notifications targeted at this specific user OR broadcast (userId=0)
    @Query("SELECT n FROM Notification n WHERE n.userId = :userId OR n.userId = 0 ORDER BY n.id DESC")
    List<Notification> findForUser(@Param("userId") Long userId);
}
