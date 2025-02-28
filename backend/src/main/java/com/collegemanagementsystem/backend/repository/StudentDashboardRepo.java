package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.StudentDashboard;

@Repository
public interface StudentDashboardRepo extends MongoRepository<StudentDashboard,String> {
    StudentDashboard findByUsername(String username);
}
