package project.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.entity.Topic;

import java.util.List;

@Mapper
public interface TopicMapper {

    int add(Topic topic);
    int delete(int topicID);
    int update(Topic topic);
    Topic findById(int topicID);
    List<Topic> findAll();
    int countSelected(int topicID);
}
