<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>毕业设计选题系统 - 登录</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            width: 400px;
        }
        .login-title {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <h3 class="login-title">毕业设计选题系统</h3>
        <form action="${pageContext.request.contextPath}/doLogin" method="post">
            <div class="form-group">
                <label>学号</label>
                <input type="text" name="username" class="form-control" placeholder="请输入学号" required>
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" name="password" class="form-control" placeholder="请输入密码" required>
            </div>
            <c:if test="${not empty error}">
                <div class="alert alert-danger">${error}</div>
            </c:if>
            <button type="submit" class="btn btn-primary btn-block">登录</button>
            <div class="text-center mt-3">
                <small class="text-muted">学生登录，请输入学号(ID)和密码</small>
            </div>
        </form>
    </div>
</body>
</html>
