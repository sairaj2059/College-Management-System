package com.collegemanagementsystem.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "Subjects")

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
