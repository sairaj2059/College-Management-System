package com.collegemanagementsystem.backend.model.examModel;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.collegemanagementsystem.backend.model.resultModal.Subject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "exams")
public class Exam {
    @Id
    private String id;
    private String examTitle;
    private String className;
    private Subject subject;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String duration;
    private String status;
    private String uploadedBy;
    private List<Question> questions;

}
