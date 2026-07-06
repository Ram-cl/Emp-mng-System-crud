package com.example.demo.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repo.EmployeeRepository;
import com.example.demo.repo.DepartmentRepository;
import com.example.demo.repo.LeaveRequestRepository;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", employeeRepository.count());
        stats.put("totalDepartments", departmentRepository.count());
        stats.put("pendingLeaves", leaveRequestRepository.countByStatus("PENDING"));
        stats.put("approvedLeaves", leaveRequestRepository.countByStatus("APPROVED"));
        return stats;
    }
}
