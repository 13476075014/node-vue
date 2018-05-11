<!-- 这个是首页页面 -->
<template>
  <div class="inner" id="index_one">

    <!-- 头部2 轮播图 -->
    <div>
      <el-carousel indicator-position="outside" :height="lun_h">
        <el-carousel-item v-for="(item,inn) in 4" :key="inn">
          <img src="../assets/images/banner1.png" :id="'img' + inn" alt="">
        </el-carousel-item>
      </el-carousel>
    </div> <!-- 头部2 轮播图结束 -->

    <!-- 中间内容1 -->

    <div id="content">
        <el-row>
          <el-col :offset="3" :span="18" class="content1">
            <!-- 商品秒杀区域 -->
              <el-row>
                <el-col :span="4" class="con1_time">
                    <p>今日秒杀</p>
                    <img src="../assets/images/time.png" alt="">
                    <p>本场距离结束还剩</p>
                    <span>12</span><span>36</span><span>59</span>
                </el-col>
                <el-col :span="20">
                  <!-- Swiper -->
                   <swiper :options="swiperOption" ref="mySwiper">
                      <swiper-slide class="goods" v-for="(c,index4) in con1_data" :key="index4">
                           <img :src="c.src" alt="">
                            <p style="margin-top:0;" class="des">{{c.des}}</p>
                            <p style="margin-bottom:0;border:1px solid rgb(251,114,142);line-height:22px;overflow:hidden;">
                              <span class="new">{{c.new}}</span>
                              <span class="old">{{c.old}}</span>
                            </p>
                      </swiper-slide>
                      <div class="swiper-pagination"  slot="pagination"></div>//
                      <div class="swiper-button-prev" slot="button-prev"></div>
                      <div class="swiper-button-next" slot="button-next"></div>
                      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
                   </swiper>
                </el-col>
              </el-row>

              <!-- 热门商品最新商品区域 -->
              <el-row>
                  <el-col :span="24">
                    <div v-for="(con2,index4) in con2_data" class="content2" :id="con2.id" :key="index4">
                      <h4 class="top_title" style="text-align:left;margin-bottom:0;overflow:hidden;">
                        {{con2.h4}} <span>HOT COMMODITY</span>
                        <router-link :to="{path:'/moregoods?type=热门商品'}">
                            <span class="more bg_red bg_red_hover" href="#">MORE >></span>
                        </router-link>
                      </h4>
                      <div class="con2_out" style="margin-right:0;">
                          <div class="con2_inner" v-for="(con2_detail,index5) in con2.detail" :key="index5">
                            <img class="bg_red_hover_bor" :src="con2_detail.src" alt="">
                            <p>{{con2_detail.des}}</p>
                            <p class="price">{{con2_detail.price}}</p>
                          </div>
                      </div>
                    </div>
                  </el-col>
              </el-row>

              <!--化妆品，护肤品区域  -->
              <el-row>
                <el-col>
                    <div class="content3" id="beauty">
                      <h4 class="top_title" style="text-align:left;margin-bottom:0;overflow:hidden;">
                        化妆品<span>HOT COMMODITY</span>
                        <a class="more bg_red bg_red_hover" href="#">MORE >></a>
                      </h4>
                      <div class="con3_out">
                        <div style="overflow:hidden;padding:10px 15px;">
                            <div class="con3_left">
                              <img src="../../static/images/goods6.png" alt="">
                            </div>
                            <div class="con3_right">
                                  <img class="bg_red_hover_bor" src="../../static/images/goods1.png" alt="">
                                  <p>des</p>
                                  <p class="price">price</p>
                            </div>
                            <div class="con3_right">
                                  <img class="bg_red_hover_bor" src="../../static/images/goods1.png" alt="">
                                  <p>des</p>
                                  <p class="price">price</p>
                            </div>
                            <div class="con3_right nomargin">
                                  <img class="bg_red_hover_bor" src="../../static/images/goods1.png" alt="">
                                  <p>des</p>
                                  <p class="price">price</p>
                            </div>
                        </div>

                        <div style="overflow:hidden;padding:10px 15px;">
                            <div class="con3_bottom">
                                <img class="bg_red_hover_bor" src="../../static/images/goods1.png" alt="">
                                <p>des</p>
                                <p class="price">price</p>
                            </div>
                        </div>
                      </div>
                    </div>
                </el-col>
              </el-row>
          </el-col>
        </el-row>
    </div>



  </div>

</template>

