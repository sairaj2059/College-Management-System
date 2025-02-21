package com.collegemanagementsystem.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.dto.AddMember;
import com.collegemanagementsystem.backend.model.Discussion;
import com.collegemanagementsystem.backend.service.DiscussionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DiscussionController {

    @Autowired
    DiscussionService discussionService;

    @PostMapping("/create-room")
    public ResponseEntity<?> createRoom(
            @RequestBody Discussion discussion) {
        return discussionService.createRoomById(discussion);
    }

    @GetMapping("/join-room")
    public ResponseEntity<?> joinRoomById(@RequestParam String groupId, @RequestParam String username) {
        return discussionService.joinRoomById(groupId, username);
    }

    @PutMapping("remove-user/{groupId}")
    public ResponseEntity<?> removeMemberByUsername(@PathVariable String groupId, @RequestParam String username) {
        return discussionService.removeMemberByUsername(groupId, username);
    }

    @PostMapping("/add-members/{groupId}")
    public ResponseEntity<?> addMemberToGroup(@PathVariable String groupId, @RequestBody AddMember details ){
       return discussionService.addMemberToGroup(groupId, details);
    }

    @GetMapping("/getMessages/{groupId}")
    public ResponseEntity<List<Discussion.Message>> getMethodName(@PathVariable String groupId, @RequestParam String regdNo) {
        return discussionService.getMessageByGroupId(groupId, regdNo);
    }
}
