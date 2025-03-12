package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.TeacherDetails;
import com.collegemanagementsystem.backend.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private AdministratorService administratorService;


    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudentByForm(@RequestBody StudentDetails studentDetails) {
        return administratorService.addStudentByForm(studentDetails);
    }

    @GetMapping("/getStudentsDetails")
    public ResponseEntity<List<StudentDetails>> getStudentDetails() {
        return administratorService.getStudentDetails();
    }

    @PostMapping("/addTeacher")
    public ResponseEntity<?> addTeacher(@RequestBody TeacherDetails teacherDetails) {
        return administratorService.addTeacherByForm(teacherDetails);
    }
    
    
}
