package com.collegemanagementsystem.backend.model;



import com.collegemanagementsystem.backend.model.resultModal.Subject;

import lombok.*;


@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter
public class hours {
    private String hourId;
    private Subject subject;
}
