package com.collegemanagementsystem.backend.config;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    public void handleWebSocketDisconnetListener(
        SessionDisconnectEvent event
    ){
        // TO DO -- to be implemented
    }
}
