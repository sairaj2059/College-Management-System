package com.collegemanagementsystem.backend.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.Course;
import com.collegemanagementsystem.backend.model.Subject;

public interface CourseRepository extends MongoRepository<Course, String>{

    Course findCourseByCourseName(String courseName);

}
