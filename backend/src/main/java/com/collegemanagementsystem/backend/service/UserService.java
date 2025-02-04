package com.collegemanagementsystem.backend.service;

import com.collegemanagementsystem.backend.model.StudentPrincipal;
import com.collegemanagementsystem.backend.model.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.collegemanagementsystem.backend.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAuth student = repository.findByUsername(username);
        if (student == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found"+ username);
        }
        return new StudentPrincipal(student);
    }
}




