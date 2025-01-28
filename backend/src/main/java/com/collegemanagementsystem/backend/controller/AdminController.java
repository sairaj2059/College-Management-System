package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.StudentAuth;
import com.collegemanagementsystem.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService service;
    @GetMapping("/dashboard")
    public String greet(HttpServletRequest request){
        return "Hello Admin"+request.getSession().getId();
    }
    @PostMapping("/Register")
    public StudentAuth register(@RequestBody StudentAuth student){
        return service.register(student);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody StudentAuth student){
        Map<String,Object> response = new HashMap<>();
        String authenticate = service.verify(student);
        if (authenticate != "fail"){
            response.put("success", true);
            response.put("token", authenticate);

        }

        if (authenticate != "fail") {
            return ResponseEntity.ok(response);
        }
        else{
            response.put("success", false);
            response.put("token", "Invalid Credentials");
            return ResponseEntity.status(404).body(response);
        }
        
        
    }
}