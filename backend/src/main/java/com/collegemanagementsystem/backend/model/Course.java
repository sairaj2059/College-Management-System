package com.collegemanagementsystem.backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Courses")
public class Course {

    @Id
    private String id;
    private String courseName;
    private String courseType;
    private List<Semester> semestersList;
    public Semester getSemesterBySemesterNumber(String semesterNumber) {
       return semestersList.stream().filter(semester -> semester.getSemesterNumber().equals(semesterNumber)).findFirst().orElse(null);
    }
}
