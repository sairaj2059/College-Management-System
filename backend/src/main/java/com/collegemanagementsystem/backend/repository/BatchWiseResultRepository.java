package com.collegemanagementsystem.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.resultModal.BatchWiseResult;

@Repository
public interface BatchWiseResultRepository extends MongoRepository<BatchWiseResult, String> {
    
    List<BatchWiseResult> findByCourseName(String courseName);
    List<BatchWiseResult> findByJoinYear(String joinYear);
    List<BatchWiseResult> findByCourseNameAndJoinYear(String courseName, String joinYear);
}