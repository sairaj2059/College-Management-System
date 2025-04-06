package com.collegemanagementsystem.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.collegemanagementsystem.backend.dto.QuestionList;
import com.collegemanagementsystem.backend.dto.StudentProfile;
import com.collegemanagementsystem.backend.dto.TeacherProfile;
import com.collegemanagementsystem.backend.model.ClassSchedule;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.model.ProfileDTO;
import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.examModel.StudentExamDetail;
import com.collegemanagementsystem.backend.model.noticeModal.Notices;
import com.collegemanagementsystem.backend.model.resultModal.SemesterResults;
import com.collegemanagementsystem.backend.service.TeacherService;
import com.collegemanagementsystem.backend.service.NoticeService;
import com.collegemanagementsystem.backend.service.SemResultService;
import com.collegemanagementsystem.backend.service.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RequestMapping("/teacher")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private SemResultService semResultService;

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

    @GetMapping("/getQuestionsByTeacher")
    public ResponseEntity<?> getQuestionsByTeacher(@RequestParam String teacherId, @RequestParam String examId) {
        return teacherService.getQuestionsByTeacher(teacherId, examId);
    }

    @PostMapping("/addQuestion")
    public ResponseEntity<?> addQuestion(@RequestBody QuestionList questions) {
        return teacherService.addQuestion(questions);
    }

    @GetMapping("/publishExam/{examId}")
    public ResponseEntity<?> publishExam(@PathVariable String examId) {
        System.out.println("From Publish controller");
        return teacherService.publishExam(examId);
    }

    @GetMapping("/getResultList/{examId}")
    public ResponseEntity<?> getResultList(@PathVariable String examId) {
        return teacherService.getResultList(examId);
    }

    @PutMapping("/modifyAnswerList/{examId}")
    public ResponseEntity<?> modifyAnswerList(@PathVariable String examId, @RequestBody StudentExamDetail studentExamDetail) {
        
        return teacherService.modifyAnswerList(examId, studentExamDetail);
    }

    @GetMapping("/getExamList/{teacherId}")
    public ResponseEntity<List<Exam>> getExamList(@PathVariable String teacherId) {
        return teacherService.getExamList(teacherId);
    }

    @PostMapping("/addExam")
    public ResponseEntity<?> addExam(@RequestBody Exam exam) {
        return teacherService.addExam(exam);
    }

    @DeleteMapping("/deleteExam/{examId}")
    public ResponseEntity<?> deleteExam(@PathVariable String examId) {
        return teacherService.deleteExam(examId);
    }

    @GetMapping("/getNotices")
    public ResponseEntity<List<Notices>> getNotices() {
        List<Notices> notices = noticeService.getallNotices();
        return ResponseEntity.ok(notices);
    }

    @DeleteMapping("/deleteNotice/{id}")
    public ResponseEntity<String> deleteNotice(@PathVariable String id) {
        return noticeService.deleteNotice(id);
    }

    @GetMapping("/teacherProfile/{teacherId}")
    public ResponseEntity<?> getStudentProfileByRegdNo(@PathVariable String teacherId) {
        try {
            TeacherProfile profile = teacherService.getTeacherProfileByTeacherId(teacherId);
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/teacherImage/{teacherId}")
    public ResponseEntity<?> getTeacherImage(@PathVariable String teacherId) throws IOException {
        return teacherService.getTeacherImage(teacherId);
    }

    // results controller
    @GetMapping("/semResults/{regdNo}")
    public SemesterResults getSemResultDetails(@PathVariable String regdNo) {
        return semResultService.getSemResultDetails(regdNo);
    }

    @PostMapping("/semResults")
    public ResponseEntity<SemesterResults> setSemResultDetails(@RequestBody SemesterResults semesterResults) {
        SemesterResults savedResults = semResultService.saveSemesterResult(semesterResults);
        return ResponseEntity.ok(savedResults);
    }

    @GetMapping("/classShedule/{className}")
    public ClassSchedule getClassSchedule(@PathVariable String className) {
        return teacherService.getClassScheduleByClassName(className);
    }

    @PostMapping("/addSchedule")
    public ResponseEntity<?> setClassSchedule(@RequestBody ClassSchedule schedule) {
        return teacherService.setClassSchedule(schedule);
    }

    @DeleteMapping("/deleteSchedule/{className}")
    public ResponseEntity<?> deleteClassSchedule(@PathVariable String className) {
        return teacherService.deleteClassSchedule(className);
    }

    @GetMapping("/studentProfile/{regdNo}")
    public ResponseEntity<?> getstudentProfileByRegdNo(@PathVariable String regdNo) {
        try {
            StudentProfile profile = studentService.getStudentProfileByRegdNo(regdNo);
            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/Profile/{teacherId}")
    public ResponseEntity<ProfileDTO> getProfileByTeacherId(@PathVariable String teacherId) {
        try {
            ProfileDTO profile = teacherService.getTeacherProfileData(teacherId);
            return ResponseEntity.ok(profile);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ProfileDTO("Teacher not found", ""));
        }
    }

}
