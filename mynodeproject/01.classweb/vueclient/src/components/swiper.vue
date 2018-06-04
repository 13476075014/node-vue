<!--这个主要是来学swiper怎么用在脚手架项目中-->
<!--官网：https://www.npmjs.com/package/vue-awesome-swiper-->
<!--参考网址：http://www.jb51.net/article/132681.htm-->
<template>
	<div id="swiperha">
		<h3>npm i vue-awesome-swiper</h3>
		<swiper :options="swiperOption" ref="mySwiper" >
		    <!-- slides -->
		    <swiper-slide>I'm Slide 1</swiper-slide>
		    <swiper-slide>I'm Slide 2</swiper-slide>
		    <swiper-slide>I'm Slide 3</swiper-slide>
		    <swiper-slide>I'm Slide 4</swiper-slide>
		    <swiper-slide>I'm Slide 5</swiper-slide>
		    <swiper-slide>I'm Slide 6</swiper-slide>
		    <swiper-slide>I'm Slide 7</swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>//
		    <div class="swiper-button-prev" slot="button-prev"></div>
		    <div class="swiper-button-next" slot="button-next"></div>
		    <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
		  </swiper>
	</div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{ 
  	data() {
      return {
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          loop:true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: {delay:3000}, //设置多久自动滚动一次
          direction : 'horizontal',  //滚动的方向，horizontal：横向水平 ； vertical:竖直的；
          grabCursor : true, //手抓形状
          setWrapperSize :true,
          autoHeight: true,
          pagination : {el : '.swiper-pagination' ,clickable:true},
          //pagination :  '.swiper-pagination' ,
          paginationClickable :true,
          navigation: { //最新版本的需要这样配置，按钮才有效
          prevEl:'.swiper-button-prev',//上一张
          nextEl:'.swiper-button-next'//下一张
          },
          scrollbar:'.swiper-scrollbar',//滚动条
          mousewheelControl : true,
          observeParents:true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          //debugger: true,
        }
      }
      },
      computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
    	changess(eee){
    		console.log(eee);
    	}
    },
   	components: {
	    swiper,
	    swiperSlide
	  }
   
  }  
</script>

<style scoped="scoped">
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