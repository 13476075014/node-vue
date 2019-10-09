<!-- 这个是封装的swiper模板 -->

<template>
  <div id="myswiper">
    <swiper :options="swiperOption" ref="mySwiper" >
		    <!-- slides -->
		    <swiper-slide v-for="(item,index) in slide_data" :key="index"><img :src="item" alt=""></swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
		    <div class="swiper-button-next" slot="button-next"></div> -->
		    <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
		  </swiper>
  </div>
</template>



<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper';

  export default{
    name:"myswiper",
    props:{
      slide_data:{ //滑动的数据
        type:Array,
        default:function(){
           return  ["goods1.png"]
            }
      },
      swiperOption:{
        type:Object,
        default:function(){
          return {
            notNextTick: false,
            loop:true,
            // swiper configs 所有的配置同swiper官方api配置
            autoplay: {delay:100000},
            direction : 'horizontal',  //滚动的方向，horizontal：横向水平 ； vertical:竖直的；
            grabCursor : true,
            setWrapperSize :true,
            autoHeight: true,
            pagination : {el:'.swiper-pagination',clickable:true},
            paginationClickable :true,
            navigation: { //最新版本的需要这样配置，按钮才有效
            //prevEl:'.swiper-button-prev',//上一张
            //nextEl:'.swiper-button-next'//下一张
            },
          //scrollbar:'.swiper-scrollbar',//滚动条
          mousewheelControl : true,
          observeParents:true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          //debugger: true,
          }
        }

    }
    },
    computed:{
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    components: {
	    swiper,
	    swiperSlide
	  }
  }
</script>


<style scoped>
html, body, #app {
		 height: 100%;
		 width: 100%;
		}
		.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
		 height: 50vh;
		}
		.swiper-pagination-bullet {
		 width: 15px;
		 height: 15px;
		}
		.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
		 bottom: 8%;
		}
</style>

