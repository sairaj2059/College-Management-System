package com.collegemanagementsystem.backend.model;

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
    private String id;
    private String image;
    private String title;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String applicationNumber;
    private String regdNo;
    private String department;
    private String course;
    private String year;
    private String caste;
    private String nationalIdNumber;
    private String addressLine;
    private String city;
    private String district;
    private String state;
    private String country;
    private String pinCode;
    private String mobileNo;
    private String emailAddress;
    private String joinYear;
    private String fathersName;
    private String fathersOccupation;
    private String fathersMobileNo;
    private String fathersEmailAddress;
    private String fathersAnnualIncome;
    private String mothersName;
    private String mothersOccupation;
    private String mothersMobileNo;
    private String mothersEmailAddress;
    private String mothersAnnualIncome;
    private String guardiansName;
    private String guardiansOccupation;
    private String guardiansMobileNo;
    private String guardiansEmailAddress;
    private String guardiansAddress;
    private String semester;
}
