<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>500 服务器错误</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container text-center mt-5">
        <h1 class="display-1">500</h1>
        <p class="lead">服务器内部错误</p>
        <a href="${pageContext.request.contextPath}/index.jsp" class="btn btn-primary">返回首页</a>
    </div>
</body>
</html>
