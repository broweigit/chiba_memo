package com.example.chiba_memo.service.account;

import com.example.chiba_memo.mapper.UserMapper;
import com.example.chiba_memo.mapper.UserRoleMapper;
import com.example.chiba_memo.model.Account;
import com.example.chiba_memo.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService{

    private final UserMapper userMapper;
    private final UserRoleMapper userRoleMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountServiceImpl(UserMapper userMapper, UserRoleMapper userRoleMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.userRoleMapper = userRoleMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly=true)
    @Override
    public Account findByUserName(String username) {

        Account account = userMapper.findByUserName(username);

        if (account == null) {
            throw new UsernameNotFoundException("Username not found: " + username);
        }

        List<String> roleNames = userRoleMapper.findByUserId(account.getId()).stream()
                .map(UserRole::getRole)
                .collect(Collectors.toList());
        account.setRoles(roleNames);
        return account;
    }

    @Transactional
    @Override
    public boolean insertAccount(Account account) {

        Account existingAccount = userMapper.findByUserName(account.getUsername());
        if (existingAccount != null) {
            return false; // 表示用户名已被占用
        }
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        userMapper.insert(account);

        List<String> roleNames = account.getRoles();
        if (!roleNames.isEmpty()) {
            for (String roleName : roleNames) {
                userRoleMapper.insert(new UserRole(account.getId(), roleName));
            }
        }
        return true; // 表示注册成功
    }

//    @Transactional
//    @Override
//    public void updateAccountByUsername(String username, Account updatedAccount) {
//        Account account = userMapper.findByUserName(username);
//        if (account != null) {
//            updatedAccount.setId(account.getId()); // 确保ID一致
//            userMapper.update(updatedAccount);
//        } else {
//            throw new UsernameNotFoundException("Username not found for update: " + username);
//        }
//    }
}
