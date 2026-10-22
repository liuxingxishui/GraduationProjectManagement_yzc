package project.entity;

public class StuTopic {
    private int stuID;
    private String stuName;
    private int topicID;
    private String topicName;

    public int getStuID() {
        return stuID;
    }
    public void setStuID(int stuID) {
        this.stuID = stuID;
    }
    public String getStuName() {
        return stuName;
    }
    public void setStuName(String stuName) {
        this.stuName = stuName;
    }
    public int getTopicID() {
        return topicID;
    }
    public void setTopicID(int topicID) {
        this.topicID = topicID;
    }
    public String getTopicName() {
        return topicName;
    }
    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    @Override
    public String toString() {
        return "StuTopic{" +
                "stuID=" + stuID +
                ", stuName='" + stuName + '\'' +
                ", topicID=" + topicID +
                ", topicName='" + topicName + '\'' +
                '}';
    }
}
