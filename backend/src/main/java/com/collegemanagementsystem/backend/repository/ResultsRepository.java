package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.SemesterResults;

@Repository
public interface ResultsRepository extends MongoRepository<SemesterResults,String> { 
    SemesterResults findByRegdNo(String regdNoString);
} 