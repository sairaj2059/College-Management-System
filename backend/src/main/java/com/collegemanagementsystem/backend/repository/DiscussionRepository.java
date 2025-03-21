package com.collegemanagementsystem.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.Discussion;

public interface DiscussionRepository extends MongoRepository<Discussion, String>{

    Discussion findByGroupId(String groupId);

    List<Discussion> findByTeacherId(String teacherId);

    
}
