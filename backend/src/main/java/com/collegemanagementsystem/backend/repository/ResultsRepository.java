package com.collegemanagementsystem.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.SemesterResults;

@Repository
public interface ResultsRepository extends MongoRepository<SemesterResults, String> {

    // Find SemesterResults by registration number
    SemesterResults findByRegdNo(String regdNo);

    // Custom query to find SemesterResults by subjectTeacher and subjectName
    @Query("{ 'semesters.subjectMarks.subject.subjectTeacher': ?0 }")
    List<SemesterResults> findBySubjectTeacher(String subjectTeacher);
}