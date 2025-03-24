package com.collegemanagementsystem.backend.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.model.SemesterResults;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.ExamRepository;
import com.collegemanagementsystem.backend.repository.ResultsRepository;
import com.collegemanagementsystem.backend.repository.TeacherDetailsRepository;

@Service
public class TeacherService {
    @Autowired
    ClassWiseAttendaceRepo classWiseAttendaceRepo;

    @Autowired
    TeacherDetailsRepository teacherDetailsRepository;

    @Autowired
    ExamRepository examRepository;

     @Autowired
    private ResultsRepository resultsRepository;

    public ClasswiseAttendance setStudentAttendanceByRegdNo(String className, String regdNo, String month, int newAbsentDays,
            AbsentDay absentDay) {
        ClasswiseAttendance classwiseAttendance = classWiseAttendaceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(className, regdNo,
                month);
            classwiseAttendance.getStudents().get(0).getAttendance().get(0).setDaysAbsent(newAbsentDays);
        classwiseAttendance.getStudents().get(0).getAttendance().get(0).getAbsentDays().addLast(absentDay);
        System.out.println(classwiseAttendance);
        return classWiseAttendaceRepo.save(classwiseAttendance);
    }

    public ResponseEntity<List<Exam>> getExamList(String teacherId) {
        List<Exam> examList = examRepository.getAllExamsByUploadedBy(teacherId);
        if (!examList.isEmpty()) {
            return ResponseEntity.ok().body(examList);
        } else {
            return ResponseEntity.notFound().build();
        }
        
    }

    public ResponseEntity<?> addExam(Exam exam) {
        examRepository.save(exam);
        return ResponseEntity.ok().body("Exam added successfully");
    }

    public ResponseEntity<?> deleteExam(String examId) {
        examRepository.deleteById(examId);
        return ResponseEntity.ok().body("Exam deleted") ;
    }
//   public ResponseEntity<List<SemesterResults>> findBySubjectTeacherAndSubjectName(String subjectTeacher, String subjectName) {
//     try {
//         // Fetch results from the repository
//         List<SemesterResults> results = resultsRepository.findBySubjectTeacherAndSubjectName(subjectTeacher, subjectName);

//         // Check if results are empty
//         if (results.isEmpty()) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                                  .body(Collections.emptyList()); // Return empty list with 404 status
//         }
//         // Return results with 200 OK status
//         return ResponseEntity.ok(results);
//     } catch (Exception e) {
//         // Log the exception and return a 500 Internal Server Error response
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                              .body(Collections.emptyList());
//     }
//}
    
}
