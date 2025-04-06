package com.collegemanagementsystem.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.QuestionList;
import com.collegemanagementsystem.backend.dto.TeacherProfile;
import com.collegemanagementsystem.backend.model.ClassSchedule;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance;
import com.collegemanagementsystem.backend.model.examModel.Exam;
import com.collegemanagementsystem.backend.model.examModel.ExamResult;
import com.collegemanagementsystem.backend.model.examModel.StudentExamDetail;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student.AttendanceMonth.AbsentDay;
import com.collegemanagementsystem.backend.model.TeacherDetails;
import com.collegemanagementsystem.backend.repository.ClassScheduleRepository;
import com.collegemanagementsystem.backend.repository.ClassWiseAttendaceRepo;
import com.collegemanagementsystem.backend.repository.ExamRepository;
import com.collegemanagementsystem.backend.repository.ExamResultsRepository;
import com.collegemanagementsystem.backend.repository.ResultsRepository;
import com.collegemanagementsystem.backend.repository.TeacherDetailsRepository;

@Service
public class TeacherService {
    @Autowired
    ClassWiseAttendaceRepo classWiseAttendaceRepo;

    @Autowired
    TeacherDetailsRepository teacherDetailsRepository;

    @Autowired
    ExamResultsRepository examResultsRepository;

    @Autowired
    ExamRepository examRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ClassScheduleRepository scheduleRepository;

    public ClassSchedule getClassScheduleByClassName(String className) {
        return scheduleRepository.findByClassName(className);
    }

    public ResponseEntity<?> setClassSchedule(ClassSchedule schedule) {
        try {
            // Save or update the schedule
            ClassSchedule savedSchedule = scheduleRepository.save(schedule);
            return ResponseEntity.ok().body(savedSchedule);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save schedule");
        }
    }

    public ResponseEntity<?> deleteClassSchedule(String className) {
        try {
            ClassSchedule schedule = scheduleRepository.findByClassName(className);
            if (schedule != null) {
                scheduleRepository.deleteByClassName(className);
                return ResponseEntity.ok().body("Class schedule deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class schedule not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete class schedule.");
        }
    }

    public ClasswiseAttendance setStudentAttendanceByRegdNo(String className, String regdNo, String month,
            int newAbsentDays,
            AbsentDay absentDay) {
        ClasswiseAttendance classwiseAttendance = classWiseAttendaceRepo.findStudentAttendanceByClassAndRegdNoAndMonth(
                className, regdNo,
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
        try {
            examRepository.save(exam);
            ExamResult examResult = new ExamResult();
            examResult.setExamId(exam.getId());
            examResultsRepository.save(examResult);
            return ResponseEntity.ok().body("Exam added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add exam");
        }

    }

    public ResponseEntity<?> deleteExam(String examId) {
        examRepository.deleteById(examId);
        return ResponseEntity.ok().body("Exam deleted");
    }

    public ResponseEntity<?> getQuestionsByTeacher(String teacherId, String examId) {
        Exam exam = examRepository.findExamById(examId);
        if (exam != null) {
            if (exam.getUploadedBy().equals(teacherId)) {
                return ResponseEntity.ok().body(exam.getQuestions());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> addQuestion(QuestionList questions) {
        Exam exam = examRepository.findExamById(questions.getExamId());
        if (exam != null) {
            exam.setQuestions(questions.getQuestions());
            examRepository.save(exam);
            return ResponseEntity.ok().body("Questions added successfully");
        } else {
            return ResponseEntity.notFound().build();

        }
    }

    public ResponseEntity<?> publishExam(String examId) {
        Exam exam = examRepository.findExamById(examId);
        if (exam != null) {
            exam.setStatus("PUBLISHED");
            examRepository.save(exam);
            return ResponseEntity.ok().body("Exam published Successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public TeacherProfile getTeacherProfileByTeacherId(String teacherId) {
        TeacherDetails teacher = teacherDetailsRepository.findByTeacherId(teacherId);
        if (teacher == null) {
            throw new IllegalArgumentException("Student with regdNo " + teacherId + " not found.");
        }
        return convertToTeacherProfile(teacher);
    }

    private TeacherProfile convertToTeacherProfile(TeacherDetails teacher) {
        String imageurl = null;
        if (teacher.getImageId() != null) {
            imageurl = "http://localhost:8080/teacher/teacherImage/" + teacher.getImageId();
            System.out.println("Generated Image URL: " + imageurl); // ✅ Debugging URL
        }
        return new TeacherProfile(
                teacher.getId(),
                teacher.getTeacherId(),
                imageurl,
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getClassmentor(),
                teacher.getSubjects());
    }

    public ResponseEntity<?> getTeacherImage(String teacherId) throws IOException {
        TeacherDetails teacher = teacherDetailsRepository.findByTeacherId(teacherId);
        if (teacher == null || teacher.getImageId() == null) {
            return ResponseEntity.notFound().build();
        }
        return imageService.getImage(teacher.getImageId());
    }

    // public ResponseEntity<List<SemesterResults>>
    // findBySubjectTeacherAndSubjectName(String subjectTeacher, String subjectName)
    // {
    // try {
    // // Fetch results from the repository
    // List<SemesterResults> results =
    // resultsRepository.findBySubjectTeacherAndSubjectName(subjectTeacher,
    // subjectName);

    public ResponseEntity<?> getResultList(String examId) {
        try {
            ExamResult examResults = examResultsRepository.findByExamId(examId);
            if (examResults == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Exam with id " + examId + " not found.");
            }
            return ResponseEntity.ok().body(examResults.getStudentExamDetails());
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.internalServerError().build();
        }
    }

    public ResponseEntity<?> modifyAnswerList(String examId, StudentExamDetail updatedStudentExamDetail) {
        try {
            // Fetch the ExamResult document by examId
            ExamResult examResult = examResultsRepository.findByExamId(examId);

            if (examResult == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Exam with ID " + examId + " not found.");
            }

            List<StudentExamDetail> studentExamDetails = examResult.getStudentExamDetails();

            boolean studentFound = false;

            // Update existing student record by matching regdNo
            for (int i = 0; i < studentExamDetails.size(); i++) {
                if (studentExamDetails.get(i).getRegdNo().equals(updatedStudentExamDetail.getRegdNo())) {
                    studentExamDetails.set(i, updatedStudentExamDetail);
                    studentFound = true;
                    break;
                }
            }

            // If not found, add new
            if (!studentFound) {
                studentExamDetails.add(updatedStudentExamDetail);
            }

            // Save the updated examResult back to DB
            examResult.setStudentExamDetails(studentExamDetails);
            examResultsRepository.save(examResult);

            return ResponseEntity.ok("Student exam details updated successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating student exam details: " + e.getMessage());
        }
    }

    // // Check if results are empty
    // if (results.isEmpty()) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND)
    // .body(Collections.emptyList()); // Return empty list with 404 status
    // }
    // // Return results with 200 OK status
    // return ResponseEntity.ok(results);
    // } catch (Exception e) {
    // // Log the exception and return a 500 Internal Server Error response
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body(Collections.emptyList());
    // }
    // }

}
