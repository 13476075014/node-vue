<template>
  <div class="shopCar">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalCount>0}">
            <span class="icon-shopping_cart"></span>
            <span class="num">{{totalCount}}</span>
          </div>
        </div>
        <div class="price" :class="{highlight:totalCount>0}">
            ￥{{totalPrice}}
        </div>
        <div class="desc">
            另需配送费￥ {{deliveryPrice}}
        </div>
      </div>

      <div class="content-right" :class="{notenough:totalPrice<minPrice , enough:totalPrice>=minPrice}">
        {{paydesc}}
      </div>
    </div>

    <!-- 购物车点击的展开 -->
    <transition name="shopcartList">
       <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">
            购物车
          </h1>
          <span class="empty" @click="empty">
            清空
          </span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartControl :food="food"></cartControl>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

     <!-- 黑色的遮罩 -->
    <transition name="shell">
      <div v-show="listShow" class="shell"></div>
    </transition>
  </div>
</template>


<script>
import cartControl from '../cartControl/cartControl'
import BScroll from 'better-scroll'

  export default{
    name:"shopCar",
    data(){
      return {
        //listShow:false
        fold:true
      }
    },
    props:{
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      },
      selectFoods:{
        type:Array,
        default(){
          return [{name:"nn",price:22,count:1}];
        }
      }
    },
    created() {
      var _this = this;

    },
    components:{
      cartControl
    },
    methods:{
      _shopinit(){
        var _this = this;
          _this.$nextTick(function(){
          _this.scroll = new BScroll(_this.$refs.listContent,{
            hasVerticalScroll:true,
            click:true
          });
          _this.scroll.hasVerticalScroll = true;

        })
      },
      toggleList(){//展示购物车详细列表
        if(!this.totalCount){
          return;
        }
        this.fold = !this.fold;
        this._shopinit();
      },
      empty(){
        this.selectFoods.forEach(function(food){
          food.count = 0;
        })
      }
    },
    computed:{
      totalPrice(){ //计算总价的函数
        let total = 0;
        this.selectFoods.forEach(food => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount(){//商品的个数总和
         let total = 0;
        this.selectFoods.forEach(food => {
          total +=  food.count;
        });
        return total;
      },
      paydesc(){//最底部右边的对金额变化和总额差的一些描述
        if(this.totalPrice == 0 ){
          return `￥${this.minPrice}元起送`
        }else if(this.totalPrice < this.minPrice){
          let needpay = this.minPrice - this.totalPrice;
          return `还差￥${needpay}元起送`
        }else{
          return "去结算"
        }

      },
      listShow(){
        if(!this.totalCount){
          this.fold = true;
          return false;
        };
        let show = !this.fold;
        return show;
      }

    }
  }
</script>


<style lang="stylus" scoped>
  .shopCar
    position fixed
    left 0
    bottom 0
    z-index 800
    width 100%
    height 48px
    .content
      position relative
      z-index 2
      height 48px
      display flex
      background #141d27
      .content-left
        flex 1
        text-align left
        font-size 0
        .logo-wrapper
          text-align center
          color rgba(255,255,255,0.4)
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 100%
          background #141d27
          .num
            position absolute
            border-radius 16px
            font-size 10px
            top 0
            right 0
            width 24px
            height 16px
            text-align center
            line-height 16px
            background red
            color white
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
          .logo
            width 100%
            height 100%
            background rgb(42,51,59)
            line-height 44px
            border-radius 100%
            font-size 24px
            &.highlight
              background rgb(0,160,220)
              color #fff
        .price
          vertical-align top
          display inline-block
          font-size 16px
          color rgba(255,255,255,0.4)
          margin 0 12px 0 18px
          line-height 48px
          height 48px
          font-weight 700
          &.highlight
              color #fff
        .desc
          display inline-block
          margin 0 12px
          color rgba(255,255,255,0.4)
          font-size 12px
          font-weight 300
          vertical-align top
          height 48px
          line-height 48px
      .content-right
        text-align center
        vertical-align top
        flex 0 0 105px
        width 105px
        margin 0 0px 0 12px
        line-height 48px
        height 48px
        font-size 12px
        font-weight 700
        color rgba(255,255,255,0.4)
        &.notenough
          background #2b333b
        &.enough
          background #00b43c
          color white
    .shopcart-list
      background white
      position absolute
      left 0
      top 0
      z-index 1
      width 100%
      transform translate3d(0,-100%,0)
      .list-header
        line-height 40px
        height 40px
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        padding 0 18px
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right
          font-size 12px
          color rgb(0,160,220)
      .list-content
        padding 0 18px
        max-height 217px
        background #fff
        text-align left
        overflow hidden
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-bottom 1px solid rgba(7,17,27,0.1)
        .name
          line-height 24px
          font-size 14px
          color rgb(7,17,27)
        .price
          position absolute
          right 90px
          bottom 12px
          font-size 14px
          line-height 24px
          color rgb(240,20,20)
          font-weight 700
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
    .shopcartList-enter,.shopcartList-leave-to
      transform translate3d(0,0,0)
    .shopcartList-enter-active, .shopcartList-leave-active
      transition all linear .5s
    .shell
      position fixed
      bottom 0
      left 0
      width 100%
      height 100vh
      z-index -1
      opacity 1
      background rgba(7,17,27,0.6)
    .shell-enter,.shell-leave-to
      height 0px
      opacity 0
    .shell-enter-active,.shell-leave-active
      transition all linear .1s
    .foodstran-enter,.foodstran-leave-to
      transform translate3d(100%,0,0)
    .foodstran-enter-active,.foodstran-leave-active
      transition all linear .5s


</style>

