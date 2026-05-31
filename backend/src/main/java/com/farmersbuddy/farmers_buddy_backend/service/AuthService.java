package com.farmersbuddy.farmers_buddy_backend.service;

import com.farmersbuddy.farmers_buddy_backend.dto.RegisterRequest;
import com.farmersbuddy.farmers_buddy_backend.entity.User;
import com.farmersbuddy.farmers_buddy_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.farmersbuddy.farmers_buddy_backend.dto.LoginRequest;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User register(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            if (user.getPassword().equals(request.getPassword())) {
                return user;
            }
        }

        return null;
    }
}