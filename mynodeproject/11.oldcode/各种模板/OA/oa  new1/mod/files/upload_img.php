<link rel="stylesheet" href="css/jquery.Jcrop.css">
<script src="js/jquery.Jcrop.js"></script> 
<form enctype="multipart/form-data"  method="post" name="upbookfrom" id="upbookfrom">
<div id="digcontent_img_main">
  <img src="../../images/uploadimg.jpg" class="hand" onClick="$('#faceupload').click()"  id="upimg"/>
  <input type="file" name="upfile" size="300" id="faceupload" onChange="upinput()" style="width:0px; height:0px" accept="image/jpeg,image/png,image/jpg"/>
</div>
</form>
<script language="javascript">		

	function upinput(){
        var data = new FormData($('#upbookfrom')[0]);
		$("#upimg").attr("src",'/images/loading.gif');
        $.ajax({
            url: '/mod/files/updateimg.php?path=<?php echo $_GET['path']?>&watermark=<?php echo $_GET['watermark']?>',
            type: 'POST',
            data: data,
            dataType: 'html',
            cache: false,
            processData: false,
            contentType: false,
            error: function(msg){ //失败 
				sys_alert('<strong>WARNING</strong>：上传失败，请联系管理员.');
            }, 
            success: function(msgurl){ //成功

				fv = msgurl.split(",");
				$("#upimg").attr("src",fv[0]);
				var maxWidth = $('#digcontent_img').width()-40; // 图片最大宽度
				var maxHeight = $('#digcontent_img').height()-40;    // 图片最大高度
				var ratio = 0;  // 缩放比例
				var width = fv[1];    // 图片实际宽度
				var height = fv[2];  // 图片实际高度
				
				
				if(height > maxHeight && width > maxWidth){
					if (width>height){
						$("#upimg").css("width", maxWidth); 
						bi = maxWidth/width;
						$("#upimg").css("height", height*bi); 
					}
					if (width<height){
						$("#upimg").css("height", maxHeight); 
						bi = maxHeight/height;
						$("#upimg").css("width", width*bi); 
					} 
					if (width==height){
						$("#upimg").css("height", maxHeight); 
						bi = maxHeight/height;
						$("#upimg").css("width", width*bi); 
					} 
				}else{
					if (width>maxWidth){
						$("#upimg").css("width", maxWidth); 
						bi = maxWidth/width;
						$("#upimg").css("height", height*bi); 
					}
					if (height>maxHeight){
						$("#upimg").css("height", maxHeight); 
						bi = maxHeight/height;
						$("#upimg").css("width", width*bi); 
					}
				}
				var tph=($('#digcontent_img').height()-$("#upimg").height())/2;
				$('#digcontent_img_main').css('padding-top',tph);
		
				
				$('#upimg').Jcrop({
				  aspectRatio: 1.7,
				  onSelect: updateCoords
				});
				$("#inputimgsrc").val(fv[0]);
			} 
			})
		return false;
	}
	
	$(function(){
		$('#cropbox').Jcrop({
		  aspectRatio: 1,
		  onSelect: updateCoords
		});
	
	  });
	
	  function updateCoords(c)
	  {
		$('#x').val(c.x);
		$('#y').val(c.y);
		$('#w').val(c.w);
		$('#h').val(c.h);
	  };
	
	  function checkCoords()
	  {
		if (parseInt($('#w').val())) return true;
		alert('Please select a crop region then press submit.');
		return false;
	  };
	  
	  
	  
	  	
</script>
		<form action="/mod/files/upload_img_resize.php" method="post" onsubmit="return checkCoords();">
			<input type="hidden" id="x" name="x" />
			<input type="hidden" id="y" name="y" />
			<input type="hidden" id="w" name="w" />
			<input type="hidden" id="h" name="h" />
            <input type="text" name="inputimgsrc" id="inputimgsrc" value="">
			<input type="submit" value="Crop Image" class="btn btn-large btn-inverse" />
		</form>