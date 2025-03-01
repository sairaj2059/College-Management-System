package com.collegemanagementsystem.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.model.Course;
import com.collegemanagementsystem.backend.model.Semester;
import com.collegemanagementsystem.backend.service.CourseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping("/getCourses")
    public ResponseEntity<List<String>> getCourses() {
        return courseService.getCourses();
    }
    
    
    @GetMapping("/getCoursesAndSemesters")
    public ResponseEntity<List<Course>> getCoursesAndSemesters() {
        return courseService.getCoursesAndSemesters();
    }

    @GetMapping("/getCourseDetails/")
    public ResponseEntity<Course> getCourseDetails(@RequestParam String courseName) {
        return courseService.getCourseDetails(courseName);
    }

    @GetMapping("/getSemesterData")
    public ResponseEntity<Semester> getSemesterData(@RequestParam String courseName, @RequestParam String semesterNumber) {
        return courseService.getSemesterData(courseName, semesterNumber);
    }

}
