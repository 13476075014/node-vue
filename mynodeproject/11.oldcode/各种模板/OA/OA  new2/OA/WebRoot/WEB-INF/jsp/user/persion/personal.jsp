<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html>
<head>
 <%@include file="/WEB-INF/jsp/public/header.jspf" %>
</head>
<body>
	
<%@include file="/WEB-INF/jsp/index/header.jsp" %>


<div class="am-cf admin-main">
  <!-- sidebar start -->
	<%@include file="/WEB-INF/jsp/index/menu.jsp" %>
  <!-- sidebar end -->

  <!-- content start -->
	<div class="admin-content">
		<ol class="am-breadcrumb">
		  <li>位置：员工管理中心</li>
		  <li class="am-active">账户信息</li>
		</ol>
		<div class="am-panel am-panel-primary am-margin-horizontal-xl am-margin-vertical">
		  <div class="am-panel-hd">账户信息</div>
		  <div class="am-scrollable-horizontal">
				  <table class="am-table am-text-nowrap am-table-centered am-table-main">
				    <tr><td>用户账号</td><td>${requestScope.user.userName }</td></tr>
				    <tr><td>用户昵称</td><td>${requestScope.user.nickName }</td></tr>
				    <tr><td>所属部门</td><td>${requestScope.name }</td></tr>
				    <tr><td>用户类型</td><td><c:choose><c:when test="${requestScope.user.userType == 0 }">系统管理员</c:when><c:otherwise>普通用户</c:otherwise> </c:choose></td></tr>
				  </table>
				</div>
		</div>
  </div>
		<!-- content end -->
</div>
<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
</body>
</html>

