package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.UserAuth;
import com.collegemanagementsystem.backend.service.AdminService;
import com.collegemanagementsystem.backend.service.AdministratorService;
import com.collegemanagementsystem.backend.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class AdminController {
    
    @Autowired
    private AdminService service;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AdministratorService administratorService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/dashboard")
    public String greet(HttpServletRequest request) {
        return "Hello Admin, Session ID: " + request.getSession().getId();
    }

    @PostMapping("/register")
    public UserAuth register(@RequestBody UserAuth student) {
        return service.register(student);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserAuth student) {
        Map<String, Object> response = new HashMap<>();
        String authenticate = service.verify(student);

        if (!authenticate.equals("fail")) {
            response.put("success", true);
            response.put("token", authenticate);

            String role = jwtService.extractRole(authenticate);
            response.put("role", role);
            System.out.println(response);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("token", "Invalid Credentials");
            return ResponseEntity.ok(response);
        }
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
