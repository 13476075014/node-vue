<?php require("include/conn.php");?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $copyright_name?>-<?php echo $sys_name?></title>
</head>

<Link rel="Shortcut Icon" href="<?php echo $sys_site?>images/favicon.ico" \>
<?php
//用Dreamweaver引用时候加速用
echo'
<link href="'.$sys_site.'assets/css/amazeui.min.css" rel="stylesheet">
<link href="'.$sys_site.'css/main.css" rel="stylesheet">
<script language="javascript" src="'.$sys_site.'assets/js/jquery.min.js"></script>
<script language="javascript" src="'.$sys_site.'assets/js/amazeui.min.js"></script>
';
?>
<body>
<script>$.AMUI.progress.start();</script>

<div id="main">

<?php
if ($_COOKIE['uid']==''){ //测试阶段使用==，如已经配置数据库请使用!=
	echo file_get_contents($sys_site.'system/main.php');
}else{
	echo file_get_contents($sys_site.'system/login.php');
}
?>
</div>

<div class="am-modal am-modal-alert" tabindex="-1" id="sys-alert">
  <div class="am-modal-dialog">
    <div class="am-modal-hd" align="left"><img src="images/alert.png" /></div>
    <div class="am-modal-bd" id="sys-alert-info">
    </div>
    <div class="am-modal-footer">
      <span class="am-modal-btn">确定</span>
    </div>
  </div>
</div>

<div id="digbg"><i class="am-close am-close-alt am-close-spin am-icon-times wos-fr" id="digclose"></i></div>
<div id="digcontent" class="box-shadow digbg_zi"></div>
<div id="digcontent_img" class="box-shadow digbg_zi"></div>

<div id="btm">
	Authorization to <?php echo $copyright_name?> The closing date for <?php echo $ver_Duetime?>. v<?php echo $ver?>
</div>



<script language="javascript">
	var pageheight=$(window).height();
	var pagewidth=$(window).width();
	var pagepadding=pagewidth*0.02
	$('body').css('padding',pagepadding+'px'); 
	$(window).resize(function() {
	 	location.reload();
	});
	
	//dig关闭按钮
	$('#digclose').click(function(){
		$("#digbg").hide();
		$(".digbg_zi").hide();
	});
	$('#digbg').click(function(){
		$("#digbg").hide();
		$(".digbg_zi").hide();
	});
	function sys_dig(){
		$("#digbg").fadeIn(100);
	}
	
	
	//调用文件dig
	function sys_dig_files(path){
		$("#digcontent").html('读取中...');
		htmlobj=$.ajax({url:"mod/files/dig.php?path="+path+'&'+Date.parse(new Date()),async:false});
		$("#digcontent").html(htmlobj.responseText);
		$("#digbg").fadeIn(100);
		$("#digcontent").show();
	}
	//sys_upload_img('/face/',0)
	 //path 上传地址
	 //是否有水印 0没有 1 有
	function sys_upload_img(path,watermark){
		$("#digcontent_img").html('读取中...');
		htmlobj=$.ajax({url:"mod/files/upload_img.php?path="+path+'&watermark='+watermark+'&'+Date.parse(new Date()),async:false});
		$("#digcontent_img").html(htmlobj.responseText);
		
		divheight=$("#digcontent_img").height();
		$("#digcontent_img").width(divheight);
		divwidth=$("#digcontent_img").width();
		temp_left=(pagewidth-divwidth)/2;
		$("#digcontent_img").css('left',temp_left+'px');
		$("#digbg").fadeIn(100);
		$("#digcontent_img").show();
	}
	//调用alert
	function sys_alert(info){
		$('#sys-alert-info').html(info);
		$('#sys-alert').modal('toggle');
	}
	//根据文本框长度自动增长文本框
	function textwidth(obj){
		var idname=obj.id;
		inputtext=$('#'+idname).val();
		inputtextnum=parseInt(inputtext.length)*22;
		$('#'+idname).css('width',inputtextnum+'px');
	}
	//调用文件管理函数dig窗口
	$.AMUI.progress.done();
</script>

</body>
</html>