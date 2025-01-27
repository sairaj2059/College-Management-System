package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.model.StudentAuth;
import com.collegemanagementsystem.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private StudentRepository repo;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authManager;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    public StudentAuth register(StudentAuth student) {
        System.out.println("Saving student: " + student);
        student. setPassword(encoder.encode(student.getPassword()));
        return repo.save(student);
    }

    public String verify(StudentAuth student) {
    Authentication authentication = authManager.
            authenticate(new UsernamePasswordAuthenticationToken(student.getUsername(),student.getPassword()));
        if(authentication.isAuthenticated())
            return jwtService.generateToken(student.getUsername());
        else
            return "fail";
    }
}
