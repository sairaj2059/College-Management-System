package com.collegemanagementsystem.backend.dto;

import lombok.Data;

@Data
public class StudentSubjectCieDTO {
    private String regNo;
    private String subjectName;
    private double cie1;
    private double cie2;
    private double cie3;
    private double ese_gpa;

    public StudentSubjectCieDTO(String regNo, String subjectName, double cie1, double cie2, double cie3, double ese_gpa) {
        this.regNo = regNo;
        this.subjectName = subjectName;
        this.cie1 = cie1;
        this.cie2 = cie2;
        this.cie3 = cie3;
        this.ese_gpa = ese_gpa;
    }
}
