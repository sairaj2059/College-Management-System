package com.collegemanagementsystem.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.collegemanagementsystem.backend.model.SemesterResults;
import com.collegemanagementsystem.backend.model.noticeModal.Notices;
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
    public ResponseEntity<?>getStudentProfileByRegdNo(@PathVariable String regdNo) {
        try{
            StudentProfile profile = studentService.getStudentProfileByRegdNo(regdNo);
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getNotices")
    public ResponseEntity<List<Notices>> getNotices() {
        List<Notices> notices = noticeService.getallNotices();
        return ResponseEntity.ok(notices);
    }
    @GetMapping("/get_Sattendance/{className}")
public ResponseEntity<?> getAttendanceMonth(
        @PathVariable String className,  // Changed from @RequestParam to @PathVariable
        @RequestParam String regdNo,
        @RequestParam String month) {
    System.out.println("classname: " + className);
    System.out.println("regdNo: " + regdNo);
    System.out.println("month: " + month);
    ClasswiseAttendance attendanceMonth = studentService.getStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo, month);
    if (attendanceMonth == null || attendanceMonth.getStudents().isEmpty()) {
        return ResponseEntity.status(404).body("No attendance record found");
    }
    if (attendanceMonth.getStudents().get(0).getAttendance().isEmpty()) {
        return ResponseEntity.status(404).body("No attendance data available for this student");
    }
    return ResponseEntity.ok(attendanceMonth.getStudents().get(0).getAttendance().get(0));
}

    @GetMapping("/semResults/{regdNo}")
    public SemesterResults getSemResultDetails(@PathVariable String regdNo){
        return semResultService.getSemResultDetails(regdNo);
    }

    @PostMapping("/semResults")
    public ResponseEntity<SemesterResults> setSemResultDetails(@RequestBody SemesterResults semesterResults){
        SemesterResults savedResults = semResultService.saveSemesterResult(semesterResults);
        return ResponseEntity.ok(savedResults);
    }

    @GetMapping("/studentImage/{regdNo}")
    public ResponseEntity<?> getStudentImage(@PathVariable String regdNo) throws IOException {
        return studentService.getStudentImage(regdNo);
    }
    
}
