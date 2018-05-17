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
			  <li>位置：<a href="${pageContext.request.contextPath}/system/user/dp_list">部门</a></li>
			  <li class="am-active">部门修改</li>
			</ol>
    <div class="am-g">

       <div class="am-u-lg-5 am-u-md-15 ">
        <form class="am-form am-form-horizontal" action="${pageContext.request.contextPath}/system/user/dp_edit" method="post" submit-method="ajax">
          <div class="am-g am-margin-top">
				<div class="am-u-sm-2 am-text-right">部门名称</div>
				<div class="am-u-sm-8">
					<div class="am-form-group ">
						<div class="field">
							<input type="text" value="${requestScope.dp.dpName }" data-validate="required:名称不能为空" id="user-name"  name="fn">
               				<input type="text" id="dp_id"  name="fid" data-validate="required:不能为空" value="${requestScope.dp.id }" style="display: none;" />
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
</body>
</html>
