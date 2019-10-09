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
	<%@include file="/WEB-INF/jsp/public/tools.jsp"%>

	<div class="am-cf admin-main">
		<!-- sidebar start -->
		<%@include file="/WEB-INF/jsp/index/menu.jsp"%>
		<!-- sidebar end -->

		<!-- content start -->
		<div class="admin-content">
			
			<div class="am-cf am-padding">
				<div class="am-fl am-cf">
      				<small>位置</small>：<small>系统管理中心</small>/<small>系统公告管理</small>
      			</div>
			</div>

			<div class="am-g">
				<div class="am-u-md-6 am-cf">
					<div class="am-fl am-cf">
						<div class="am-btn-toolbar am-fl">
							<div class="am-btn-group am-btn-group-xs">
							<slp:privilege module="noticeManager" oprator="add">
								<a class="am-btn am-btn-default"
									href="${pageContext.request.contextPath}/system/notice/add"><span
									class="am-icon-plus"></span> 新增</a>
									</slp:privilege>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="am-g">
				<div class="am-u-sm-12">
					<form class="am-form">
						<table class="am-table am-table-striped am-table-hover table-main">
							<thead>
								<tr>
									<th>编号</th>
									<th>标题</th>
									<th>发布人</th>
									<th>发布时间</th>
									<th>公告状态</th>
									<th class="table-set">操作</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${list }" var="p">
									<tr>
										<td>${p.id}</td>
										<td><a href="javascript:void(0);" class="content-show" id="${p.id}" name="${p.userId}">${p.title}</a><span style="display:none;">${p.noticeContent}</span> </td>
										<td>${p.nickName}</td>
										<td><fmt:formatDate value="${p.createTime }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
										<td class="status">${p.statusStr}</td>
										<td>
											<div class="am-dropdown" data-am-dropdown>
								                <button class="am-btn am-btn-default am-btn-xs am-dropdown-toggle" data-am-dropdown-toggle><span class="am-icon-cog"></span> <span class="am-icon-caret-down"></span></button>
								
								                <ul class="am-dropdown-content">
								                <slp:privilege module="noticeManager" oprator="publish">
								                  <li><a href="javascript:void(0);" lang="${p.id }" class="publish">发布</a></li></slp:privilege>
								                  <slp:privilege module="noticeManager" oprator="update">
								                  <li><a href="${pageContext.request.contextPath}/system/notice/updateInit?id=${p.id}">修改</a></li></slp:privilege>
								                  
								                  <slp:privilege module="noticeManager" oprator="delete">
								                  <li><a href="${pageContext.request.contextPath}/system/notice/delete?id=${p.id}&currentPage=${requestScope.page.currentPage }">删除</a></li></slp:privilege>
								                </ul>
								              </div></td>
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
	<input type="hidden" value="${requestScope.page.totalPage }" id="totalPage"/>
	<script type="text/javascript">
		/**
		*跳转到首页
		*/
		function toStart(){
			window.location.href="${pageContext.request.contextPath}/system/notice/list?currentPage=1";
		}
			
		/**
		*跳转到尾页
		*/
		function toEnd(){
			var totalPage = $('#totalPage').val();
			window.location.href="${pageContext.request.contextPath}/system/notice/list?currentPage="+totalPage;
		}
		$(document).ready(function(){
			$('.page_s').on('click',function(){
				var count = $(this).attr('lang');
				if (count <= parseInt($('#totalPage').val()) && count >= 1){
				window.location.href="${pageContext.request.contextPath}/system/notice/list?currentPage="+count;
			}
			});
			/**
			 * 用户启用或者暂停
			 */
			$(".publish").click(function() {
				var params = $(this).attr("lang");
				var obj = $(this);
				$.ajax({
					type : "post",
					dataType : "json",
					data : {
						id : params
					},
					url : "${pageContext.request.contextPath}/system/notice/publish",
					success : function(data) {
						if (data.errorFlags) {
							obj.parent().parent().parent().parent().parent().children('.status').html("已发布");
						}
						$('.tooltip').html(data.message);
						$('.tooltip').fadeIn("fast",function(){
						  			$(this).fadeOut(3000);
						  		});
					},
					error : function() {
						$('.tooltip').html('发布出错了，请稍后再试');
							$('.tooltip').fadeIn("fast",function(){
						  			$(this).fadeOut(3000);
						  		});
					}
				});
		});
	
		$('.content-show').click(function(){
			var userId = "${sessionScope.system_user.id}";
			var userId2 = $(this).attr("name");
			var id = $(this).attr("id");
			if(userId != userId2){
				$.ajax({
					type : "post",
					dataType : "json",
					data : {
						id : id
					},
					url : "${pageContext.request.contextPath}/system/notice/checkNoticeStatus"
				});	
			}
			$('.my-message-show-class').html($(this).next().html());
			$('.my-message-show-title-class').html($(this).html());
			$('#my-message-show').modal();
		});
	
		});
	</script>
</body>
</html>