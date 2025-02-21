package com.collegemanagementsystem.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.AddMember;
import com.collegemanagementsystem.backend.model.ClasswiseAttendance.Student;
import com.collegemanagementsystem.backend.model.ClasswiseStudent;
import com.collegemanagementsystem.backend.model.Discussion;
import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.Discussion.Message;
import com.collegemanagementsystem.backend.repository.ClasswiseStudentRepository;
import com.collegemanagementsystem.backend.repository.DiscussionRepository;
import com.collegemanagementsystem.backend.repository.StudentDetailsRepository;

@Service
public class DiscussionService {

    @Autowired
    DiscussionRepository discussionRepository;

    @Autowired
    ClasswiseStudentRepository classwiseStudentRepository;

    @Autowired 
    StudentDetailsRepository studentDetailsRepository;

    public ResponseEntity<?> createRoomById(Discussion discussion) {

        if (discussionRepository.findByGroupId(discussion.getGroupId()) == null) {
            discussionRepository.save(discussion);
            return ResponseEntity.status(HttpStatus.CREATED).body("Room Created Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room Alread Exist");
        }
    }

    public ResponseEntity<?> joinRoomById(String groupId, String username) {
        Discussion discussion = discussionRepository.findByGroupId(groupId);
        if (discussion != null) {
            Discussion.Participant newParticipant = new Discussion.Participant();
            newParticipant.setName(username);
            discussion.getParticipants().add(newParticipant);
            discussionRepository.save(discussion);
            return ResponseEntity.ok().body("Joined Room");
        } else {
            return ResponseEntity.badRequest().body("Room doesn't exist");
        }
    }

    public ResponseEntity<?> removeMemberByUsername(String groupId, String username) {

        Discussion discussion = discussionRepository.findByGroupId(groupId);
        discussion.setParticipants(discussion.getParticipants().stream()
                .filter(p -> !p.getName().equals(username))
                .toList());
        System.out.println(username);
        return ResponseEntity.ok().body(discussionRepository.save(discussion));
    }

    public ResponseEntity<?> addMemberToGroup(String groupId, AddMember details) {
        List<String> batches = details.getBatches();
        List<String> regdNoList = details.getRegdNoList();
        Discussion group = discussionRepository.findByGroupId(groupId);
        

        if (group.getParticipants() == null) {
            group.setParticipants(new ArrayList<>());
        }

        if(!batches.isEmpty())
        for (String batch : batches) {
            ClasswiseStudent currentBatch = classwiseStudentRepository.findStudentsByClassName(batch);
            for (Student student : currentBatch.getStudents()) {
                boolean exists = group.getParticipants().stream()
                        .anyMatch(p -> p.getRegdNo().equals(student.getRegdNo()));

                if (!exists) {
                    Discussion.Participant newParticipant = new Discussion.Participant();
                    newParticipant.setName(student.getName());
                    newParticipant.setRegdNo(student.getRegdNo());
                    group.getParticipants().add(newParticipant);
                }
            }
        }
        if(!regdNoList.isEmpty())
        for (String regdNoString : regdNoList) {
            boolean exists = group.getParticipants().stream()
            .anyMatch(p->p.getRegdNo().equals(regdNoString));
            
            if (!exists) {
                Discussion.Participant newParticipant = new Discussion.Participant();
                newParticipant.setRegdNo(regdNoString);
                StudentDetails studentDetails =  studentDetailsRepository.findByRegdNo(regdNoString);
                newParticipant.setName(studentDetails.getFirstName()+" "+ studentDetails.getLastName());
                group.getParticipants().add(newParticipant);
            }
        }

        discussionRepository.save(group);

        return ResponseEntity.ok().body("Added");
    }

    public ResponseEntity<List<Message>> getMessageByGroupId( String groupId, String regdNo) {
        Discussion discussion = discussionRepository.findByGroupId(groupId);
        if (discussion.getParticipants().stream()
        .anyMatch(p->p.getRegdNo().equals(regdNo))) {
            return ResponseEntity.ok().body(discussion.getMessages());
        }
        else{
            return ResponseEntity.badRequest().body(null);
        }
    }

}
