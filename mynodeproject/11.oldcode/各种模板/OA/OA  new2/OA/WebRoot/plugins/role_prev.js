$(document).ready(fn);
function fn() {
	$("input[type='checkbox']").click(function() {
		var cls = $(this).attr('lang');
		var parentCls = $(this).attr('class');
		var flags = this.checked;
		if(flags){
			if(parentCls != null && parentCls != undefined){
				var pa = parentCls.split(' ');
				$.each(pa,function(i,n){
					$("input[lang='"+n.trim()+"']").prop('checked',flags);
				});
			}
		}
		$('.'+cls).prop('checked',flags);
	});
	
	/**
	 * 默认值填充
	 */
	var options = $("input[type='checkbox']");
	var array = $('.fileds').val().split('_');
	$.each(options,function(i,n){
		$(n).prop('checked',isCheck(array,$(n).attr('value')));
	});
};

/**
 * 判断一个值是否在给定集合中
 */
function isCheck(items,item){
	var flags = false;
	$.each(items,function(i,n){
		if(parseInt(n.trim()) == parseInt(item)){
			flags = true;
		}
	});
	return flags;
}