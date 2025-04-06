package com.collegemanagementsystem.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.model.ClasswiseStudent;
import com.collegemanagementsystem.backend.model.Student;
import com.collegemanagementsystem.backend.repository.ClasswiseStudentRepository;

@Service
public class ClassService {

  @Autowired
  ClasswiseStudentRepository classwiseStudentRepository;

  public ResponseEntity<List<String>> getClasses() {
    List<String> classList = classwiseStudentRepository.findAll()
        .stream()
        .map(ClasswiseStudent::getClassName)
        .toList();

    return ResponseEntity.ok().body(classList);
  }

  public ResponseEntity<List<Student>> getStudentsByClassCategory(String classCategory) {
    List<ClasswiseStudent> matchingClasses = classwiseStudentRepository.findAll()
        .stream()
        .filter(c -> c.getClassName().toLowerCase().startsWith(classCategory.toLowerCase()))
        .toList();

    List<Student> allStudents = matchingClasses.stream()
        .flatMap(c -> c.getStudents().stream())
        .toList();

    if (allStudents.isEmpty()) {
        return ResponseEntity.notFound().build();
    } else {
        return ResponseEntity.ok(allStudents);
    }
}


}
