package com.collegemanagementsystem.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.examModel.Exam;


public interface ExamRepository extends MongoRepository<Exam, String> {

    List<Exam> getAllExamsByUploadedBy(String teacherId);
    
}
