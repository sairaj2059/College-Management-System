package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.StudentDetails;

public interface StudentDetailsRepository extends MongoRepository<StudentDetails, String> {

    StudentDetails findByRegdNo(String regdNoString);

}
