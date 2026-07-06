package com.example.demo.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.LeaveRequest;
import com.example.demo.Employee;
import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.repo.LeaveRequestRepository;
import com.example.demo.repo.EmployeeRepository;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
        if (leaveRequest.getEmployee() == null || leaveRequest.getEmployee().getId() == null) {
            throw new IllegalArgumentException("Employee profile must be associated with the leave request");
        }

        Employee employee = employeeRepository.findById(leaveRequest.getEmployee().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + leaveRequest.getEmployee().getId()));
        
        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus("PENDING");
        leaveRequest.setAppliedDate(LocalDate.now());

        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeavesByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getPendingLeaves() {
        return leaveRequestRepository.findByStatus("PENDING");
    }

    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    @Transactional
    public LeaveRequest approveLeave(Long id) {
        LeaveRequest request = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found with id " + id));
        request.setStatus("APPROVED");
        return leaveRequestRepository.save(request);
    }

    @Transactional
    public LeaveRequest rejectLeave(Long id) {
        LeaveRequest request = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found with id " + id));
        request.setStatus("REJECTED");
        return leaveRequestRepository.save(request);
    }
}
