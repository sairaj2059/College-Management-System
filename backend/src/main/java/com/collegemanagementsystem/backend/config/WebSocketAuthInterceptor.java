package com.collegemanagementsystem.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.collegemanagementsystem.backend.service.JWTService;
import com.collegemanagementsystem.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

public class WebSocketAuthInterceptor implements HandshakeInterceptor {

    @Autowired
    JWTService jwtService;
    @Autowired
    UserDetails userDetails;
    @Autowired
    ApplicationContext context;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
            WebSocketHandler wsHandler, Map<String, Object> attributes) {
        if (request instanceof ServletServerHttpRequest) {
            HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            String token = servletRequest.getParameter("token");
            
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                if (validateToken(token)) {
                    attributes.put("jwt", token);
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
            WebSocketHandler wsHandler, Exception exception) {
    }

    private boolean validateToken(String token) {
        try {
            String username = jwtService.extractUserName(token);
            UserDetails userDetails = context.getBean(UserService.class).loadUserByUsername(username);
            return jwtService.validateToken(token, userDetails);
        } catch (Exception e) {
            // Log exception for debugging purposes
            System.out.println("Token validation error: " + e.getMessage());
            return false;
        }
    }
}
