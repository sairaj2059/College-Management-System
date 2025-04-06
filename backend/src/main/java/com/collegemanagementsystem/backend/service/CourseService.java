package com.collegemanagementsystem.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.Course;
import com.collegemanagementsystem.backend.model.CourseSubjectDTO;
import com.collegemanagementsystem.backend.model.Semester;
import com.collegemanagementsystem.backend.model.resultModal.Subject;
import com.collegemanagementsystem.backend.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public ResponseEntity<List<Course>> getCoursesAndSemesters() {
        return ResponseEntity.ok().body(courseRepository.findAll());
    }

    public ResponseEntity<Course> getCourseDetails(String courseName) {

        Course course = courseRepository.findCourseByCourseName(courseName);
        if (course != null) {
            return ResponseEntity.ok().body(course);
        }
        return ResponseEntity.notFound().build();

    }

    public ResponseEntity<Semester> getSemesterData(String courseName, String semesterNumber) {
        Course course = courseRepository.findCourseByCourseName(courseName);
        if (course != null) {
            Semester semester = course.getSemesterBySemesterNumber(semesterNumber);
            if (semester != null) {
                return ResponseEntity.ok().body(semester);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.notFound().build();

    }

    public ResponseEntity<List<String>> getCourses() {
        List<String> courseList = courseRepository.findAll()
                .stream()
                .map(Course::getCourseName)
                .toList();
        return ResponseEntity.ok().body(courseList);
    }

    public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Course> courses = courseRepository.findAll();
        List<Subject> subjects = courses.stream()
                .flatMap(course -> course.getSemestersList().stream())
                .flatMap((Semester semester) -> semester.getSubjects().stream())
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(subjects);
    }

    public ResponseEntity<?> addTeacherToSubject(String subjectCode, String teacherId, String teacherName) {
        List<Course> courses = courseRepository.findAll();
        for (Course course : courses) {
            List<Semester> semesters = course.getSemestersList();
            for (Semester semester : semesters) {
                List<Subject> subjects = semester.getSubjects();
                for (Subject subject : subjects) {
                    if (subject.getSubjectCode().equals(subjectCode)) {
                        subject.setSubjectTeacher(teacherName);
                        subject.setSubjectTeacherId(teacherId);
                        courseRepository.save(course);
                        return ResponseEntity.ok().body("Teacher Added Successfully");
                    }
                }
            }
        }
        return ResponseEntity.badRequest().body("Subject Not Found");
    }

    public void saveOrUpdateCourses(List<Course> courses) {
        courseRepository.saveAll(courses);
    }

    public ResponseEntity<String> deleteCourse(String id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("Course deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }
    }

    public List<CourseSubjectDTO> getSubjectsByTeacherId(String teacherId) {
        List<Course> courses = courseRepository.findAll();
        List<CourseSubjectDTO> result = new ArrayList<>();
    
        for (Course course : courses) {
            List<Semester> filteredSemesters = new ArrayList<>();
    
            for (Semester semester : course.getSemestersList()) {
                List<Subject> filteredSubjects = semester.getSubjects().stream()
                        .filter(subject -> 
                            subject.getSubjectTeacherId() != null &&
                            subject.getSubjectTeacherId().equalsIgnoreCase(teacherId.trim())
                        )
                        .collect(Collectors.toList());
    
                if (!filteredSubjects.isEmpty()) {
                    Semester filteredSemester = new Semester(semester.getSemesterNumber(), filteredSubjects);
                    filteredSemesters.add(filteredSemester);
                }
            }
    
            if (!filteredSemesters.isEmpty()) {
                CourseSubjectDTO dto = new CourseSubjectDTO(
                        course.getCourseName(),
                        course.getCourseType(),
                        filteredSemesters);
                result.add(dto);
            }
        }
    
        return result;
    }    

}
