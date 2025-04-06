package com.collegemanagementsystem.backend.model;

import java.util.List;

import com.collegemanagementsystem.backend.model.resultModal.Subject;

import lombok.*;

@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter
public class Semester {
    private String semesterNumber;
    private List<Subject> subjects;
}
