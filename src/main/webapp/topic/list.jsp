<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>选题列表 - 毕业设计选题系统</title>
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
        <h2>选题管理</h2>
        <a href="${pageContext.request.contextPath}/topic/add" class="btn btn-success mb-3">添加选题</a>
        <table class="table table-bordered table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>选题ID</th>
                    <th>选题名称</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>容量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${pageInfo.list}" var="topic">
                    <tr>
                        <td>${topic.topicID}</td>
                        <td>${topic.topicName}</td>
                        <td>${topic.start}</td>
                        <td>${topic.end}</td>
                        <td>${topic.capacity}</td>
                        <td>
                            <a href="${pageContext.request.contextPath}/topic/edit/${topic.topicID}" class="btn btn-primary btn-sm">编辑</a>
                            <a href="${pageContext.request.contextPath}/topic/delete/${topic.topicID}" class="btn btn-danger btn-sm" onclick="return confirm('确认删除？')">删除</a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>

        <nav>
            <ul class="pagination">
                <li class="page-item ${pageInfo.hasPreviousPage ? '' : 'disabled'}">
                    <a class="page-link" href="${pageContext.request.contextPath}/topic/list?pageNum=${pageInfo.prePage}">上一页</a>
                </li>
                <c:forEach items="${pageInfo.navigatepageNums}" var="num">
                    <li class="page-item ${pageInfo.pageNum == num ? 'active' : ''}">
                        <a class="page-link" href="${pageContext.request.contextPath}/topic/list?pageNum=${num}">${num}</a>
                    </li>
                </c:forEach>
                <li class="page-item ${pageInfo.hasNextPage ? '' : 'disabled'}">
                    <a class="page-link" href="${pageContext.request.contextPath}/topic/list?pageNum=${pageInfo.nextPage}">下一页</a>
                </li>
            </ul>
        </nav>
    </div>
</body>
</html>
