<?php include ("../../include/conn.php");?>
<script language="javascript" src="/assets/js/amazeui.min.js"></script>
<script>$.AMUI.progress.start();</script>
<style>
#sys_settings_mod_ul{
	width:100%;
	overflow:hidden;
}
#sys_settings_mod_ul li{
	float:left;
	margin:10px;
	width:150px;
	height:196px;
	padding-top:70px;
	text-align:center;
	background-image:url(../images/mod-li-bg.jpg);
	background-repeat:no-repeat;
	cursor:pointer;
}

#sys_settings_mod_ul li:hover{
	background-image:url(../images/mod-li-bg2.jpg);
} 
</style>

<B class="am-text-primary"><?php echo $ver_name?> </B> Ver:<?php echo $ver?>

<div id="sys_settings_mod_ul">
<ul>

<li onClick="window.open('http://fun.ttxxpp.com')" style="background-image:url(../../images/mod-li-bg3.jpg)"></li>

<?php
$path='../../mod/';
$dir = opendir($path);
while (($file = readdir($dir)) !== false)
	{
		if ($file!='.' && $file!='..'){
				require_once($path.$file.'/i.php');
				echo '<li data-am-popover="{theme: \'secondary sm\',content: \''.$mod_info.'\', trigger: \'hover focus\'}"><i class="'.$mod_face.'  am-icon-lg" title="'.$mod_info.'"></i><br><p>'.$mod_title.'</p></li>';
		}

	}

?>


</ul>

</div>

<p align="right">
授权截止日期:<?php echo $ver_Duetime?> 
<a href="http://www.ttxxpp.com" target="_blank">续费中心</a>
</p>


<script>
$.AMUI.progress.done();
</script>