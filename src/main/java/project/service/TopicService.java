package project.service;

import project.entity.Topic;

import java.util.List;

public interface TopicService {

    List<Topic> findAll(int pageNum, int pageSize);

    List<Topic> findAll();

    Topic findById(int topicID);

    boolean add(Topic topic);

    boolean update(Topic topic);

    boolean delete(int topicID);
}