package com.collegemanagementsystem.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.TeacherDetails;

@Repository
public interface TeacherDetailsRepository extends MongoRepository<TeacherDetails,String> {
    TeacherDetails findTeacherDetailsByUsername(String username);

    TeacherDetails findByTeacherId(String teacherId);

}
