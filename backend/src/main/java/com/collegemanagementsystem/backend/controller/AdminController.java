package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.dto.LoginRequest;
import com.collegemanagementsystem.backend.model.AuthResponse;
import com.collegemanagementsystem.backend.model.UserAuth;
import com.collegemanagementsystem.backend.service.AdminService;
import com.collegemanagementsystem.backend.service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
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

    public String greet(HttpServletRequest request){
        return "Hello Admin"+request.getSession().getId();
    }

    @PostMapping("/register")
    public UserAuth register(@RequestBody UserAuth student) {
        return service.register(student);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserAuth student){
        Map<String,Object> response = new HashMap<>();
        String authenticate = service.verify(student);
        if (authenticate != "fail"){
            response.put("success", true);
            response.put("token", authenticate);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("token", "Invalid Credentials");
            return ResponseEntity.status(404).body(response);
        }
        
        
    }
}
