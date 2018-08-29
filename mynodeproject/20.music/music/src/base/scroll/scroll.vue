<!-- 这个是封装的公用的scroll滚动组件 -->

<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default{
    props:{
      probeType:{// 监听哪种滚动方式，快速，慢速等等
        type:Number,
        default:1
      },
      click:{// 是否派发点击事件
        type:Boolean,
        default:true
      },
      data:{// 里面的数据，需要init的
        type:Array,
        default:null
      }

    },
    mounted () {
      this._initScroll()
    },
    methods:{
      _initScroll () {
        if (!this.$refs.wrapper) {
          return true
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType:this.probeType,
          click:this.click
        })
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () { // 刷新数据
        this.scroll && this.scroll.refresh()
      }
    },
    watch:{
      data () { // 如果数据有变化的时候重新刷新scroll,重新计算高度之类的
        this.refresh()
      }
    }

  }
</script>

<style lang="stylus" scoped>

</style>
