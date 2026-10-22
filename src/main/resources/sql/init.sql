-- 毕业设计选题系统数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS graduation_project DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE graduation_project;

-- 学生表
DROP TABLE IF EXISTS student;
CREATE TABLE student (
    stuID INT PRIMARY KEY AUTO_INCREMENT COMMENT '学号',
    stuName VARCHAR(50) NOT NULL COMMENT '学生姓名',
    stuPwd VARCHAR(100) DEFAULT '' COMMENT '学生密码',
    major VARCHAR(100) NOT NULL COMMENT '专业'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生表';

-- 插入测试数据
INSERT INTO student (stuID, stuName, stuPwd, major) VALUES
(1001, '张三', '123456', '计算机科学与技术'),
(1002, '李四', '123456', '计算机科学与技术'),
(1003, '王五', '123456', '软件工程'),
(1004, '赵六', '123456', '软件工程'),
(1005, '钱七', '123456', '信息安全');

-- 选题表
DROP TABLE IF EXISTS topic;
CREATE TABLE topic (
    topicID INT PRIMARY KEY AUTO_INCREMENT COMMENT '选题ID',
    topicName VARCHAR(200) NOT NULL COMMENT '选题名称',
    `start` VARCHAR(45) COMMENT '选题开始时间',
    `end` VARCHAR(45) COMMENT '选题结束时间',
    capacity VARCHAR(45) DEFAULT '1' COMMENT '选题容量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='选题表';

-- 插入测试数据
INSERT INTO topic (topicID, topicName, `start`, `end`, capacity) VALUES
(1, '基于SpringBoot的在线考试系统设计与实现', '2024-01-01', '2024-06-01', '3'),
(2, '基于Vue的电商平台前端开发', '2024-01-01', '2024-06-01', '2'),
(3, '基于Python的数据分析系统', '2024-01-01', '2024-06-01', '2'),
(4, '基于微信小程序的校园二手交易平台', '2024-01-01', '2024-06-01', '3'),
(5, '基于深度学习的图像识别研究', '2024-01-01', '2024-06-01', '1');

-- 学生选题记录表
DROP TABLE IF EXISTS stutopic;
CREATE TABLE stutopic (
    stuID INT NOT NULL COMMENT '学号',
    stuName VARCHAR(50) NOT NULL COMMENT '学生姓名',
    topicID INT NOT NULL COMMENT '选题ID',
    topicName VARCHAR(200) NOT NULL COMMENT '选题名称',
    PRIMARY KEY (stuID, topicID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生选题记录表';

-- 用户表（管理员）
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    username VARCHAR(50) PRIMARY KEY COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    remember VARCHAR(10) DEFAULT '' COMMENT '记住我'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 插入管理员数据
INSERT INTO user (username, password) VALUES ('admin', 'admin');
