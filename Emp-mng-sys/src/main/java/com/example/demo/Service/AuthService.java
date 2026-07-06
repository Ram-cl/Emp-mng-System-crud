package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.User;
import com.example.demo.Employee;
import com.example.demo.Department;
import com.example.demo.LoginResponse;
import com.example.demo.RegisterRequest;
import com.example.demo.repo.UserRepository;
import com.example.demo.repo.EmployeeRepository;
import com.example.demo.repo.DepartmentRepository;
import com.example.demo.config.JwtTokenProvider;
import com.example.demo.Exception.ResourceNotFoundException;

import java.util.Date;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    // Login: authenticate credentials and generate JWT with user details
    public LoginResponse login(String username, String password) {
        User user = repo.findByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid Username or Password");
        }

        String role = user.getRole();
        if (role == null || role.isEmpty()) {
            role = "EMPLOYEE";
        }

        String token = tokenProvider.generateToken(user.getUsername(), role);

        Long employeeId = null;
        if ("EMPLOYEE".equalsIgnoreCase(role) && user.getEmployee() != null) {
            employeeId = user.getEmployee().getId();
        }

        return new LoginResponse(token, user.getUsername(), role, user.getId(), employeeId);
    }

    // Register: register User (and Employee details if role is EMPLOYEE)
    @Transactional
    public User register(RegisterRequest request) {
        if (repo.findByUsername(request.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        String role = request.getRole();
        if (role == null || role.isEmpty()) {
            role = "EMPLOYEE";
        }
        user.setRole(role.toUpperCase());

        // Save User
        User savedUser = repo.save(user);

        // If registering as Employee, create Employee profile
        if ("EMPLOYEE".equalsIgnoreCase(role)) {
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                throw new IllegalArgumentException("Email is required for employee registration");
            }
            // Check for duplicate employee email
            // (Simple check since we are using transaction)
            
            Employee employee = new Employee();
            employee.setName(request.getName() != null ? request.getName() : request.getUsername());
            employee.setEmail(request.getEmail());
            employee.setPhone(request.getPhone());
            employee.setDesignation(request.getDesignation());
            employee.setSalary(request.getSalary() != null ? request.getSalary() : 0.0);
            employee.setDoj(new Date()); // Default to current date
            employee.setUser(savedUser);

            if (request.getDeptId() != null) {
                Department dept = departmentRepository.findById(request.getDeptId())
                        .orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + request.getDeptId()));
                employee.setDept(dept);
            }

            employeeRepository.save(employee);
        }

        return savedUser;
    }
}
