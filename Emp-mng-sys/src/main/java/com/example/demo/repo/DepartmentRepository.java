package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> 
{

}