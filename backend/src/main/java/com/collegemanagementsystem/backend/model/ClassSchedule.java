package com.collegemanagementsystem.backend.model;


import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;


@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter
@Document
public class ClassSchedule {
    private String className;
    private List<hours> hours;

}
