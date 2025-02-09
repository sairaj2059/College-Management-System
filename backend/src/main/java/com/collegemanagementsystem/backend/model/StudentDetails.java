package com.collegemanagementsystem.backend.model;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter 

@Document(collection = "StudentDetails")
public class StudentDetails {

    @Id
    private  int id;
    private String image;
    private String title;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String admissionNumber;
    private int registrationNumber;
    private String role;
    private String department;
    private String course;
    private String caste;
    private int nationalIdNumber;
    private String addressLine;
    private String city;
    private String district;
    private String state;
    private String country;
    private String pinCode;
    private String mobileNo;
    private String emailAddress;
    private String fathersName;
    private String fathersOccupation;
    private String fathersMobileNo;
    private String fathersEmailAddress;
    private double fathersAnnualIncome;
    private String mothersName;
    private String mothersOccupation;
    private String mothersMobileNo;
    private String mothersEmailAddress;
    private double mothersAnnualIncome;
    private String guardiansName;
    private String guardiansOccupation;
    private String guardiansMobileNo;
    private String guardiansEmailAddress;
    private String guardiansAddress;
}
