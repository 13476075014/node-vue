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
					<small>位置</small>：<small>人事管理中心</small>
					/<small>
					<a href="${pageContext.request.contextPath}/system/hr/employeeInfoList">员工信息管理</a>
					</small>/<small>员工信息添加或修改</small>
				</div>
			</div>
			<div style="width: 60%;margin: 0 auto;">
				<form
					action="${pageContext.request.contextPath}/system/hr/addEmployeeInfoCommit"
					class="am-form" data-am-validator>
					<fieldset>
						<!-- <legend>JS 表单验证</legend> -->
						<div class="am-form-group">
							<label for="name">员工姓名：</label> <input type="text" id="name" value="${info.name }"
								name="name" minlength="2" placeholder="输入用户名（至少 3 个字符）" required />
						</div>
						<div id="nameMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="email">邮箱：</label> <input type="email" id="email" value="${info.email }"
								name="email" placeholder="输入邮箱" required />
						</div>
						<div id="emailMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="qqNumber">qq号：</label> <input type="text" value="${info.qqNumber }"
								id="qqNumber" name="qqNumber" placeholder="输入qq号" required />
						</div>
						<div id="qqNumberMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="mobileNumber">电话号码：</label> <input type="text" value="${info.mobileNumber }"
								id="mobileNumber" name="mobileNumber" placeholder="输入电话号码"
								required />
						</div>
						<div id="mobileNumberMessage"
							style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="idCard">身份证号：</label> <input type="text" id="idCard" value="${info.idCard }"
								name="idCard" placeholder="输入身份证号" required />
						</div>
						<div id="idCardMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="age">年龄：</label> <input type="number" name="age" value="${info.age }"
								id="age" placeholder="输入年龄  18-70" min="18" max="70" required />
						</div>
						<div id="ageMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="gender">下拉单选框</label> <select id="gender"
								name="gender" required>
								<option value="0" <c:if test="${info.gender == 0}">selected=selected</c:if>>男</option>
								<option value="1" <c:if test="${info.gender == 1}">selected=selected</c:if>>女</option>
							</select>
						</div>
						<div id="genderMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="entryTime">入职时间：</label> <input type="text"
								id="entryTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
								name="entryTime" value="<fmt:formatDate value="${info.entryTime }" pattern="yyyy-MM-dd"/>" required />
						</div>
						<div id="entryTimeMessage" style="color: red;margin-bottom: 12px;"></div>

						<div class="am-form-group">
							<label for="baseSalary">基本工资：</label> <input type="number"
								id="baseSalary" name="baseSalary" value="${info.baseSalary }" placeholder="输入基本工资" required />
						</div>
						<div id="baseSalaryMessage"
							style="color: red;margin-bottom: 12px;"></div>

						<!-- 输入值为其它字符时会自动发送空值向后台 -->
						<div class="am-form-group">
							<label for="performance">绩效工资：</label> <input type="number"
								id="performance" name="performance" value="${info.performance }" placeholder="输入绩效工资"
								required />
						</div>
						<div id="performanceMessage"
							style="color: red;margin-bottom: 12px;"></div>

						<!-- 输入值为其它字符时会自动发送空值向后台 -->
						<div class="am-form-group">
							<label for="positionSalary">岗位工资：</label> <input type="number" value="${info.positionSalary }"
								id="positionSalary" name="positionSalary" placeholder="输入岗位工资"
								required />
						</div>
						<div id="positionSalaryMessage"
							style="color: red;margin-bottom: 12px;"></div>
						<input type="hidden" name="accountId" value="${info.accountId}" />
						<button class="am-btn am-btn-secondary" type="button" id="submit">提交</button>
					</fieldset>
				</form>
			</div>
		</div>
		<!-- content end -->
		<form action="${pageContext.request.contextPath}/system/hr/employeeInfoList" id="sx" method="post">
			<input type="hidden" name="name" value="${employeeInfo.name}" />
			<input type="hidden" name="gender" value="${employeeInfo.gender}" />
			<input type="hidden" name="currentPage" value="${pageQueryUtil.currentPage}" />
		</form>
	</div>
	<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
	<script type="text/javascript">
		$(function() {
			$("#submit")
					.click(
							function() {
								var id = "${info.id}";
								var name = $("#name").val();
								var email = $("#email").val();
								var qqNumber = $("#qqNumber").val();
								var mobileNumber = $("#mobileNumber").val();
								var idCard = $("#idCard").val();
								var age = $("#age").val();
								var gender = $("#gender").val();
								var entryTime = $("#entryTime").val();
								var baseSalary = $("#baseSalary").val();
								var performance = $("#performance").val();
								var positionSalary = $("#positionSalary").val();
								var accountId = "${info.accountId}";
								$
										.ajax({
											type : 'post',
											async : false,
											dataType : 'json',
											data : {
												id : id,
												name : name,
												email : email,
												qqNumber : qqNumber,
												mobileNumber : mobileNumber,
												idCard : idCard,
												age : age,
												gender : gender,
												entryTimeStr : entryTime,
												baseSalary : baseSalary,
												performance : performance,
												positionSalary : positionSalary,
												accountId : accountId
											},
											url : "${pageContext.request.contextPath}/system/hr/addEmployeeInfoCommit",
											success : function(data) {
												if (data.errorFlags) {
													$("#nameMessage").html("");
													$("#emailMessage").html("");
													$("#qqNumberMessage").html("");
													$("#mobileNumberMessage").html("");
													$("#idCardMessage").html("");
													$("#ageMessage").html("");
													$("#genderMessage").html("");
													$("#entryTimeMessage").html("");
													$("#baseSalaryMessage").html("");
													$("#performanceMessage").html("");
													$("#positionSalaryMessage").html("");
													$("#nameMessage").html(
															data.nameMessage);
													$("#emailMessage").html(
															data.emailMessage);
													$("#qqNumberMessage")
															.html(
																	data.qqNumberMessage);
													$("#mobileNumberMessage")
															.html(
																	data.mobileNumberMessage);
													$("#idCardMessage").html(
															data.idCardMessage);
													$("#ageMessage").html(
															data.ageMessage);
													$("#genderMessage").html(
															data.genderMessage);
													$("#entryTimeMessage")
															.html(
																	data.entryTimeMessage);
													$("#baseSalaryMessage")
															.html(
																	data.baseSalaryMessage);
													$("#performanceMessage")
															.html(
																	data.performanceMessage);
													$("#positionSalaryMessage")
															.html(
																	data.positionSalaryMessage);
												} else {
													amazeAlertSuccess(data.message);
													window
															.setTimeout(
																	function() {
																		if(id != null && id != ""){
																			$("#sx").submit();
																		} else {
																			window.location.href = "${pageContext.request.contextPath}/system/hr/employeeInfoList";
																		}
																		
																	}, 1000);
												}
											},
											error : function(data) {
												$("#update-fail-alert").modal();
											}
										});
							});
		});
	</script>
</body>
</html>