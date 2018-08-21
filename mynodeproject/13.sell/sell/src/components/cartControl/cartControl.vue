<template>
  <div class="cartControl">
    <transition name="decrease">
      <div class="cart-decrease" @click.stop="decreaseCart($event)" v-show="food.count>0">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>

    <transition name="increase">
      <div class="cart-increase" @click.stop="addCart($event)">
        <i class="icon-add_circle"></i>
      </div>
    </transition>
  </div>
</template>


<script>
import Vue from 'vue';

  export default({
    name:"cartControl",
    data(){
      return{
      }
    },
    props:{
      food:{
        type:Object
      }
    },
    methods:{
      addCart(event){//增加按钮的点击事件
        if(!event._constructed){
          return ;
        };
          if(!this.food.count){
          //this.food.count = 1; //这样直接去给对象赋值一个其之前没有的属性的时候，vue是不会重新渲染的，因为objectdefined找不到这个属性，需要用下面的方法
          Vue.set(this.food,'count',1);
        }else{
          this.food.count ++;
        };

        //写点击加购物车后的小球飞的动画
        var el_target = event.currentTarget;
        this.$emit("drop",el_target);
      },
      decreaseCart(event){
        if(!event._constructed){
          return;
        };
          this.food.count --;
      }
    },
    created() {

    }

  })
</script>

<style lang="stylus" scoped>
.cartControl
  font-size 0px
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
  .cart-increase
    padding 6px
    display inline-block
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
  .cart-count
    display inline-block
    font-size 10px
    width 12px
    padding-top 6px
    line-height  24px
    text-align center
    vertical-align top
    color rgb(147,153,159)
  .decrease-enter-active, .decrease-leave-active,.increase-enter-active, .increase-leave-active
    opacity 1
    transition all linear .5s
    transform translate3d(0,0,0)
  .decrease-enter-active, .decrease-leave-active
     transform translate3d(0,0,0) rotate(0deg)
  .decrease-enter, .decrease-leave-to
    opacity 0
    transform translate3d(24px,0,0) rotate(180deg)
  .increase-enter, .increase-leave-to
    opacity 0


</style>

