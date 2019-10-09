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
<%@include file="/WEB-INF/jsp/public/tools.jsp" %>
<div class="am-cf admin-main">
  <!-- sidebar start -->
	<%@include file="/WEB-INF/jsp/index/menu.jsp" %>
  <!-- sidebar end -->

  <!-- content start -->
		<div class="admin-content">
			<ol class="am-breadcrumb">
			  <li>位置：<a href="${pageContext.request.contextPath}/system/user/role_list">角色管理</a></li>
			  <li class="am-active">角色修改</li>
			</ol>
    <div class="am-g">
    	<div class="am-u-lg-5 am-u-md-15 ">
        <form class="am-form am-form-horizontal" action="${pageContext.request.contextPath}/system/user/role_edit" method="post" submit-method="ajax">
          <div class="am-g am-margin-top">
				<div class="am-u-sm-2 am-text-right">角色名称</div>
				<div class="am-u-sm-8">
					<div class="am-form-group ">
						<div class="field">
							<input type="text" value="${ro.roleName }" data-validate="required:不能为空" id="role-name" placeholder="角色名称" name="name">
               				<input type="text" id="role_ID"  name="id" data-validate="required:不能为空" value="${ro.id }" style="display: none;" />
						</div>
					</div>
				</div>
				<div class="am-u-sm-3"></div>
			</div>
			<div class="am-g am-margin-top">
				<div class="am-u-sm-2 am-text-right">角色描述</div>
				<div class="am-u-sm-8">
					<div class="am-form-group ">
						<div class="field">
							<input type="text" value="${ro.description }" data-validate="required:不能为空" id="role-description" placeholder="角色描述 " name="des">
						</div>
					</div>
				</div>
				<div class="am-u-sm-3"></div>
			</div>
			
			<c:if test="${sessionScope.super_key != null }">
		  	<div class="am-g am-margin-top">
				<div class="am-u-sm-2 am-text-right">部门</div>
				<div class="am-u-sm-8">
					<div class="am-form-group ">
						<div class="field">
							<select name="dpId" data-validate="required:不能为空" id="dp">
				              	<option value="">--选择部门--</option>
				              	<c:forEach items="${requestScope.dpList}" var="p">
				              		<c:choose>
				              			<c:when test="${p.id == ro.departmentId}">
				              				<option value="${p.id }" selected="selected">${p.dpName }</option>
				              			</c:when><c:otherwise>
				              				<option value="${p.id }">${p.dpName }</option>
				              			</c:otherwise>
				              		</c:choose>
				              	</c:forEach>
				              </select>
						</div>
					</div>
				</div>
				<div class="am-u-sm-3"></div>
			</div>
		  </c:if>
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
</body>
</html>
