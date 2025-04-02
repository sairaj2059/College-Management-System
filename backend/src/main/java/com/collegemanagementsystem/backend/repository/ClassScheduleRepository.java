package com.collegemanagementsystem.backend.repository;

import com.collegemanagementsystem.backend.model.ClassSchedule;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassScheduleRepository extends MongoRepository<ClassSchedule, String> {
    ClassSchedule findByClassName(String className);
    void deleteByClassName(String className);
}
