package com.collegemanagementsystem.backend.model.examModel;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "examResults")
public class ExamResult {
    @Id
    private String Id;
    private String examId;
    private List<StudentExamDetail> studentExamDetails;
}
