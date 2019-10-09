<?php
//基础函数
$copyright_name='include/conn.php配置'; //授权公司

//系统函数
$ver='0.1'; //系统版本
$ver_name='开发版';
$ver_Duetime='2099-12-31';
$sys_name='呵呵OA'; //系统名称
$sys_site='http://192.168.1.10/'; //系统运行域名

$DB_server = "localhost"; //数据库地址
$DB_user = "root"; //访问用户名
$DB_password = "root"; //访问密码 
$DB_database="xindaioa"; //数据库名称
$DB_tableprefix="wos";


$uploadfiles='upload';
$uploadfiles_face='/upload/face/';

$con = new mysqli($DB_server, $DB_user,$DB_password,$DB_database); 
mysqli_query($con,'SET NAMES utf8');
if (mysqli_connect_errno()){ 
	die('<body bgcolor="#000000" style="text-align:center; padding-top:200px; font-weight:blod">
		 <p><font color="#c21d1d" size=7>Sorry. DB link error...</font></p>
	     <br/><p><font color="#badd16" size=3>Please end quick contact me. 
		');
    exit();
}

date_default_timezone_set('Asia/Shanghai') ;

//通用函数
//根据ID查询职位名称
function find_position_name($id){
	global $con,$DB_tableprefix;
	$sql = "select * from ".$DB_tableprefix."_position where id='".$id."'";
	$result = $con->query($sql); 
	$row = mysqli_fetch_assoc($result);
	return $row['name'];
}
//根据ID查询名称
function find_department_name($id){
	global $con,$DB_tableprefix;
	$sql = "select * from ".$DB_tableprefix."_department where id='".$id."'";
	$result = $con->query($sql); 
	$row = mysqli_fetch_assoc($result);
	return $row['name'];
}
?>