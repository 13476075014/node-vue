
<template>
 <div id="v_header">
   <div class="merchant">
     <div class="top">
        <div class="left">
          <img src="../../assets/images/logo.png" alt="">
        </div>
        <div class="center">
          <p>
            <img src="../../assets/images/brand@2x.png" alt="">粥品香坊（大运村）
          </p>
          <p>
            蜂鸟专送/38分钟必达
          </p>
          <p>
              <img src="../../assets/images/decrease_1@2x.png" alt="">在线支付，满28减5，满50减15
              <button class="abs">5个 <span class="icon-keyboard_arrow_right"></span></button>
          </p>
        </div>
     </div>

     <div class="bottom">
       <button>公告</button> 这里是一些商家需要提醒用户信息展示的地方，如果超出一行的部分要变省略号
     </div>
   </div>
 </div>
</template>


<script>
export default {
  name: "v_header",
  data() {
    return {};
  }
};
</script>


<style scoped>
.top{overflow: hidden;position:relative;}
.merchant {
  padding: 24px 12px 18px 24px;
}
.left{position:absolute;top:0;left:0;}
.left img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
}
.center {
  padding-left: 80px;
  text-align: left;
}
.center p{margin:0;}
.center img{width:30px;}
.abs {
  position: relative;
  bottom: 0;
  right: 0;
  height: 24px;
  width: 35px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: 200;
  font-size: 10px;
}
.bottom{text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}
</style>
