<!-- 放大镜效果的模板 -->

<template>
<el-row style="position:static;">
  <el-col :span="18" :offset="3">
    <div style="position:relative" class="ddd" ref="out">
      <!-- 左边原图 -->
			<div id="d1" ref="left">
			  <img src="../../assets/images/goods1.png" alt="" />
			</div>

      <!-- 右边放大图 -->
			<div id="d3" style="position:absolute;left:300px;top:0;" ref="right">
				<img src="../../assets/images/goods1.png" alt="" />
			</div>

      <!-- 中间商品详情 -->
      <div class="center">
          <h4>商品的标题</h4>
          <span>商品的一些提示红色</span>
          <div class="price">
            <p>

            </p>
          </div>
      </div>
		</div>
  </el-col>
</el-row>
</template>

<script>
import fang from '../../assets/js/fang.js';

  export default{
    name:"magnifier",
    data(){
      return {

      }
    },
    created(){
      this.$nextTick(function(){
        //out最外层  ； left原图 ；right放大区域
        //console.log(this.$refs)
          fang(this.$refs.out,this.$refs.left,this.$refs.right)

      })
    }

  }
</script>


<style scoped>
			.ddd{position:relative;}
			#d1{width:300px;height:300px;background:red;border:1px solid rgb(233,233,233);}
			#d3{width:500px;height:500px;background:blue;overflow: hidden;display: none;z-index:999;position:absolute;left:300px;}
			#d1 img{width:300px;height:300px;}
			#d3 img{width:3000px;height:3000px;position:absolute;left:0;top:0;}
</style>

