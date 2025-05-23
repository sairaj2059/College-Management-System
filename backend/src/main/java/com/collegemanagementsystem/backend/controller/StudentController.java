package com.collegemanagementsystem.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.dto.StudentProfile;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ProfileDTO;
import com.collegemanagementsystem.backend.model.examModel.StudentExamDetail;
import com.collegemanagementsystem.backend.model.noticeModal.Notices;
import com.collegemanagementsystem.backend.model.resultModal.SemesterResults;
import com.collegemanagementsystem.backend.service.SemResultService;
import com.collegemanagementsystem.backend.service.StudentService;
import com.collegemanagementsystem.backend.service.NoticeService;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private SemResultService semResultService;

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/dashboard")
    public String greetByStudent() {
        return "Hello Student from Student Dashboard";
    }

    @GetMapping("/studentProfile")
    public List<StudentProfile> getAllStudentProfiles() {
        return studentService.getStudentProfiles();
    }

    @GetMapping("/studentProfile/{regdNo}")
    public ResponseEntity<?> getStudentProfileByRegdNo(@PathVariable String regdNo) {
        try {
            StudentProfile profile = studentService.getStudentProfileByRegdNo(regdNo);
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Profile/{regdNo}")
    public ResponseEntity<ProfileDTO> getProfileByRegdNo(@PathVariable String regdNo) {
        try {
            ProfileDTO profile = studentService.getStudentProfile(regdNo);
            return ResponseEntity.ok(profile);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/getNotices")
    public ResponseEntity<List<Notices>> getNotices() {
        List<Notices> notices = noticeService.getallNotices();
        return ResponseEntity.ok(notices);
    }

    @GetMapping("/get_Sattendance/{className}")
    public ResponseEntity<?> getAttendanceMonth(
            @PathVariable String className,
            @RequestParam String regdNo,
            @RequestParam String month) {
        System.out.println("classname: " + className);
        System.out.println("regdNo: " + regdNo);
        System.out.println("month: " + month);
        ClasswiseAttendance attendanceMonth = studentService.getStudentAttendanceByClassAndRegdNoAndMonth(className,
                regdNo, month);
        if (attendanceMonth == null || attendanceMonth.getStudents().isEmpty()) {
            return ResponseEntity.status(404).body("No attendance record found");
        }
        if (attendanceMonth.getStudents().get(0).getAttendance().isEmpty()) {
            return ResponseEntity.status(404).body("No attendance data available for this student");
        }
        return ResponseEntity.ok(attendanceMonth.getStudents().get(0).getAttendance().get(0));
    }

    @GetMapping("/semResults/{regdNo}")
    public SemesterResults getSemResultDetails(@PathVariable String regdNo) {
        return semResultService.getSemResultDetails(regdNo);
    }

    @GetMapping("/getExamList/{regdNo}")
    public ResponseEntity<?> getExamList(@PathVariable String regdNo) {
        return studentService.getExamList(regdNo);
    }

    @GetMapping("/studentImage/{regdNo}")
    public ResponseEntity<?> getStudentImage(@PathVariable String regdNo) throws IOException {
        return studentService.getStudentImage(regdNo);
    }

    @PostMapping("/submitExam/{examId}")
    public ResponseEntity<?> submitExam(@PathVariable String examId, @RequestBody StudentExamDetail studentExamDetail) {
        return studentService.submitExam(examId, studentExamDetail);
    }

}
