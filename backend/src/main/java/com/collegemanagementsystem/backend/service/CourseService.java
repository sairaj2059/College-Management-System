package com.collegemanagementsystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.Course;
import com.collegemanagementsystem.backend.model.Semester;
import com.collegemanagementsystem.backend.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public ResponseEntity<List<Course>> getCoursesAndSemesters() {
        return ResponseEntity.ok().body(courseRepository.findAll());
    }

    public ResponseEntity<Course> getCourseDetails(String courseName) {

        Course course = courseRepository.findCourseByCourseName(courseName);
        if (course != null) {
            return ResponseEntity.ok().body(course);
        }
        return ResponseEntity.notFound().build();

    }

    public ResponseEntity<Semester> getSemesterData(String courseName, String semesterNumber) {
        Course course = courseRepository.findCourseByCourseName(courseName);
        if (course != null) {
            Semester semester = course.getSemesterBySemesterNumber(semesterNumber);
            if (semester != null) {
                return ResponseEntity.ok().body(semester);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.notFound().build();

    }

    public ResponseEntity<List<String>> getCourses() {
        List<String>courseList = courseRepository.findAll()
                .stream()
                .map(Course::getCourseName)
                .toList();
        return ResponseEntity.ok().body(courseList);
    }
}
