package com.example.chiba_memo.mapper;

import com.example.chiba_memo.model.UserRole;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserRoleMapper {

    @Select("SELECT * FROM UserRoles WHERE user_id = #{userId}")
    List<UserRole> findByUserId(@Param("userId") Long userId);

    @Insert("INSERT INTO UserRoles(user_id, role) VALUES(#{userId}, #{role})")
    void insert(UserRole userRole);

    @Delete("DELETE FROM UserRoles WHERE user_id = #{userId} AND role = #{role}")
    void delete(@Param("userId") Long userId, @Param("role") String role);

    // 仅管理员权限
    @Update("UPDATE UserRoles SET role = #{role} WHERE user_id = #{userId}")
    void update(@Param("userId") Long userId, @Param("role") String role);
}
