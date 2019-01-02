<template>
  <transition name="leftIn">
    <div class="user" v-if="show">
      <div class="top">
        <div class="topbg">

        </div>
        <div class="card">
          <div class="inner">
            <div>
              <img src="../assets/imgs/bg7.jpg" alt="">
              <p>达酱</p>
            </div>
          </div>
        </div>
      </div>
      <div class="coontent">
        <ul>
          <li>
            <div class="left">
              <div class="fl">
                我的消息
              </div>
            </div>
            <div class="right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="fl">
                我的建议
              </div>
            </div>
            <div class="right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li>
            <div class="left">
              <div class="fl">
                我的点评
              </div>
            </div>
            <div class="right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
           <li>
            <div class="left">
              <div class="fl">
                联系方式
              </div>
            </div>
            <div class="right">
              <span>13476075014</span>
              <!-- <i class="el-icon-arrow-right"></i> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  created () {
    this.$emit('changtab', '3')
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.user
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  .top
    position relative
    .topbg
      background $color-text-yellow
      height 80px;
    .card
      position absolute
      width 100%
      top 30px
      padding 10px 30px
      .inner
        padding 10px 15px
        background white
        display flex
        align-items center
        justify-content center
        border-radius 7px
        div
          text-align center
          color $color-text-ll
          font-size 14px
          img
            width 60px
            height 60px
            border-radius 100%
            margin-bottom 5px
  .coontent
    padding-top 70px
    ul
      background white
      margin-top 10px
      li
        display flex
        justify-content space-between
        line-height 25px
        padding 5px 15px
        border-bottom 1px solid rgb(244,244,244)
        .left
          overflow hidden
          .fl
            float left
            img
              margin-right 10px
              width 25px
              vertical-align middle
        .right
          span
            color $color-text-ll
            font-size 12px
</style>
