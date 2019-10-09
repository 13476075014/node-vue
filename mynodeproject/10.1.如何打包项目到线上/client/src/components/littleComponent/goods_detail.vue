<!-- 这个是商品展示的模板页 -->

<template>
<div>
  <div class="goods_out">
        <div class="goods_inner" v-for="(goods_detail,in5) in detail2" :key="in5">
          <img class="bg_red_hover_bor" :src="goods_detail.img" alt="">

          <p class="price_out">
              <span class="price"> ${{goods_detail.newPrice}}</span>
              <span class="people">{{goods_detail.SalesCount}} 人付款</span>
         </p>
          <p>{{goods_detail.goodsDescribe}}</p>
          <el-button-group>
            <el-button size="small" type="danger">立即购买</el-button>
            <el-button size="small" type="plain">加入购物车</el-button>
          </el-button-group>
        </div>
    </div>
     <!--分页-->
    <div class="block" style="padding-top:20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange2"
          :current-page="currentPage"
          :page-sizes="page_sizes"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

</div>

</template>


<script>

  export default{
      name:"goods_detail",
      props:{
        detail2:{
		    		type:Array,
		    		default:function(){
		    			return [];
		    		}
          },
        currentPage:{//当前页
		    		type:Number,
		    		default:function(){
		    			return 1;
		    		}
        },
        total:{//总共条数
		    		type:Number,
		    		default:function(){
		    			return 6;
		    		}
          },
          page_sizes:{//每页显示几条
		    		type:Array,
		    		default:function(){
		    			return [6];
		    		}
		    	}
      },
      data(){
        return {

        }
      },
      methods:{
        handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
          },
          handleCurrentChange2(val){//下面的handleCk，需要在这个模板引用后写上这个事件，才能顺利调用
		      	this.$emit("handleCk",val);//组件应用后绑定的方法
		      }
      }
  }
</script>


<style scoped>
  .goods_out{width:100%;overflow: hidden;}
  .goods_inner{text-align: left;width:calc((100% - 170px)/5);float:left;margin-right:40px;margin-top:30px;}
  .goods_inner img{border:1px solid rgb(227,227,227);width:100%;}
  .goods_inner .price_out{overflow: hidden;}
  .goods_inner .price{color: red;font-size:14px;}
  .goods_inner .people{float:right;font-size:12px;}

  .goods_inner:nth-last-of-type(1){margin-right:0;}
</style>


