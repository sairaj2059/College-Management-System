package com.collegemanagementsystem.backend.dto;

import java.util.List;

import org.springframework.data.annotation.Id;

import com.collegemanagementsystem.backend.model.Subject;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class TeacherProfile {
    @Id 
    private String id;
    private String teacherId;
    private String imageurl;
    private String firstName;
    private String lastName;
    private String classmentor;
     private List<Subject> subjects;
}
