package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.StudentAuth;
import com.collegemanagementsystem.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class AdminController {
    @Autowired
    private AdminService service;
    @GetMapping("/")
    public String greet(HttpServletRequest request){
        return "Hello Admin"+request.getSession().getId();
    }
    @PostMapping("/Register")
    public StudentAuth register(@RequestBody StudentAuth student){
        return service.register(student);
    }
    @PostMapping("/login")
    public String login(@RequestBody StudentAuth student){
        return service.verify(student);
    }
}