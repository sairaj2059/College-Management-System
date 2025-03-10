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
    private String subjectTeacherId;
    private String subjectName;
}
