package com.collegemanagementsystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.service.TeacherService;

@RequestMapping("/teacher")
@RestController
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/")
    public String greetByTeacher() {
        return "Hello Teacher From Teacher Dashboard";
    }

    @PutMapping("/update_attendance")
    public ResponseEntity<AttendanceMonth> setStudentAttendanceByRegdNo(
            @RequestParam String className,
            @RequestParam String regdNo,
            @RequestParam String month,
            @RequestParam int newAbsentDays,
            @RequestBody AbsentDay absentDay) {
        ClasswiseAttendance classwiseAttendance =  teacherService.setStudentAttendanceByRegdNo(className, regdNo, month, newAbsentDays, absentDay);
        return ResponseEntity.ok(classwiseAttendance.getStudents().get(0).getAttendance().get(0));
    }
}
