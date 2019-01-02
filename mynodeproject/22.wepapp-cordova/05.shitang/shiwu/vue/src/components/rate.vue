<template>
<transition name="leftIn">
  <div class="rate" v-if="show">
    <div class="top">
      <div class="inner">
        <p>点评记录</p>
        <p class="line">
          <span class="left"></span>
          <i class="dot"></i>
          <span class="right"></span>
        </p>
        <p class="tip">健康饮食</p>
      </div>
    </div>
    <div class="content">
      <pull :items="items" class="pull">
        <ul>
          <li @click="selectRate(item)" v-for="(item,index) in 6" :key="index">
            <div class="date">
              2018-01-22
            </div>
            <div class="main">
              <div class="avatar">
                <p><img src="../assets/imgs/bar1.jpg" alt=""></p>
                <p class="text">张三</p>
              </div>
              <div class="desc">
                <div class="block">
                  <el-rate
                    class="star"
                    disabled
                    v-model="items[index]">
                  </el-rate>
                </div>
                <p class="text">饿哦说或或或或或或或或或或或或</p>
              </div>
            </div>
          </li>
        </ul>
      </pull>
    </div>
  </div>
</transition>
</template>

<script>
import pull from '@/base/scrollupAndDown'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      show: {
        type: Boolean,
        default: false
      },
      items: [1, 2, 3, 4, 5, 6],
      val: 3.5
    }
  },
  created () {
    this.$emit('changtab', '1')
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    selectRate (item) {
      this.$confirm('哈哈哈哈哈哈哈哈哈', '详细评论', {
        confirmButtonText: '确定',
        type: 'warning',
        customClass: 'myConfirm'
      })
    },
    init () { // 获取初始值
      this.$axios.get(`api/APPProduct/GetMyCommentProductList?CanteenToken=${this.userToken}`).then(res => {

      })
    }
  },
  computed: {
    ...mapState(['userToken'])
  },
  components: {
    pull
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.rate
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  text-align center
  .top
    padding 40px 0
    background url('../assets/imgs/bg14.jpg') center no-repeat
    background-size cover
    .inner
      padding 10px 0
      background rgba(255,255,255,0.8)
      .line
        display flex
        align-items center
        justify-content center
        padding 5px 0
        .left,.right
          display inline-block
          height 2px
          background rgb(214,214,214)
          width 80px
        .dot
          display block
          width 5px
          height 5px
          background rgb(114,114,114)
          border-radius 100%
          margin 0 15px
      .tip
        font-size 12px
        color rgb(188,188,188)
  .content
    position absolute
    top 130px
    bottom 0px
    width 100%
    .pull
      li
        width 90%
        margin 0 auto
        background white
        padding 15px 10px
        padding-top 0
        margin-bottom 10px
        border-radius 5px
        box-shadow 2px 2px 10px 0.1px $color-text-yellow
        .date
          text-align right
          color $color-text-lll
          font-size 12px
          padding-top 5px
        .main
          display flex
          align-items center
          justify-content space-between
          .avatar
            p
              font-size 14px
              color $color-text-ll
              &.text
                padding-top 5px
            img
              width 50px
              height 50px
              border-radius 100%
              border 1px solid $color-text-yellow
          .desc
            text-align left
            padding-left 50px
            .text
              padding-top 10px
              line-height 20px
              height 50px
              overflow hidden
              color $color-text-ll
</style>
