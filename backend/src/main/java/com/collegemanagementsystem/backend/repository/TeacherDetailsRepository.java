package com.collegemanagementsystem.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.TeacherDetails;

public interface TeacherDetailsRepository extends MongoRepository<TeacherDetails,String> {
    TeacherDetails findTeacherDetailsByUsername(String username);

    TeacherDetails findByTeacherId(String teacherId);

}
