package com.szone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.szone.*")
public class SzoneApplication{
	
	public static void main(String[] args) {
		SpringApplication.run(SzoneApplication.class, args);
	}

}
