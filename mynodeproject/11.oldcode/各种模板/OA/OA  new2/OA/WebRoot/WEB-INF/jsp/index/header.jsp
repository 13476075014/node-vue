<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<header class="am-topbar admin-header">
  <div class="am-topbar-brand">
    <strong>OA办公</strong> <small>后台管理系统</small>
  </div>

  <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

  <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

    <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list">
    <li><a href="${pageContext.request.contextPath}/system/notice/noReadList?status=0" id="tz"><span class="am-icon-envelope-o"></span> 未读公告 <span class="am-badge am-badge-warning" id="noticeCount"></span></a></li>
      <li class="am-dropdown" data-am-dropdown>
        <a class="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">
          <span class="am-icon-users"></span> ${sessionScope.system_user.nickName } <span class="am-icon-caret-down"></span>
        </a>
        <ul class="am-dropdown-content">
          <li><a href="${pageContext.request.contextPath}/system/user/personal"><span class="am-icon-user"></span> 账户信息</a></li>
          <li><a href="${pageContext.request.contextPath}/system/user/loginOut"><span class="am-icon-power-off"></span> 退出</a></li>
          <li><a href="${pageContext.request.contextPath}/system/user/upwdInt"><span class="am-icon-lock"></span> 修改密码 </a></li>
        </ul>
      </li>
    </ul>
  </div>
  <script type="text/javascript">
  	$(function(){
  		$.ajax({    
		        type :'post',  
		        async : false,  
		        dataType : 'json',
		        url: "${pageContext.request.contextPath}/system/notice/noReadNoticeCount",    
		        success : function(data) { 
		        	if(data.noticeCount == null || data.noticeCount == 0){
		        		$('#noticeCount').css("display","none");
		        		//$('#tz').attr("href", "#");
		        	}else{
			        	$('#noticeCount').html(data.noticeCount);
		        	}
		        }, 
		        error : function(data) {
		        		
					}
    		});
    		
    		 
  	});
  </script>
</header>