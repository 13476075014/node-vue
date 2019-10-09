<div class="plan_ico am-animation-scale-down"><i class="am-icon-user-plus am-icon-btn"></i></div>
<ol class="am-breadcrumb am-animation-slide-top">
  <li><a id="index" class="am-icon-home">平台</a></li>
  <li>员工管理</li>
</ol>

<div id="plan_left" class="am-animation-slide-left">
	<ul>
    	<li>员工管理</li>
    	<li id="department">部门管理</li>
        <li id="position">职位管理</li>
        <li id="powers">权限管理</li>
        <li class="plan-divider"></li>
        <li id="sys_users_add">添加新员工</li>
    </ul>
    
  
</div>
<div id="plan_right">

</div>

<script>
planwidth=$('#plan').width();
$('#plan_right').css('width',planwidth-160+'px');

$('#sys_users_add').click(function(){
	sys_users_loadingshow()
	htmlobj=$.ajax({url:"mod/users/users_add.php?"+Date.parse(new Date()),async:false});
	$("#plan_right").html(htmlobj.responseText);
});

$('#department').click(function(){
	sys_users_loadingshow()
	htmlobj=$.ajax({url:"mod/users/department.php?"+Date.parse(new Date()),async:false});
	$("#plan_right").html(htmlobj.responseText);
});
$('#position').click(function(){
	sys_users_loadingshow()
	htmlobj=$.ajax({url:"mod/users/position.php?"+Date.parse(new Date()),async:false});
	$("#plan_right").html(htmlobj.responseText);
});
$('#powers').click(function(){
	sys_users_loadingshow()
	htmlobj=$.ajax({url:"mod/users/powers.php?"+Date.parse(new Date()),async:false});
	$("#plan_right").html(htmlobj.responseText);
});
function sys_users_loadingshow(){
	$("#plan_right").html('读取中...');
}

$.AMUI.progress.done();
</script>