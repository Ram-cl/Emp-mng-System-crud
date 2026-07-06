package com.example.demo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;

@Entity
@Table(name="employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	@NotBlank(message = "Employee name cannot be empty")
	private String name;
	
	@Column(unique = true)
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;
	
	@Column
	@NotBlank(message = "Phone number is required")
	private String phone;
	
	@Column
	@NotBlank(message = "Designation is required")
	private String designation;
	
	@Column
	@NotNull(message = "Salary is required")
	private Double salary;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	@NotNull(message = "Date of joining cannot be null")
	@PastOrPresent(message = "Date of joining cannot be in the future")
	private Date doj;
	
	@ManyToOne
	@JoinColumn(name = "dept_id")
	private Department dept;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
}
