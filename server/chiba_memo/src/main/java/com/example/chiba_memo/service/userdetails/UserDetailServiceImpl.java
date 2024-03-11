package com.example.chiba_memo.service.userdetails;

import com.example.chiba_memo.model.Account;
import com.example.chiba_memo.service.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final AccountService accountService;

    @Autowired
    public UserDetailServiceImpl(AccountService accountService) {
        this.accountService = accountService;
    }

    @Transactional(readOnly=true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Account account = accountService.findByUserName(username);
            return new UserDetails(account);
        } catch (UsernameNotFoundException e) {
            throw e;
        }
    }
}
