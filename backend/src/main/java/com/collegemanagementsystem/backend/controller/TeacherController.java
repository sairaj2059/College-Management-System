package com.collegemanagementsystem.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.noticeModal.Notices;
import com.collegemanagementsystem.backend.service.TeacherService;
import com.collegemanagementsystem.backend.service.NoticeService;
import com.collegemanagementsystem.backend.service.StudentService;


@RequestMapping("/teacher")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/")
    public String greetByTeacher() {
        return "Hello Teacher From Teacher Dashboard";
    }

    @PostMapping("/sendattendence")
    public ResponseEntity<?> addAttendance(@RequestBody ClasswiseAttendance attendance) {
        try {
            System.out.println("Received Attendance Data: " + attendance);
            ClasswiseAttendance savedAttendance = studentService.saveAttendance(attendance);
            return ResponseEntity.ok(savedAttendance);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving attendance: " + e.getMessage());
        }
    }

    @PutMapping("/update_attendance")
    public ResponseEntity<?> setStudentAttendanceByRegdNo(
            @RequestParam String className,
            @RequestParam String regdNo,
            @RequestParam String month,
            @RequestParam int newAbsentDays,
            @RequestBody AbsentDay absentDay) {
        try {
            ClasswiseAttendance classwiseAttendance = teacherService.setStudentAttendanceByRegdNo(className, regdNo,
                    month, newAbsentDays, absentDay);
            return ResponseEntity.ok(classwiseAttendance.getStudents().get(0).getAttendance().get(0));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating attendance: " + e.getMessage());
        }
    }

    @GetMapping("/getExamList/{teacherName}")
    public ResponseEntity<List<Exam>> getExamList(@PathVariable String teacherName) {
        return teacherService.getExamList(teacherName);
    }

    @PostMapping("/addExam")
    public ResponseEntity<?> addExam(@RequestBody Exam exam){
        return teacherService.addExam(exam);
    }

    @DeleteMapping("/deleteExam/{examId}")
    public ResponseEntity<?> deleteExam(@PathVariable String examId){
        return teacherService.deleteExam(examId);
    }
    
     @GetMapping("getNotices")
    public ResponseEntity<List<Notices>> getNotices() {
        List<Notices> notices = noticeService.getallNotices();
        return ResponseEntity.ok(notices);
    }

    @DeleteMapping("deleteNotice/{id}") 
    public ResponseEntity<String> deleteNotice(@PathVariable String id) {
        return noticeService.deleteNotice(id);
    }

}
