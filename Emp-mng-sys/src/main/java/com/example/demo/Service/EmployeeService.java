package com.example.demo.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Employee;
import com.example.demo.Department;
import com.example.demo.User;
import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.repo.EmployeeRepository;
import com.example.demo.repo.DepartmentRepository;
import com.example.demo.repo.UserRepository;

@Service
public class EmployeeService 
{
	@Autowired 
	private EmployeeRepository employeeRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional
	public Employee addEmployee(Employee employee)
	{
		// 1. Department Lookup
		if (employee.getDept() != null && employee.getDept().getId() != null) {
			Department dept = departmentRepository.findById(employee.getDept().getId())
					.orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + employee.getDept().getId()));
			employee.setDept(dept);
		}

		// 2. Automatically create User account for this employee (if not exists)
		if (userRepository.findByUsername(employee.getEmail()) != null) {
			throw new IllegalArgumentException("A user with this email/username already exists!");
		}

		User user = new User();
		user.setUsername(employee.getEmail());
		user.setPassword(passwordEncoder.encode("password123")); // Default password
		user.setRole("EMPLOYEE");
		
		User savedUser = userRepository.save(user);
		employee.setUser(savedUser);

		return employeeRepository.save(employee);
	}

	public Page<Employee> getAllEmployees(int page, int size, String sortBy, String sortDir)
	{
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? 
				Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
		Pageable pageable = PageRequest.of(page, size, sort);
		return employeeRepository.findAll(pageable);
	}

	public Page<Employee> searchEmployeesByName(String name, int page, int size, String sortBy, String sortDir)
	{
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? 
				Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
		Pageable pageable = PageRequest.of(page, size, sort);
		return employeeRepository.findByNameContainingIgnoreCase(name, pageable);
	}

	public Employee getEmployeeById(long id)
	{
		return employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
	}

	@Transactional
	public ResponseEntity<Employee> updateEmployee(long id, Employee employee)
	{
		if (employeeRepository.existsById(id))
		{
			Employee existingEmp = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
			
			// If email changes, update associated user's username
			if (!existingEmp.getEmail().equalsIgnoreCase(employee.getEmail())) {
				if (userRepository.findByUsername(employee.getEmail()) != null) {
					throw new IllegalArgumentException("Username/email already taken!");
				}
				User associatedUser = existingEmp.getUser();
				if (associatedUser != null) {
					associatedUser.setUsername(employee.getEmail());
					userRepository.save(associatedUser);
				}
			}

			existingEmp.setName(employee.getName());
			existingEmp.setEmail(employee.getEmail());
			existingEmp.setPhone(employee.getPhone());
			existingEmp.setDesignation(employee.getDesignation());
			existingEmp.setSalary(employee.getSalary());
			existingEmp.setDoj(employee.getDoj());
			
			// Department lookup
			if (employee.getDept() != null && employee.getDept().getId() != null) {
				Department dept = departmentRepository.findById(employee.getDept().getId())
						.orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + employee.getDept().getId()));
				existingEmp.setDept(dept);
			} else {
				existingEmp.setDept(null);
			}

			employeeRepository.save(existingEmp);
			return new ResponseEntity<>(existingEmp, HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Transactional
	public ResponseEntity<Void> deleteEmployee(long id)
	{
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
		
		employeeRepository.delete(employee);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
