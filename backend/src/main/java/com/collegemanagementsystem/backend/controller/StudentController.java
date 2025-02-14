package com.collegemanagementsystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth;
import com.collegemanagementsystem.backend.model.SemesterResults;
import com.collegemanagementsystem.backend.service.SemResultService;
import com.collegemanagementsystem.backend.service.StudentService;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private SemResultService semResultService;

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

    @GetMapping("/semResults/{id}")
    public SemesterResults getSemResultDetails(@PathVariable int id){
        return semResultService.getSemResultDetails(id);
    }

    @PostMapping("/semResults")
    public ResponseEntity<SemesterResults> setSemResultDetails(@RequestBody SemesterResults semesterResults){
        SemesterResults savedResults = semResultService.saveSemesterResult(semesterResults);
        return ResponseEntity.ok(savedResults);
    }
}
