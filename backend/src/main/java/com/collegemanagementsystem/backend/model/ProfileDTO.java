package com.collegemanagementsystem.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileDTO {
    private String name;
    private String email;
}
