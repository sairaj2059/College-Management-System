package com.collegemanagementsystem.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;


@Service
public class StudentService{

    @Autowired
    private ClassWiseAttendaceRepo attendaceRepo;

    public ClasswiseAttendance getStudentAttendanceByMonth(String className, String regdNo, String month){
        ClasswiseAttendance studentAttendance = attendaceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo, month);
        System.out.println(studentAttendance.toString());
       return studentAttendance;
    }



    

}