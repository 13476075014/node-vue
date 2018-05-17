/*************************
*返回顶部
*************************************************/
function manhuatoTop ()
{
	$(function() {
		$.fn.manhuatoTop = function(options) {
			var defaults = {
				showHeight : 150,
				speed : 1000
			};
			var options = $.extend(defaults,options);
			$("body").prepend("<div id='totop'><a></a></div>");
			var $toTop = $(this);
			var $top = $("#totop");
			var $ta = $("#totop a");
			$toTop.scroll(function(){
				var scrolltop=$(this).scrollTop();
				if(scrolltop>=options.showHeight){
					$top.show();
				}
				else{
					$top.hide();
				}
			});
			$ta.hover(function(){
				$(this).addClass("cur");
			},function(){
				$(this).removeClass("cur");
			});
			$top.click(function(){
				$("html,body").animate({scrollTop: 0}, options.speed);
			});
		}
	});
	$(function (){
		$(window).manhuatoTop({
			showHeight : 100,
			speed : 500
		});
	});
}
manhuatoTop();

