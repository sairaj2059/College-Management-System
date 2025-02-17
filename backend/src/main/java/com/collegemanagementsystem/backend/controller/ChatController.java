package com.collegemanagementsystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.collegemanagementsystem.backend.dto.MessageRequest;
import com.collegemanagementsystem.backend.model.Discussion.Message;
import com.collegemanagementsystem.backend.service.ChatService;

@Controller
@CrossOrigin("http://localhost:3000")
public class ChatController {

    @Autowired
    ChatService chatService;

    @MessageMapping("/sendMessage/{groupId}")
    @SendTo("/topic/group/{groupId}")
    public Message sendMessage(
            @DestinationVariable String groupId,
            @RequestBody MessageRequest request) {
        return chatService.sendMessage(groupId, request);
    }

}
