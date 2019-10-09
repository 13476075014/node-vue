<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>
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

<div class="am-animation-shake">晃荡吧</div>
<button type="button" class="am-btn am-btn-primary btn-loading-example" data-am-loading="{spinner: 'circle-o-notch', loadingText: '加载中...', resetText: '加载过了'}">按钮 - button 元素</button>
<div id="showtime"></div>
<script>
$('.btn-loading-example').click(function () {
	var timesecond=15;
	$('#showtime').html(timesecond)
    var tim=setInterval("showtimes()",1000);
  var $btn = $(this)
  $btn.button('loading');
    setTimeout(function(){
      $btn.button('reset');
	  clearInterval(tim);
	  $('#showtime').html('时间到了')
  }, 15000);
  	
});
function showtimes(){
	var timesecond=$('#showtime').html();
	$('#showtime').html(timesecond-1)
	$().ADDC
}
</script>
</body>
</html>