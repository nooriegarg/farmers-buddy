package com.farmersbuddy.farmers_buddy_backend.controller;

import com.farmersbuddy.farmers_buddy_backend.dto.RegisterRequest;
import com.farmersbuddy.farmers_buddy_backend.entity.User;
import com.farmersbuddy.farmers_buddy_backend.service.AuthService;
import com.farmersbuddy.farmers_buddy_backend.dto.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest request) {

        return authService.login(request);
    }
}