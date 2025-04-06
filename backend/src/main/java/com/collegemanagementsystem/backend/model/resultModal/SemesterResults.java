package com.collegemanagementsystem.backend.model.resultModal;
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
    private String courseName;
    private String joinYear;
    private List<SemesterMarks> semesters;
    
    public SemesterResults(String regdNo, List<SemesterMarks> semesters) {
        this.regdNo = regdNo;
        this.semesters = semesters;
    }
}
