package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.model.StudentAuth;
import com.collegemanagementsystem.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AdminService {
    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    @Autowired
    private StudentRepository repo;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authManager;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public StudentAuth register(StudentAuth student) {
        if (repo.findByUsername(student.getUsername()) != null) {
            logger.error("Username already exists: " + student.getUsername());
            throw new RuntimeException("Username already exists");
        }
        logger.info("Saving student: " + student);
        student.setPassword(encoder.encode(student.getPassword()));
        return repo.save(student);
    }

    public String verify(StudentAuth student) {
        try {
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(student.getUsername(), student.getPassword()));
            if (authentication.isAuthenticated()) {
                System.out.println(jwtService.generateToken(student.getUsername()));
                return jwtService.generateToken(student.getUsername());
            } else {
                logger.warn("Authentication failed for user: " + student.getUsername());
                return "fail";
            }
        } catch (Exception e) {
            logger.error("Error during authentication: " + e.getMessage());
            return "fail";
        }
    }
}
