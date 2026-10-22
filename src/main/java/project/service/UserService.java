package project.service;

import project.entity.User;

/**
 * 用户服务接口
 */
public interface UserService {

    /**
     * 用户登录
     */
    User login(String username, String password);

    /**
     * 用户注册
     */
    boolean register(User user);
}
