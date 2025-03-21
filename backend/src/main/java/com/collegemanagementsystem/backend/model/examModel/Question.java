package com.collegemanagementsystem.backend.model.examModel;

import org.springframework.data.annotation.Id;
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
public abstract class Question {
    @Id
    private String id;
    private String examId;
    private String questionText;
    private int marks;
}
