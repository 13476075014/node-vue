<template>
    <div id="goods" class="goods">
      <div class="menu-wrapper" ref="menu_wrapper">
        <ul>
          <li @click="selectMenu(index,$event)" class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex == index}" :key="index">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-- 商品展示 -->
      <div class="foods-wrapper" ref="food_wrapper">
        <ul>
          <li v-for="(item,index) in goods" :ref="'li_food_list_' + index" class="food-list" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index2) in item.foods" :key="index2" class="food-item"  @click="showFoodDetail(food)">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food" @drop="drop"></cartControl>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <shopCar :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFood"></shopCar>

       <!-- 加入购入车按钮的小球动画实现 -->
      <div class="ball-container">
        <transition v-on:after-enter="afterEnter" v-on:enter="enter" v-on:before-enter="beforeEnter" name="drop" v-for="(litterBall,indexBall) in balls" :key="indexBall">
          <div v-show="litterBall.show" class="ball">
            <div class="inner" :class="indexBall">

            </div>
          </div>
        </transition>
      </div>
      <!-- 商品点击的详情页面遮罩 -->
      <transition name="foodstran">
        <food :food="showDetailFood" v-show="showFlag" :showFlag="showFlag" @closeFlag="closeFlag"></food>
      </transition>

    </div>
</template>


<script>
import Velocity from 'velocity-animate'
import BScroll from 'better-scroll'
import shopCar from '../shopCar/shopCar'
import cartControl from '../cartControl/cartControl'
import food from '../food/food'
import {goods} from '@/common/js/builddata.js'

