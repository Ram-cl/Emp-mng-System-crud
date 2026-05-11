package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.AuthService;
import com.example.demo.User;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
@Autowired
AuthService Auth;
@PostMapping("/login")
public boolean login(@RequestBody Map<String, String> data)
{
	return Auth.login(data.get("username"), data.get("password"));
}

@PostMapping("/register")
public ResponseEntity<User> register(@Valid @RequestBody User user) {
    User savedUser = Auth.register(user);
    return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
}
}
