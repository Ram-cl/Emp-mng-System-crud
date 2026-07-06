package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import com.example.demo.LeaveRequest;
import com.example.demo.Service.LeaveRequestService;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://emp-mng-system-crud.vercel.app"
})
@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping("/apply")
    public ResponseEntity<LeaveRequest> applyLeave(@Valid @RequestBody LeaveRequest leaveRequest) {
        LeaveRequest applied = leaveRequestService.applyLeave(leaveRequest);
        return new ResponseEntity<>(applied, HttpStatus.CREATED);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getLeavesByEmployeeId(@PathVariable Long employeeId) {
        List<LeaveRequest> leaves = leaveRequestService.getLeavesByEmployeeId(employeeId);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<LeaveRequest>> getPendingLeaves() {
        List<LeaveRequest> leaves = leaveRequestService.getPendingLeaves();
        return ResponseEntity.ok(leaves);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        List<LeaveRequest> leaves = leaveRequestService.getAllLeaves();
        return ResponseEntity.ok(leaves);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(@PathVariable Long id) {
        LeaveRequest approved = leaveRequestService.approveLeave(id);
        return ResponseEntity.ok(approved);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeave(@PathVariable Long id) {
        LeaveRequest rejected = leaveRequestService.rejectLeave(id);
        return ResponseEntity.ok(rejected);
    }
}
