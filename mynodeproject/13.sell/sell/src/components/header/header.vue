
<template>
 <div id="v_header" style="position:relative">
   <div class="merchant">
     <div class="top">
        <div class="left">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="center">
          <p>
            <img class="brand" src="../../assets/images/brand@2x.png" alt="">{{seller.name}}
          </p>
          <p>
           {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </p>
          <p class="discount" v-if="seller.supports">
              <img src="../../assets/images/decrease_1@2x.png" alt="">{{seller.supports[0].description}}
              <button class="abs" @click="showDetail">{{seller.supports.length}}个 <span class="icon-keyboard_arrow_right"></span></button>
          </p>
        </div>
     </div>

     <div class="bottom">
       <button>公告</button> 这里是一些商家需要提醒用户信息展示的地方，如果超出一行的部分要变省略号
     </div>

    <div class="background">
       <img :src="seller.avatar" width="100%" height="100%" alt="">
     </div>

    <!--浮层 -->
    <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
          </div>
        </div>
        <div class="detail-close"><i class="icon-close"></i></div>
    </div>
   </div>
 </div>
</template>


<script>
export default {
  name: "v_header",
  data() {
    return {
      detailShow:false
    };
  },
  props:{
    seller:{
      type:Object
    }
  },
  methods:{
    showDetail(){
      this.detailShow = true;
    }
  }
};
</script>


<style scoped>
#v_header{background:rgba(0,0,0,0.4);color:white;}
.top{overflow: hidden;position:relative;padding: 24px 12px 18px 24px;}

.left{position:absolute;top:24px;left:24px;}
.left img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
}
.center {
  padding-left: 80px;
  text-align: left;
}
.center p{margin:0;font-size:14px;}
.center img.brand{width:30px;vertical-align: middle;height:18px;}
.discount{position: relative;}
.discount img{height:18px;vertical-align: middle;}
.abs {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 24px;
  width: 35px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: 200;
  font-size: 10px;
}
.bottom{text-overflow: ellipsis;white-space: nowrap;overflow: hidden;background:rgba(255,255,255,0.3);line-height: 28px;padding:0 12px;font-size:10px;}
.bottom button{height:20px;line-height: 18px;border:none;margin:5px 0;font-size:10px;background:white;color:rgb(178,178,178);border-radius: 5px;}

.background{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;filter:blur(10px)}

.detail{
  position:fixed;z-index:100;width:100%;height:100%;overflow: auto;top:0;left:0;background:rgba(0,0,0,0.6)
}
.detail-wrapper{
  min-height: 100%;width:100%;
}
.detail-main{
  margin-top:64px;padding-bottom:64px;
}
.detail-main .name{line-height: 16px;font-size: 16px;text-align: center;font-weight: 700;}
.detail-close{
  position:relative;width:32px;height:32px;margin:-64px auto 0 auto;clear: both;font-size:32px;
}
</style>
