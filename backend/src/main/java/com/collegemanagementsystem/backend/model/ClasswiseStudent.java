package com.collegemanagementsystem.backend.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "classwiseStudent")
public class ClasswiseStudent {
    private String className;
    private List<Student> students;

}
