package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String role; // "ADMIN" or "EMPLOYEE"
    
    // Employee details (optional, only if role is EMPLOYEE)
    private String name;
    private String email;
    private String phone;
    private String designation;
    private Double salary;
    private Long deptId;
}
