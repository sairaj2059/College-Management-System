package com.collegemanagementsystem.backend.dto;

import com.collegemanagementsystem.backend.model.Discussion;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoom {
    private Discussion roomData;
    private AddMember memberData;
    private String teacherId;   
}
