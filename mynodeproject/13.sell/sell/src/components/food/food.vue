<!--商品点击后的展开商品详情页面-->

<template>
  <div id="food"  v-show="showFlag" class="food" ref="myfood">
    <div>
      <div class="foodDetail">
        <div class="back" @click="closeFlag">
          <i class="icon-close"></i>
        </div>
        <div class="avatar">
          <img :src="food.icon" alt="">
        </div>
        <div class="detail">
          <h1 class="title">{{food.name}}</h1>
          <p class="pres">月售{{food.sellCount}} <span>好评率{{food.rating}}%</span></p>
          <div class="price">
            <div class="left">
              <span class="newPrice">
                {{food.price}}
              </span>
              <span class="oldPrice">
                {{food.oldPrice}}
              </span>
            </div>
            <div class="right">
              <button @click="addCartDetail($event)">加入购物车</button>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>

      <!-- 商品介绍 -->
      <div class="foodsIntroduce">
        <h1 class="title">商品介绍</h1>
        <p>{{food.info}}</p>
      </div>
      <div class="line"></div>


      <!-- 商品评价 -->
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <div class="brand">
          <button class="all">全部 <i v-if="food.ratings">{{food.ratings.length}}</i></button>
          <button class="recommend">推荐 <i>55</i></button>
          <button class="complain">吐槽 <i>55</i></button>
        </div>
        <div class="moreChoice">
          只看有内容的评价
        </div>
        <div class="ratingContent">
            <ul>
              <li v-for="(item,index) in food.ratings" :key="index">
                <div class="rateTime">
                    <p class="time">20163....</p>
                    <p class="avatar">
                      {{item.username}}
                      <img :src="item.avatar" alt="">
                    </p>
                </div>
                <div class="rateText">
                  <i></i>
                  {{item.text}}
                </div>

              </li>
            </ul>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'

  export default{
    name:"food",
    data(){
      return {

      }
    },
    props:{
      food:{
        type:Object
      },
      showFlag:{
        type:Boolean,
        default:false
      }

    },
    created() {
      this.init();
    },
    methods:{
      init(){
        var _this = this;
        this.$nextTick(function(){
          _this.menuScroll = new BScroll(_this.$refs.myfood,{
            click:true   //必须要写上这个属性才可以点击左侧菜单
          })
        })
      },
      closeFlag(){
        this.$emit("closeFlag")
      },
      addCartDetail(event){//加入购物车的点击事件
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count ++ ;
        }

      }


    }
  }
</script>

<style lang="stylus" scoped>
  .food
    position fixed
    top 0
    left 0
    bottom 48px
    z-index 30
    width 100%
    background white
    .title
      text-align left
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
      height 14px
      margin 0 0 8px 0
    .line
      height 16px
      background #f3f5f6
      border-top 2px solid rgba(7,17,27,0.1)
      border-bottom 2px solid rgba(7,17,27,0.1)
    .foodDetail
      position relative
      .back
        position absolute
        top 5px
        left 5px
        color white
      .avatar
        img
          width 100%
          height auto
      .detail
        padding 18px
        text-align left
        .pres
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          span
            margin-left 12px
        .price
          padding 18px 0 0 0
          display flex
          .left
            flex 1
            .newPrice
              font-size 14px
              font-weight 700
              color rgb(240,20,20)
              line-height 14px
            .oldPrice
              font-size 10px
              font-weight 700
              color rgb(147,153,159)
              line-height 10px
              text-decoration line-through
          .right
            flex 0 0 74px
            button
              width 100%
              background rgb(0,160,220)
              border none
              font-size 10px
              color rgb(255,255,255)
              line-height 12px
              border-radius 24px
              text-align center
              padding 6px 0
    .foodsIntroduce
      padding 18px
      .title
        margin-bottom 6px
      p
        padding-left 8px
        font-size 12px
        font-weight 200
        color rgb(77,85,93)
        line-height 24px
        text-align left


    .rating
      padding 18px
      text-align left
      .title
        margin-bottom 18px
      .brand
        padding-bottom 18px
        font-size 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        button
          margin-right 8px
          font-size 12px
          color rgb(255,255,255)
          line-height 16px
          padding 8px 12px
          border none
          border-radius 2px
          &.all
            background rgb(0,180,220)
          &.recommend
            background rgba(0,160,220,0.2)
            color rgb(77,85,93)
          &.complain
            background rgba(77,85,93,0.2)
            color rgb(77,85,93)
      .moreChoice
        font-size 12px
        line-height  24px
        padding 12px 0
        position relative
        color rgb(147,153,159)
        &:after
          content ""
          display block
          width calc(100% + 36px)
          height 1px
          position absolute
          left -18px
          bottom 0
          background rgba(7,17,27,0.1)
      .ratingContent
        li
          padding 16px 0
          border-bottom 1px solid rgba(7,17,27,0.1)
          .rateTime
            padding-bottom 6px
            display flex
            .time
              flex 0 0 100px
              font-size 10px
              color rgb(147,153,159)
              line-height 12px
              margin-bottom 6px
            .avatar
              font-size 0
              flex 1
              text-align right
              color rgb(147,153,159)
              font-size 10px
              img
                width 12px
                height 12px
                border-radius 100%
                margin-left 6px
          .rateText
            color rgb(147,153,159)
            font-size 12px
            line-height 24px


</style>

