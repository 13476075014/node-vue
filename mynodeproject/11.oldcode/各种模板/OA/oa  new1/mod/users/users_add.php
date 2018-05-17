<?php require("../../include/conn.php");?>
<?php
// 职位选择 position_show
	if ($_GET['department_id']!=''){
            $sql = "select * from ".$DB_tableprefix."_powers where department_id='".$_GET['department_id']."'";
            $result = $con->query($sql);
            $numcount=mysqli_num_rows($result);
			echo '<select class="am-form-field">';
            if ($numcount>0){
                while($row = $result->fetch_array()){ 
					echo '<option value="'.$row['id'].'">'.find_position_name($row['position_id']).'</option>';
                }
                
            }else{
					echo '<option value="">请联系管理员设置-权限</option>';
			}
			echo '</select>';
			exit;
	}

?>
<script language="javascript" src="assets/js/amazeui.min.js"></script>
<script>$.AMUI.progress.start();</script>
<form name="user_add" id="user_add">
<div class="am-g am-animation-fade">
    <div class="am-u-lg-2" style="padding:5px;">
        <div class="wos-img-border"><img src="../images/upload_user.jpg" width="100%" onClick="sys_upload_img('/face/',0)" id="faceimg"/></div>
        <input type="hidden" name="face" id="face" />
<script language="javascript">			
//onClick="$('#faceupload').click()"	
	function chuli(url){
        $("#faceimg").attr("src",+msgurl);
	}				
</script>
        <p align="center">点击头像添加照片</p>
    </div>
  
    <div class="am-u-lg-5">
    	<h3>基本信息<span class="am-text-danger">（该项全部填写）</span></h3>
        <div class="am-input-group">
          <span class="am-input-group-label bgclear">姓名：</span>
          <input type="text" class="am-form-field" placeholder="请与身份证姓名一致">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">性别：</span>
          <select class="am-form-field">
          	<option value="">先生</option>
            <option value="">女士</option>
          </select>
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label wos-border-top-0">部门：</span>
          <select class="am-form-field" id="department_id" onChange="show_position_id()">        
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
        </div>
        <script>
		function show_position_id(){
			htmlobj=$.ajax({url:"mod/users/users_add.php?department_id="+$("#department_id").val()+"&"+Date.parse(new Date()),async:false});
			$("#position_show").html(htmlobj.responseText);
		}
		</script>
        <div class="am-input-group">
          <span class="am-input-group-label wos-border-top-0">职位：</span>
          <span id="position_show">
          <select class="am-form-field" id="position_id">
          	<option>请选择部门</option>
          </select></span>
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">手机：</span>
          <input type="text" class="am-form-field" placeholder="11位手机号码">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label" style="font-size:83%">身份证：</span>
          <input type="text" class="am-form-field" placeholder="请与上传身份证号码一致（请核实）">
        </div>
        <h3>其他</h3>
        <div class="am-input-group">
          <span class="am-input-group-label">Q Q ：</span>
          <input type="text" class="am-form-field" placeholder="常用的QQ号码">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">微信：</span>
          <input type="text" class="am-form-field" placeholder="用于微信企业号管理">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">民族：</span>
          <input type="text" class="am-form-field" placeholder="请填写日常民族的信仰">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">信仰：</span>
          <input type="text" class="am-form-field" placeholder="佛教/基督教/伊斯兰教/道教等">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">婚姻：</span>
          <select class="am-form-field">
          	<option value="">单身</option>
            <option value="">恋爱</option>
            <option value="">已婚</option>
            <option value="">离异</option>
          </select>
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">子女：</span>
          <input type="text" class="am-form-field" placeholder="填写：一子/一女/子女双全 等等">
        </div>
        
        <h3 class="am-form-group am-form-file">
          <button type="button" class="am-btn am-btn-default am-btn-sm">
            <i class="am-icon-cloud-upload"></i> 上传员工信息附件</button>
          <input type="file" multiple>
        </h3>
    </div>
    
    <div class="am-u-lg-5">
    	<h3>人力资源信息（内部隐藏）</h3>
        
        
        <div class="am-input-group">
          <span class="am-input-group-label">入职状态：</span>
          <select class="am-form-field">
          	<option value="">就职：正常使用系统</option>
            <option value="">锁定：禁止访问</option>
            <option value="">休假：允许访问，但不接收工作流。</option>
            <option value="">离职：禁止访问，客户和相关数据可以转移</option>
            <option value="">试用：正常使用系统，人力部标记符号</option>
          </select>
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">入职时间：</span>
          <input type="text" class="am-form-field" placeholder="日历组件" data-am-datepicker="{theme: 'success'}" readonly/>
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">户口地址：</span>
          <input type="text" class="am-form-field" placeholder="根据身份证内容输入">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">文化程度：</span>
          <select class="am-form-field">
          	<option value="">知识青年</option>
            <option value="">中专</option>
            <option value="">大专</option>
            <option value="">本科</option>
            <option value="">学士学位</option>
            <option value="">硕士学位</option>
            <option value="">博士学位</option>
          </select>
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">工资卡开户行：</span>
          <input type="text" class="am-form-field" placeholder="请输入正确的开户行名称">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">工资卡账号：</span>
          <input type="text" class="am-form-field" placeholder="卡号需和姓名相符合">
        </div>
        
        
        
        <h3>第一紧急联系人</h3>
        <div class="am-input-group">
          <span class="am-input-group-label">姓名</span>
          <input type="text" class="am-form-field" placeholder="第一紧急联系人姓名">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">电话</span>
          <input type="text" class="am-form-field" placeholder="第一紧急联系人电话">
        </div>
        
        <h3>第二紧急联系人</h3>
        <div class="am-input-group">
          <span class="am-input-group-label">姓名</span>
          <input type="text" class="am-form-field" placeholder="第二紧急联系人姓名">
        </div>
        
        <div class="am-input-group">
          <span class="am-input-group-label">电话</span>
          <input type="text" class="am-form-field" placeholder="第二紧急联系人电话">
        </div>
        
        <h3></h3>
        <div class="wos-text-right">
        <button type="button" class="am-btn am-btn-default">重置</button>
        <button type="button" class="am-btn am-btn-secondary">保存</button> 
        </div>
    </div>
</div></form>
<script>$.AMUI.progress.done();</script>
