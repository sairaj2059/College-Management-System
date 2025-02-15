package com.collegemanagementsystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth;
import com.collegemanagementsystem.backend.service.StudentService;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/dashboard")
    public String greetByStudent() {
        return "Hello Student from Student Dashboard";
    }

    @GetMapping("/get_attendance")
    public ResponseEntity<AttendanceMonth> getAttendanceMonth(
            @RequestParam String className,
            @RequestParam String regdNo,
            @RequestParam String month) {

        System.out.println("classname:" + className);
        System.out.println("regdNo:" + regdNo);
        System.out.println("month:" + month);
        ClasswiseAttendance attendanceMonth = studentService.getStudentAttendanceByMonth(className, regdNo, month);
        return ResponseEntity.ok(attendanceMonth.getStudents().get(0).getAttendance().get(0));
    }

}
