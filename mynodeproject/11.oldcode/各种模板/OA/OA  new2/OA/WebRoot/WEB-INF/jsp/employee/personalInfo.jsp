<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
		  <li class="am-active">个人资料</li>
		</ol>
		<div class="am-panel am-panel-primary am-margin-horizontal-xl am-margin-vertical">
		  <div class="am-panel-hd">个人资料</div>
		  <div class="am-scrollable-horizontal">
				  <table class="am-table am-text-nowrap am-table-centered am-table-main">
				    <tr><td>姓名</td><td>${employeeInfo.name }</td></tr>
				    <tr><td>身份证号</td><td>${employeeInfo.idCard }</td></tr>
				    <tr><td>年龄</td><td>${employeeInfo.age }</td></tr>
				    <tr><td>性别</td><td><c:choose><c:when test="${employeeInfo.gender == 0 }">男</c:when><c:otherwise>女</c:otherwise> </c:choose></td></tr>
				    <tr><td>入职日期</td><td><fmt:formatDate value="${employeeInfo.entryTime }" pattern="yyyy-MM-dd"/></td></tr>
				    <tr><td>qq号</td><td>${employeeInfo.qqNumber }</td></tr>
				    <tr><td>电话号码</td><td>${employeeInfo.mobileNumber }</td></tr>
				    <tr><td>邮箱地址</td><td>${employeeInfo.email }</td></tr>
				    <tr><td>关联账户</td><td>${employeeInfo.acountName }</td></tr>
				    <tr><td>绩效工资</td><td>${employeeInfo.performance }(每月)</td></tr>
				    <tr><td>岗位工资</td><td>${employeeInfo.positionSalary }(每月)</td></tr>
				    <tr><td>基本工资</td><td>${employeeInfo.baseSalary }(每月)</td></tr>
				  </table>
				</div>
		</div>
  </div>
		<!-- content end -->
</div>
<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
</body>
</html>

