package com.collegemanagementsystem.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.Course;

public interface CourseRepository extends MongoRepository<Course, String>{

    Course findCourseByCourseName(String courseName);
   // List<String> findAllSubjectsByTeacher(String teacherName);
}
