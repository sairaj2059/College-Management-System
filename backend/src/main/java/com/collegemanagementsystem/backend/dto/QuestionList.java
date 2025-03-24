package com.collegemanagementsystem.backend.dto;

import java.util.List;

import com.collegemanagementsystem.backend.model.examModel.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionList {
    private String examId;
    private List<Question> questions;
}
