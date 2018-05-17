	$(function(){
				//1.日历的控件
				$('#in').mdater({
					minDate : new Date(2015, 2, 10)
				});
				
				
				//2.左侧详细菜单的消失和隐藏；
				function le_hide(){
				var sw = $(window).width()
				if(sw>640){
				var le_width = $(".content .left").outerWidth(true);
				var le_flag=true;
				$(".content").css({"position":"relative"});
				$(".content .left").css({"position":"absolute","left":"0","top":"0px"});
				$(".right").css({"margin-left":le_width});
				$(".right .cen_inner").css({"margin-left":0});
				$(".pack_up").click(function(){
					if(le_flag){
						
					    $(".content .left").animate({"left":-le_width},1000,function(){
						$(".pack_up").find("a").html("详细");
						$(".right").removeClass("col-lg-10").addClass("col-lg-12");
						$(".right").css({"margin-left":0});
						le_flag=false;
					});
					}else{
						$(".right").css({"margin-left":le_width})
						$(".content .left").animate({"left":0},1000,function(){
						$(".pack_up").find("a").html("收起");
						$(".right").removeClass("col-lg-12").addClass("col-lg-10");
							le_flag=true;
						});
					}
				}); 
				
				};
				} //2结束
				le_hide()
				
				
			  
			    //3.让左侧的高度始终可以占满全屏的js
			    function left_pa(){
			    	  var nav_height = $("nav").height();
					  var left_height = $(".content>.left").height();
					  var win_height = $(window).height();
					  var left_pas = win_height-left_height-nav_height;
					  $(".content>.left").css({"padding-bottom":left_pas})
			    };
			  left_pa();
			  
			 
			
			
			
				
			})
			