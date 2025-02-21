package com.collegemanagementsystem.backend.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class StudentPrincipal implements UserDetails {

    private final UserAuth student;

    public StudentPrincipal(UserAuth student) {
        this.student = student;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Use student.getRole() which is a String, not Set<String>
        return List.of(new SimpleGrantedAuthority( "ROLE_"+student.getRole()));
    }

    @Override
    public String getPassword() {
        return student.getPassword();
    }

    @Override
    public String getUsername() {
        return student.getUsername();
    }
}
