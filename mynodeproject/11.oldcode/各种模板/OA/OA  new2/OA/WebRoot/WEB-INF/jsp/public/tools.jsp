<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	function amazeAlertSuccess(message){
		$("#wz").html(message);
		zg();
		$(".am-alert-success").fadeIn(200).delay(600).fadeOut(200);
	}
		
	function amazeAlertFail(message){
		$("#wz2").html(message);
		$(".am-alert-danger").fadeIn(200).delay(600).fadeOut(200);
	}
	function amazeConfirm(wz){
		$("#confirmMes").html(wz);
	}
	function zg(){
	 //**********************添加遮罩层-开始*********************************//
            var coverObj = $("<div id='cover-msgTipsDiv'></div>");
            coverObj.css({
                "display": "none",
                'z-index': 9998,
                "position": "fixed",
                "top": 0,
                "left": 0,
                "bottom": 0,
                "width": "100%",
                "height": "100%",
                "background-color": "#000000",
                "-moz-opacity": 0.3, /*for ff*/
                "opacity": 0.3, /*for ff3.5+ css3.0标准的*/
                "filter": "alpha(opacity = 30)" /*z-index:900;*/
            });
            coverObj.appendTo($(top.window.document.body));
            $("#cover-msgTipsDiv", $(top.window.document.body)).show();
            //**********************添加遮罩层-结束*********************************//
	}
</script>
<input type="hidden" id="cls_pth"
	value="${pageContext.request.contextPath}">
<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1"
	id="my-modal-loading">
	<div class="am-modal-dialog">
		<div class="am-modal-hd">正在载入...</div>
		<div class="am-modal-bd">
			<span class="am-icon-spinner am-icon-spin"></span>
		</div>
	</div>
</div>
<div class="am-modal am-modal-alert" tabindex="-1" id="my-alert">
	<div class="am-modal-dialog">
		<div class="am-modal-hd">警告</div>
		<div class="am-modal-bd">请至少选中一条数据！</div>
		<div class="am-modal-footer">
			<span class="am-modal-btn">确定</span>
		</div>
	</div>
</div>
<div class="am-modal am-modal-alert" tabindex="-1"
	id="update-success-alert">
	<div class="am-modal-dialog">
		<div class="am-modal-hd">提示</div>
		<div class="am-modal-bd">修改成功！</div>
		<div class="am-modal-footer">
			<span class="am-modal-btn">确定</span>
		</div>
	</div>
</div>
<div class="am-modal am-modal-alert" tabindex="-1"
	id="update-fail-alert">
	<div class="am-modal-dialog">
		<div class="am-modal-hd">提示</div>
		<div class="am-modal-bd">修改失败！</div>
		<div class="am-modal-footer">
			<span class="am-modal-btn">确定</span>
		</div>
	</div>
</div>

<div class="am-modal am-modal-confirm" tabindex="-1" id="amaze-confirm">
	<div class="am-modal-dialog">
		<div class="am-modal-hd">提示</div>
		<div class="am-modal-bd" id="confirmMes"></div>
		<div class="am-modal-footer">
			<span class="am-modal-btn" data-am-modal-confirm>确定</span> <span
				class="am-modal-btn" data-am-modal-cancel>取消</span>
		</div>
	</div>
</div>

<div class="am-alert am-alert-success" style = "width: 50%;margin-left: 25%;top: 6px;position: absolute;display: none;" data-am-alert>
  <p style="text-align: center;" id = "wz"></p>
</div>

<div class="am-alert am-alert-danger" style = "width: 50%;margin-left: 25%;top: 6px;position: absolute;display: none;" data-am-alert>
  <p style="text-align: center;" id = "wz2"></p>
</div>

<div class="am-popup"  id="my-message-show">
	<div class="am-popup-inner">
		<div class="am-popup-hd">
			<h4 class="am-popup-title my-message-show-title-class" id="title"></h4>
			<a href="javascript: void(0)" class="am-close" id="close"
				data-am-modal-close>&times;</a>
		</div>
		<div class="am-popup-bd my-message-show-class" id="content"></div>
	</div>
</div>