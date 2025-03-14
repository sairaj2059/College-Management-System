package com.collegemanagementsystem.backend.model.examModel;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "questions")
@TypeAlias("oneword")
public class OneWordQuestion extends Question {
    private String correctAnswer;
}
