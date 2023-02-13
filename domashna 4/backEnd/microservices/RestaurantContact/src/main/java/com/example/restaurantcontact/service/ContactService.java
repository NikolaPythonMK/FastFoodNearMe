package com.example.restaurantcontact.service;

import com.example.restaurantcontact.model.ContactMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Controller
@RequestMapping("/app/contact")
@CrossOrigin("*")
public class ContactService {
    @PostMapping
    @ResponseBody
    public ResponseEntity<?> contactPageMessage(@RequestParam String name,
                                                @RequestParam String email,
                                                @RequestParam String message) throws IOException {
        new RestTemplate().postForEntity("http://localhost:8083/message-service/messages",
                new ContactMessage(name, email, message), Void.class);
        return ResponseEntity.ok().build();
    }
}