package com.collegemanagementsystem.backend.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.StudentProfile;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.StudentDetailsRepository;

@Service
public class StudentService {

    @Autowired
    private ClassWiseAttendaceRepo attendanceRepo;

    @Autowired
    private StudentDetailsRepository studentdetailsRepo;

    @Autowired
    private ImageService imageService;
    // Fetch student profile details
    public List<StudentProfile> getStudentProfiles() {
        return studentdetailsRepo.findAll()
            .stream()
            .map(this::convertToStudentProfile)
            .collect(Collectors.toList());
    }

    public StudentProfile getStudentProfileByRegdNo(String regdNo) {
        StudentDetails student = studentdetailsRepo.findByRegdNo(regdNo);
        if (student == null) {
            throw new IllegalArgumentException("Student with regdNo " + regdNo + " not found.");
        }
        return convertToStudentProfile(student);
    }

    private StudentProfile convertToStudentProfile(StudentDetails student) {
        String imageurl = null;
        if (student.getImageId() != null) {
            imageurl = "http://localhost:8080/student/studentImage/" + student.getImageId();
            System.out.println("Generated Image URL: " + imageurl); // ✅ Debugging URL
        }
        return new StudentProfile(
            student.getId(),
            student.getFirstName(),
            student.getLastName(),
            student.getRegdNo(),
            student.getDepartment(),
            student.getCourse(),
            student.getYear(),
            student.getSemester(),
            imageurl 
        );
    }
    

     public ResponseEntity<?> getStudentImage(String regdNo) throws IOException {
        StudentDetails student = studentdetailsRepo.findByRegdNo(regdNo);
        if (student == null || student.getImageId() == null) {
            return ResponseEntity.notFound().build();
        }
        return imageService.getImage(student.getImageId());
    }

    public ClasswiseAttendance getStudentAttendanceByClassAndRegdNoAndMonth(String className, String regdNo, String month) {
        ClasswiseAttendance studentAttendance = attendanceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo, month);
        if (studentAttendance == null) {
            throw new IllegalArgumentException("No attendance found for student " + regdNo + " in class " + className + " for month " + month);
        }
        System.out.println(studentAttendance);
        return studentAttendance;
    }

    public List<ClasswiseAttendance> getAttendanceByClass(String className) {
        return attendanceRepo.findAllAttendanceByClass(className);
    }

    public ClasswiseAttendance saveAttendance(ClasswiseAttendance attendance) {
        System.out.println("Attendance Data to be saved: " + attendance);
        return attendanceRepo.save(attendance);
    }
}
