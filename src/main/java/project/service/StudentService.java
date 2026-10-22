package project.service;

import project.entity.Student;

import java.util.List;

/**
 * 学生服务接口
 */
public interface StudentService {

    List<Student> findAll(int pageNum, int pageSize);

    Student findById(int stuID);

    boolean add(Student student);

    boolean update(Student student);

    boolean delete(int stuID);

    /**
     * 学生登录
     * @param stuID 学号（账号）
     * @param stuName 姓名（密码）
     * @return 学生对象
     */
    Student login(int stuID, String stuName);

    /**
     * 学生选择选题
     * @param stuID 学生ID
     * @param topicID 选题ID
     * @return 是否成功
     */
    boolean selectTopic(int stuID, int topicID);
}
