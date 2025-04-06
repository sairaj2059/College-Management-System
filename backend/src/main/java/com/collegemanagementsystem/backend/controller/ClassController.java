package com.collegemanagementsystem.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.model.Student;
import com.collegemanagementsystem.backend.service.ClassService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class ClassController {

    @Autowired
    ClassService classService;

    @GetMapping("/getClasses")
    public ResponseEntity<List<String>> getClasses() {
        return classService.getClasses();
    }

    @GetMapping("/class/{className}")
    public ResponseEntity<List<Student>> getStudentsByClass(@PathVariable String className) {
        return classService.getStudentsByClassCategory(className);
    }

}
