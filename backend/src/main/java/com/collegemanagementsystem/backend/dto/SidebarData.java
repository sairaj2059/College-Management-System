package com.collegemanagementsystem.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SidebarData {
    private String groupId;
    private String groupName;
    private String lastMessage;
}
