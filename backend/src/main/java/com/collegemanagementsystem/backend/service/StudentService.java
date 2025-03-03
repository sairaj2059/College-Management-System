package com.collegemanagementsystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;


@Service
public class StudentService{

    @Autowired
    private ClassWiseAttendaceRepo attendanceRepo;

    public ClasswiseAttendance getStudentAttendanceByClassAndRegdNoAndMonth(String className, String regdNo, String month){
        ClasswiseAttendance studentAttendance = attendanceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo, month);
        System.out.println(studentAttendance.toString());
       return studentAttendance;
    }
     public List<ClasswiseAttendance> getAttendanceByClass(String className) {
        return attendanceRepo.findAllAttendanceByClass(className);
    }
public ClasswiseAttendance saveAttendance(ClasswiseAttendance attendance){
    System.out.println("Attendance Data to be saved: " + attendance); // Added logging for attendance data

    return attendanceRepo.save(attendance);
    }

}
