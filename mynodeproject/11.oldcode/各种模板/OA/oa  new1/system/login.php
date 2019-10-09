<script>$.AMUI.progress.start();</script>
<form id="showlogin-form">
<div class="box-shadow alpha am-animation-scale-up" id="showlogin">
    <div style="margin:20px 0">
    	<img src="images/logo/logo-md-text.jpg" />
    </div>

	<div class="am-input-group" style="margin-top:5px">
      <span class="am-input-group-label"><i class="am-icon-user am-icon-fw"></i></span>
      <input type="text" class="am-form-field" placeholder="身份证号/手机号/QQ号/邮箱" name="uid" id="uid">
    </div>
    
	<div class="am-input-group">
      <span class="am-input-group-label" style="border-top:0px"><i class="am-icon-lock am-icon-fw"></i></span>
      <input type="password" class="am-form-field" placeholder="登录密码" name="pwd" style="border-top:0px" id="pwd">
    </div>
    
    <div class="am-input-group" style="margin-bottom:5px;">
      <span class="am-input-group-label" style="border-top:0px"><i class="am-icon-lock am-icon-fw"></i></span>
      <input type="password" class="am-form-field" placeholder="验证码" name="yzm" style="border-top:0px; width:65%" id="yzm">
      <img src="include/yzm.php" onclick="javascript:this.src='include/yzm.php?tm='+Math.random();" id="yzmimg" style="cursor:pointer;border:1px solid #a4bbc2; height:38px; width:96px;border-top:0px;border-left:0px"/>
    </div>
  	<button type="button" class="am-btn am-btn-default am-btn-block" style="border:1px solid #cccccc" id="showlogin-btn">登录</button>
</div>
</form>
<script language="javascript">
$('#showlogin').css('margin-top',$(window).height()/2-200+'px');
$('#showlogin-btn').click(function (){
    $.post(
      '/app/main.php?'+Date.parse(new Date()),
      {
        uid:$('#uid').val(),
        pwd:$('#pwd').val(),
        yzm:$('#yzm').val(),
      },
      function (data)
      {
		$('#showlogin').hide(1000);
		$("#main").html('');	
		$("#main").html(data);
      }
    );
   });
</script>
<script>$.AMUI.progress.done();</script>