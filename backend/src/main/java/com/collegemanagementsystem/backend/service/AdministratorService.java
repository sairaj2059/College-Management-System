package com.collegemanagementsystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseStudent;
import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.repository.ClasswiseStudentRepository;
import com.collegemanagementsystem.backend.repository.StudentDetailsRepository;
import com.collegemanagementsystem.backend.model.Student;

@Service
public class AdministratorService {

    @Autowired
    StudentDetailsRepository studentDetailsRepository;
    @Autowired
    ClasswiseStudentRepository classwiseStudentRepository;

    public ResponseEntity<?> addStudentByForm(StudentDetails studentDetails) {
        StudentDetails studentDetail = studentDetailsRepository.findByRegdNo(studentDetails.getRegdNo());
        if (studentDetail == null) {
            studentDetailsRepository.save(studentDetails);
            ClasswiseStudent classwiseStudent = classwiseStudentRepository
                    .findByClassName(studentDetails.getCourse() + " " + studentDetails.getJoinYear());
            Student student = new Student();
            student.setRegdNo(studentDetails.getRegdNo());
            student.setStudentName(studentDetails.getFirstName() + " " + studentDetails.getLastName());

            classwiseStudent.getStudents().add(student);
            classwiseStudentRepository.save(classwiseStudent);

            return ResponseEntity.ok().body("Student Added Successfully");
        } else {
            return ResponseEntity.badRequest().body("Student Already Exists");
        }

    }

    public ResponseEntity<List<StudentDetails>> getStudentDetails() {
        return ResponseEntity.ok().body(studentDetailsRepository.findAll());
    }
}
