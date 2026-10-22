package project.entity;

public class Student {
    private int stuID;
    private String stuName;
    private String stuPwd;
    private String major;

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
    public String getStuPwd() {
        return stuPwd;
    }
    public void setStuPwd(String stuPwd) {
        this.stuPwd = stuPwd;
    }
    public String getMajor() {
        return major;
    }
    public void setMajor(String major) {
        this.major = major;
    }

    @Override
    public String toString() {
        return "Student{" +
                "stuID=" + stuID +
                ", stuName='" + stuName + '\'' +
                ", stuPwd='" + stuPwd + '\'' +
                ", major='" + major + '\'' +
                '}';
    }
}
