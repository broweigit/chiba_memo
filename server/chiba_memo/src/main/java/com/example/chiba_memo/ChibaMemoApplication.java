package com.example.chiba_memo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class}) // TODO: Enable secrity after you learn it
@MapperScan("com.example.chiba_memo.mapper")
public class ChibaMemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChibaMemoApplication.class, args);
    }

}
