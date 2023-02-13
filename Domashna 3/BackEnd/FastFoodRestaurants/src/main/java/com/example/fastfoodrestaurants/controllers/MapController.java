package com.example.fastfoodrestaurants.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("*")
@RequestMapping("/app")
public class MapController {
    @GetMapping("/home")
    @ResponseBody
    public String getHomePage() throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(new File("src/main/resources/static/data.json")));
        return reader.lines().collect(Collectors.joining());
    }

    @PostMapping("/contact")
    @ResponseBody
    public ResponseEntity<?> contactPageMessage(@RequestParam String name,
                                             @RequestParam String email,
                                             @RequestParam String message) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter("src/main/resources/static/messages", true));
        writer.write("\n");
        writer.write("Message from: " + name + " " + email);
        writer.write("\n");
        writer.write(message);
        writer.flush();
        writer.close();
        return ResponseEntity.ok().build();
    }
}
