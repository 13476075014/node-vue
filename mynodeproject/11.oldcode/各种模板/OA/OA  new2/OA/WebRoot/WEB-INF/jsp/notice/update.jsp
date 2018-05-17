<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html>
<head>
<%@include file="/WEB-INF/jsp/public/header.jspf"%>
</head>
<body>
	<%@include file="/WEB-INF/jsp/index/header.jsp"%>
	<div class="am-cf admin-main">
		<!-- sidebar start -->
		<%@include file="/WEB-INF/jsp/index/menu.jsp"%>
		<!-- sidebar end -->

		<!-- content start -->
		<div class="admin-content">
			<ol class="am-breadcrumb">
			  <li>位置：<a href="${pageContext.request.contextPath}/system/notice/list">系统公告管理</a></li>
			  <li class="am-active">公告修改</li>
			</ol>
			<div class="am-g">
				<div class="am-u-lg-5 am-u-md-15 am-u-sm-centered">
					<form class="am-form m-form-horizontal"
						action="${pageContext.request.contextPath}/system/notice/update"
						method="post">
						<div class="am-g am-margin-top">
							<div class="am-u-sm-2 am-text-right">标题</div>
							<div class="am-u-sm-10">
								<div class="am-form-group ">
									<div class="field">
									<input type="text" name="title" value="${data.title}" data-validate="required:标题不能为空">
									<input type="hidden" name="id" value="${data.id }">
									</div>
								</div>
							</div>
							<div class="am-u-sm-3"></div>
						</div>
						<div class="am-g am-margin-top">
							<div class="am-u-sm-2 am-text-right">内容</div>
							<div class="am-u-sm-10">
								<div class="am-form-group ">
									<div class="field">
									<textarea rows="10" cols="20" class="xheditor" data-validate="required:公告内容不能为空" id="content" placeholder="公告内容" name="content">${data.noticeContent }</textarea>
									<input type="hidden" name="id" value="${data.id }">
									</div>
								</div>
							</div>
							<div class="am-u-sm-3"></div>
						</div>

						<div class="am-form-group">
							<div class="am-u-sm-9 am-u-sm-push-3">
								<input type="submit" class="am-btn am-btn-primary" value="修改" /><%@include
									file="/WEB-INF/jsp/public/tooltip.jsp"%>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- content end -->
	</div>
	<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
	<script src="${pageContext.request.contextPath}/plugins/xheditor/xheditor-1.2.2.min.js"></script>
</body>
</html>
