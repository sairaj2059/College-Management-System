package com.collegemanagementsystem.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.QuestionList;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.examModel.Question;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.ExamRepository;
import com.collegemanagementsystem.backend.repository.TeacherDetailsRepository;

@Service
public class TeacherService {
    @Autowired
    ClassWiseAttendaceRepo classWiseAttendaceRepo;

    @Autowired
    TeacherDetailsRepository teacherDetailsRepository;

    @Autowired
    ExamRepository examRepository;

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

    public ResponseEntity<?> getQuestionsByTeacher(String teacherId, String examId) {
        Exam exam = examRepository.findExamById(examId);
        if(exam!=null){
            if(exam.getUploadedBy().equals(teacherId)){
                return ResponseEntity.ok().body(exam.getQuestions());
            }
            else{
                return ResponseEntity.notFound().build();
            }
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    public ResponseEntity<?> addQuestion(QuestionList questions){
       Exam exam = examRepository.findExamById(questions.getExamId());
        if (exam!=null) {
            exam.setQuestions(questions.getQuestions());
            examRepository.save(exam);
            return ResponseEntity.ok().body("Questions added successfully");
        } else {
            return ResponseEntity.notFound().build();
            
        }
    }

    public ResponseEntity<?> publishExam(String examId) {
        Exam exam = examRepository.findExamById(examId);
        if(exam!=null){
            exam.setStatus("Published");
            examRepository.save(exam);
            return ResponseEntity.ok().body("Exam published Successfully");
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
