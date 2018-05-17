<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib uri="/prev-tag" prefix="slp"%>
<!doctype html>
<html>
<head>
<%@include file="/WEB-INF/jsp/public/header.jspf"%>
</head>
<body>

	<%@include file="/WEB-INF/jsp/index/header.jsp"%>
	<%@include file="/WEB-INF/jsp/public/tools.jsp"%>

	<div class="am-cf admin-main">
		<!-- sidebar start -->
		<%@include file="/WEB-INF/jsp/index/menu.jsp"%>
		<!-- sidebar end -->

		<!-- content start -->
		<div class="admin-content">
			<ol class="am-breadcrumb">
			  <li>位置：系统管理中心</li>
			  <li class="am-active">系统公告查看</li>
			</ol>
         	
			<div class="am-g">
				<div class="am-u-sm-12">
					<button type="button" name="2" id="qb">全部</button>
					<button type="button" name="1" id="yd">已读</button>
					<button type="button" name="0" id="wd">未读</button>
					<form class="am-form">
						<table class="am-table am-table-striped am-table-hover table-main">
							<thead>
								<tr>
									<th>编号</th>
									<th>标题</th>
									<th>创建人</th>
									<th>创建时间</th>
									<th>阅读状态</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${list }" var="p">
									<tr>
										<td>${p.id}</td>
										<td><a href="javascript:void(0);" name="${p.id}" class="content-show">${p.title}</a></td>
										<td>${p.nickName}</td>
										<td><fmt:formatDate value="${p.createTime }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
										<td>
											<c:choose>
												<c:when test="${status == 2}">
													<c:if test="${p.readStatus == 1}">
														已读
													</c:if>
													<c:if test="${p.readStatus == 0}">
														未读
													</c:if>
												</c:when><c:otherwise>
													<c:if test="${status == 1}">
														已读
													</c:if>
													<c:if test="${status == 0}">
														未读
													</c:if>
												</c:otherwise>
											</c:choose>
											
										</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
						<div class="am-cf">
							共 ${requestScope.page.totalSize } 条记录&nbsp;&nbsp;<span class="tooltip"></span>
							<div class="am-fr">
								<ul class="am-pagination ">
									${requestScope.pageString }
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
	<form action=""></form>
	<input type="hidden" value="${requestScope.page.totalPage }" id="totalPage"/>
	<input type="hidden" id="status" value="${status}" />
	<script type="text/javascript">
		/**
		*跳转到首页
		*/
		function toStart(){
			var status = $('#status').val();
			window.location.href="${pageContext.request.contextPath}/system/notice/noReadList?currentPage=1" + "&status=" + status;
		}
			
		/**
		*跳转到尾页
		*/
		function toEnd(){
			var totalPage = $('#totalPage').val();
			var status = $('#status').val();
			window.location.href="${pageContext.request.contextPath}/system/notice/noReadList?currentPage="+totalPage + "&status=" + status;
		}
		
		$(function(){
			var status = "${status}";
			if(status == 2){
				$('#qb').attr("class", "am-btn am-btn-primary am-btn-sm");
				$('#yd').attr("class", "am-btn am-btn-default am-btn-sm");
				$('#wd').attr("class", "am-btn am-btn-default am-btn-sm");
			}
			if(status == 1){
				$('#qb').attr("class", "am-btn am-btn-default am-btn-sm");
				$('#yd').attr("class", "am-btn am-btn-primary am-btn-sm");
				$('#wd').attr("class", "am-btn am-btn-default am-btn-sm");
			}
			if(status == 0){
				$('#qb').attr("class", "am-btn am-btn-default am-btn-sm");
				$('#yd').attr("class", "am-btn am-btn-default am-btn-sm");
				$('#wd').attr("class", "am-btn am-btn-primary am-btn-sm");
			} 
			$('.am-btn-sm').on('click',function(){
				var status = $(this).attr("name");
				window.location.href="${pageContext.request.contextPath}/system/notice/noReadList?status="+status;
			});
	
		});
		
		$(document).ready(function(){
			$('.page_s').on('click',function(){
				var count = $(this).attr('lang');
				var status = $('#status').val();
				if (count <= parseInt($('#totalPage').val()) && count >= 1){
				window.location.href="${pageContext.request.contextPath}/system/notice/noReadList?currentPage="+count+"&status="+status;
			}
			});
			
	
			$('.content-show').click(function(){
				var id = $(this).attr('name');
				var title = $(this).html();
				$.ajax({    
			        type :'post',  
			        async : false,  
			        dataType : 'json',
			        data : {
						id : id
					},    
			        url: "${pageContext.request.contextPath}/system/notice/saveSysNoticeStatus",    
			        success : function(data) { 
			        	if(data.errorFlags){
			        		//alert($("#"+id+"hidden").html());
			        		$('#title').html(title);
							$('#content').html(data.noticeContent);
							$('#my-message-show').modal({
								closeViaDimmer:false
							});
						}
			        }, 
			        error : function(data) {
						}
    		});	
			});
			
			$('#close').click(function(){
				var status = $('#status').val();
				window.location.href="${pageContext.request.contextPath}/system/notice/noReadList?status="+status;
			});
	
		});
	</script>
</body>
</html>