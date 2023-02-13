package com.example.restaurantmap.service;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Controller
@CrossOrigin("*")
@RequestMapping("/app/home")
public class MapService {
    @GetMapping
    @ResponseBody
    public String getHomePage() throws IOException {
        return new RestTemplate().getForObject("http://localhost:8081/data-service/data", String.class);
    }
}