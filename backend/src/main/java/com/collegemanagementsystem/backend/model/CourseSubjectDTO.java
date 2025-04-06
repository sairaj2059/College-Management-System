package com.collegemanagementsystem.backend.model;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CourseSubjectDTO {
    private String courseName;
    private String courseType;
    private List<Semester> semesters;
}
