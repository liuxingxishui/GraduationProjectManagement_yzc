<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>我的选题 - 毕业设计选题系统</title>
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
        <h2>我的选题</h2>
        <c:choose>
            <c:when test="${not empty stuTopicList and stuTopicList.size() > 0}">
                <table class="table table-bordered table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>选题ID</th>
                            <th>选题名称</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${stuTopicList}" var="stuTopic">
                            <tr>
                                <td>${stuTopic.topicID}</td>
                                <td>${stuTopic.topicName}</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </c:when>
            <c:otherwise>
                <div class="alert alert-info">您尚未选择任何选题，请前往<a href="${pageContext.request.contextPath}/topic/browse">浏览选题</a>页面进行选择。</div>
            </c:otherwise>
        </c:choose>
    </div>
</body>
</html>
