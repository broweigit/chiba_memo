package com.example.chiba_memo.mapper;

import com.example.chiba_memo.model.Account;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    // Anybody:

    @Select("SELECT * FROM Users WHERE username = #{username}")
    Account findByUserName(@Param("username") String username);

    @Insert("INSERT INTO Users(username, password) VALUES(#{username}, #{password})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Account account);

    // User Privilede:

    // Admin Privilege:

    @Update("UPDATE Users SET username = #{username}, password = #{password} WHERE id = #{id}")
    void update(Account account);

    @Select("SELECT * FROM Users")
    List<Account> findAll();

    @Select("SELECT * FROM Users WHERE id = #{id}")
    Account findById(@Param("id") Long id);

    @Delete("DELETE FROM Users WHERE id = #{id}")
    void delete(@Param("id") Long id);
}