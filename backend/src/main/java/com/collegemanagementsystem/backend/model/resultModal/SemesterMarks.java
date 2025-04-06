package com.collegemanagementsystem.backend.model.resultModal;

import java.util.List;

import lombok.*;


@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter
public class SemesterMarks {
    private String semesterNumber;
    private List<SubjectMarks> subjectMarks;
    private String semcgpa;
}
