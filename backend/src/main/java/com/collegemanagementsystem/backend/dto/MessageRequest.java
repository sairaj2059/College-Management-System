package com.collegemanagementsystem.backend.dto;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {

    private String sender;
    private String message;
    private ObjectId attachment;
    private String groupId;
}
