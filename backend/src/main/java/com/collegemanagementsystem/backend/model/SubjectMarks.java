package com.collegemanagementsystem.backend.model;


import lombok.*;

@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter

public class SubjectMarks {//combining two classes
    private Subject subject;
    private CieMarks cieMarks;
}
