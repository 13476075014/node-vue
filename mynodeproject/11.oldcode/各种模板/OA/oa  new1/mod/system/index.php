
<ol class="am-breadcrumb am-animation-slide-up">
  <li><a id="index" class="am-icon-home">平台</a></li>
  <li>系统设置</li>
</ol>

<div class="am-panel-group am-animation-slide-bottom plan_right" id="accordion">

  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#do-not-say-1'}">环境设置</h4>
    </div>
    <div id="do-not-say-1" class="am-panel-collapse am-collapse am-in">
      <div class="am-panel-bd">
        ...
      </div>
    </div>
  </div>
  
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#do-not-say-2'}">功能设置</h4>
    </div>
    <div id="do-not-say-2" class="am-panel-collapse am-collapse">
      <div class="am-panel-bd">
        <br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

      </div>
    </div>
  </div>
  
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#do-not-say-3'}" id="sys_settings_mod">版本及模块列表</h4>
    </div>
    <div id="do-not-say-3" class="am-panel-collapse am-collapse">
      <div class="am-panel-bd am-animation-fade" id="system_mod_div">
        
      </div>
    </div>
  </div>
  
</div>


<script>
$('#sys_settings_mod').click(function(){
	$("#sys_settings_mod_div").html('读取中...');
	htmlobj=$.ajax({url:"mod/system/system_mod.php?"+Date.parse(new Date()),async:false});
	$("#system_mod_div").html(htmlobj.responseText);
});

$.AMUI.progress.done();
</script>