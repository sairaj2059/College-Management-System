package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.dto.LoginRequest;
import com.collegemanagementsystem.backend.model.AuthResponse;
import com.collegemanagementsystem.backend.model.UserAuth;
import com.collegemanagementsystem.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminService service;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/dashboard")

    public String greet(HttpServletRequest request) {
        return "Hello Admin" + request.getSession().getId();
    }

    @PostMapping("/register")
    public UserAuth register(@RequestBody UserAuth student) {
        return service.register(student);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Map<String, Object> response = new HashMap<>();
        AuthResponse authenticate = service.verify(username, password);
        if (authenticate.getJwtToken() != "fail") {
            response.put("success", true);
            response.put("token", authenticate.getJwtToken());
            response.put("role", authenticate.getUserAuth().getRole());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("token", "Invalid Credentials");
            return ResponseEntity.status(404).body(response);
        }

    }
}