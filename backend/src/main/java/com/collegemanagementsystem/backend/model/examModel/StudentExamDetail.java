package com.collegemanagementsystem.backend.model.examModel;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamDetail {
    private String regdNo;
    private String studentName;
    private String attemptedQuestions;
    private String correctAnswers;
    private String totalMarks;
    private List<AttemptedQuestion> attemptedQuestionsList;
}
