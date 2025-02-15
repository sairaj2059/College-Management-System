package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.collegemanagementsystem.backend.model.Discussion;

public interface DiscussionRepository extends MongoRepository<Discussion, String>{

    Discussion findByGroupId(String groupId);

    
}
