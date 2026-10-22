package project.service;

import project.entity.StuTopic;

import java.util.List;

public interface StuTopicService {

    List<StuTopic> findAll(int pageNum, int pageSize);

    List<StuTopic> findByStuId(int stuID);

    List<StuTopic> findByTopicId(int topicID);

    boolean add(StuTopic stuTopic);

    boolean delete(int stuID, int topicID);
}
