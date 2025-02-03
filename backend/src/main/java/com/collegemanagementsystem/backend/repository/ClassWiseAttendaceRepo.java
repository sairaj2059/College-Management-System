package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student;

@Repository
public interface ClassWiseAttendaceRepo extends MongoRepository<ClasswiseAttendance, String> {

    @Query("{'className': ?0, 'students.regdNo': ?1, 'students.attendance.month': ?2}")
    ClasswiseAttendance findStudentAttendanceByClassAndRegdNoAndMonth(String className, String regdNo,
            String month);
}
