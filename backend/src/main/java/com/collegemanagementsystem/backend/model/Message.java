package com.collegemanagementsystem.backend.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String sender;
    private String message;
    private String timestamp;

    private String attachmentFileId; 
    private String attachmentName; 
    private String attachmentType; 
}
