package com.example.iotdashrealtime;

import com.example.iotdashrealtime.Models.deviceData;
import com.example.iotdashrealtime.repositories.DeviceDataDAO;
import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    //Thread safe list
    List <WebSocketSession>sessions = new CopyOnWriteArrayList<>();
    DeviceDataDAO data = new DeviceDataDAO();
    TextMessage prevData;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        if(prevData!=null)
        session.sendMessage(prevData);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        deviceData d = new Gson().fromJson(message.getPayload(), deviceData.class);
        data.addData(d);
        prevData=message;
        for(WebSocketSession webSocketSession : sessions) {
            if(webSocketSession!=session)
            webSocketSession.sendMessage(message);
        }
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}