<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in itemClasslass" class="star-item" :key="index" :class="item"></span>

    <slot></slot>
  </div>
</template>

<script>
const lengths = 5;
const starOn = 'on';
const starHalf = 'half';
const starOff = 'off';

  export default({
    data(){
      return {

      }
    },
    props:{
      size:{
        type:Number,
        default:function(){
          return 48
        }
      },
      score:{
        type:Number,
        default:function(){
          return 5
        }
      }
    },
    created() {
    },
    computed:{
      starType(){
        return 'star-' + this.size
      },
      itemClasslass(){//星星的数组
          let result = [];
          let score = Math.floor(this.score * 2) / 2; //例如：把分数处理成在4.5以上及4.5就变成向上取整5，在4.5以下就变成4.5


          //是否需要半星
          let starhalf = score%1 != 0 ? true : false ;

          //几颗全星
          let fullstar = Math.floor(score);
          for(var i=0 ; i<fullstar;i++){//放全星
            result.push(starOn);
          }
          if(starhalf){//放半星
            result.push(starHalf)
          }
          if(result.length < lengths){//如果没有满到五个星就用灰色的星星补齐9
            var offstar = lengths - result.length;
            for(var i=0;i<offstar;i++){
                result.push(starOff);
            }
          };
          return result;
      }
    }
  })
</script>

<style lang="stylus" scoped>
// @import "../../common/stylus/mixin";

  .star
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')


</style>

