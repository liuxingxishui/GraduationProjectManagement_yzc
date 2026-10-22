<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>添加学生 - 毕业设计选题系统</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">毕业设计选题系统</a>
    <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto"></ul>
        <span class="navbar-text text-white mr-3">学生: ${sessionScope.student.stuName}</span>
        <a href="${pageContext.request.contextPath}/logout" class="btn btn-outline-light btn-sm">退出登录</a>
    </div>
</nav>

    <div class="container mt-4">
        <h2>添加学生</h2>
        <form action="${pageContext.request.contextPath}/student/add" method="post">
            <div class="form-group">
                <label>学生姓名</label>
                <input type="text" name="stuName" class="form-control" required>
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" name="stuPwd" class="form-control" required>
            </div>
            <div class="form-group">
                <label>专业</label>
                <input type="text" name="major" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">保存</button>
            <a href="${pageContext.request.contextPath}/student/list" class="btn btn-secondary">返回</a>
        </form>
    </div>
</body>
</html>
