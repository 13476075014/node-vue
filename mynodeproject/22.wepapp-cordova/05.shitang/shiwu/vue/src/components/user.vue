<template>
  <transition name="leftIn">
    <div class="user" v-if="show">
      <div class="head">
        <i @click="goBack" class="el-icon-arrow-left"></i>
      </div>
      <div class="top">
        <div class="topbg">

        </div>
        <div class="card">
          <div class="inner">
            <div class="left">
              <div class="img">
              </div>
              <div class="desc">
                  <p>chunchun</p>
                  <p>至尊会员</p>
              </div>
            </div>
            <div class="right">
              <el-button type="warning" size="mini" round>警告按钮</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="coontent">
        <ul>
          <li>
            <div class="left">
              <div class="fl">
              </div>
              <div class="fl">
                我的消息
              </div>
            </div>
            <div class="right">
              哈哈哈
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
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .5s
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
  .head
    line-height 30px
    position fixed
    top 0
    left 0
    width 100%
    color white
    padding-left 15px
    z-index 3
  .top
    position relative
    .topbg
      background #C30000
      height 80px;
    .card
      position absolute
      width 100%
      top 60px
      padding 10px
      .inner
        padding 10px 15px
        background white
        display flex
        align-items center
        justify-content space-between
        .left
          overflow hidden
          .img
            float left
            img
              width 50px
          .desc
            float left
            line-height 25px
            margin-left 10px
  .coontent
    padding-top 80px
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
</style>
