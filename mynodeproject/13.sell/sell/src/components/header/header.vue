<template>
 <div id="v_header" class="header" style="position:relative">
   <div class="content-wrapper top">
     <div class="avatar left">
       <img :src="seller.avatar" alt="">
     </div>
     <div class="content center">
       <div class="title">
         <span class="brand">
           <img src="" alt="">
         </span>
         <span class="name">
           {{seller.name}}
         </span>
       </div>
       <div class="description">
         {{seller.description}}/{{seller.deliveryTime}}分钟送达
       </div>
       <div v-if="seller.supports" class="support discount">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
       </div>
     </div>

     <!-- 按钮 -->
     <div v-if="seller.supports" class="support-count" @click="showDetail">
       <span class="count">
         {{seller.supports.length}}个
       </span>
       <span class="icon-keyboard_arrow_right count2"></span>
     </div>
   </div>
   <div class="bulletin-wrapper bottom" @click="showBulletinDetali">
     <span class="bulletin-title">

     </span>
     <span class="bulletin-text">
       {{seller.bulletin}}
     </span>
     <i class="icon-keyboard_arrow_right count2"></i>
   </div>

  <!-- 公告的点击查看详细浮层 -->
  <div class="bulletinDetail" v-show="showBulletin">
     <span class="bulletin-text">
       {{seller.bulletin}}
     </span>
     <i class="icon-close" @click="closeBulletinDetail"></i>
   </div>

    <!-- 虚幻的背景 -->
   <div class="background">
     <img :src="seller.avatar" width="100%" height="100%" alt="">
   </div>

  <!-- 浮层 -->
   <div class="detail" v-show="detailShow" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 优惠信息 -->
            <div class="sell-message">
              <div class="line_bottom"></div>
              <div class="text">优惠信息</div>
              <div class="line_bottom"></div>
            </div>
            <div class="infomation">
                <ul v-if="seller.supports">
                  <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                    <span class="text">
                      {{seller.supports[index].description}}
                    </span>
                  </li>
                </ul>
              </div>

            <!-- 商家信息 -->
            <div class="sell-message merchant-message">
              <div class="line_bottom"></div>
              <div class="text">商家公告</div>
              <div class="line_bottom"></div>
            </div>
            <div class="blletin" style="text-align:left;width:70%;margin:0 auto;font-weight:300;line-height:24px;font-size:12px;">
              {{seller.bulletin}}
            </div>

          </div>
        </div>
        <div class="detail-close"><i class="icon-close" @click="closedetail"></i></div>
    </div>
 </div>
</template>

<script>
import star from '../star/star'

export default {
  name: "v_header",
  data() {
    return {
      showBulletin:false,
      detailShow:false,
      classMap:["decrease","discount","special","invoice","guarantee"]
    };
  },
  props:{
    seller:{
      type:Object
    }
  },
  created() {
  },
  methods:{
    showDetail(){
      this.detailShow = true;
    },
    closedetail(){
      this.detailShow = false;
    },
    showBulletinDetali(){
      this.showBulletin = true;
    },
    closeBulletinDetail(){
      this.showBulletin = false;
    }
  },
  components:{
    star
  }
};
</script>


<style lang="stylus" scoped>

#v_header
  background:rgba(0,0,0,0.4)
  color:white
  .content-wrapper
    position relative
    padding: 24px 12px 18px 24px
    font-size 0
    text-align left
    .avatar
      display inline-block
      vertical-align top
      height 64px
      img
        width: 64px
        height: 64px
        border-radius: 2px
    .content
      display inline-block
      margin-left:16px
      font-size:14px
      .title
        margin:2px 0px 8px 0px
        .brand
          display inline-block
          width:30px
          height:18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
          vertical-align top
        .name
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold
      .description
        font-size 12px
        margin-bottom 7px
        line-height 12px
      .support
        .icon
          display:inline-block
          vertical-align:middle
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
            bg-image('invoice_1')
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background rgba(0,0,0,0.2)
      text-align center
      .count
        font-size 10px
      .count2
        font-size 10px

  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)



  .bulletinDetail
    background rgba(0,0,0,0.6)
    height 100vh
    z-index 999999
    position fixed
    top 0
    left 0
    display flex
    flex-direction column
    justify-content center
    span
      flex 0 0 200px
      padding 20px
    i
      flex 0 0 20px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    background rgba(0,0,0,0.3)
    .bulletin-title
      display inline-block
      width 22px
      height 12px
      vertical-align middle
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .count2
      position absolute
      right 0
      top 0
      line-height 28px
  .detail
    top 0
    left 0
    width 100%
    z-index 900
    height 100%
    position fixed
    overflow auto
    transition all linear 0.5s
    background rgba(7,17,27,0.8)
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        width 100%
        margin-top 64px
        padding-bottom 64px
        .name
          line-height 16px
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        .sell-message
          width 80%
          margin 28px auto 24px auto
          display flex
          .line_bottom
            flex 1
            position relative
            top -6px
            border-bottom 1px solid rgba(255,255,255,0.2)
          .text
            padding 0 12px
            font-size 14px
            font-weight 700
        .infomation
          width 70%
          margin 0 auto
          text-align left
          li
            padding 10px 0
            font-size 14px
            font-weight 100
            .icon
              display:inline-block
              vertical-align:middle
              width:16px
              height:16px
              margin-right:4px
              background-size:16px 16px
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
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      font-size 32px
      line-height 64px




</style>
