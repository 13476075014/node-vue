<?php require("../../include/conn.php");?>
<?php

if ($_POST['cid']!=''){
		$sql = "update ".$DB_tableprefix."_powers set powers='".$_POST['powers']."' where id='".$_POST['cid']."'";
		$result = $con->query($sql); 
		echo 'Y';
		exit;
	}

if ($_POST['delid']!=''){
	//验证改权限下是否有员工
		$sql = "delete from ".$DB_tableprefix."_powers where id='".$_POST['delid']."'";
		$result = $con->query($sql); 
		echo 'Y';
		exit;
}

if ($_GET['id']!=''){
	$sql = "select * from ".$DB_tableprefix."_powers where id='".$_GET['id']."'";
	$result = $con->query($sql); 
	$row = mysqli_fetch_assoc($result);
	$department_id=$row['department_id'];
	$position_id=$row['position_id'];
	$powers=','.$row['powers'].',';
}else{
	exit;
}

?>
<script>$.AMUI.progress.start();</script>
<div class="am-animation-fade">

    <h3>修改权限</h3>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-dotted" />
    <div id="add-department-div" >
            <div class="am-input-group">
              <span class="am-input-group-label wos-border-right-0">部门：</span>
              <input type="text" class="am-form-field" value="<?php echo find_department_name($department_id)?>" disabled>         
                
              
              <span class="am-input-group-label wos-border-right-0">职位：</span>
              <input type="text" class="am-form-field" value="<?php echo find_position_name($position_id)?>" disabled>   
         </div>
         <style>
		 	#modlist{margin-top:30px}
			#modlist h3{width:100%;background-color:#F3F3F3; border:1px solid #cccccc; cursor:pointer}
			#modlist li{padding:5px; cursor:pointer}
			#modlist li:hover{background-color:#f7f7f7;}
			#modlist label{font-weight:100;}
		 </style>
         <div id="modlist">
         <?php
			$sql = "select * from ".$DB_tableprefix."_mod order by id asc";
			$result = $con->query($sql); 
			while($row = $result->fetch_array()){ 
		 ?>
         		<h3 onClick="bufen('<?php echo $row['id']?>')"><i class="<?php echo $row['ico']?> am-icon-btn"></i> <span title="<?php echo $row['info']?>"><?php echo $row['name']?></span></h3>

                <ul class="am-avg-sm-6">
                <?php
				
					$sql = "select * from ".$DB_tableprefix."_mod_fun where mod_id='".$row['id']."' order by id asc";
					$result2 = $con->query($sql); 
					while($row2 = $result2->fetch_array()){ 
					$selected='';
					if (strpos($powers,','.$row2['id'].',',0)>0){
						$selected='checked="checked"';	
					}
				 ?>
                    <li title="<?php echo $row2['info']?>" >
                    <input name="powers" type="checkbox" class="xz221 bufen<?php echo $row['id']?>" id="xuanze<?php echo $row2['id']?>"  value="<?php echo $row2['id']?>" <?php echo $selected?>>
                    <label for="xuanze<?php echo $row2['id']?>"><?php echo $row2['name']?></label>
                    </li>
                 <?php
					}
					?>
                </ul>
         <?php
         	}
		 ?>
         
         <div class="wos-text-right">
        <button type="button" class="am-btn am-btn-default" onClick="del()">删除该【部门-职位】</button>
        <button type="button" class="am-btn am-btn-secondary" onClick="save_power()">保存</button> 
        </div>
         </div>
    </div>
</div>
<script>
function save_power(){
	$.post(
      '/mod/users/powers_modify.php?'+Date.parse(new Date()),
      {
        cid:<?php echo $_GET['id']?>,
		powers:chk
      },
      function (data)
      {
		if (data=='Y'){
			sys_alert('成功：已经保存了权限.');
			sys_users_loadingshow()
			htmlobj=$.ajax({url:"mod/users/powers.php?"+Date.parse(new Date()),async:false});
			$("#plan_right").html(htmlobj.responseText);
		}else{
			sys_alert(data);
		}
	  });
}
function chk(){    
  var chk_value =[];    
  $('input[name="powers"]:checked').each(function(){    
   chk_value.push($(this).val());    
  });
  if (chk_value.length!=0){
	return chk_value;
  }else{
	return 0  
  }
}  

function bufen(id){
	if ($('.bufen'+id).is(':checked')==true){
		$('.bufen'+id).prop("checked",false);
	}else{
		$('.bufen'+id).prop("checked",true);
	}
}
function del(){
	$.post(
      '/mod/users/powers_modify.php?'+Date.parse(new Date()),
      {
        delid:<?php echo $_GET['id']?>,
      },
      function (data)
      {
		if (data=='Y'){
			sys_alert('成功：删除了权限.');
			sys_users_loadingshow()
			htmlobj=$.ajax({url:"mod/users/powers.php?"+Date.parse(new Date()),async:false});
			$("#plan_right").html(htmlobj.responseText);
		}else{
			sys_alert(data);
		}
	  });
}
$.AMUI.progress.done();
</script>