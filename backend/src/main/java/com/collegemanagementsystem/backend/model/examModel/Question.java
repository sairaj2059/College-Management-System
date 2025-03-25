package com.collegemanagementsystem.backend.model.examModel;

import java.util.List;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    private String questionType;
    private String questionText;
    private List<String> options;
    private List<String> correctAnswer;
    private int marks;
}
