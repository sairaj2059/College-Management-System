package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.model.AuthResponse;
import com.collegemanagementsystem.backend.model.UserAuth;
import com.collegemanagementsystem.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    private UserRepository repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserAuth register(UserAuth student) {
        if (repo.findByUsername(student.getUsername()) != null) {
            logger.error("Username already exists: " + student.getUsername());
            throw new RuntimeException("Username already exists");
        }
        student.setPassword(encoder.encode(student.getPassword()));
        student.setRole("TEACHER"); // ✅ Ensure role is stored correctly
        return repo.save(student);
    }

public String verify(UserAuth student) {
    try {
        UserAuth user = repo.findByUsername(student.getUsername());
        if (user == null) {
            logger.error("User not found: " + student.getUsername());
            return "fail";
        }
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), student.getPassword()));

        if (authentication.isAuthenticated()) {
            logger.info("User authenticated successfully: " + user.getUsername() + " with role: " + user.getRole());
            return jwtService.generateToken(user.getUsername(), user.getRole()); // ✅ Use role from DB
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

