// package com.collegemanagementsystem.backend.service;

// import com.collegemanagementsystem.backend.dto.MessageRequest;
// import com.collegemanagementsystem.backend.model.Discussion;
// import com.collegemanagementsystem.backend.model.Message;
// import com.collegemanagementsystem.backend.repository.DiscussionRepository;
// import com.mongodb.client.gridfs.GridFSBucket;
// import com.mongodb.client.gridfs.model.GridFSUploadOptions;
// import org.bson.Document;
// import org.bson.types.ObjectId;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.io.ByteArrayInputStream;
// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.Base64;

// @Service
// public class ChatService {

//     @Autowired
//     private DiscussionRepository discussionRepository;

//     @Autowired
//     private GridFSBucket gridFSBucket;

//     public Message sendMessage(String groupId, MessageRequest request) {
//         Discussion group = discussionRepository.findByGroupId(request.getGroupId());
//         if (group == null) {
//             throw new RuntimeException("Room not found!");
//         }

//         Message message = new Message();
//         message.setMessage(request.getMessage());
//         message.setSender(request.getSender());
//         message.setTimestamp(LocalDateTime.now().toString());

//         if (request.getAttachment() != null && !request.getAttachment().isEmpty()) {
//             try {
//                 byte[] attachmentBytes = Base64.getDecoder().decode(request.getAttachment());
//                 ByteArrayInputStream stream = new ByteArrayInputStream(attachmentBytes);
//                 GridFSUploadOptions options = new GridFSUploadOptions()
//                         .chunkSizeBytes(358400)
//                         .metadata(new Document("type", request.getAttachmentType()));
//                 ObjectId fileId = gridFSBucket.uploadFromStream(request.getAttachmentName(), stream, options);
//                 message.setAttachmentFileId(fileId.toHexString());
//             } catch (Exception e) {
//                 throw new RuntimeException("Failed to store attachment: " + e.getMessage());
//             }
//         }

//         if (group.getMessages() == null) {
//             group.setMessages(new ArrayList<>());
//         }
//         group.getMessages().add(message);
//         discussionRepository.save(group);

//         return message;
//     }
// }


package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.dto.MessageRequest;
import com.collegemanagementsystem.backend.model.Discussion;
import com.collegemanagementsystem.backend.model.Message;
import com.collegemanagementsystem.backend.repository.DiscussionRepository;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mongodb.client.gridfs.model.GridFSFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;

@Service
public class ChatService {

    

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    ImageService imageService;

    public Message sendMessage(String groupId, MessageRequest request)  {
        Discussion group = discussionRepository.findByGroupId(request.getGroupId());
        if (group == null) throw new RuntimeException("Room not found!");

        Message message = new Message();
        message.setMessage(request.getMessage());
        message.setSender(request.getSender());
        message.setTimestamp(LocalDateTime.now().toString());

        try {
            message.setAttachmentFileId(imageService.storeAttachment(request));

        } catch (Exception e) { 
            System.out.println(e.getMessage());
        }

        // if (request.getAttachment() != null && !request.getAttachment().isEmpty()) {
        //     System.out.println("Attachment received: " + request.getAttachmentName());

        //     try {
        //         byte[] fileData = Base64.getDecoder().decode(request.getAttachment());
        //         Document metadata = new Document("type", request.getAttachmentType());

        //         ObjectId id = gridFsTemplate.store(
        //                 new ByteArrayInputStream(fileData),
        //                 request.getAttachmentName(),
        //                 request.getAttachmentType(),
        //                 metadata
        //         );
        //         message.setAttachmentFileId(id.toHexString());

        //         System.out.println("Saved attachment with ID: " + id.toHexString());
        //     } catch (Exception e) {
        //         throw new RuntimeException("Failed to store attachment: " + e.getMessage());
        //     }
        // }

        if (group.getMessages() == null) group.setMessages(new ArrayList<>());
        group.getMessages().add(message);
        discussionRepository.save(group);

        return message;
    }

    public ResponseEntity<byte[]> getAttachment(String attachmentId) {
        try {
            GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(attachmentId)));
            if (gridFSFile == null) throw new RuntimeException("File not found");

            byte[] fileData = gridFsTemplate.getResource(gridFSFile).getContent().readAllBytes();

            String contentType = gridFSFile.getMetadata() != null
                    ? gridFSFile.getMetadata().getString("_contentType")
                    : "application/octet-stream";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(fileData);

        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve attachment: " + e.getMessage());
        }
    }
}
