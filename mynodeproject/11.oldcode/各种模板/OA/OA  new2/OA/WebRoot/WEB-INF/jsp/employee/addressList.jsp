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
      				<small>位置</small>：<small>员工管理中心</small>/<small>企业通讯录</small>
      			</div>
			</div>
    		<form action="${pageContext.request.contextPath}/system/employee/addressList" method="post" id="form1" class="am-form">
    		<div class="am-g">
    				<div class="am-u-lg-2">
					    <div class="am-input-group am-input-group-secondary am-form-group">
					      <a href="${pageContext.request.contextPath}/system/employee/exportAddressExcel"><span class="am-input-group-label">导出excel</span></a>
					    </div>
					 </div>
    				<div class="am-u-lg-3">
					    <div class="am-input-group am-input-group-secondary am-form-group">
					      <span class="am-input-group-label">姓名</span>
					      <input type="text" name="name" placeholder="员工姓名" value="${employeeInfoBean.name}" class="am-form-field"/>
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
    		<form action="${pageContext.request.contextPath}/system/employee/addressList" method="post" id="form2">
    			<input type="hidden" name="name" value="${employeeInfoBean.name}" />
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
									<th>手机号码</th>
									<th>邮箱</th>
									<th>qq号</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${list }" var="p" varStatus="status">
									<tr>
										<td>${status.index + (page.currentPage - 1)*page.pageSize + 1}</td>
										<td>${p.name}</td>
										<td>${p.mobileNumber}</td>
										<td>${p.email}</td>
										<td>${p.qqNumber}</td>
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
		
		function findBabyDetail(id){
			window.location.href = "${pageContext.request.contextPath}/system/customer/findBabyDetail?id=" + id;
		}
		
		/**
		*启用或停用账户
		*/
		function startOrStop(id){
			var status = $("#"+id).attr("name");
			$.ajax({    
		        type :'post',  
		        async : false,  
		        dataType : 'json',
		        data : {
					id : id,
					status : status
				},    
		        url: "${pageContext.request.contextPath}/system/customer/startOrStop",    
		        success : function(data) { 
		        	if(data.errorFlags){
		        		$("#update-success-alert").modal();
		        		$("#status1"+id).html(data.statusMes1);
		        		$("#status2"+id).html(data.statusMes2);
		        		$("#"+id).attr("name", data.status);
			        	/* var count = "${page.currentPage}";
						$('#currentPage').val(count);
						if (count <= parseInt($('#totalPage').val()) && count >= 1){
							$('#form1').submit();
						} */
					}else{
						$("#update-fail-alert").modal();
					}
		        }, 
		        error : function(data) {
		        		$("#update-fail-alert").modal();
					}
    		});  			
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