package com.collegemanagementsystem.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.model.Course;
import com.collegemanagementsystem.backend.model.Semester;
import com.collegemanagementsystem.backend.model.Subject;
import com.collegemanagementsystem.backend.service.CourseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


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

    @GetMapping("/getCourseDetails/{courseName}")
    public ResponseEntity<Course> getCourseDetails(@PathVariable String courseName) {
        return courseService.getCourseDetails(courseName);
    }

    @GetMapping("/getSemesterData/{courseName}/{semesterNumber}")
    public ResponseEntity<Semester> getSemesterData(@PathVariable String courseName, @PathVariable String semesterNumber) {
        return courseService.getSemesterData(courseName, semesterNumber);
    }

    @GetMapping("/getAllSubjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return courseService.getAllSubjects();
    }
    

}
