<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html>
<head>
 <%@include file="/WEB-INF/jsp/public/header.jspf" %>
   <script src="${pageContext.request.contextPath}/plugins/role_prev.js"></script>
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
			  <li>位置：<a href="${pageContext.request.contextPath}/system/user/role_list">角色管理</a></li>
			  <li class="am-active">角色授权(${requestScope.role.roleName })</li>
			</ol>
		<form class="am-form am-form-horizontal" action="${pageContext.request.contextPath}/system/user/role_prev_sbmt" method="post">
			<input type="hidden" value="${requestScope.prev }" class="fileds"/>
			<input type="hidden" value="${requestScope.size }" name="currentPage"/>
			<input type="hidden" value="${requestScope.role.id }" name="id"/>
	    <table class="am-table">
		    <tbody>
		    	<c:forEach items="${requestScope.prevs }" var="p" varStatus="status">
		        <tr>
		            <td width="15%" style="vertical-align: middle;"><small>
		            <input type="checkbox" 
		             lang="pre_${status.index }" name="prevId" value="${p.id }"/> ${p.prevName }</small></td>
		            <td>
					<table class="am-table">
						<tbody>
							<c:forEach items="${p.prevs }" var="ps" varStatus="stat">
						    <tr>
						        <td style="vertical-align: middle;"><small class="am-text-primary "> 
						        <input type="checkbox" 
						         lang="pre_${status.index }_${stat.index }" 
						         class="pre_${status.index }" name="prevId" value="${ps.id }"/> ${ps.prevName }</small></td>
						        <td>
									<c:forEach items="${ps.prevs }" var="psx" varStatus="stats">
								        <small><input type="checkbox" 
								         name="prevId" value="${psx.id }" 
								        lang="pre_${status.index }_${stat.index }_${stats.index }"
								        class="pre_${status.index } pre_${status.index }_${stat.index }"/> ${psx.prevName }
								         </small>&nbsp;&nbsp;&nbsp;&nbsp;
								        </c:forEach>
								</td>
						        </tr>
						        </c:forEach>
						    </tbody>
						</table>
					</td>
		        </tr>
		        </c:forEach>
		    </tbody>
		</table>
		<hr/>
			 <div class="am-form-group">
			    <div class="am-u-sm-10 am-u-sm-offset-2">
			      <input type="submit" class="am-btn am-btn-primary" value="授权" /><%@include
					file="/WEB-INF/jsp/public/tooltip.jsp"%>
			    </div>
		  	</div>
		<div class="am-margin am-cf">
			
	    </div>
	    </form>
		</div>
		<!-- content end -->
</div>
<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
</body>
</html>