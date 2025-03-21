package com.collegemanagementsystem.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.MessageRequest;
import com.collegemanagementsystem.backend.model.Discussion;
import com.collegemanagementsystem.backend.model.Discussion.Message;
import com.collegemanagementsystem.backend.repository.DiscussionRepository;

@Service
public class ChatService {
    @Autowired
    DiscussionRepository discussionRepository;

    public Message sendMessage(String groupId, MessageRequest request) {
        Discussion group = discussionRepository.findByGroupId(request.getGroupId());

        Message message = new Message();
        message.setMessage(request.getMessage());
        message.setSender(request.getSender());
        message.setTimestamp(LocalDateTime.now().toString());

        if (group != null) {
            if (group.getMessages() == null) {
                group.setMessages(new ArrayList<>());
            }
            group.getMessages().add(message);
            discussionRepository.save(group);
        } else {
            throw new RuntimeException("Room not found!");
        }

        return message;
    }

}
