package com.collegemanagementsystem.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.resultModal.SemesterResults;

@Repository
public interface ResultsRepository extends MongoRepository<SemesterResults, String> {

    // Find SemesterResults by registration number
    SemesterResults findByRegdNo(String regdNo);

    // Custom query to find SemesterResults by subjectTeacher and subjectName
    List<SemesterResults> findAll();
}