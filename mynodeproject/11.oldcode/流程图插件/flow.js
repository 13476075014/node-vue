(function($){
	$.fn.flow = function(option){
		var _this = $(this);
		var def = {//一些默认设置
			index : 0
		};
		var ops = def;
		if(option){
			ops = $.extend(def,option); 
		}
		var creathtml = function(){
			var nn = _this.find(".flowChart_inner").prepend("<span></span>");
			//console.log(nn)
		}
		var change = function(index){
				_this.find("flowChart_inner").removeClass("active");
				_this.find(".flowChart_inner").eq(index).addClass("active");
			};
		
		var init = function(){
			creathtml();
			change(ops.index);
		};
		init();
	}
	
	
})(jQuery)
