package com.collegemanagementsystem.backend.repository;

import com.collegemanagementsystem.backend.model.UserAuth;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<UserAuth, String> {
    // Custom query method to find a student by username
    UserAuth findByUsername(String username);

}
