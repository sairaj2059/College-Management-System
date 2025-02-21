package com.collegemanagementsystem.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.repository.StudentDetailsRepository;

@Service
public class AdministratorService {

    @Autowired
    StudentDetailsRepository studentDetailsRepository;

    public ResponseEntity<?> addStudentByForm(StudentDetails studentDetails) {
        StudentDetails studentDetail = studentDetailsRepository.findByRegdNo(studentDetails.getRegdNo());
        if (studentDetail == null) {
            studentDetailsRepository.save(studentDetails);
            return ResponseEntity.ok().body("Student Added Successfully");
        } else {
            return ResponseEntity.badRequest().body("Student Already Exists");
        }

    }
}
