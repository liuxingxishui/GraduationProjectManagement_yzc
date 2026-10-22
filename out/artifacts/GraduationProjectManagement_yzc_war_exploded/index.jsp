<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>首页 - 毕业设计选题系统</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">毕业设计选题系统</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto"></ul>
            <span class="navbar-text text-white mr-3">
                学生: ${sessionScope.student.stuName}
            </span>
            <a href="${pageContext.request.contextPath}/logout" class="btn btn-outline-light btn-sm">退出登录</a>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="jumbotron">
            <h1 class="display-4">欢迎使用毕业设计选题系统</h1>
            <p class="lead">本系统提供学生管理、选题管理、选题记录查询等功能。</p>
            <hr class="my-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="card text-white bg-primary mb-3">
                        <div class="card-header">学生管理</div>
                        <div class="card-body">
                            <h5 class="card-title">增删改查学生信息</h5>
                            <a href="${pageContext.request.contextPath}/student/list" class="btn btn-light btn-sm">进入</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white bg-success mb-3">
                        <div class="card-header">选题管理</div>
                        <div class="card-body">
                            <h5 class="card-title">增删改查选题信息</h5>
                            <a href="${pageContext.request.contextPath}/topic/list" class="btn btn-light btn-sm">进入</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white bg-info mb-3">
                        <div class="card-header">选题记录</div>
                        <div class="card-body">
                            <h5 class="card-title">查询学生选题记录</h5>
                            <a href="${pageContext.request.contextPath}/stuTopic/list" class="btn btn-light btn-sm">进入</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white bg-warning mb-3">
                        <div class="card-header">学生选择选题</div>
                        <div class="card-body">
                            <h5 class="card-title">浏览并选择选题</h5>
                            <a href="${pageContext.request.contextPath}/topic/browse" class="btn btn-light btn-sm">进入</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
