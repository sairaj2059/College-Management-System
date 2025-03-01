package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import java.util.List;

@Repository
public interface ClassWiseAttendaceRepo extends MongoRepository<ClasswiseAttendance, String> {

    // 1️ Fetch attendance for a specific student by class and month
    @Query("{ 'className': ?0, 'students': { $elemMatch: { 'regdNo': ?1, 'attendance': { $elemMatch: { 'month': ?2 } } } } }")
    ClasswiseAttendance findStudentAttendanceByClassAndRegdNoAndMonth(String className, String regdNo, String month);

    // 2️ Fetch attendance for all students in a specific class
    @Query("{ 'className': ?0 }")
    List<ClasswiseAttendance> findAllAttendanceByClass(String className);
}
