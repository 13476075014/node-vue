<!-- 放大镜效果的模板 -->

<template>
    <el-row :gutter="20" style="position:static;">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <div style="position:relative" class="ddd" ref="out">
            <!-- 左边原图 -->
            <div id="d1" ref="left">
              <img src="../../assets/images/goods1.png" alt="" />
            </div>

            <!-- 右边放大图 -->
            <div id="d3" style="position:absolute;left:300px;top:0;" ref="right">
              <img src="../../assets/images/goods1.png" alt="" />
            </div>
          </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
         <!-- 中间商品详情 -->
        <div class="center">
            <h4>商品的标题</h4>
            <span>商品的一些提示红色</span>
            <div class="price">
              <p>
                  <label for="">价格：</label> <span class="colored">￥888.00</span>  <span>降价通知</span>
              </p>
              <p>
                <label for="">促销：</label> <span class="colored">会员价</span> <button>确认是否享受优惠</button>
              </p>
            </div>
            <ul>
              <li>
                <span>配送至：</span>
              </li>
              <li>
                <span>运费：</span> <label for="">免运费</label>
              </li>
              <li>
                <span>数量：</span> <button>-</button>   <input type="text">  <button>+</button>  库存：<span>999</span>件
              </li>
              <li>
                <span>月销量：</span> <label for="">259</label>件
              </li>
              <li>
                <span>服务：</span> <label for="">支持七天无忧退换货</label>
              </li>
              <li>
                <button>立即购买</button><button>加入购物车</button>
              </li>
            </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
         <!-- 右边的商品推荐 -->
        <div class="right">
            <h4>看一看</h4>
            <swiper :slide_data="slide_data"></swiper>
        </div>
      </el-col>
    </el-row>
</template>

<script>
import fang from '../../assets/js/fang.js';
import swiper from './swiper.vue';
  export default{
    name:"magnifier",
    data(){
      return {
        slide_data:["../../../static/images/goods1.png","../../../static/images/goods1.png"]
      }
    },
    created(){
      this.$nextTick(function(){
        //out最外层  ； left原图 ；right放大区域
        //console.log(this.$refs)
          fang(this.$refs.out,this.$refs.left,this.$refs.right)

      })
    },
    components:{
      swiper
    }

  }
</script>


<style scoped>
/*放大镜*/
			.ddd{position:relative;}
			#d1{width:300px;height:300px;background:red;border:1px solid rgb(233,233,233);}
			#d3{width:500px;height:500px;background:blue;overflow: hidden;display: none;z-index:999;position:absolute;left:300px;}
			#d1 img{width:300px;height:300px;}
			#d3 img{width:3000px;height:3000px;position:absolute;left:0;top:0;}

/*中间商品详情*/
      .center{text-align: left;}
      .center .colored{color:red;}
      .center>h4{line-height: 35px;margin:0;}
      .center>span{color:red;font-size:12px;}
      .center .price{background:rgb(233,233,233);padding:10px 5px;}
</style>

