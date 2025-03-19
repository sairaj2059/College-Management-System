package com.collegemanagementsystem.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.collegemanagementsystem.backend.model.noticeModal.Notices;

@Repository
public interface NoticeRepository extends MongoRepository<Notices, String> {
    
}
