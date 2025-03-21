package com.collegemanagementsystem.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.collegemanagementsystem.backend.dto.AddMember;
import com.collegemanagementsystem.backend.dto.CreateRoom;
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

    @GetMapping("/joinGroupByGroupId")
    public ResponseEntity<?> joinGroupByGroupId(@RequestParam String groupId, @RequestParam String regdNo) {
        return discussionService.joinRoomById(groupId, regdNo);
    }

    @PutMapping("/teacher/remove-user/{groupId}")
    public ResponseEntity<?> removeMemberByUsername(@PathVariable String groupId, @RequestParam String username) {
        return discussionService.removeMemberByUsername(groupId, username);
    }

    @PostMapping("teacher/add-members/{groupId}")
    public ResponseEntity<?> addMemberToGroup(@PathVariable String groupId, @RequestBody AddMember details ){
       return discussionService.addMemberToGroup(groupId, details);
    }

    @GetMapping("/getMessages/{groupId}")
    public ResponseEntity<List<Discussion.Message>> getMessagesByStudent(@PathVariable String groupId, @RequestParam String regdNo) {
        return discussionService.getMessageByGroupId(groupId, regdNo);
    }
    @GetMapping("/teacher/getMessages/{groupId}")
    public ResponseEntity<List<Discussion.Message>> getMessagesByTeacher(@PathVariable String groupId, @RequestParam String teacherId) {
        return discussionService.getMessageByGroupIdByTeacher(groupId, teacherId);
    }
    @PostMapping("/teacher/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody CreateRoom createRoom) {
        return discussionService.createRoomById(createRoom);
    }

    @GetMapping("/teacher/getCreatedRooms")
    public ResponseEntity<?> getCreatedRooms(@RequestParam String teacherId) {
        return discussionService.getCreatedRooms(teacherId);
    }

    @GetMapping("/getJoinedRooms")
    public ResponseEntity<?> getJoinedRooms(@RequestParam String regdNo) {
        return discussionService.getJoinedRooms(regdNo);
    }
    

    @GetMapping("/getParticipants/{groupId}")
    public ResponseEntity<?> getParticipants (@PathVariable String groupId) {
        return discussionService.getParticipants(groupId);
     
    }
}