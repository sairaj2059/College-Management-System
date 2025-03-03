package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.service.AdministratorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
@RestController
public class AdminController {
    
    @Autowired
    private AdministratorService administratorService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/dashboard")
    public String greet(HttpServletRequest request) {
        return "Hello Admin, Session ID: " + request.getSession().getId();
    }

    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudentByForm(@RequestBody StudentDetails studentDetails) {
        return administratorService.addStudentByForm(studentDetails);
    }

    @GetMapping("/getStudentsDetails")
    public ResponseEntity<List<StudentDetails>> getStudentDetails() {
        return administratorService.getStudentDetails();
    }

    @GetMapping("/addTeacher")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    
}
