<?php require("../../include/conn.php");?>
<?php

if ($_POST['powers']!='0' && $_POST['department_id']!='' && $_POST['position_id']!=''){
		$sql = "select * from ".$DB_tableprefix."_powers where department_id='".$_POST['department_id']."' and position_id='".$_POST['position_id']."'";
		$result = $con->query($sql); 
		$numcount=mysqli_num_rows($result);
		if ($numcount>0){
			echo '错误：该【部门-职位】权限已经设定。';
		}else{
			$sql = "insert into ".$DB_tableprefix."_powers (department_id,position_id,powers) value ('".$_POST['department_id']."','".$_POST['position_id']."','".$_POST['powers']."')";
			$result = $con->query($sql); 
			echo 'Y';
		}
		exit;
}

if ($_POST['powers']=='0'){
	echo '错误：必须获得一个操作权限，才可以设定权限。';
	exit;
}

?>
<script>$.AMUI.progress.start();</script>
<div class="am-animation-fade">
    <h3>编辑新的权限</h3>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-dotted" />
    <div id="add-department-div" >
            <div class="am-input-group">
              <span class="am-input-group-label wos-border-right-0">部门：</span>
              <select class="am-form-field wos-border-right-0" id="department_id">               
                <?php
				show_department_select(0,0);
				function show_department_select($pid,$cf){
					global $con,$DB_tableprefix;
					$sql = "select * from ".$DB_tableprefix."_department where pid='".$pid."'";
					$result = $con->query($sql);
					$numcount=mysqli_num_rows($result);
					if ($numcount>0){
							for ($i=0 ; $i<$cf; $i++){
								$tempvar=$tempvar.'—';
							}
						while($row = $result->fetch_array()){ 
							echo '<option value="'.$row['id'].'">'.$tempvar.$row['name'].'</option>';
							show_department_select($row['id'],$cf+1);
						}
					}
				}
				?>
              </select>
              <span class="am-input-group-label wos-border-right-0">职位：</span>
              <select class="am-form-field" id="position_id">
                <?php

				show_position_select(0,0);
				function show_position_select($pid,$cf){
					global $con,$DB_tableprefix;
					$sql = "select * from ".$DB_tableprefix."_position where pid='".$pid."'";
					$result = $con->query($sql);
					$numcount=mysqli_num_rows($result);
					if ($numcount>0){
							for ($i=0 ; $i<$cf; $i++){
								$tempvar=$tempvar.'—';
							}
						while($row = $result->fetch_array()){ 
							echo '<option value="'.$row['id'].'">'.$tempvar.$row['name'].'</option>';
							show_position_select($row['id'],$cf+1);
						}
					}
				}
				?>
              </select>
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
				 ?>
                    <li title="<?php echo $row2['info']?>">
                    <input type="checkbox" value="<?php echo $row2['id']?>" name="powers" id="xuanze<?php echo $row2['id']?>" class="xz221 bufen<?php echo $row['id']?>">
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
        <button type="button" class="am-btn am-btn-default" onClick="pageclear()">重置</button>
        <button type="button" class="am-btn am-btn-secondary" onClick="add_power()">保存</button> 
        </div>
         </div>
    </div>
</div>
<script>
function add_power(){
	$.post(
      '/mod/users/powers_add.php?'+Date.parse(new Date()),
      {
        department_id:$('#department_id').val(),
		position_id:$('#position_id').val(),
		powers:chk
      },
      function (data)
      {
		if (data=='Y'){
			sys_alert('成功：添加了新的【部门-职位】权限.');
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
function pageclear(){
	 $("input").attr("checked",false);
}
$.AMUI.progress.done();
</script>