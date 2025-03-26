package com.collegemanagementsystem.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.examModel.Question;


public interface ExamRepository extends MongoRepository<Exam, String> {

    List<Exam> getAllExamsByUploadedBy(String teacherId);

    List<Question> getQuestionsByUploadedByAndId(String teacherId, String examId);

    Exam findExamById(String examId);

    List<Exam> findExamByClassName(String string);
    
}