export default {
    name:"goods",
    data(){
        return {
          showDetailFood:{},
          showFlag:false,//控制点击商品的详细页面
          goods:[],
          listHeight:[],
          currentIndex:0,
          scrollY:0,
          classMap:["decrease","discount","special","invoice","guarantee"],
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
          dropBall:[]
        }
    },
    created(){
      var _this = this;
       _this.goods = goods.data;
      _this.$nextTick(() => {//dom要渲染完再调用betterscroll
          _this._calculateHeight()
          _this._initScroll();
      })
      /*this.$reqs.get("/api/goods").then(result => {
        if(result.status == 200){
          _this.goods = result.data.data.data;
          _this.$nextTick(() => {//dom要渲染完再调用betterscroll
              _this._calculateHeight()
              _this._initScroll();
          })

        }
        //console.log(_this.goods);
      })*/
    },
    methods:{
      _initScroll(){//滚动的方法
        this.menuScroll = new BScroll(this.$refs.menu_wrapper,{
          click:true   //必须要写上这个属性才可以点击左侧菜单
        })
        this.foodsScroll = new BScroll(this.$refs.food_wrapper,{
          click:true,
          probeType:3 //实时监测滚动的位置
        });
        this.foodsScroll.on('scroll',(pos) => {//获取实时滚动的高度
          this.scrollY = Math.abs(Math.round(pos.y));
          //把这个高度和计算的数组高度作比较看要左侧停留在哪里
          for(var i=0;i<this.listHeight.length;i++){
             if(this.scrollY < this.listHeight[0]){//在第一个位置的时候
              this.currentIndex = 0;
              return ;
            }
            var height1 = this.listHeight[i];
            var height2 = this.listHeight[i+1];
            //console.log(!height2)
            if(!height2 ||  (this.scrollY >= height1 && this.scrollY < height2) ){
              //console.log(this.scrollY,height1,height2,i)
              this.currentIndex = i+1;
              return ;
            }
          }
        })

      },
      _calculateHeight(){//计算右边商品的各个组的高度，放到数组里，便于后面做滚动左边跟着变的效果
        var _this = this;
        var li_height = 0;
        for(var i=0;i<_this.goods.length;i++){
          var food_list = this.$refs["li_food_list_" + i][0];
           li_height += food_list.clientHeight;
          _this.listHeight.push(li_height);
        };
        //console.log(_this.listHeight)

      },
      selectMenu(index,event){//点击左侧菜单的时候，右侧也相应改变，实现的原理是用的betterScroll的scrollToElement(el,time);
        if(!event._constructed){//在betterScroll中把这个值设置的true,浏览器原生的点击事件是没有这个属性的，这里是防止在pc端点击事件被派发两次
          return ;
        };
        this.foodsScroll.scrollToElement(this.$refs["li_food_list_" + index][0],300)
        //console.log(index)
      },
       drop(el){//小球动画方法,el就是加号按钮元素
        for(var i=0;i<this.balls.length;i++){
           if(!this.balls[i].show){//把小球show为false的变成true，展示出来
            let ball = this.balls[i];
            ball.show = true;  //这里这样写他继承的this.balls的值也会变成true
            ball.el = el; //把这个球的位置保留下来
            this.dropBall.push(ball);  //把这个已经drop的球放到dropBall中
            //console.log(this.dropBall,222)
            return  //结束循环和函数，不会让循环再往后执行了
          }
        }
      },
       beforeEnter(els){
              let nn = this.dropBall;
              let count = this.dropBall.length -1 ;
              nn.forEach((el) => {
                   //console.log(el)
              })

              //while(count--){
                //let ball = this.balls[count];
                let ball = this.dropBall[count];
                  //if(ball.show){//ball.el就是前面把点击的元素绑在了ball.el属性上
                    let rect = ball.el.getBoundingClientRect();  //getBoundingClientRect()可以获取到元素对象和窗口的相对上下左右的距离
                    var rect2 = els.getBoundingClientRect();
                    let x = rect.left - 18 ; //点击元素的左边距离 - 下面购物车左边的距离，就是小球要运动的X轴距离
                    let y =-(window.innerHeight - rect.top -32) ;//窗口的高度 - 点击元素离窗口的高度 - 购物车底部的padding,margin高度，就是小球要运动的y轴距离，且是向下运动，所以是负值
                    //els.style.display ="";
                    els.style.opacity = 1;
                    els.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    els.style.transform = `translate3d(0,${y}px,0)`; //外层做纵轴运动

                    //内层做横轴运动
                    let inner = els.getElementsByClassName('inner')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;

                  //}
              //}
            },
            enter(els,done){
              var _this = this;
              let hh = els.offsetHeight; //手动获取这个值，触发浏览器重绘
               _this.$nextTick(function(){
                  //els.style.webkitTransform = 'translate3d(0,0,0)';
                  //els.style.transform = 'translate3d(0,0,0)'; //外层做纵轴运动
                  //内层做横轴运动
                  els.style.opacity = "0";
                   let inner = els.getElementsByClassName('inner')[0];
                  //inner.style.webkitTransform = 'translate3d(0,0,0)';
                  //inner.style.transform = 'translate3d(0,0,0)';
                  Velocity(els,{translate3d:"translate3d(0,0,0)"},{duration:600});
                  Velocity(inner,{translate3d:"translate3d(0,0,0)"},{duration:600,complete:function(){
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
            },
            showFoodDetail(food){//商品点击后展开的详情页面
                this.showFlag = true;
                this.showDetailFood = food;
            },
            closeFlag(){
              this.showFlag = !this.showFlag;
            }

    },
    props:{
      seller:{
        type:Object
      }
    },
    computed:{
      selectFood(){
        let foods = [];
        this.goods.forEach(good => {//循环goods
          good.foods.forEach(food => {//循环goods里面的foods
            if(food.count){
              foods.push(food)
            }
          })
        })
       // console.log(foods)
        return foods
      }

    },
    components:{
      shopCar,
      cartControl,
      food
    },
    transition:{//定义全局的transition的钩子函数
        drop:{//这里的drop是在标签中写的transition的name

        }
    }
}
</script>

<style lang="stylus" scoped>
.goods
  position:absolute
  width:100%
  top:179px
  bottom:46px
  overflow: hidden
  display: flex
  .menu-wrapper
    flex:0 0 80px
    width:80px
    background:#f3f5f7
    .menu-item
      display:table
      height:49px
      width:100%
      line-height :14px
      text-align center
      &.current
        background white
        margin-top -1px
        position relative
        font-weight 400
        z-index 10
        .text
          border none
      .icon
        display:inline-block
        vertical-align:top
        width:12px
        height:12px
        margin-right:4px
        background-size:12px 12px
        background-repeat:no-repeat
        &.decrease
          bg-image('decrease_1')
        &.discount
          bg-image('discount_1')
        &.special
          bg-image('special_1')
        &.invoice
          bg-image('invoice_1')
        &.guarantee
          bg-image('guarantee_1')
      .text
        display table-cell
        width 56px
        padding 0 10px
        vertical-align middle
        font-size:12px
        border-bottom :1px solid rgb(222,222,222)

  .foods-wrapper
    flex:1
    text-align left
    .title
      padding-left 14px
      height 26px
      line-height  26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147,153,159)
      background #f3f5f7
    .food-item
      position relative
      display flex
      margin 18px
      padding-bottom 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      &:last-child
        border-bottom none
        margin-bottom 0
      .icon
        flex 0 0 50px
        margin-right 10px
        img
          width 57px
          height 57px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .desc ,.extra
          line-height 12px
          font-size 10px
          margin-bottom 8px
          color rgb(147,153,159)
        .extra
          line-height 10px
          &>span
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 17px
            font-size 14px
            color rgb(240,20,20)
          .old
            text-decoration line-through
            color rgb(147,153,159)
            font-size 10px
      .cartControl-wrapper
        position absolute
        right 0px
        bottom 10px

  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 900
      transform translate3d(0,0,0)
      transition all 0.6s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width 16px
        height 16px
        border-radius 100%
        background rgb(0,160,220)
        transition all 0.6s linear
        transform translate3d(0,0,0)

</style>
