package project.entity;

public class Topic {
    private int topicID;
    private String topicName;
    private String start;
    private String end;
    private String capacity;

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
    public String getStart() {
        return start;
    }
    public void setStart(String start) {
        this.start = start;
    }
    public String getEnd() {
        return end;
    }
    public void setEnd(String end) {
        this.end = end;
    }
    public String getCapacity() {
        return capacity;
    }
    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "topicID=" + topicID +
                ", topicName='" + topicName + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                ", capacity='" + capacity + '\'' +
                '}';
    }
}
