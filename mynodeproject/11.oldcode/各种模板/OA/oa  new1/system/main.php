<?php require("../include/conn.php");?>


<div id="nav" class="am-animation-slide-left">
  <div id="nav-logo"><img src="images/ico.png"/></div>
  <div id="navul">
	<ul>
		<?php
		
		$sql = "select * from wos_mod order by id asc";
		$result = $con->query($sql); 
			while($row = $result->fetch_array()){ 
				
				echo '<li onClick="callpage(\''.$row['enname'].'\')">
								<i class="'.$row['ico'].' am-icon-btn"></i>
								<div>'.$row['name'].'</div>
							  </li>';
			}

        
        ?>
    </ul>
   </div>
   
</div>

<div class="am-g" id="topmenu">

    <div id="search" class="am-u-lg-4 am-animation-slide-top">
      <input type="text" id="keywords" placeholder="业务查找" >
      <i class="wos-icon-search-plus"></i>
    </div>


    <div id="userinfo" class="am-u-lg-6 am-animation-slide-top">
        <ul>
            <li id="face"><img src="upload/face/wos.jpg"/></li>
            <li id="nickname">
                <div id="nickname_username">姜威</div>
                <div id="nickname_role">高级管理员</div>
            </li>
            <li class="lishow lishow_line">
                <i class="am-icon-user-secret am-icon-md"></i>
            </li>
            <li class="lishow lishow_line">
                <i class="am-icon-bell-o am-icon-md"></i>
            </li>
            <li class="lishow">
                <i class="am-icon-cogs am-icon-md"></i>
            </li>
        </ul>
    </div>

    <div id="loginout" class="am-animation-slide-right am-u-lg-2">
    LOGOUT
    </div>
</div>

<div id="plan" class="am-animation-slide-right">
    <div id="plancontent">
    <button
      type="button"
      class="am-btn am-btn-primary"
       onClick="sys_dig_files('')">
      Alert
    </button>
    </div>
</div>

<script language="javascript">
var pageheight=$(window).height();
var pagewidth=$(window).width();
var pagepadding=pagewidth*0.02
$('body').css('padding',pagepadding+'px'); 

$('#nav').css('height',pageheight-pagepadding*2+'px');
$('#nav').css('width',pagewidth*0.08+'px');
$('#nav').css('margin-right',pagepadding+'px');
$('#navul').css('width',pagewidth*0.08+20+'px');

$('#search').css('margin-right',pagepadding/2+'px');
$('#search').css('width',pagewidth*0.3+'px');

$('#userinfo').css('width',pagewidth*0.42+'px');
$('#userinfo').css('margin-right',pagepadding/2+'px');
$('#loginout').css('width',pagewidth*0.12+'px');

$('#plan').css('width',pagewidth*0.86+'px');
if (window.screen.height==768){
	$('#plan').css('height',pageheight-52-pagepadding*4+'px');
}else{
	$('#plan').css('height',pageheight-40-pagepadding*4+'px');
}
$('#plancontent').css('height',$('#plan').height()+'px');
$('#plan').css('margin-top',pagepadding+'px');

function callpage(filename){
	loadingshow()
	htmlobj=$.ajax({url:"mod/"+filename+"/index.php?"+Date.parse(new Date()),async:false});
	$("#plancontent").html(htmlobj.responseText);
}

function loadingshow(){
	$("#plancontent").html('读取中...');
}
</script>
