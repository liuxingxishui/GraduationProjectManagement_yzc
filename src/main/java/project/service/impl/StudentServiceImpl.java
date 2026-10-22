package project.service.impl;

import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.mapper.StudentMapper;
import project.mapper.StuTopicMapper;
import project.mapper.TopicMapper;
import project.entity.Student;
import project.entity.StuTopic;
import project.entity.Topic;
import project.service.StudentService;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentDao;

    @Autowired
    private TopicMapper topicDao;

    @Autowired
    private StuTopicMapper stuTopicDao;

    @Override
    public List<Student> findAll(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return studentDao.findAll();
    }

    @Override
    public Student findById(int stuID) {
        return studentDao.findById(stuID);
    }

    @Override
    public boolean add(Student student) {
        return studentDao.add(student) > 0;
    }

    @Override
    public boolean update(Student student) {
        return studentDao.update(student) > 0;
    }

    @Override
    @Transactional
    public boolean delete(int stuID) {
        // 先删除该学生的所有选题记录
        List<StuTopic> stuTopicList = stuTopicDao.findByStuId(stuID);
        for (StuTopic stuTopic : stuTopicList) {
            stuTopicDao.delete(stuID, stuTopic.getTopicID());
        }
        // 再删除学生
        return studentDao.delete(stuID) > 0;
    }

    @Override
    public Student login(int stuID, String stuName) {
        return studentDao.findByIdAndName(stuID, stuName);
    }

    @Override
    @Transactional
    public boolean selectTopic(int stuID, int topicID) {
        // 1. 检查学生是否存在
        Student student = studentDao.findById(stuID);
        if (student == null) {
            throw new RuntimeException("学生不存在");
        }

        // 2. 检查选题是否存在
        Topic topic = topicDao.findById(topicID);
        if (topic == null) {
            throw new RuntimeException("选题不存在");
        }

        // 3. 检查学生是否已经选过该选题
        StuTopic existRecord = stuTopicDao.findById(stuID, topicID);
        if (existRecord != null) {
            throw new RuntimeException("您已经选择过该选题");
        }

        // 4. 检查学生是否已经有其他选题（每人只能选一个）
        List<StuTopic> existingTopics = stuTopicDao.findByStuId(stuID);
        if (!existingTopics.isEmpty()) {
            throw new RuntimeException("您已经选择过选题，不能重复选择");
        }

        // 5. 检查选题容量是否已满
        int selectedCount = topicDao.countSelected(topicID);
        try {
            int capacityNum = Integer.parseInt(topic.getCapacity());
            if (selectedCount >= capacityNum) {
                throw new RuntimeException("该选题容量已满");
            }
        } catch (NumberFormatException e) {
            // 容量字段非数字，跳过容量检查
        }

        // 6. 添加选题记录
        StuTopic stuTopic = new StuTopic();
        stuTopic.setStuID(stuID);
        stuTopic.setStuName(student.getStuName());
        stuTopic.setTopicID(topicID);
        stuTopic.setTopicName(topic.getTopicName());
        stuTopicDao.add(stuTopic);

        return true;
    }
}
