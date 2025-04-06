package com.collegemanagementsystem.backend.model.resultModal;


import com.collegemanagementsystem.backend.model.CieMarks;

import lombok.*;

@NoArgsConstructor  
@AllArgsConstructor 
@Getter 
@Setter

public class SubjectMarks {//combining two classes
    private Subject subject;
    private CieMarks cieMarks;
}
