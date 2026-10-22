<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>学生列表 - 毕业设计选题系统</title>
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
        <h2>学生管理</h2>
        <a href="${pageContext.request.contextPath}/student/add" class="btn btn-success mb-3">添加学生</a>
        <table class="table table-bordered table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${pageInfo.list}" var="student">
                    <tr>
                        <td>${student.stuID}</td>
                        <td>${student.stuName}</td>
                        <td>${student.major}</td>
                        <td>
                            <a href="${pageContext.request.contextPath}/student/edit/${student.stuID}" class="btn btn-primary btn-sm">编辑</a>
                            <a href="${pageContext.request.contextPath}/student/delete/${student.stuID}" class="btn btn-danger btn-sm" onclick="return confirm('确认删除？')">删除</a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>

        <!-- 分页 -->
        <nav>
            <ul class="pagination">
                <li class="page-item ${pageInfo.hasPreviousPage ? '' : 'disabled'}">
                    <a class="page-link" href="${pageContext.request.contextPath}/student/list?pageNum=${pageInfo.prePage}">上一页</a>
                </li>
                <c:forEach items="${pageInfo.navigatepageNums}" var="num">
                    <li class="page-item ${pageInfo.pageNum == num ? 'active' : ''}">
                        <a class="page-link" href="${pageContext.request.contextPath}/student/list?pageNum=${num}">${num}</a>
                    </li>
                </c:forEach>
                <li class="page-item ${pageInfo.hasNextPage ? '' : 'disabled'}">
                    <a class="page-link" href="${pageContext.request.contextPath}/student/list?pageNum=${pageInfo.nextPage}">下一页</a>
                </li>
            </ul>
        </nav>
    </div>
</body>
</html>
