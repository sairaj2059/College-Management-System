package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.Course;

public interface CourseRepository extends MongoRepository<Course, String>{

    Course findCourseByCourseName(String courseName);

}
