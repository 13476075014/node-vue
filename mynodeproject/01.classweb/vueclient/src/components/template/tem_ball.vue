<template>
	 <!-- 加入购入车按钮的小球动画实现 -->
      <div class="ball-container">
        <transition v-on:after-enter="afterEnter" v-on:enter="enter" v-on:before-enter="beforeEnter" name="drop" v-for="(litterBall,indexBall) in balls" :key="indexBall">
          <div v-show="litterBall.show" class="ball" :style="{left:leftMy,bottom:bottomMy}">
            <div class="inner" :class="indexBall">

            </div>
          </div>
        </transition>
      </div>
</template>

<script>
	import Velocity from 'velocity-animate' ;
	
	export default{
		data(){
			return {
				balls:[//小球
	            {show:false,index:0},
	            {show:false,index:1},
	            {show:false,index:2},
	            {show:false,index:3},
	            {show:false,index:4},
	            {show:false,index:5},
	            {show:false,index:6},
	            {show:false,index:7},
	            {show:false,index:8},
	            {show:false,index:9},
	            {show:false,index:10},
	            {show:false,index:11}
	          ],
	          dropBall:[]//正在下落的小球
			}
		},
		props:{
			leftMy:{
				type:String,
				default:"0"
			},
			bottomMy:{
				type:String,
				default:"0"
			}
		},
		mounted(){
		},
		methods:{
			drop(el){//小球动画方法,el就是加号按钮元素
		        for(var i=0;i<this.balls.length;i++){
		           if(!this.balls[i].show){//把小球show为false的变成true，展示出来
		            let ball = this.balls[i];
		            ball.show = true;  //这里这样写他继承的this.balls的值也会变成true
		            ball.el = el; //把这个球的位置保留下来
		            this.dropBall.push(ball);  //把这个已经drop的球放到dropBall中
		            return  //结束循环和函数，不会让循环再往后执行了
		          }
		        }
		   },
	        beforeEnter(els){
	        	var _this = this;
	              let nn = this.dropBall;
	              let count = this.dropBall.length -1 ;
	              nn.forEach((el) => {
	                   //console.log(el)
	              })
	
	              let ball = this.dropBall[count];
                  let rect = ball.el.getBoundingClientRect();  //getBoundingClientRect()可以获取到元素对象和窗口的相对上下左右的距离
                  var rect2 = els.getBoundingClientRect();
                  let x = rect.left - parseInt(_this.leftMy) ; //点击元素的左边距离 - 下面购物车左边的距离，就是小球要运动的X轴距离
                  let y =-(window.innerHeight - rect.top - parseInt(_this.bottomMy)) ;//窗口的高度 - 点击元素离窗口的高度 - 购物车底部的padding,margin高度，就是小球要运动的y轴距离，且是向下运动，所以是负值
                  els.style.opacity = 1;
                  els.style.webkitTransform = `translate3d(0,${y}px,0)`;
                  els.style.transform = `translate3d(0,${y}px,0)`; //外层做纵轴运动

                    //内层做横轴运动
                  let inner = els.getElementsByClassName('inner')[0];
                  inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                  inner.style.transform = `translate3d(${x}px,0,0)`;
	
	                 
	            },
	            enter(els,done){
	              var _this = this;
	              let hh = els.offsetHeight; //手动获取这个值，触发浏览器重绘
	               _this.$nextTick(function(){
	                  //内层做横轴运动
	                  els.style.opacity = "0";
	                  //let inner = els.getElementsByClassName('inner')[0];
	                  let inner = els.querySelector(".inner");
	                  Velocity(els,{transform:"translate3d(0,0,0)"},{duration:600});//这里位置根据最后要停的位置来写
	                  Velocity(inner,{transform:"translate3d(0,0,0)"},{duration:600,complete:function(){
	                         //var sty = window.getComputedStyle(inner)
	                        done();
	                      }
	                     });
	               });
	
	
	            },
	            afterEnter(els){
	                 let ball = this.dropBall.shift();
	                  if(ball){
	                    ball.show = false;
	                    els.style.display = "none"; //这个很重要
	                  }
	               //els.style.opacity = 0;
	            }
		}
	}
</script>

<style scoped>
	.ball-container .ball{
      position:fixed;
      left:0px;
      bottom:0px;
      z-index:900;
      transform:translate3d(0,0,0);
      transition:all 0.6s cubic-bezier(0.49,-0.29,0.75,0.41);
      }
      .ball-container .ball .inner{
        width:16px;
        height:16px;
        border-radius:100%;
        background:rgb(0,160,220);
        transition:all 0.6s linear;
        transform:translate3d(0,0,0);}
</style>



