<script>
import{swiper,swiperSlide} from 'vue-awesome-swiper'

   export default {
      name:"index_one",
      data(){
        return {
          lun_h:"", //轮播图的高度
          con2_data:[//con2
                  {h4:"热门商品",id:"hot",detail:[
                    {src:"../../static/images/goods1.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods1.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods1.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods1.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods1.png",des:"兰芝喷雾",price:"￥299"}
                  ]},
                  {h4:"最新商品",id:"new",detail:[
                    {src:"../../static/images/goods2.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods3.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods4.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods5.png",des:"兰芝喷雾",price:"￥299"},
                    {src:"../../static/images/goods1.png",des:"兰芝喷雾",price:"￥299"}
                  ]}

            ],
          con1_data:[ //swiper里面的数据
              {src:"../../static/images/goods1.png",des:"ysl口红",new:"￥99",old:"￥999"},
              {src:"../../static/images/goods2.png",des:"ysl口红",new:"￥99",old:"￥999"},
              {src:"../../static/images/goods1.png",des:"ysl口红",new:"￥99",old:"￥999"},
              {src:"../../static/images/goods3.png",des:"ysl口红",new:"￥99",old:"￥999"}
          ],
            //swiper的配置
            swiperOption:{
              notNextTick:true,
              loop:false,
              autoplay:2000,
              direction:'horizontal',
              grabCursor:true,
              setWrapperSize:true,
              autoHeight:true,
              slidesPerView: 3,
              spaceBetween: 30,
              pagination:'.swiper-pagination',
              breakpoints: {
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                }
              },
              paginationClickable:true,
              navigation:{
                prevEl:'.swiper-button-prev',//上一张
                nextEl:'.swiper-button-next'//下一张
              },
              mousewheelControl : true
            }
        }
      },
      mounted:function(){//dom渲染完毕之后触发的钩子函数
      var that = this;
          setTimeout(() => {
              let cur = document.querySelectorAll("#img0");
              cur = cur[0].clientHeight ;
              that.lun_h = cur + "px";
          }, 500);
      },
      created:function(){


      },
      watch:{

      },
      components:{
        swiper,
        swiperSlide
      },
      methods:{
        change(ee){//

        }
      }
}
</script>


<style scoped>



.con1_time{background:rgb(251,114,142);color:white;height:225px;}
.con1_time img{width:35px;}
.con1_time span{margin-bottom:5px;width:30px;height:30px;background:black;display: inline-block;line-height: 30px;margin-right:10px;}
.con1_time span:nth-last-of-type(1){margin-right:0;}
.content1 .des{color:rgb(251,114,142);}
.content1 .goods{padding:0 45px;}
.content1 .new{background:rgb(251,114,142);color:white;display: inline-block;width:50%;float:left;}
.content1 .old{color:rgb(219, 213, 213);display: inline-block;width:50%;float: left;}


.content2 .con2_out{overflow: hidden;border:1px solid rgb(222,222,222);padding:20px 15px;border-top:5px solid rgb(251,114,142);}
.content2 .con2_inner{margin-right:40px;float:left;width:calc((100% - 160px)/5);}
.content2 .con2_inner p{margin:5px 0;}
.content2 .con2_inner img,.content3 .con3_right img,.content3 .con3_bottom img{transition:all linear .2s;border:1px solid rgb(213,213,213);width:100%;}
.content2 .con2_inner:nth-last-of-type(1){margin-right:0;}
.top_title .more{float:right;padding:5px 15px;font-size:12px;font-weight: 100;}
.content2 .price{color:red;}
.content2 h4,.top_title{font-size:14px;font-weight:300;margin-top:50px;}

.top_title span{margin-left:20px;}
.content3 .con3_left{float:left;width:calc((((100% - 160px)/5)*2) + 40px);text-align: left;margin-right:40px;}
.content3 .con3_left img{width:100%;}
.content3 .con3_right{float:left;width:calc((100% - 160px)/5);margin-right:40px;}
.con3_out .nomargin{margin-right:0!important;}
.content3 .con3_bottom{float:left;}
.content3 .con3_out p{margin:5px 0;}


		/*
		 vh，是指CSS中相对长度单位，表示相对视口高度（Viewport Height），1vh = 1% * 视口高度。
		 * */
		.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
        box-sizing: border-box;
		}
		.swiper-pagination-bullet {
		 width: 15px;
		 height: 15px;
		}
		.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
		 bottom: 8%;
		}
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next{background-size:20px 20px;}
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev{background-size:20px 20px;}







    .bg_red{background:rgb(251,114,142);color:white;}
    .bg_red_hover:hover{background:rgb(253, 166, 184);}
    .bg_red_hover_bor:hover{border:1px solid rgb(251,114,142)!important;transform: scale(1.05);}

</style>


