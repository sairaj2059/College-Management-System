package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.TeacherDetails;
import com.collegemanagementsystem.backend.model.noticeModal.Notices;
import com.collegemanagementsystem.backend.service.AdministratorService;
import com.collegemanagementsystem.backend.service.NoticeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdministratorService administratorService;

        @Autowired
    private NoticeService noticeService;

    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudentByForm(
            @RequestPart("studentDetails") StudentDetails studentDetails,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        return administratorService.addStudentByForm(studentDetails,imageFile);
    }

    @GetMapping("/getStudentsDetails")
    public ResponseEntity<List<StudentDetails>> getStudentDetails() {
        return administratorService.getStudentDetails();
    }

    @PostMapping("/addTeacher")
    public ResponseEntity<?> addTeacher(@RequestBody TeacherDetails teacherDetails) {
        return administratorService.addTeacherByForm(teacherDetails);
    }

    @PostMapping("/addNotice")
    public ResponseEntity<?> addNotice(@RequestBody Notices notice) {
        try {
            Notices savedNotice = noticeService.addNotice(notice);
            return ResponseEntity.ok(savedNotice); 
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
            .body("Failed to add notice: " + e.getMessage());
        }
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
