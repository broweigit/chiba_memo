package com.example.chiba_memo.service.account;

import com.example.chiba_memo.model.Account;
import com.example.chiba_memo.model.UserRole;

import java.util.List;

public interface AccountService {
    // Anyone can do these:
    Account findByUserName(String username); // 根据用户名查找用户
    boolean insertAccount(Account account); // 注册新用户

    // User privileges:

//    public void updateAccountByUsername(String username, Account updatedAccount);
//    void changePassword(String username, String newPassword); // 用户更改自己的密码
//
//    // Admin privileges:
//    void updateAccountById(String username, Account account);
//    void deleteUserByUsername(String username); // 根据用户名删除用户，管理员权限
//    List<Account> findAllUsers(); // 查找所有用户，管理员权限
//    void updateUserRole(Long userId, String newRole); // 更改用户角色，管理员权限
//    List<UserRole> findUserRolesByUserId(Long userId); // 根据用户ID查找其所有角色，管理员权限
//    void addUserRole(Long userId, String role); // 为用户添加角色，管理员权限
//    void deleteUserRole(Long userId, String role); // 删除用户的一个角色，管理员权限
}
