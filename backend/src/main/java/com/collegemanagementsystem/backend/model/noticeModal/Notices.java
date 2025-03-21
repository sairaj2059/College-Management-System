package com.collegemanagementsystem.backend.model.noticeModal;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.*;

@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter

@Document(collection = "notices")
public class Notices {
    @Id
    private String id; 
    private IssuedBy issuedBy;
    @CreatedDate 
    private Date issueDate; 
    private String noticeTitle; 
    private String noticeContent; 
}
