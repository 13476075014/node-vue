<?php require("../../include/conn.php");?>
<?php
	if ($_POST['delid']!=''){
		
		$sql = "select * from ".$DB_tableprefix."_position where pid='".$_POST['delid']."'";
		$result = $con->query($sql); 
		$numcount=mysqli_num_rows($result);
		if ($numcount>0){
			echo '错误：该职位还有下属职位，职位不能被删除。';
			exit;
		}
		//验证改职位下是否有员工
		$sql = "delete from ".$DB_tableprefix."_position where id='".$_POST['delid']."'";
		$result = $con->query($sql); 
		echo 'Y';
		exit;
	}
	if ($_POST['cid']!=''){
		$sql = "update ".$DB_tableprefix."_position set name='".$_POST['cname']."' where id='".$_POST['cid']."'";
		$result = $con->query($sql); 
		echo 'Y';
		exit;
	}
	if ($_POST['name']!=''){
		$sql = "select * from ".$DB_tableprefix."_position where pid='".$_POST['pid']."' and name='".$_POST['name']."'";
		$result = $con->query($sql); 
		$numcount=mysqli_num_rows($result);
		if ($numcount>0){
			echo '错误：同级职位名称重复!';
		}else{
			$sql = "insert into ".$DB_tableprefix."_position (pid,name) value ('".$_POST['pid']."','".$_POST['name']."')";
			$result = $con->query($sql); 
			echo 'Y';
		}
		exit;
	}
?>
<script>$.AMUI.progress.start();</script>


<button type="button" class="am-btn am-btn-success plan_btn am-animation-fade" id="position_addbtn">添加新职位</button>

<div class="am-animation-fade">
    <h3>职位管理</h3>
    
    <hr data-am-widget="divider" style="" class="am-divider am-divider-dotted" />
    
    
    <div id="add-position-div" class="dn">
            <div class="am-input-group">
              <span class="am-input-group-label wos-border-right-0">所属职位：</span>
              <select class="am-form-field wos-border-right-0" id="pid">
                <option value="0">顶级职位</option>
                
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
               <span class="am-input-group-label wos-border-right-0">职位名称：</span>
               <input type="text" class="am-form-field" placeholder="职位名称，20位中文" maxlength="20" id="name" onkeypress="if(event.keyCode==13){$('#position_addspan').click()}">
               <span class="am-input-group-label wos-btn-danger hand" id="position_addspan">添加</span> 
               <span class="am-input-group-label wos-btn-default hand" id="position_addspan" onClick="$('#add-position-div').hide(500);$('#position_addbtn').show(500)">取消</span> 
            </div>
    </div>
<style>
#position_show ul{
	padding-left:30px;
	margin:10px 0;	
}
#position_show li{
	border-left:1px #e3e3e3 solid;
}
#position_show li span{
	margin-right:10px;
	color:#e3e3e3
}
#position_show li input{
	padding:2px 5px
}
.input_b0{
	border:0px;
}
.input_b1{
	border:1px solid #D9D9D9
}
</style>
	<div id="position_show">
    <?php
    show_position(0);
	function show_position($pid){
		global $con,$DB_tableprefix;
		$sql = "select * from ".$DB_tableprefix."_position where pid='".$pid."'";
		$result = $con->query($sql);
		$numcount=mysqli_num_rows($result);
		if ($numcount>0){
			echo "<ul>";
			while($row = $result->fetch_array()){ 
	?>
    			<li><span>—</span>
					<input type="text" class="input_values input_b0" onkeypress="if(event.keyCode==13){c_position('<?php echo $row['id']?>')}" value="<?php echo $row['name']?>" id="t<?php echo $row['id']?>" onFocus="textwidth(this)" onKeyUp="textwidth(this)" maxlength="20" onClick="show_de_from('<?php echo $row['id']?>')" >
                    <button class="am-btn am-btn-primary am-btn-xs dn" id="g<?php echo $row['id']?>" onClick="c_position('<?php echo $row['id']?>')">改</button>
                    <button class="am-btn am-btn-warning am-btn-xs dn" id="d<?php echo $row['id']?>" onClick="del_position('<?php echo $row['id']?>')">删</button>
                    <button class="am-btn am-btn-default am-btn-xs dn" id="c<?php echo $row['id']?>" onClick="hide_de_from('<?php echo $row['id']?>')">取消</button>
				</li>
    <?php
				show_position($row['id']);
			}
			echo "</ul>";
		}
	}
	?>
	</div>
</div>

<script>
function show_de_from(id){
	$('#t'+id).removeClass('input_b0');
	$('#t'+id).addClass('input_b1');
	$('#g'+id).fadeIn();
	$('#d'+id).fadeIn();
	$('#c'+id).fadeIn();
}
function hide_de_from(id){
	$('#t'+id).removeClass('input_b1');
	$('#t'+id).addClass('input_b0');
	$('#g'+id).hide();
	$('#d'+id).hide();
	$('#c'+id).hide();
}


function c_position(id){
	cdename=$('#t'+id).val();
	$.post(
      '/mod/users/position.php?'+Date.parse(new Date()),
      {
        cid:id,
		cname:$('#t'+id).val()
      },
      function (data)
      {
		if (data=='Y'){
			hide_de_from(id);
			sys_alert('<strong>成功</strong>：更改职位名称“'+cdename+'”');
			sys_users_loadingshow()
			htmlobj=$.ajax({url:"mod/users/position.php?"+Date.parse(new Date()),async:false});
			$("#plan_right").html(htmlobj.responseText);
		}else{
			sys_alert(data);
		}
	  });
}
function del_position(id){
	$.post(
      '/mod/users/position.php?'+Date.parse(new Date()),
      {
        delid:id
      },
      function (data)
      {
		if (data=='Y'){
			sys_users_loadingshow()
			htmlobj=$.ajax({url:"mod/users/position.php?"+Date.parse(new Date()),async:false});
			$("#plan_right").html(htmlobj.responseText);
		}else{
			sys_alert(data)
		}
	  });
}


$('#position_addbtn').click(function(){
	$('#position_addbtn').hide(500);
	$('#add-position-div').show(500)
});
$('#position_addspan').click(function(){
tempname=$('#name').val();
	if (tempname.length>0){
		$.post(
		  '/mod/users/position.php?'+Date.parse(new Date()),
		  {
			pid:$("#pid").val(),
			name:$('#name').val()
		  },
		  function (data)
		  {
			if (data=='Y'){
				sys_users_loadingshow()
				htmlobj=$.ajax({url:"mod/users/position.php?"+Date.parse(new Date()),async:false});
				$("#plan_right").html(htmlobj.responseText);
			}else{
				sys_alert(data)
			}
		  }
		);  
	}
	
});
$.AMUI.progress.done();
</script>