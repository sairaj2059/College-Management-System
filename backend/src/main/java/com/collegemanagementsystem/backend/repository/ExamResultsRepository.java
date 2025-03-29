package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.examModel.ExamResult;

public interface ExamResultsRepository extends MongoRepository<ExamResult, String> {

    ExamResult findByExamId(String examId);

}
