package com.collegemanagementsystem.backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.collegemanagementsystem.backend.model.resultModal.Subject;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Document(collection = "TeacherDetails")
public class TeacherDetails {

    @Id
    private String id;
    private String teacherId;
    private String username;
    private String imageId;
    private String title;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String department;
    private String nationalIdNumber;
    private String addressLine;
    private String city;
    private String district;
    private String state;
    private String country;
    private String pinCode;
    private String mobileNo;
    private String emailAddress;
    private String classmentor;
    private String qualification;
    private String designation;
    private List<Subject> subjects;
}
