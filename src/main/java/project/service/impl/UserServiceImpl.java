package project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.mapper.UserMapper;
import project.entity.User;
import project.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userDao;

    @Override
    public User login(String username, String password) {
        User user = userDao.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    @Override
    @Transactional
    public boolean register(User user) {
        User existUser = userDao.findByUsername(user.getUsername());
        if (existUser != null) {
            return false; // 用户名已存在
        }
        return userDao.add(user) > 0;
    }
}
