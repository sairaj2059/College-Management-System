package com.collegemanagementsystem.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class AdminController {

    @GetMapping("/")
    public String greet(HttpServletRequest request){
        return "Hello Admin"+request.getSession().getId();
    }
}