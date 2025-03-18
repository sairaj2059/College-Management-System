package com.collegemanagementsystem.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "discussionPage")
public class Discussion {

    @Id
    private String id;

    private String groupId;

    private String groupName;

    private String teacher;

    private String teacherId;

    private List<Participant> participants;

    private List<Message> messages;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Participant {
        private String name;
        private String regdNo;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Message {

        private String sender;

        private String message;

        private String type;

        private String timestamp;

        private String avatar;

    }
}
