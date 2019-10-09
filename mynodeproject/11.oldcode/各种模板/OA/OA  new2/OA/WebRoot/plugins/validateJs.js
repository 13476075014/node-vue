$(function(){
	$('textarea,input,select').focus(function() {
		$('.tooltips').fadeOut(3000);
	});
	$(".win-homepage").click(function(){ 
        if(document.all){
        document.body.style.behavior = 'url(#default#homepage)'; 
        document.body.setHomePage(document.URL); 
        }else{alert("设置首页失败，请手动设置！");} 
	});
	$(".win-favorite").click(function(){
		var sURL=document.URL; 
		var sTitle=document.title; 
		try {window.external.addFavorite(sURL, sTitle);} 
		catch(e){ 
			try{window.sidebar.addPanel(sTitle, sURL, "");} 
			catch(e){alert("加入收藏失败，请使用Ctrl+D进行添加");} 
		}
	});
	
	$checkplaceholder=function(){
		var input = document.createElement('input');
		return 'placeholder' in input;
	};
	if(!$checkplaceholder()){
		$("textarea[placeholder], input[placeholder]").each(function(index, element){
			if($(element).attr("placeholder") || $emptyplaceholder(element)){
				$(element).val($(element).attr("placeholder"));
				$(element).data("pintuerholder",$(element).css("color"));
				$(element).css("color","rgb(169,169,169)");
				$(element).focus(function(){$hideplaceholder($(this));});
				$(element).blur(function(){$showplaceholder($(this));});
			}
		});
	};
	$emptyplaceholder=function(element){
		var $content=$(element).val();
		return ($content.length === 0) || $content == $(element).attr("placeholder");
	};
	$showplaceholder=function(element){
		//不为空及密码框
		if($emptyplaceholder(element) && $(element).attr("type")!="password"){
			$(element).val($(element).attr("placeholder"));
			$(element).data("pintuerholder",$(element).css("color"));
			$(element).css("color","rgb(169,169,169)");
		}
	};
	var $hideplaceholder=function(element){
		if($(element).data("pintuerholder")){
			$(element).val("");
			$(element).css("color", $(element).data("pintuerholder"));		
			$(element).removeData("pintuerholder");
		}
	};
	$('form').on('blur','textarea, input, select',function(){
		var e=$(this);
		if(e.attr("data-validate")){
			e.closest('.am-form-group').find(".input-help").remove();
			var $checkdata=e.attr("data-validate").split(',');
			var $checkvalue=e.val();
			var $checkstate=true;
			var $checktext="";
			if(e.attr("placeholder")==$checkvalue){$checkvalue="";}
			if($checkvalue!="" || e.attr("data-validate").indexOf("required")>=0){
				for(var i=0;i<$checkdata.length;i++){
					var $checktype=$checkdata[i].split(':');
					if(! $pintuercheck(e,$checktype[0],$checkvalue)){
						$checkstate=false;
						$checktext="<li>"+$checktype[1]+"</li>";
						break;
					}
				}
			};
			if($checkstate){
				e.closest('.am-form-group').removeClass("check-error");
				e.closest('.am-form-group').find(".input-help").remove();
				e.closest('.am-form-group').addClass("check-success");
			}else{
				e.closest('.am-form-group').removeClass("check-success");
				e.closest('.am-form-group').addClass("check-error");
				e.closest('.am-form-group').append('<div class="input-help"><ul>'+$checktext+'</ul></div>');
			}
		}
	});
	$pintuercheck=function(element,type,value){
		$pintu=value.replace(/(^\s*)|(\s*$)/g, "");
		switch(type){
			case "required":return /[^(^\s*)|(\s*$)]/.test($pintu);break;
			case "chinese":return /^[\u0391-\uFFE5]+$/.test($pintu);break;
			case "number":return /^\d+$/.test($pintu);break;
			case "integer":return /^[-\+]?\d+$/.test($pintu);break;
			case "plusinteger":return /^[+]?\d+$/.test($pintu);break;
			case "double":return /^[-\+]?\d+(\.\d+)?$/.test($pintu);break;
			case "plusdouble":return /^[+]?\d+(\.\d+)?$/.test($pintu);break;
			case "english":return /^[A-Za-z]+$/.test($pintu);break;
			case "username":return /^[a-z]\w{3,}$/i.test($pintu);break;
			case "mobile":return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test($pintu);break;
			case "phone":return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);break;
			case "tel":return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);break;
			case "email":return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);break;
			case "url":return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);break;
			case "ip":return /^[\d\.]{7,15}$/.test($pintu);break;
			case "qq":return /^[1-9]\d{4,10}$/.test($pintu);break;
			case "currency":return /^\d+(\.\d+)?$/.test($pintu);break;
			case "zip":return /^[1-9]\d{5}$/.test($pintu);break;
			case "radio":
				var radio=element.closest('form').find('input[name="'+element.attr("name")+'"]:checked').length;
				return eval(radio==1);
				break;
			default:
				var $test=type.split('#');
				if($test.length>1){
					switch($test[0]){
						case "compare":
							return eval(Number($pintu)+$test[1]);
							break;
						case "regexp":
							return new RegExp($test[1],"gi").test($pintu);
							break;
						case "length":
							var $length;
							if(element.attr("type")=="checkbox"){
								$length=element.closest('form').find('input[name="'+element.attr("name")+'"]:checked').length;
							}else{
								$length=$pintu.replace(/[\u4e00-\u9fa5]/g,"***").length;
							}
							return eval($length+$test[1]);
							break;
						case "ajax":
							var $getdata;
							var $url=$test[1]+$pintu;
							//$.ajaxSetup({async:false});
							$.post($url,function(data){
								$getdata=data.getdata;
							});
							if($getdata=="true"){return true;}
							break;
						case "repeat":
							return $pintu==jQuery('input[name="'+$test[1]+'"]').eq(0).val();
							break;
						default:return true;break;
					}
					break;
				}else{
					return true;
				}
		}
	};
	$('form').submit(function(){
		$(this).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
		var numError = $(this).find('.check-error').length;
		if(numError){
			$(this).find('.check-error').first().find('input[data-validate],textarea[data-validate],select[data-validate]').first().focus().select();
			return false;
		}
		if($(this).attr('submit-method') == "ajax"){
			var formObj = $(this);
			$(this).find("input[type='submit'],input[type='button']").attr('disabled','disabled');
			$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				data : formObj.serialize(),
				url : formObj.attr("action"),
				beforeSend : function(){
					overplay();
				},
				success : function(data) {
					$('.tooltips').html(data.message);
					$('.tooltips').fadeIn(100);
					if(data.errorFlags){
						formObj.find('input[data-validate],textarea[data-validate],select[data-validate]').val('');
					}
				},
				error : function() {
					$('.tooltips').html("系统错误");
					$('.tooltips').fadeIn(100);
				},
				complete : function(){
					overplayRemove();
					formObj.find("input[type='submit'],input[type='button']").attr('disabled',null);
				}
			});
			return false;
		}
	});
	$('.form-reset').click(function(){
		$(this).closest('form').find(".input-help").remove();
		$(this).closest('form').find('.form-submit').removeAttr('disabled');
		$(this).closest('form').find('.am-form-group').removeClass("check-error");
		$(this).closest('form').find('.am-form-group').removeClass("check-success");
	});
	$('.tips').each(function(){
		var e=$(this);
		var title=e.attr("title");
		var trigger=e.attr("data-toggle");
		e.attr("title","");
		if (trigger=="" || trigger==null){trigger="hover";}
		if (trigger=="hover"){
			e.mouseover(function(){
				$showtips(e,title);
			});
		}else if(trigger=="click"){
			e.click(function(){
				$showtips(e,title);
			});
		}else if(trigger=="show"){
			e.ready(function(){
				$showtips(e,title);
			});
		}
	});
	$showtips=function(e,title){
		var trigger=e.attr("data-toggle");
		var place=e.attr("data-place");
		var width=e.attr("data-width");
		var css=e.attr("data-style");
		var image=e.attr("data-image");
		var content=e.attr("content");
		var getid=e.attr("data-target");
		var data=e.attr("data-url");
		var x=0;
		var y=0;
		var html="";
		var detail="";
		
		if(image!=null){detail=detail+'<img class="image" src="'+image+'" />';}
		if(content!=null){detail=detail+'<p class="tip-body">'+content+'</p>';}
		if(getid!=null){detail=detail+$(getid).html();}
		if(data!=null){detail=detail+$.ajax({url:data,async:false}).responseText;}
		if(title!=null && title!=""){
			if(detail!=null && detail!=""){detail='<p class="tip-title"><strong>'+title+'</strong></p>'+detail;}else{detail='<p class="tip-line">'+title+'</p>';}
		}
		detail='<div class="tip">'+detail+'</div>';
		html=$(detail);

		$("body").append( html );
		if(width!=null){
			html.css("width",width);
		}
		if(place=="" || place==null){place="top";}
		if(place=="left"){
			x=e.offset().left - html.outerWidth()-5;
			y=e.offset().top - html.outerHeight()/2 + e.outerHeight()/2;
		}else if(place=="top"){
			x=e.offset().left - html.outerWidth()/2 + e.outerWidth()/2;
			y=e.offset().top - html.outerHeight()-5;
		}else if(place=="right"){
			x=e.offset().left + e.outerWidth()+5;
			y=e.offset().top - html.outerHeight()/2 + e.outerHeight()/2;
		}else if(place=="bottom"){
			x=e.offset().left - html.outerWidth()/2 + e.outerWidth()/2;
			y=e.offset().top + e.outerHeight()+5;
		}
		if (css!=""){html.addClass(css);}
		html.css({"left":x+"px","top":y+"px","position":"absolute"});
		if (trigger=="hover" || trigger=="click" || trigger==null){
			e.mouseout(function(){html.remove();e.attr("title",title);});
		}
	};
});

/**
 * 遮罩层
 */
function overplay(){
	$('#my-modal-loading').modal();
}
/**
 * 遮罩层取消
 */
function overplayRemove(){
	$('#my-modal-loading').modal('close');
}