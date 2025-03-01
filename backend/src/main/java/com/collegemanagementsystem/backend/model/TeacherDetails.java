    package com.collegemanagementsystem.backend.model;

    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import lombok.*;

    @NoArgsConstructor  
    @AllArgsConstructor 
    @Getter 
    @Setter 
    @Document(collection = "TeacherDetails")
    public class TeacherDetails {

        @Id
        private String id;
        private String username;
        private String image;
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
        private String classmentor;//to which he/she is mentor
        private String Qulifications;
        private String designation;
    }
