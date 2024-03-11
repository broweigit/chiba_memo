package com.example.chiba_memo.model;

public class UserRole {
    private Long id;
    private Long userId;
    private String role;

    public UserRole() {}

    public UserRole(Long userId, String role) {
        this.userId = userId;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "UserRole{" +
                "userId=" + userId +
                ", role='" + role + '\'' +
                '}';
    }
}
