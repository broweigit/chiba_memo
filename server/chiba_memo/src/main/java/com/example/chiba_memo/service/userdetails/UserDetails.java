package com.example.chiba_memo.service.userdetails;

import com.example.chiba_memo.model.Account;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class UserDetails extends User {
    private static final long serialVersionUID = 1L;

    private final Account account;

    public UserDetails(Account account) {
        // TODO: https://blog.csdn.net/qq_32224047/article/details/108615301 添加Authority
        super(account.getUsername(), account.getPassword(), AuthorityUtils.createAuthorityList(account.getRoles()));
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
}
