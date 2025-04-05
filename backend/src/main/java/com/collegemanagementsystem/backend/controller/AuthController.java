package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.UserAuth;
import com.collegemanagementsystem.backend.service.AdminService;
import com.collegemanagementsystem.backend.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    
    @Autowired
    private AdminService service;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public UserAuth register(@RequestBody UserAuth user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserAuth user) {
        Map<String, Object> response = new HashMap<>();
        String authenticate = service.verify(user);

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

    @PostMapping("/change-password")
public ResponseEntity<Map<String, Object>> changePassword(@RequestBody Map<String, String> passwordData) {
    Map<String, Object> response = new HashMap<>();

    if (!passwordData.containsKey("username") || !passwordData.containsKey("oldPassword") || !passwordData.containsKey("newPassword")) {
        response.put("success", false);
        response.put("message", "Missing required fields");
        return ResponseEntity.badRequest().body(response);
    }

    String username = passwordData.get("username");
    String oldPassword = passwordData.get("oldPassword");
    String newPassword = passwordData.get("newPassword");

    boolean isUpdated = service.changePassword(username, oldPassword, newPassword);

    if (isUpdated) {
        response.put("success", true);
        response.put("message", "Password updated successfully.");
        return ResponseEntity.ok(response);
    } else {
        response.put("success", false);
        response.put("message", "Invalid old password.");
        return ResponseEntity.badRequest().body(response);
    }
}

}