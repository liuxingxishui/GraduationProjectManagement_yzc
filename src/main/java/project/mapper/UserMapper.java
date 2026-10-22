package project.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.entity.User;

import java.util.List;

@Mapper
public interface UserMapper {

    int add(User user);
    int delete(String username);
    int update(User user);
    User findByUsername(String username);
    List<User> findAll();
}