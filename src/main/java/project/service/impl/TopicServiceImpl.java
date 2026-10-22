package project.service.impl;

import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.mapper.StuTopicMapper;
import project.mapper.TopicMapper;
import project.entity.StuTopic;
import project.entity.Topic;
import project.service.TopicService;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {

    @Autowired
    private TopicMapper topicDao;

    @Autowired
    private StuTopicMapper stuTopicDao;

    @Override
    public List<Topic> findAll(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return topicDao.findAll();
    }

    @Override
    public List<Topic> findAll() {
        return topicDao.findAll();
    }

    @Override
    public Topic findById(int topicID) {
        return topicDao.findById(topicID);
    }

    @Override
    @Transactional
    public boolean add(Topic topic) {
        return topicDao.add(topic) > 0;
    }

    @Override
    @Transactional
    public boolean update(Topic topic) {
        return topicDao.update(topic) > 0;
    }

    @Override
    @Transactional
    public boolean delete(int topicID) {
        // 先删除所有选择该选题的学生记录
        List<StuTopic> stuTopicList = stuTopicDao.findByTopicId(topicID);
        for (StuTopic stuTopic : stuTopicList) {
            stuTopicDao.delete(stuTopic.getStuID(), topicID);
        }
        // 再删除选题
        return topicDao.delete(topicID) > 0;
    }
}
