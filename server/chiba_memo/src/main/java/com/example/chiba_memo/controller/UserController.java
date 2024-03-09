package com.example.chiba_memo.controller;

import com.example.chiba_memo.model.User;
import com.example.chiba_memo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return userMapper.findById(id);
    }

    @PostMapping
    public void insert(@RequestBody User user) {
        userMapper.insert(user);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        userMapper.update(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userMapper.delete(id);
    }
}
