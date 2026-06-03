package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.User;
import com.example.demo.repo.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Login: check username exists and validate raw password against stored hash
    public boolean login(String username, String password) {
        User user = repo.findByUsername(username);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }

    // Register: prevent duplicates, hash password before saving
    public User register(User user) {
        if (repo.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }
}
