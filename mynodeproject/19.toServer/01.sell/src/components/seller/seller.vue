<template>
    <div class="sellerWrapper" ref="sellerWrapper">
        <div class="bsInner">
          <div class="top sellerInfo">
            <h4 class="title">
              <div class="left">
                <p class="sellerName">{{seller.name}}</p>
                <p class="sellerStar">
                  <star :score="seller.score"></star>
                  <span class="sellerRatingCount">({{seller.ratingCount}})</span>
                  <span class="sellerSellCount">月售{{seller.sellCount}}</span>
                </p>
              </div>
              <div class="right">
                <p> <i class="icon icon-favorite"></i> </p>
                <p>已收藏</p>
              </div>
            </h4>
            <div class="detail">
              <div class="starSendPrice">
                <p>起送价</p>
                <div>
                  <span class="price">{{seller.minPrice}}</span>
                  元
                </div>
              </div>
              <div class="sendPrice">
                <p>商家配送</p>
                <div>
                  <span>{{seller.deliveryPrice}}</span>
                  元
                </div>
              </div>
              <div class="avgTime">
                <p>平均配送时间</p>
                <span>{{seller.deliveryTime
                }}</span>
                分钟
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="main sellerBllutin">
            <div class="detailBllutin">
              <h4>公告与活动</h4>
              <p>
                {{seller.bulletin}}
              </p>
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
          </div>
           <div class="line"></div>
           <!-- 商家实景 -->
           <div class="sellerPhoto">
             <h4>
               商家实景
             </h4>
             <div class="showImg" ref="phtoBS">
               <ul class="showImgUl" v-if="seller.pics">
                <li class="sellerImgLi" v-for="(item,index) in seller.pics" :key="index">
                  <img :src="item" alt="">
                </li>
              </ul>
             </div>
           </div>
           <div class="line"></div>
           <!-- 商家信息 -->
           <div class="sellerIfoDetail">
             <h4>
               商家信息
             </h4>
             <ul v-if="seller.infos">
               <li v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
             </ul>
           </div>
        </div>
    </div>
</template>

<script>
import star from '../star/star'
import BScroll from 'better-scroll'

export default {
    name:"",
    data(){
        return {
          classMap:["decrease","discount","special","invoice","guarantee"]
        }
    },
    mounted() {
       //console.log(this.seller)
       this.seller_init();
       this.photoToBS();
    },
    created() {

    },
    methods:{
      seller_init(){//初始化一些需要的数据
        var _this = this;
        this.$nextTick(function(){
          this.sellerBS = new BScroll(_this.$refs.sellerWrapper,{
            click:true
          })
        })
      },
      photoToBS(){
        var _this = this;
        if(_this.seller.pics){
           this.$nextTick(function(){
            var li = document.querySelectorAll(".sellerImgLi");
            var ulWidth = li.length * 120 + li.length*6 - 6;
            var ul = document.querySelector(".showImgUl");
            //console.log( ul )
            ul.style.width = "500px";
            _this.phtoBS = new BScroll(_this.$refs.phtoBS,{
              click:true,
              scrollX:true
            });
            //console.log(_this.phtoBS )
          //console.log(document.querySelector(".showImgUl").style.width)
        })
        }


      }
    },
    props:{
      seller:{ //这里的seller的在app.vue中就通过router-view绑定了这个属性，并赋值了
        type:Object
      }
    },
    components:{
      star
    },
    watch:{
      seller:function(val,oldVal){
        this.photoToBS();
      }
    }


}
</script>


<style lang="stylus">

.sellerWrapper
  position fixed
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  z-index -1
  .bsInner
    .top
      padding 18px
      .title
        display flex
        justify-content space-between
        .left
          flex 1
          text-align left
          font-size 0
          padding-bottom 18px
          .sellerName
            font-weight 700
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
          .sellerStar
            padding-top 8px
            .star
              display inline-block
              .star-item
                margin-right 8px
            .sellerRatingCount,.sellerSellCount
              margin-right 12px
              vertical-align top
              font-size 10px
              color rgb(77,88,93)
              line-height 18px
        .right
          flex 0 0 50px
          p
            font-size 10px
            .icon
              font-size 24px
              color rgb(240,20,20)
              line-height 24px
      .detail
        display flex
        justify-content center
        align-items center
        >div
          flex 1 1
          border-right 1px solid rgba(7,17,27,0.1)
          p
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            padding-bottom 4px
          span
            font-size 24px
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
        div:nth-of-type(3)
          border-right none
    .sellerBllutin
      padding 18px
      padding-bottom 0px
      .detailBllutin
        padding-bottom 18px
        text-align left
        h4
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
          padding-bottom 8px
          font-weight 700
        p
          padding-left 12px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
      .infomation
          text-align left
          li
            padding 16px 0
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            line-height 16px
            border-top 1px solid rgba(7,17,27,0.1)
            .icon
              margin-left 12px
              display:inline-block
              vertical-align:middle
              width:24px
              height:24px
              margin-right:6px
              background-size:100%
              background-repeat:no-repeat
              &.decrease
                bg-image('decrease_3')

              &.discount
                bg-image('discount_3')
              &.special
                bg-image('special_3')
              &.invoice
                bg-image('invoice_3')
              &.guarantee
                bg-image('guarantee_3')


    .sellerPhoto
      padding 18px
      padding-right 0
      h4
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        padding-bottom 12px
        text-align left
      .showImg
        width 100%
        ul
          white-space nowrap
          li
            height 90px
            display inline-block
            margin-right 6px
            img
              width 120px
              height 90px
    .sellerIfoDetail
      padding 18px
      text-align left
      h4
        font-size 14px
        font-weight 700
        line-height 14px
        padding-bottom 14px
      ul
        li
          border-top 1px solid rgba(7,17,27,0.1)
          padding 16px 12px
          font-size 12px
          font-weight 200
          color rgb(7,17,27)
          line-height 16px
</style>
