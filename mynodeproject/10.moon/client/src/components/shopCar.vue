<!--
  这个文件主要是实现如何用vue写一个购物车
 -->

<template>
  <div>
    <div class="mui-content container">
	    <!--商品列表-->
				<div class="pin_out">
					<div class="pin_list" v-for="(item,index) in shopList" :key="index">
						<!--店名信息-->
						<div class="pin_title">
							<input type="checked"><span>全选</span>
							<div class="clear"></div>
						</div>
						<!--商品-->
						<ul class="pin_shang">
							<li class="mui-row row">
                <el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8">
                      <div class="shang_left">
                        <input type="checked">
                        <img class="le_tu" :src="item.img" />
                      </div>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="4" :lg="12" style="vertical-align:center;">
                      <div class="shang_center">
                        <p class="cen_ming">{{item.goodsName}}</p>
                        <p class="cen_xiang">{{item.goodsDescribe}}</p>
                        <p class="now_value"><i>￥</i><b class="money">{{item.newPrice}}</b></p>

                        <div class="cen_bottom">
                          <button class="jia" @click="jia(index)">+</button>
                          <input class="shu" type="text" v-model="item.count"/>
                          <button class="jian" @click="jian(index)">-</button>
                        </div>
								      </div>
                  </el-col>
                  <el-col :xs="4" :sm="4" :md="4" :lg="4">
                      	<div class="shang_right">
                          <img src="../assets/images/delete.png" alt="" />
                        </div>
                  </el-col>
                </el-row>
							</li>
						</ul>

					</div>
				</div>
    </div> <!--内容结束-->
    <!--结算部分-->
    <div class="mui-content container-fluid bottom">
      <span>共<i class="num">1</i>件商品 &nbsp;&nbsp;</span>
      <span>金额：<i class="total">1499</i>元</span>
      <a class="gotoshop" href="#">继续购物</a>
      <a class="gotopay" href="#">去结算</a>
    </div><!--结算部分结束-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shopList:[],
        carList:[]
      }
    },

    methods: {
      jia(index){
        this.shopList[index].count++;
      },
      jian(index){
        this.shopList[index].count--;
      },
      getCardata(){
        var _this = this;
        var collection = {username:_this.$cookies.get("username")}
        this.$reqs.post("/shopCar/find",{collection:collection}).then(function(result){
          _this.carList = result;
        })

      },
      getShopList(arr){
        var goods = [];
        arr.forEach((item,index) => {
          goods.push(item.goodsID);
        });
      }

    },

    computed:{
      shopList2(){ //获取到购物车数据

      }
    }
  }
</script>

<style scoped>
body{font-family:"Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif ;}
    	*{list-style: none;}
    	a{color:rgb(85,85,85)}
    	.img_shopcar img{width:24px;height:24px;}
    	.img_shopcar .car_active{display: none;}


/*中间内容*/
    	.pin_out{margin-bottom:82px;}
    	.pin_title img{width:24px;height:24px;}
    	.pin_title{height:40px;line-height: 40px;background:white;overflow: hidden;padding:5px 5px;}
    	.pin_title span,.pin_title img{float:left;display: block;line-height: 30px;}
    	.pin_title img{margin-top:3px;margin-right:15px;border:1px solid rgb(213,213,213);border-radius: 50%;}


    	.pin_shang{background:white;margin-top:0;padding-left:1px;}
    	.pin_shang li{padding:10px 0 10px 5px;outline:1px solid rgb(213,213,213);margin-bottom:10px;}
    	.shang_left{position:relative;text-align:center;padding-right:10px;}
    	.shang_left .le_tu{width:60%;max-height:100%;}
    	.shang_left .cheack_list{width:24px;height:24px;display: block;position:absolute;left:0;top:0;border:1px solid rgb(213,213,213);border-radius: 50%;}
      .shang_center p{margin:0;font-size:12px;line-height: 16px;}
      .shang_center{margin-top:70px;}
    	.shang_center .cen_bottom input{width:60px;text-align: center;height:30px;margin:0;}
    	.shang_center .cen_ming{font-size:16px;color:rgb(78,78,78);margin-bottom:5px;}
    	.shang_center .cen_bottom button{height:30px;padding:0 10px;width:25px;padding:0;}
    	.shang_center .now_value{color:darkorange;font-size:18px;margin-bottom:10px;margin-top:10px;}
    	.shang_right{padding-top:40px;}




    	/*头部区域*/
			.container-fluid{padding:0;}
			.header{height:100px;background:white;border-bottom:3px solid orange;overflow: hidden;}
			.head{height:75px;margin-top:20px;position:relative;}
			.head .left>h2{display: inline-block;margin-left:20px;}
			.head .left>h2 span{font-size:10px;margin-left:20px;}
			.head .pull-right{top:30px;position:absolute;right:0px;}
			.head .pull-right a{color:black;height:20px;line-height: 20px;display: inline-block;border-right:1px solid rgb(213,213,213);padding:0 20px;}
			.head .pull-right .a2{border-right:0px;}
			@media only screen and (max-width:800px ) {
				.header .left h2{display: none;}
			}


    	/*内容*/
    	.pin_shang>li{margin:0;margin-bottom:5px;}

    	.mui-content.container-fluid{padding:0;}
    	.bottom.container-fluid{padding:0;}

      /*底部*/
      .bottom{height:50px;line-height: 50px;border:1px solid rgb(213,213,213);position:relative;text-align: right;}
      .bottom .gotopay{background:rgb(251,114,142);color:white;display: inline-block;line-height: 50px;padding:0 30px;}
      .bottom .gotoshop{background:rgb(213,213,213);display: inline-block;line-height: 50px;padding:0 30px;}
      .bottom i{color:rgb(251,114,142);margin:0 5px;}
      .bottom span{margin:0 20px;}

</style>
