package com.example.demo.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.Employee;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>
{
	Page<Employee> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
