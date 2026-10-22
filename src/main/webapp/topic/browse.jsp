<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>浏览选题 - 毕业设计选题系统</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
        <h2>浏览选题</h2>
        <div id="msg" class="alert" style="display:none;"></div>
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
                <c:forEach items="${topicList}" var="topic">
                    <tr>
                        <td>${topic.topicID}</td>
                        <td>${topic.topicName}</td>
                        <td>${topic.start}</td>
                        <td>${topic.end}</td>
                        <td>${topic.capacity}</td>
                        <td>
                            <c:if test="${not empty sessionScope.student}">
                                <button class="btn btn-primary btn-sm select-btn" data-topic-id="${topic.topicID}">选择选题</button>
                            </c:if>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>

    <script>
        $(function() {
            $('.select-btn').click(function() {
                var topicID = $(this).data('topic-id');
                $.ajax({
                    url: '${pageContext.request.contextPath}/stuTopic/select',
                    type: 'POST',
                    data: {topicID: topicID},
                    dataType: 'json',
                    success: function(res) {
                        $('#msg').removeClass('alert-success alert-danger').addClass(res.success ? 'alert-success' : 'alert-danger').text(res.message).show();
                        if (res.success) {
                            setTimeout(function() { location.reload(); }, 1000);
                        }
                    },
                    error: function() {
                        alert('请求失败，请先登录');
                    }
                });
            });
        });
    </script>
</body>
</html>
