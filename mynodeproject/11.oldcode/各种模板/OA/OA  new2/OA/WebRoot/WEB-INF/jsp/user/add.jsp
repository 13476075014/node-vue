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
			  <li>位置：<a href="${pageContext.request.contextPath}/system/user/user_list">用户管理</a></li>
			  <li class="am-active">用户添加</li>
			</ol>
			<form
				action="${pageContext.request.contextPath}/system/user/user_add"
				method="post" class="am-form formFrame">
				<input type="hidden" value="${pid}" name="pid" />
				<div class="am-tabs am-margin" data-am-tabs>
					<ul class="am-tabs-nav am-nav am-nav-tabs">
						<li class="am-active"><a href="#tab2">基本信息</a></li>
						<c:if test="${sessionScope.super_key != null }">
							<li><a href="#tab1">选择部门</a></li>
						</c:if>
					</ul>

					<div class="am-tabs-bd">
						<c:if test="${sessionScope.super_key != null }">
							<div class="am-tab-panel am-fade" id="tab1">
								<div class="am-g am-margin-top">
									<div class="am-u-sm-2 am-text-right">所属部门</div>
									<div class="am-u-sm-7">
										<div class="am-form-group ">
											<div class="field">
													<select name="dpId" data-validate="required:部门不能为空">
														<option value="">--选择部门--</option>
														<c:forEach items="${requestScope.dpList}" var="p">
															<option value="${p.id }">${p.dpName }</option>
														</c:forEach>
													</select>
											</div>
										</div>
									</div>
									<div class="am-u-sm-3"></div>
								</div>
							</div>
						</c:if>
						<div class="am-tab-panel am-fade am-in am-active" id="tab2">
							<div class="am-g am-margin-top">
								<div class="am-u-sm-2 am-text-right">用户账号</div>
								<div class="am-u-sm-7">
									<div class="am-form-group ">
										<div class="field">
											<!-- <input type="text" name="name"
												data-validate="required:用户账号不能为空,email:请输入邮箱" placeholder="用户账号"> -->
												<input type="text" name="name"
												data-validate="required:用户账号不能为空" placeholder="用户账号">
										</div>
									</div>
								</div>
								<div class="am-u-sm-3">*</div>
							</div>

							<div class="am-g am-margin-top">
								<div class="am-u-sm-2 am-text-right">用户昵称</div>
								<div class="am-u-sm-7">
									<div class="am-form-group ">
										<div class="field">
											<input type="text" name="nickName" data-validate="required:用户昵称不能为空" placeholder="用户昵称">
										</div>
									</div>
								</div>
								<div class="am-u-sm-3">*</div>
							</div>

							<div class="am-g am-margin-top">
								<div class="am-u-sm-2 am-text-right">用户密码</div>
								<div class="am-u-sm-7">
									<div class="am-form-group ">
										<div class="field">
											<input type="password" id="pwd_s" name="pd" data-validate="required:密码不能为空" placeholder="用户密码">
										</div>
									</div>
								</div>
								<div class="am-u-sm-3">*</div>
							</div>

							<div class="am-g am-margin-top">
								<div class="am-u-sm-2 am-text-right">重复密码</div>
								<div class="am-u-sm-7">
									<div class="am-form-group ">
										<div class="field">
											<input type="password"  data-validate="required:密码不能为空,repeat#pd:两次密码输入不一致" placeholder="重复密码">
										</div>
									</div>
								</div>
								<div class="am-u-sm-3">*</div>
							</div>
						</div>
					</div>
				</div>

				<div class="am-margin">
					<input type="submit" class="am-btn am-btn-primary" value="添加"/><%@include file="/WEB-INF/jsp/public/tooltip.jsp" %>
				</div>
			</form>
		</div>
		<!-- content end -->
	</div>
	<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
</body>
</html>
