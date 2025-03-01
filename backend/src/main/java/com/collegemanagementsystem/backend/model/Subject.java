package com.collegemanagementsystem.backend.model;

import lombok.*;

@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter 

public class Subject {
    private String subjectCode;
    private String subjectCredit;
    private String subjectTeacher;
    private String subjectName;
    private Double cie1;
    private Double cie2;
    private Double cie3;
    private Double ese;
    private Double subAverage;//subject averge
}
