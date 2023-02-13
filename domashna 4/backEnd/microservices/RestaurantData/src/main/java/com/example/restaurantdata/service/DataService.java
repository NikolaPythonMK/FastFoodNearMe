package com.example.restaurantdata.service;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/data-service")
@CrossOrigin("*")
public class DataService {
    @GetMapping("/data")
    public String getData() throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader("src/main/resources/static/data.json"));
        return reader.lines().collect(Collectors.joining());
    }
}