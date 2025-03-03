package com.collegemanagementsystem.backend.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudentProfile {
    private String id;
    private String firstName;
    private String lastName;
    private String regdNo;
    private String department;
    private String course;
    private String year;
    private int semester;
}

