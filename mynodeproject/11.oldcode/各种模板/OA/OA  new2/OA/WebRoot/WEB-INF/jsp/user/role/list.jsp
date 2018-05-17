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


	<div class="am-cf admin-main">
		<!-- sidebar start -->
		<%@include file="/WEB-INF/jsp/index/menu.jsp"%>
		<!-- sidebar end -->

		<!-- content start -->
		<div class="admin-content">

			<div class="am-cf am-padding">
				<div class="am-fl am-cf">
      				<small>位置</small>：<small>用户中心</small>/<small>用户角色管理</small>
      			</div>
			</div>

			<div class="am-g">
				<div class="am-u-md-6 am-cf">
					<div class="am-fl am-cf">
						<div class="am-btn-toolbar am-fl">
							<div class="am-btn-group am-btn-group-xs">
							<slp:privilege module="roleManager" oprator="add">
								<a class="am-btn am-btn-default"
									href="${pageContext.request.contextPath}/system/user/role_add_init"><span
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
									<th>角色名称</th>
									<th>角色描述</th>
									<th>角色部门</th>
									<th class="table-set">操作</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${list }" var="p">
									<tr>
										<td>${p.id}</td>
										<td>${p.roleName}</td>
										<td>${p.description}</td>
										<td>${p.department.dpName}</td>
										<td>
											<div class="am-btn-toolbar">
												<div class="am-btn-group am-btn-group-xs">
													<slp:privilege module="roleManager" oprator="privilege">
														<a href="${pageContext.request.contextPath}/system/user/role_prev?id=${p.id}&currentPage=${requestScope.page.currentPage}"
															class="am-btn am-btn-default am-btn-xs am-text-secondary">
															<span class="am-icon-copy"></span> 功能授权
														</a>
													</slp:privilege>
													<slp:privilege module="roleManager" oprator="privilegeData">
														<a href="${pageContext.request.contextPath}/system/user/role_dataprev?id=${p.id}&currentPage=${requestScope.page.currentPage}"
															class="am-btn am-btn-default am-btn-xs am-text-secondary">
															<span class="am-icon-copy"></span> 数据授权
														</a>
													</slp:privilege>
													<slp:privilege module="roleManager" oprator="update">
														<a href="${pageContext.request.contextPath}/system/user/role_edit_init?id=${p.id}" class="am-btn am-btn-default am-btn-xs">
															<span class="am-icon-pencil-square-o"></span> 修改
														</a>
													</slp:privilege>
													<slp:privilege module="roleManager" oprator="delete">
														<a href="javascript:if(confirm('您确定要删除?')){window.location='${pageContext.request.contextPath}/system/user/role_del?id=${p.id}&currentPage=${requestScope.page.currentPage}'}"
															class="am-btn am-btn-default am-btn-xs am-text-danger">
															<span class="am-icon-trash-o"></span> 删除
														</a>
													</slp:privilege>
												</div>
											</div></td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
						<div class="am-cf">
							共 ${requestScope.page.totalSize } 条记录
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
		$(document).ready(function(){
			$('.page_s').on('click',function(){
				var count = $(this).attr('lang');
				if (count <= parseInt($('#totalPage').val()) && count >= 1){
				window.location="${pageContext.request.contextPath}/system/user/role_list?currentPage="+count;
			}
			});
		});
	</script>
</body>
</html>