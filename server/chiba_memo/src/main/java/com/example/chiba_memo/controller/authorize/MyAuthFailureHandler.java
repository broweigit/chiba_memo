package com.example.chiba_memo.controller.authorize;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import java.io.IOException;

public class MyAuthFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        if (exception instanceof UsernameNotFoundException) {
            response.getWriter().write("Username not found");
        } else if (exception instanceof BadCredentialsException) {
            response.getWriter().write("Invalid Username or password");
        } else {
            // 对于其他类型的AuthenticationException，您可以提供一个通用的错误信息
            response.getWriter().write("Authentication failed");
        }
    }
}
