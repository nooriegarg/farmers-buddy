package com.farmersbuddy.farmers_buddy_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notifications")
public class Notification {

    @Getter @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user this notification is for (0 = broadcast to all)
    @Getter @Setter
    private Long userId;

    @Getter @Setter
    @Column(length = 500)
    private String message;

    // false = unread, true = read
    @Getter @Setter
    private boolean read = false;

    @Getter @Setter
    private String createdAt;

    public Notification() {}
}
