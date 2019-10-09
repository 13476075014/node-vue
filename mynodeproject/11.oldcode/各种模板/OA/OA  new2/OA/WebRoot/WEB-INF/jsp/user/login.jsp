<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri="/prev-tag" prefix="slp"%>
<!doctype html>
<html>
<head>
<%@include file="/WEB-INF/jsp/public/header.jspf"%>
 <style type="text/css">
    .header {
      text-align: center;
    }
    .header h1 {
      font-size: 200%;
      color: #333;
      margin-top: 30px;
    }
    .header p {
      font-size: 14px;
    }
  </style>
</head>
<body>
<div class="header">
  <div class="am-g">
    <h1>OA办公系统</h1>
    <p>welcome access system<br/>欢迎访问系统</p>
  </div>
  <hr />
</div>
<div class="am-g">
  <div class="am-u-lg-4 am-u-md-8 am-u-sm-centered">
    <form method="post" class="am-form" action="${pageContext.request.contextPath}/system/user/login">
    
    <div class="am-form-group ">
	      <div class="field am-input-group am-input-group-primary">
	      	<input type="text" name="em" id="em" value="" placeholder="账号/邮箱" data-validate="required:账号不能为空">
	      	<span class="am-input-group-label"><i class="am-icon-user am-icon-fw"></i></span>
	      </div>
      </div>
      
      <div class="am-form-group ">
	      <div class="field am-input-group am-input-group-primary">
	      	<input type="password" name="pd" id="pd" value="" placeholder="登陆密码" data-validate="required:密码不能为空">
	      	<span class="am-input-group-label"><i class="am-icon-lock am-icon-fw"></i></span>
	      </div>
      </div>
      
      <div class="am-form-group">
	      <div class="field am-input-group am-input-group-primary">
	      	<input type="text" name="cod" id="cod" value="" placeholder="验证码" data-validate="required:验证码不能为空">
	      	<span class="am-input-group-btn"><img id="captchaImage"  class="captchaImage" src="${pageContext.request.contextPath}/system/user/check_code" /></span>
	      </div>
      </div>
      <br />
      <div class="am-cf">
        <input type="submit"  value="登 录" class="am-btn am-btn-primary am-btn-sm am-fl" ><%@include file="/WEB-INF/jsp/public/tooltip.jsp" %>
        <a href="${pageContext.request.contextPath}/system/pwd/findPwd01" class="am-fr">忘记密码 ^_^?</a>
      </div>
    </form>
    <hr>
    <p align="center">© 2014 AllMobilize, Inc. Licensed under MIT license.</p>
  </div>
</div>
</body>
<script type="text/javascript">
	$(function(){
		$('.captchaImage').click(function() {
		$(this).attr("src",
			"${pageContext.request.contextPath}/system/user/check_code?t="
					+ new Date());
		});
	});
</script>
</html>