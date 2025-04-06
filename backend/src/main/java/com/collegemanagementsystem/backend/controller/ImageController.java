package com.collegemanagementsystem.backend.controller;

import com.collegemanagementsystem.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/images") 
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageId) throws IOException {
        return imageService.getImage(imageId);
    }
}
