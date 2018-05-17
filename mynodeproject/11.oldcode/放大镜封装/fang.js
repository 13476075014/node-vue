 
$.fn.extend({
  yangbo:function(active,inner,movequ){
    $(active).hover(function(){
      $(inner).show();
      $(movequ).show();
      var proportionOne=$(active).width()/$(inner).width();
      var proportionTwo=$(movequ).find('img').width()/$(movequ).width();
      // console.log($(movequ).find('img').width());
      if(proportionOne==proportionTwo){
      $(this).mousemove(function(event){
        //以下为右侧放大
        var proportionLeft=$(active).width()/$(inner).width();
        var proportionTop=$(active).height()/$(inner).height();
        $(movequ).scrollLeft($(inner).position().left*proportionLeft).scrollTop($(inner).position()
        .top*proportionTop);
  
        //以下为小滤镜拖拽
        $(inner).offset({
            left:event.pageX-40,
            top:event.pageY-40
          });
  
        //以下为判断临界值
        if($(inner).position().left<=0){
            $(inner).css({
              left:0
            })
          }
          if($(inner).position().top<=0){
            $(inner).css({
              top:0
            })
          }
          if($(inner).position().left>=$(this).width()-$(inner).width()){
            $(inner).css({
              left:$(this).width()-$(inner).width()
            })
          }
          if($(inner).position().top>=$(this).height()-$(inner).height()){
            $(inner).css({
              top:$(this).height()-$(inner).height()
            })
          }
  
      })
    }else{
      $(active).text('图片宽高不正确:请调整图片宽高-->滤镜与其父亲之比应该等于右侧盒子与右侧图片之比')
      .css({
        background:'yellow',
        color:'red',
      });
    }
  },function(){
      $(inner).hide();
      $(movequ).hide();
    })
  
  
  }
  
})