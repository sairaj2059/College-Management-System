package com.collegemanagementsystem.backend.model.resultModal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;
@Getter 
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "batchwise_result")
public class BatchWiseResult {
    @Id
    private String id;
    private String CourseName;
    private String joinYear;
}
