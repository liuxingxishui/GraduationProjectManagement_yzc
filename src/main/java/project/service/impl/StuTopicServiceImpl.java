package project.service.impl;

import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.mapper.StuTopicMapper;
import project.mapper.TopicMapper;
import project.entity.StuTopic;
import project.service.StuTopicService;

import java.util.List;

@Service
public class StuTopicServiceImpl implements StuTopicService {

    @Autowired
    private StuTopicMapper stuTopicDao;

    @Autowired
    private TopicMapper topicDao;

    @Override
    public List<StuTopic> findAll(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return stuTopicDao.findAll();
    }

    @Override
    public List<StuTopic> findByStuId(int stuID) {
        return stuTopicDao.findByStuId(stuID);
    }

    @Override
    public List<StuTopic> findByTopicId(int topicID) {
        return stuTopicDao.findByTopicId(topicID);
    }

    @Override
    @Transactional
    public boolean add(StuTopic stuTopic) {
        return stuTopicDao.add(stuTopic) > 0;
    }

    @Override
    @Transactional
    public boolean delete(int stuID, int topicID) {
        return stuTopicDao.delete(stuID, topicID) > 0;
    }
}
