package com.collegemanagementsystem.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.dto.AddMember;
import com.collegemanagementsystem.backend.dto.CreateRoom;
import com.collegemanagementsystem.backend.dto.SidebarData;
import com.collegemanagementsystem.backend.model.ClasswiseStudent;
import com.collegemanagementsystem.backend.model.Discussion;
import com.collegemanagementsystem.backend.model.Student;
import com.collegemanagementsystem.backend.model.StudentDetails;
import com.collegemanagementsystem.backend.model.Discussion.Message;
import com.collegemanagementsystem.backend.model.Discussion.Participant;
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

    public List<Participant> getMemberList(CreateRoom createRoom) {
        List<Participant> participants = new ArrayList<>();
        if (createRoom.getMemberData().getBatches() != null) {
            for (String batch : createRoom.getMemberData().getBatches()) {
                ClasswiseStudent students = classwiseStudentRepository.findStudentsByClassName(batch);
                if (students != null) {
                    students.getStudents().forEach(student -> {
                        Participant participant = new Participant();
                        participant.setName(student.getStudentName());
                        participant.setRegdNo(student.getRegdNo());
                        participants.add(participant);
                    });
                }
            }
        }

        if (createRoom.getMemberData().getRegdNoList() != null) {
            for (String regdNo : createRoom.getMemberData().getRegdNoList()) {
                StudentDetails student = studentDetailsRepository.findByRegdNo(regdNo);
                if (student != null) {
                    Participant participant = new Participant();
                    participant.setName(student.getFirstName() + " " + student.getLastName());
                    participant.setRegdNo(student.getRegdNo());
                    participants.add(participant);
                }
            }
        }

        return participants;
    }

    public ResponseEntity<?> createRoomById(CreateRoom createRoom) {
        Discussion discussion = createRoom.getRoomData();
        discussion.setParticipants(getMemberList(createRoom));
        discussion.setTeacherId(createRoom.getTeacherId());
        if (discussionRepository.findByGroupId(discussion.getGroupId()) == null) {
            discussionRepository.save(discussion);
            return ResponseEntity.status(HttpStatus.CREATED).body("Room Created Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room Alread Exist");
        }
    }

    public ResponseEntity<?> joinRoomById(String groupId, String regdNo) {
        Discussion discussion = discussionRepository.findByGroupId(groupId);
        if (discussion != null) {
            Discussion.Participant newParticipant = new Discussion.Participant();
            newParticipant.setRegdNo(regdNo);
            StudentDetails studentDetails = studentDetailsRepository.findByRegdNo(regdNo);
            newParticipant.setName(studentDetails.getFirstName() + " " + studentDetails.getLastName());
            if (discussion.getParticipants() == null) {
                discussion.setParticipants(new ArrayList<>());
            }
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

        if (!batches.isEmpty())
            for (String batch : batches) {
                ClasswiseStudent currentBatch = classwiseStudentRepository.findStudentsByClassName(batch);
                for (Student student : currentBatch.getStudents()) {
                    boolean exists = group.getParticipants().stream()
                            .anyMatch(p -> p.getRegdNo().equals(student.getRegdNo()));

                    if (!exists) {
                        Discussion.Participant newParticipant = new Discussion.Participant();
                        newParticipant.setName(student.getStudentName());
                        newParticipant.setRegdNo(student.getRegdNo());
                        group.getParticipants().add(newParticipant);
                    }
                }
            }
        if (!regdNoList.isEmpty())
            for (String regdNoString : regdNoList) {
                boolean exists = group.getParticipants().stream()
                        .anyMatch(p -> p.getRegdNo().equals(regdNoString));

                if (!exists) {
                    Discussion.Participant newParticipant = new Discussion.Participant();
                    newParticipant.setRegdNo(regdNoString);
                    StudentDetails studentDetails = studentDetailsRepository.findByRegdNo(regdNoString);
                    newParticipant.setName(studentDetails.getFirstName() + " " + studentDetails.getLastName());
                    group.getParticipants().add(newParticipant);
                }
            }

        discussionRepository.save(group);

        return ResponseEntity.ok().body("Added");
    }

    public ResponseEntity<List<Message>> getMessageByGroupId(String groupId, String regdNo) {
        Discussion discussion = discussionRepository.findByGroupId(groupId);
        if (discussion.getParticipants().stream()
                .anyMatch(p -> p.getRegdNo().equals(regdNo))) {
            return ResponseEntity.ok().body(discussion.getMessages());
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    public ResponseEntity<?> getCreatedRooms(String teacherId) {
        List<Discussion> discussions = discussionRepository.findByTeacherId(teacherId);
        List<SidebarData> sidebarDatas = new ArrayList<>();

        if (discussions != null) {
            for (Discussion discussion : discussions) {
                if (discussion != null) {
                    SidebarData sidebarData = new SidebarData();
                    sidebarData.setGroupId(discussion.getGroupId());
                    sidebarData.setGroupName(discussion.getGroupName());
                    if (discussion.getMessages() != null && discussion.getMessages().size() > 0) {
                        sidebarData.setLastMessage(
                                discussion.getMessages().get(discussion.getMessages().size() - 1).getMessage());
                    } else {
                        sidebarData.setLastMessage("");
                    }
                    sidebarDatas.add(sidebarData);

                }

            }
            return ResponseEntity.ok().body(sidebarDatas);

        }

        return ResponseEntity.badRequest().body("Room not found");

    }

    public ResponseEntity<List<Message>> getMessageByGroupIdByTeacher(String groupId, String teacherId) {
        Discussion discussion = discussionRepository.findByGroupId(groupId);
        if (discussion.getTeacherId() != null && discussion.getTeacherId().equals(teacherId)) {
            return ResponseEntity.ok().body(discussion.getMessages());
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    public ResponseEntity<?> getParticipants(String groupId) {
        Discussion discussion = discussionRepository.findByGroupId(groupId);
        if (discussion != null) {
            return ResponseEntity.ok().body(discussion.getParticipants());
        } else
            return ResponseEntity.badRequest().body("Room not found");

    }

    public ResponseEntity<?> getJoinedRooms(String regdNo) {
        List<Discussion> discussions = discussionRepository.findAll();
        List<SidebarData> sidebarDatas = new ArrayList<>();
        if (discussions != null) {
            for (Discussion discussion : discussions) {
                if (discussion.getParticipants() != null) {
                    for (Discussion.Participant participant : discussion.getParticipants()) {
                        if (participant.getRegdNo().equals(regdNo)) {
                            SidebarData sidebarData = new SidebarData();
                            sidebarData.setGroupId(discussion.getGroupId());
                            sidebarData.setGroupName(discussion.getGroupName());
                            if (discussion.getMessages() != null && discussion.getMessages().size() > 0) {
                                sidebarData.setLastMessage(
                                        discussion.getMessages().get(discussion.getMessages().size() - 1).getMessage());
                            } else {
                                sidebarData.setLastMessage("");
                            }
                            sidebarDatas.add(sidebarData);
                        }
                    }
                }
            }
            return ResponseEntity.ok().body(sidebarDatas);
        }
        return ResponseEntity.badRequest().body("No rooms found");

    }

}
