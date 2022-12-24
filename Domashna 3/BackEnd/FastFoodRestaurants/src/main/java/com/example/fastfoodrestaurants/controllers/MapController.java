package com.example.fastfoodrestaurants.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
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
}
