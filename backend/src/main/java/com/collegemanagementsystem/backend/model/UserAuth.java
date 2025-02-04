package com.collegemanagementsystem.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class UserAuth {

    @Id
    private String id; // MongoDB generates `_id` if null
    private String username;
    private String password;
    private String role; // Change this to String instead of Set<String>

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return role; // Return role as String
    }

    public void setRole(String role) {
        this.role = role; // Set role as a String
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "UserAuth{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' + // Use role as String in toString
                '}';
    }
}
