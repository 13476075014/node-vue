<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib uri="/prev-tag" prefix="slp"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
    <div class="am-offcanvas-bar admin-offcanvas-bar">
      <ul class="am-list admin-sidebar-list">
      <!-- 智能看护宝后台首页  -->
	    <li><a class="am-cf" href="javascript:void(0)"><span class="am-icon-home am-icon-fw"></span> 首页<span class="am-icon-angle-right am-fr am-margin-right"></span></a></li>
	    
	    <!-- 人事管理中心 -->
	    <slp:privilege module="HrManager" oprator="all">
        <li>
        	<c:choose>
			<c:when test="${requestScope.module == 'HrManager' }">
			<a id="HrManager" name="hr" class="am-cf" data-am-collapse="{target: '#collapse-hr'}"><span class="am-icon-archive am-icon-fw"></span> 人事管理中心 <span id="hr" class="am-icon-angle-down am-fr am-margin-right"></span></a>
			</c:when>
			<c:otherwise>
				<a id="HrManager" name="hr" class="am-cf" data-am-collapse="{target: '#collapse-hr'}"><span class="am-icon-archive am-icon-fw"></span> 人事管理中心 <span id="hr" class="am-icon-angle-right am-fr am-margin-right"></span></a>
			</c:otherwise>          
          	</c:choose>
        
          <c:choose>
			<c:when test="${requestScope.module == 'HrManager' }"><ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-hr"></c:when><c:otherwise>
				<ul class="am-list am-collapse admin-sidebar-sub" id="collapse-hr">
			</c:otherwise>          
          </c:choose>
          	<slp:privilege module="statistics" oprator="all">
	          <li><a href="${pageContext.request.contextPath}/system/hr/statistics"  class="am-cf menuBtn"> 图表统计</a></li>
	        </slp:privilege>
	        <slp:privilege module="employeeInfoList" oprator="all">
	          <li><a href="${pageContext.request.contextPath}/system/hr/employeeInfoList"  class="am-cf menuBtn"> 员工信息管理</a></li>
	         </slp:privilege>
          </ul>
        </li>
        </slp:privilege>
	    
	    <!-- 员工管理中心 -->
        <li>
        	<c:choose>
			<c:when test="${requestScope.module == 'EmployeeManager' }">
			<a id="EmployeeManager" name="employee" class="am-cf" data-am-collapse="{target: '#collapse-employee'}"><span class="am-icon-users am-icon-fw"></span> 员工管理中心 <span id="employee" class="am-icon-angle-down am-fr am-margin-right"></span></a>
			</c:when>
			<c:otherwise>
				<a id="EmployeeManager" name="employee" class="am-cf" data-am-collapse="{target: '#collapse-employee'}"><span class="am-icon-users am-icon-fw"></span> 员工管理中心 <span id="employee" class="am-icon-angle-right am-fr am-margin-right"></span></a>
			</c:otherwise>          
          	</c:choose>
        
          <c:choose>
			<c:when test="${requestScope.module == 'EmployeeManager' }"><ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-employee"></c:when><c:otherwise>
				<ul class="am-list am-collapse admin-sidebar-sub" id="collapse-employee">
			</c:otherwise>          
          </c:choose>
	          <li><a href="${pageContext.request.contextPath}/system/employee/personalInfo"  class="am-cf menuBtn"> 个人资料</a></li>
	          <li><a href="${pageContext.request.contextPath}/system/employee/personal"> 账户信息</a></li>
	          <li><a href="${pageContext.request.contextPath}/system/employee/upwdInt"> 修改密码</a></li>
	          <li><a href="${pageContext.request.contextPath}/system/employee/salaryList"  class="am-cf menuBtn"> 工资记录</a></li>
	          <li><a href="${pageContext.request.contextPath}/system/employee/leaveList"  class="am-cf menuBtn"> 请假记录</a></li>
	          <li><a href="${pageContext.request.contextPath}/system/employee/addressList"  class="am-cf menuBtn"> 企业通讯录</a></li>
          </ul>
        </li>
        
        <!-- 系统管理中心 -->
        <slp:privilege module="SysManager" oprator="all">
        <li>
        	<c:choose>
			<c:when test="${requestScope.module == 'SysManager' }">
			<a id="SysManager" name="sys" class="am-cf" data-am-collapse="{target: '#collapse-sys'}"><span class="am-icon-gear am-icon-fw"></span> 系统管理中心 <span id="sys" class="am-icon-angle-down am-fr am-margin-right"></span></a>
			</c:when>
			<c:otherwise>
				<a id="SysManager" name="sys" class="am-cf" data-am-collapse="{target: '#collapse-sys'}"><span class="am-icon-gear am-icon-fw"></span> 系统管理中心 <span id="sys" class="am-icon-angle-right am-fr am-margin-right"></span></a>
			</c:otherwise>          
          	</c:choose>
        
          <c:choose>
			<c:when test="${requestScope.module == 'SysManager' }"><ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-sys"></c:when><c:otherwise>
				<ul class="am-list am-collapse admin-sidebar-sub" id="collapse-sys">
			</c:otherwise>          
          </c:choose>
          	  <slp:privilege module="noticeManager" oprator="all">
	          <li><a href="${pageContext.request.contextPath}/system/notice/list"  class="am-cf menuBtn"> 系统公告管理</a></li>
	          </slp:privilege>
	          <li><a href="${pageContext.request.contextPath}/system/notice/noReadList"  class="am-cf menuBtn"> 系统公告查看</a></li>
          </ul>
        </li>
        </slp:privilege>
        
        <!-- 系统用户管理中心  -->
        
      <slp:privilege module="UserSysManager" oprator="all">
        <li class="admin-parent">
        	<c:choose>
			<c:when test="${requestScope.module == 'UserSysManager' }">
			<a id="UserSysManager" name="user" class="am-cf" data-am-collapse="{target: '#collapse-nav'}"><span class="am-icon-user am-icon-fw"></span> 用户中心 <span id="user" class="am-icon-angle-down am-fr am-margin-right"></span></a>
			</c:when>
			<c:otherwise>
				<a id="UserSysManager" name="user" class="am-cf" data-am-collapse="{target: '#collapse-nav'}"><span class="am-icon-user am-icon-fw"></span> 用户中心 <span id="user" class="am-icon-angle-right am-fr am-margin-right"></span></a>
			</c:otherwise>          
          	</c:choose>
        
          <c:choose>
			<c:when test="${requestScope.module == 'UserSysManager' }"> <ul class="am-list am-collapse admin-sidebar-sub am-in" id="collapse-nav"></c:when><c:otherwise>
				 <ul class="am-list am-collapse admin-sidebar-sub" id="collapse-nav">
			</c:otherwise>          
          </c:choose>
            <slp:privilege module="roleManager" oprator="find">
	          <li><a href="${pageContext.request.contextPath}/system/user/role_list"> 用户角色管理</a></li>
	          </slp:privilege>
	          <slp:privilege module="userManager" oprator="find">
	          <li><a  href="${pageContext.request.contextPath}/system/user/user_list"> 系统用户管理</a></li>
	          </slp:privilege>
	          <slp:privilege module="departMentManager" oprator="find">
	          <li><a href="${pageContext.request.contextPath}/system/user/dp_list"> 系统部门管理</a></li>
	          </slp:privilege>
          </ul>
        </li>
        </slp:privilege>
      </ul>

      <div class="am-panel am-panel-default admin-sidebar-panel">
        <div class="am-panel-bd">
          <p><span class="am-icon-bookmark"></span> 公告</p>
          <a href="${pageContext.request.contextPath}/system/notice/noReadList"><p class="notice-latest"></p></a>
        </div>
      </div>

    <script type="text/javascript">
    	$(function(){
    		$.post('${pageContext.request.contextPath}/system/notice/latest',function(data){
    			$('.notice-latest').html(data.title);
    		});
    	});
    	
    	$(document).ready(function(){    		
    		$("#HrManager").click(function(){
    			var name = $(this).attr('name');
    			if($("#collapse-hr").css("display") == "none"){
    				$("#"+name).attr("class", "am-icon-angle-down am-fr am-margin-right");
    			}else{
    				$("#"+name).attr("class", "am-icon-angle-right am-fr am-margin-right");
    			}
    		});
    		
    		$("#EmployeeManager").click(function(){
    			var name = $(this).attr('name');
    			if($("#collapse-employee").css("display") == "none"){
    				$("#"+name).attr("class", "am-icon-angle-down am-fr am-margin-right");
    			}else{
    				$("#"+name).attr("class", "am-icon-angle-right am-fr am-margin-right");
    			}
    		});
    		
    		$("#SysManager").click(function(){
    			var name = $(this).attr('name');
    			if($("#collapse-sys").css("display") == "none"){
    				$("#"+name).attr("class", "am-icon-angle-down am-fr am-margin-right");
    			}else{
    				$("#"+name).attr("class", "am-icon-angle-right am-fr am-margin-right");
    			}
    		});
    		
    		$("#UserSysManager").click(function(){
    			var name = $(this).attr('name');
    			if($("#collapse-nav").css("display") == "none"){
    				$("#"+name).attr("class", "am-icon-angle-down am-fr am-margin-right");
    			}else{
    				$("#"+name).attr("class", "am-icon-angle-right am-fr am-margin-right");
    			}
    		});
    	});
    	
    </script>
    </div>
  </div>