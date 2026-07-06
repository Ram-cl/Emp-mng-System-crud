package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Department;
import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.repo.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + id));
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public ResponseEntity<Department> updateDepartment(long id, Department department) {
        if (departmentRepository.existsById(id)) {
            Department existingDept = departmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + id));
            existingDept.setDeptName(department.getDeptName());
            departmentRepository.save(existingDept);
            return new ResponseEntity<>(existingDept, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Void> deleteDepartment(long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id " + id));
        departmentRepository.delete(department);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
