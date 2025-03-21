package com.collegemanagementsystem.backend.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;

import net.coobird.thumbnailator.Thumbnails;

@Service
public class ImageService {
    @Autowired
    private GridFsTemplate gridFsTemplate;

    /* Store compressed image in MongoDB GridFS */
    public String storeImage(MultipartFile file) throws IOException {
        byte[] compressedImage = compressImage(file.getInputStream());

        ObjectId id = gridFsTemplate.store(
            new ByteArrayInputStream(compressedImage), 
            file.getOriginalFilename(), 
            file.getContentType()
        );

        return id.toString();
    }

    /* Retrieve image from MongoDB */
   /* Retrieve image from MongoDB */
public ResponseEntity<byte[]> getImage(String imageId) throws IOException {
    GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(imageId)));
    byte[] imageBytes = gridFsTemplate.getResource(gridFSFile).getInputStream().readAllBytes();

    return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(imageBytes);  // ✅ Return byte[] instead of ByteArrayResource
}


    /* Compress Image using Thumbnailator */
    private byte[] compressImage(InputStream inputStream) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(inputStream)
                  .scale(0.5) //  Maintain aspect ratio, scale to 50%
                  .outputQuality(0.5) //  Reduce quality to 50%
                  .outputFormat("jpg") //    Convert to JPEG
                  .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }
}

