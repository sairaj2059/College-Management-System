package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth;

import java.time.YearMonth;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.UserRepository;

@Service
public class StudentService{
    @Autowired
    private UserRepository repository;

    @Autowired
    private ClassWiseAttendaceRepo attendaceRepo;


    public ClasswiseAttendance getStudentAttendanceByMonth(String className, String regdNo, String month){
        ClasswiseAttendance studentAttendance = attendaceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo, month);
        System.out.println(studentAttendance.toString());
       return studentAttendance;
    }

}