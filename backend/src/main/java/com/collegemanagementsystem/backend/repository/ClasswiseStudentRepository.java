package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.ClasswiseStudent;

public interface ClasswiseStudentRepository extends MongoRepository<ClasswiseStudent, String>{

    ClasswiseStudent findStudentsByClassName(String batch);

}
