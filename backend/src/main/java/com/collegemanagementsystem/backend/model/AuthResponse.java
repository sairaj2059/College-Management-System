package com.collegemanagementsystem.backend.model;

public class AuthResponse {
    private String jwtToken;
    private UserAuth userAuth;
    public String getJwtToken() {
        return jwtToken;
    }
    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
    public UserAuth getUserAuth() {
        return userAuth;
    }
    public void setUserAuth(UserAuth userAuth) {
        this.userAuth = userAuth;
    }
    public AuthResponse(String jwtToken, UserAuth userAuth) {
        this.jwtToken = jwtToken;
        this.userAuth = userAuth;
    }


    
}
