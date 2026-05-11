package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import com.example.demo.Employee;
import com.example.demo.Service.EmployeeService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController
{
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/employees")
	public Employee addEmployee(@Valid @RequestBody Employee employee)
	{
		return employeeService.addEmployee(employee);
	}
	@GetMapping("/employees")
	public List<Employee> getAllEmployees()
	{
		return employeeService.getAllEmployees();
	}
	
	@GetMapping("/employees/search")
	public ResponseEntity<List<Employee>> searchEmployees(@RequestParam String name)
	{
		return new ResponseEntity<>(employeeService.searchEmployeesByName(name), HttpStatus.OK);
	}
	
	@GetMapping("/employees/{id}")
	public Employee getEmployeeById(@PathVariable long id)
	{
		return employeeService.getEmployeeById(id);
	}
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@Valid @RequestBody Employee employee)
	{
		return employeeService.updateEmployee(id, employee);
	}
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable long id)
	{
		employeeService.deleteEmployee(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}