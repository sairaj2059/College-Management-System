package com.collegemanagementsystem.backend.model;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;


@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter 

@Document(collection = "semesterResults")
public class SemesterResults {
    @Id
    private String id;
    private String regdNo;//regd
    private List<SemesterMarks> semesters;
    public SemesterResults(String regdNo, List<SemesterMarks> semesters) {
        this.regdNo = regdNo;
        this.semesters = semesters;
    }
}
