<script>$.AMUI.progress.start();</script>
<?php require("../../include/conn.php");?>
<button type="button" class="am-btn am-btn-success plan_btn am-animation-fade" id="powers_addbtn">编辑新权限</button>
<div class="am-animation-fade">
    <h3>权限管理</h3>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-dotted" />
<style>
#department_show{
	margin-bottom:100px
}
#department_show ul{
	padding-left:30px;
	margin:10px 0;
}
#department_show li{
	border-left:1px #e3e3e3 solid;
}
#department_show li b{
	color:#AAAAAA;
	font-weight:100;
}
#department_show li i{
	font-weight:100;
	cursor:pointer;
	margin-right:10px;
}
#department_show li i:hover{
	border-bottom:1px solid #aaaaaa;
	padding-bottom:5px;
} 
#department_show li span{
	margin-right:10px;
	color:#e3e3e3
}
#department_show li input{
	padding:2px 5px
}
.input_b0{
	border:0px;
}
.input_b1{
	border:1px solid #D9D9D9
}
</style>
    <div id="department_show">
        <?php
        show_department(0);
        function show_department($pid){
            global $con,$DB_tableprefix;
            $sql = "select * from ".$DB_tableprefix."_department where pid='".$pid."'";
            $result = $con->query($sql);
            $numcount=mysqli_num_rows($result);
            if ($numcount>0){
                echo "<ul>";
                while($row = $result->fetch_array()){ 
        ?>
                    <li><span>—</span>
                        <b><?php echo $row['name']?></b>：
                        <?php
                        $sql = "select * from ".$DB_tableprefix."_powers where department_id='".$row['id']."' order by position_id asc";
                        $result2 = $con->query($sql); 
                            while($row2 = $result2->fetch_array()){ 
                       ?>
                                <i onClick="show_c('<?php echo $row2['id']?>')"><?php echo find_position_name($row2['position_id'])?></i>
                       <?php
                            }
						?>
                    </li>
        <?php
                    show_department($row['id']);
                }
                echo "</ul>";
            }
        }
		 ?>
    </div>
</div>
<script>
function show_c(id){
	sys_users_loadingshow()
	htmlobj=$.ajax({url:"mod/users/powers_modify.php?id="+id+"&"+Date.parse(new Date()),async:false});
	$("#plan_right").html(htmlobj.responseText);
}
$('#powers_addbtn').click(function(){
	sys_users_loadingshow()
	htmlobj=$.ajax({url:"mod/users/powers_add.php?"+Date.parse(new Date()),async:false});
	$("#plan_right").html(htmlobj.responseText);
});
$.AMUI.progress.done();
</script>