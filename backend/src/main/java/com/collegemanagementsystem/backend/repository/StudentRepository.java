package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.StudentAuth;

@Repository
public interface StudentRepository extends MongoRepository<StudentAuth, String> {
    // Custom query method to find a student by username
    StudentAuth findByUsername(String username);

}
