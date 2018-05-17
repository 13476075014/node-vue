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
		  <li class="am-active">修改密码</li>
		</ol>
			 <!-- <div class="am-cf am-padding">
		      <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">用户修改密码</strong></div>
		    </div> -->
   		 <!-- <hr/> -->
	    <div class="am-g">
	       <div class="am-u-lg-7 am-u-md-15 am-u-sm-centered">
	        <form class="am-form" action="${pageContext.request.contextPath}/system/user/pwdreset" method="post">
	          <div class="am-g am-margin-top">
					<div class="am-u-sm-2 am-text-right">原始密码</div>
					<div class="am-u-sm-8">
						<div class="am-form-group ">
							<div class="field">
								 <input type="password" data-validate="required:密码不能为空" placeholder="原始密码" id="oldPwd"   name="oldPwd">
							</div>
						</div>
					</div>
					<div class="am-u-sm-3"></div>
				</div>
				
				<div class="am-g am-margin-top">
					<div class="am-u-sm-2 am-text-right">新密码</div>
					<div class="am-u-sm-8">
						<div class="am-form-group ">
							<div class="field">
								 <input type="password" data-validate="required:新密码不能为空" placeholder="新密码" id="pwd_s"  name="password">
							</div>
						</div>
					</div>
					<div class="am-u-sm-3"></div>
				</div>
				
				<div class="am-g am-margin-top">
					<div class="am-u-sm-2 am-text-right">重复密码</div>
					<div class="am-u-sm-8">
						<div class="am-form-group ">
							<div class="field">
								 <input type="password" placeholder="重复密码" data-validate="required:新密码不能为空,repeat#password:两次密码不一致" id="rePwd">
							</div>
						</div>
					</div>
					<div class="am-u-sm-3"></div>
				</div>
	
	          <div class="am-form-group">
		          <div class="am-u-sm-9 am-u-sm-push-3">
			        <input type="submit" class="am-btn am-btn-primary" value="添加"/><%@include file="/WEB-INF/jsp/public/tooltip.jsp" %>
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
