<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri="/prev-tag" prefix="slp"%>
<!doctype html>
<html>
<head>
<%@include file="/WEB-INF/jsp/public/header.jspf"%>
</head>
<body>

	<%@include file="/WEB-INF/jsp/index/header.jsp"%>
	<%@include file="/WEB-INF/jsp/public/tools.jsp" %>

	<div class="am-cf admin-main">
		<!-- sidebar start -->
		<%@include file="/WEB-INF/jsp/index/menu.jsp"%>
		<!-- sidebar end -->

		<!-- content start -->
		<div class="admin-content">
		
    		<div class="am-cf am-padding">
				<div class="am-fl am-cf">
      				<small>位置</small>：<small>员工管理中心</small>/<small>请假记录</small>
      			</div>
			</div>
    		<form action="${pageContext.request.contextPath}/system/employee/leaveList" method="post" id="form1" class="am-form">
    		<div class="am-g">
    				<div class="am-u-lg-3"> 
					    <div class="am-input-group am-input-group-secondary am-form-group">
					      <span class="am-input-group-label">开始</span>
					      <input type="text" class="am-form-field" placeholder="请假时间/开始时间" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" name="startTime" value="${dateEntity.startTime}" />
					    </div>
					 </div>
					 <div class="am-u-lg-3">
					    <div class="am-input-group am-input-group-secondary am-form-group">
					      <span class="am-input-group-label">结束</span>
					      <input type="text" class="am-form-field" placeholder="请假时间/结束时间" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" name="endTime" value="${dateEntity.endTime}" />
					    </div>
					 </div>
					 <div class="am-u-lg-1">
					    <div class="am-input-group ">
					      <input class="am-btn am-btn-primary" type="submit" value="搜索"/>
					      <input type="hidden" id="currentPage" name="currentPage" value="1" />
					    </div>
					 </div>
			</div>
    		</form>
    		<form action="${pageContext.request.contextPath}/system/employee/leaveList" method="post" id="form2">
    			<input type="hidden" name="startTime" value="${dateEntity.startTime}" />
    			<input type="hidden" name="endTime" value="${dateEntity.endTime}" />
    			<input type="hidden" id="currentPage2" name="currentPage" value="1" />
    		</form>
			<div class="am-g">
				<div class="am-u-sm-12">
					<form class="am-form">
					<div class="am-scrollable-horizontal">
						<table class="am-table am-table-striped am-table-hover table-main am-text-nowrap">
							<thead>
								<tr>
									<th>序号</th>
									<th>员工姓名</th>
									<th>请假时间</th>
									<th>结束时间</th>
									<th>时长(小时)</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${list }" var="p" varStatus="status">
									<tr>
										<td>${status.index + (page.currentPage - 1)*page.pageSize + 1}</td>
										<td><a href="${pageContext.request.contextPath}/system/employee/personalInfo">${p.employeeName}</a></td>
										<td><fmt:formatDate value="${p.startTime}" pattern="yyyy-MM-dd"/></td>
										<td><fmt:formatDate value="${p.endTime}" pattern="yyyy-MM-dd"/></td>
										<td>${p.allHour}</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
						</div>
						<div class="am-cf">
							共 ${page.totalSize } 条记录&nbsp;&nbsp;<span class="tooltip"></span>
							<div class="am-fr">
								<ul class="am-pagination ">
									${pageString }
								</ul>
							</div>
						</div>
					</form>
				</div>

			</div>
			<br><br><br><br><br>
		</div>
		<!-- content end -->

	</div>
	
	<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
	<input type="hidden" value="${page.totalPage }" id="totalPage"/>
	<input type="hidden" value="${page.currentPage}" id="cp" />
	<script type="text/javascript">
		/**
		*跳转到首页
		*/
		function toStart(){
			//$('#currentPage2').val(1);
			if($('#cp').val() != 1){
				$('#form2').submit();
			}
		}
			
		/**
		*跳转到尾页
		*/
		function toEnd(){
			var totalPage = $('#totalPage').val();
			if($('#cp').val() != totalPage){
				$('#currentPage2').val(totalPage);
				$('#form2').submit();			
			}
		}
				
		$(document).ready(function(){
			/**
			* 查询表单提交
			*/
			$(document).ready(function(){
				$('.page_s').on('click',function(){
					var count = $(this).attr('lang');
					if($('#cp').val() != count){
						$('#currentPage2').val(count);
						if (count <= parseInt($('#totalPage').val()) && count >= 1){
							$('#form2').submit();
						}
					}
				});
			});
		
		});
	</script>
</body>
</html>