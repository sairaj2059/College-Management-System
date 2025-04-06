package com.collegemanagementsystem.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseStudent;
import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.TeacherDetails;
import com.collegemanagementsystem.backend.repository.ClasswiseStudentRepository;
import com.collegemanagementsystem.backend.repository.StudentDetailsRepository;
import com.collegemanagementsystem.backend.repository.TeacherDetailsRepository;
import com.collegemanagementsystem.backend.model.Student;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AdministratorService {

    @Autowired
    StudentDetailsRepository studentDetailsRepository;

    @Autowired
    ClasswiseStudentRepository classwiseStudentRepository;

    @Autowired
    TeacherDetailsRepository teacherDetailsRepository;

    @Autowired
    private ImageService imageService; 

    @Autowired
    CourseService courseService;

    public ResponseEntity<?> addStudentByForm(StudentDetails studentDetails, MultipartFile imageFile) throws IOException {
        StudentDetails studentDetail = studentDetailsRepository.findByRegdNo(studentDetails.getRegdNo());
        if (studentDetail == null) {
            if (imageFile != null && !imageFile.isEmpty()) {
                String imageId = imageService.storeImage(imageFile);
                studentDetails.setImageId(imageId);  // Save image ID
            }
            studentDetailsRepository.save(studentDetails);
            ClasswiseStudent classwiseStudent = classwiseStudentRepository
                    .findByClassName(studentDetails.getCourse() + " " + studentDetails.getJoinYear());
            if (classwiseStudent == null) {
                classwiseStudent = new ClasswiseStudent();
                classwiseStudent.setClassName(studentDetails.getCourse() + " " + studentDetails.getJoinYear());
                classwiseStudent.setStudents(new ArrayList<>());
            }
            Student student = new Student();
            student.setRegdNo(studentDetails.getRegdNo());
            student.setStudentName(studentDetails.getFirstName() + " " + studentDetails.getLastName());

            classwiseStudent.getStudents().add(student);
            classwiseStudentRepository.save(classwiseStudent);

            return ResponseEntity.ok().body("Student Added Successfully");
        } else {
            return ResponseEntity.badRequest().body("Student Already Exists");
        }
    }

    public ResponseEntity<List<StudentDetails>> getStudentDetails() {
        return ResponseEntity.ok().body(studentDetailsRepository.findAll());
    }

    public ResponseEntity<?> addTeacherByForm(TeacherDetails teacherDetails,MultipartFile imageFile) throws IOException{
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageId = imageService.storeImage(imageFile);
            teacherDetails.setImageId(imageId);  // Save image ID
        }
        TeacherDetails teacherDetailsTemp = teacherDetailsRepository.findByTeacherId(teacherDetails.getTeacherId());
        if (teacherDetailsTemp == null) {
            teacherDetails.getSubjects()
                    .forEach(subject -> {
                        courseService.addTeacherToSubject(subject.getSubjectCode(), teacherDetails.getTeacherId(),
                                teacherDetails.getFirstName() + " " + teacherDetails.getLastName());
                    });

            teacherDetailsRepository.save(teacherDetails);
            return ResponseEntity.ok().body("Teacher Added Successfully");
        } else {
            return ResponseEntity.badRequest().body("Teacher Already Exists");
        }
    }


     public Map<String, Long> getTotalTeachersAndStudents() {
    
        long totalTeachers = teacherDetailsRepository.count();
        long totalStudents = studentDetailsRepository.count();

        // Create a map to hold the response data
        Map<String, Long> result = new HashMap<>();
        result.put("totalTeachers", totalTeachers);
        result.put("totalStudents", totalStudents);

        return result;
    }

}
