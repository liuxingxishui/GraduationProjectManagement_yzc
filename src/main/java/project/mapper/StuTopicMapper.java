package project.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import project.entity.StuTopic;

import java.util.List;

@Mapper
public interface StuTopicMapper {

    int add(StuTopic stuTopic);
    int delete(@Param("stuID") int stuID, @Param("topicID") int topicID);
    StuTopic findById(@Param("stuID") int stuID, @Param("topicID") int topicID);
    List<StuTopic> findAll();
    List<StuTopic> findByStuId(int stuID);
    List<StuTopic> findByTopicId(int topicID);
}
