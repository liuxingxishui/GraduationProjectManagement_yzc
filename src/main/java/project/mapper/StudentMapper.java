package project.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import project.entity.Student;

import java.util.List;

@Mapper
public interface StudentMapper {
    int add(Student student);
    int delete(int stuID);
    int update(Student student);
    Student findById(int stuID);
    List<Student> findAll();
    /**
     * 根据学号和姓名登录（账号=stuID，密码=stuName）
     */
    Student findByIdAndName(@Param("stuID") int stuID, @Param("stuName") String stuName);
}
