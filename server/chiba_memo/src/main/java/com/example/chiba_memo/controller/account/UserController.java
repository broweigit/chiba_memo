package com.example.chiba_memo.controller.account;

import com.example.chiba_memo.mapper.UserMapper;
import com.example.chiba_memo.service.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>("No user currently logged in", HttpStatus.UNAUTHORIZED);
        }
        String username = authentication.getName(); // 获取当前登录的用户名
        // Optional: 还可以从authentication中获取其他用户详情
        // 例如，如果使用 UserDetails 来存储用户信息，则可以这样获取：
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", username);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        userInfo.put("roles", roles);

        return ResponseEntity.ok(userInfo);
    }


}
