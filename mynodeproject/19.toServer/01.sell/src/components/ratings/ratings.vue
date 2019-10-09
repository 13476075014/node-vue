<template>
    <div class="wrap_rating" ref="ratingWapper">
      <div class="scrolInner">
      <div class="rating_main">
        <div class="inner">
          <div class="left inner_count">
            <p class="count">{{seller.score}}</p>
            <p class="title">综合评分</p>
            <p class="detail">高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="right inner_star">
            <div class="shop">
              <span class="title">
                服务态度
              </span>
              <star :score="seller.serviceScore"></star>
              <span class="title score">
                4.0
              </span>
            </div>
            <div class="attitude">
              <span class="title">
                商品味道
              </span>
              <star :score="seller.foodScore"></star>
              <span class="title score">
                2.0
              </span>
            </div>
            <div class="send_time">
              <span class="title">
                送达时间
              </span>
              <span class="time">
                {{seller.deliveryTime}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 具体的评价内容 -->
      <div class="rating_detail">
         <div class="rating">
          <div class="brand">
            <button class="all" @click="showAll">全部 <i v-if="ratings">{{saveAllRatings.length}}</i></button>
            <button class="recommend" @click="showGood">满意 <i>{{goodOrBadCount["good"]}}</i></button>
            <button class="complain" @click="showBad">不满意 <i>{{goodOrBadCount["bad"]}}</i></button>
          </div>
          <div class="moreChoice">
            <i class="icon-check_circle" style="font-size:20px;vertical-align:middle;"></i>   只看有内容的评价
          </div>
          <div class="ratingContent">
              <ul>
                <li v-for="(item,index) in ratings" :key="index" :class="item.score == 5 ? 'good' :'bad' ">
                  <div class="avatarout">
                    <img :src="item.avatar" alt="">
                  </div>
                  <div class="rateTime">
                      <p class="time">{{item.username}}</p>
                      <p class="avatar reallyTime">
                        {{item.rateTime}}
                      </p>
                  </div>
                  <star :score="item.score"><span class="arriveTime">{{item.deliveryTime != "" ? item.deliveryTime : '**'}}分钟送达</span></star>
                  <div class="rateText">
                    {{item.text}}
                  </div>
                  <div class="advice">
                    <i class="icon icon-thumb_up"></i>
                    <ul>
                      <li v-for="(tag,tagIndex) in item.recommend" :key="tagIndex">
                        {{tag}}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import star from '../star/star'
import BScroll from 'better-scroll'
import {ratings,seller} from '@/common/js/builddata.js'

export default {
    name:"",
    data(){
        return {
          seller:[],
          ratings:[],
          saveAllRatings:[]

        }
    },
    created() {
      this.rating_init()
    },
    methods:{
      rating_init(){
        var _this = this;
        _this.seller = seller.data;

        /*this.$reqs.get("/api/seller").then(function(data){
          //console.log(data);
          _this.seller = data.data.data.data;
        });*/

        var originTime = ratings.data;
         originTime.forEach( (item,index) => {
              originTime[index].rateTime = _this.convertTime(originTime[index].rateTime)
          });
          _this.ratings = originTime;
          _this.saveAllRatings = originTime;

          _this.$nextTick(function(){//初始化better-scroll
            _this.ratingBS = new BScroll(_this.$refs.ratingWapper,{
              click:true
            })
           })
        /*this.$reqs.get("/api/ratings").then(function(result){
          var originTime = result.data.data.data;
         // _this.ratings =
          originTime.forEach( (item,index) => {
              originTime[index].rateTime = _this.convertTime(originTime[index].rateTime)
          });
          _this.ratings = originTime;
          _this.saveAllRatings = originTime;

          _this.$nextTick(function(){//初始化better-scroll
            _this.ratingBS = new BScroll(_this.$refs.ratingWapper,{
              click:true
            })
            //console.log(_this.ratingBS)
          })
        })*/

      },
      convertTime(cellval){//转换时间格式
        var date = new Date(cellval);

            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

            return date.getFullYear() + "-" + month + "-" + currentDate;

      },
      showAll(){//展示所有的评价
          this.ratings = this.saveAllRatings;
      },
      showGood(){//展示满意的评价
          var arr = [];
          this.saveAllRatings.forEach(item => {
            if(item.rateType == 0){//好的
              arr.push(item);
            }
          });
           this.ratings = arr;
      },
      showBad(){//展示不满意的评价
         var arr = [];
          this.saveAllRatings.forEach(item => {
            if(item.rateType == 1){//坏的
              arr.push(item);
            }
          });
           this.ratings = arr;
      }


    },
    components:{
      star
    },
    computed:{
      goodOrBadCount(){
        var goodArr = [];
        var badArr = [];
        this.saveAllRatings.forEach(item => {
          if(item.rateType==0){ //好评
            goodArr.push(item.rateType);
          }else if(item.rateType==1){
            badArr.push(item.rateType);
          }
        });
        return {good:goodArr.length,bad:badArr.length}
      }
    }
}
</script>


<style lang="stylus">
.wrap_rating
  position fixed
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  z-index -1
.rating_main
  .inner
    display flex
    .left
      flex 0 0 138px
      margin 18px 0
      text-align center
      font-size 0px
      border-right 1px solid rgba(7,17,27,0.1)
      align-items: center
      .count
        font-size 24px
        color rgb(255,153,0)
        line-height 28px
        margin-bottom 6px
      .title
        font-size 12px
        color rgb(7,17,27)
        line-height 12px
      .detail
        margin-top 8px
        font-size 10px
        color rgba(7,17,27,0.4)
        line-height 10px
    .right
      flex 1
      padding 18px 16px
      text-align left
      font-size 0px
      .title
        font-size 12px
        color rgb(7,17,27)
        line-height 12px
        display inline-block
        line-height 24px
        margin-right 12px
      .score
        color rgb(255,153,0)
        margin-right 0px
      .time
        font-size 12px
        color rgb(147,153,159)
        line-height 18px
      .star.star-48
        display inline-block
        line-height 24px
        vertical-align top
        .star-item
          margin-right 5px
.rating_detail
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
          position relative
          padding 18px 40px
          padding-right 0
          border-bottom 1px solid rgba(7,17,27,0.1)
          .avatarout
            width 28px
            height 28px
            position absolute
            left 0px
            top 18px
            img
              width 28px
              height 28px
              border-radius 100%
          .star
            .arriveTime
              font-size 10px
              font-weight 200
              color rgb(147,153,159)
              line-height 12px
            .star-item
              margin-right 6px
              width 12px
              height 12px
              background-size 100%
          .rateTime
            display flex
            .time
              flex 0 0 100px
              font-size 10px
              color rgb(147,153,159)
              line-height 10px
              align-items center
            .avatar
              font-size 0
              flex 1
              text-align right
              color rgb(147,153,159)
              font-size 10px
              align-items center
              img
                width 12px
                height 12px
                border-radius 100%
                margin-left 6px
          .rateText
            color rgb(7,17,27)
            font-size 12px
            line-height 18px
          .advice
            display flex
            .icon
              flex 0 0 12px
              margin-top 8px
            ul
              flex 1
              padding 0
              display flex
              flex-wrap wrap
              li
                padding 0
                border 1px solid rgba(7,17,27,0.1)
                border-radius 2px
                font-size 10px
                color rgb(147,153,159)
                line-height 16px
                padding 3px 8px
                margin-left 8px
                margin-top 8px
        li.good .icon
          color rgb(0,160,220)

</style>

