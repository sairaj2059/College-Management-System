package com.collegemanagementsystem.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.StudentProfile;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ProfileDTO;
import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.examModel.ExamResult;
import com.collegemanagementsystem.backend.model.examModel.StudentExamDetail;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.ExamRepository;
import com.collegemanagementsystem.backend.repository.ExamResultsRepository;
import com.collegemanagementsystem.backend.repository.StudentDetailsRepository;

@Service
public class StudentService {

    @Autowired
    private ClassWiseAttendaceRepo attendanceRepo;

    @Autowired
    private StudentDetailsRepository studentdetailsRepo;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamResultsRepository examResultsRepository;

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
                student.getEmailAddress(),
                imageurl);
    }

    private int calSem(String year) {
        try {
            int yearNumber = Integer.parseInt(year);
            return (yearNumber - 1) * 2 + 1;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid year format: " + year);
        }
    }

    public ResponseEntity<?> getStudentImage(String regdNo) throws IOException {
        try {
            StudentDetails student = studentdetailsRepo.findByRegdNo(regdNo);
            if (student == null || student.getImageId() == null) {
                return ResponseEntity.notFound().build();
            }
            return imageService.getImage(student.getImageId());
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error retrieving image");
        }
    }

    public ClasswiseAttendance getStudentAttendanceByClassAndRegdNoAndMonth(String className, String regdNo,
            String month) {
        ClasswiseAttendance studentAttendance = attendanceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className,
                regdNo, month);
        if (studentAttendance == null) {
            throw new IllegalArgumentException(
                    "No attendance found for student " + regdNo + " in class " + className + " for month " + month);
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

    public ResponseEntity<?> getExamList(String regdNo) {
        StudentDetails studentDetails = studentdetailsRepo.findByRegdNo(regdNo);
        if (studentDetails == null) {
            return ResponseEntity.badRequest().body("Student with regdNo " + regdNo + " not found.");
        }

        try {
            List<Exam> exams = examRepository
                    .findExamByClassName(studentDetails.getCourse() + " " + studentDetails.getJoinYear());
            List<Exam> filteredExams = exams.stream()
                    .filter(exam -> exam.getStatus().equals("PUBLISHED"))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(filteredExams);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching exams: " + e.getMessage());
        }

    }

    public ResponseEntity<?> submitExam(String examId, StudentExamDetail studentExamDetail) {
        try {
            ExamResult examResult = examResultsRepository.findByExamId(examId);
            if (examResult == null) {
                return ResponseEntity.badRequest().body("Exam with id " + examId + " not found.");
            }

            if (examResult.getStudentExamDetails() == null) {
                examResult.setStudentExamDetails(new ArrayList<>());
            }

            examResult.getStudentExamDetails().add(studentExamDetail);
            examResultsRepository.save(examResult);

            return ResponseEntity.ok("Exam submitted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting exam: " + e.getMessage());
        }
    }

    public ProfileDTO getStudentProfile(String regdNo) {
        StudentDetails student = studentdetailsRepo.findByRegdNo(regdNo);

        if (student == null) {
            throw new NoSuchElementException("Student not found for regdNo: " + regdNo);
        }

        String firstName = student.getFirstName() != null ? student.getFirstName().trim() : "";
        String lastName = student.getLastName() != null ? student.getLastName().trim() : "";
    
        String fullName = (firstName + " " + lastName).trim(); 
        return new ProfileDTO(fullName, student.getEmailAddress());
    }

}
