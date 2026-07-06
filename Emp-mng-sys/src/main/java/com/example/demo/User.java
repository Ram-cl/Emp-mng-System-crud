package com.example.demo; 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
import jakarta.persistence.Id; 
import jakarta.persistence.Table; 
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data; 
import lombok.NoArgsConstructor;

import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username cannot be empty")
    private String username;
    
    @NotBlank(message = "Password cannot be empty")
    private String password;
    
    private String role; // "ADMIN" or "EMPLOYEE"

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Employee employee;
}

