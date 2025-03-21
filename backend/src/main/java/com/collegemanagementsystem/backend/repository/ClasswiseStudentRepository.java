package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.ClasswiseStudent;

@Repository
public interface ClasswiseStudentRepository extends MongoRepository<ClasswiseStudent, String>{

    ClasswiseStudent findStudentsByClassName(String batch);

    ClasswiseStudent findByClassName(String string);

}
