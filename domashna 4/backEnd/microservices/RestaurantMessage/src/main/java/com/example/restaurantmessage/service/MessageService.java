package com.example.restaurantmessage.service;

import com.example.restaurantmessage.model.ContactMessage;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

@RestController
@RequestMapping("/message-service")
@CrossOrigin("*")
public class MessageService {
    @PostMapping("/messages")
    public void saveMessage(@RequestBody ContactMessage message) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter("src/main/resources/static/messages", true));
        writer.write("\n");
        writer.write("Message from " + message.getName() + " " + message.getEmail());
        writer.write("\n");
        writer.write(message.getMessage());
        writer.flush();
        writer.close();
    }
}