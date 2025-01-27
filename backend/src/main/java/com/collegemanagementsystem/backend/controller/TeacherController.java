package com.collegemanagementsystem.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/teacher")
@RestController
public class TeacherController {

    public String greetByTeacher(){
        return "Hello Techer From Teacher Dashboard";
    }
}
