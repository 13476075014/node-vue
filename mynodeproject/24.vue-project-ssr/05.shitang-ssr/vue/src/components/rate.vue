<template>
  <div class="rate">
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
    <no-result v-if="!items.length > 0" title="暂时没有评价！！"></no-result>
    <div class="content" v-if="items.length > 0">
      <pull @onPullingDown="onPullingDown" :pullUpLoad="pullUpLoad" :items="items" class="pull">
        <ul>
          <li @click="selectRate(item)" v-for="(item,index) in items" :key="index">
            <div class="date">
              {{item.CreateTime.substring(0,10)}}
            </div>
            <div class="main">
              <div class="avatar">
                <!-- ../assets/imgs/bar1.jpg -->
                <p><img :src="my ? 'http://chenxiaoming.canteen.sundar.top:8060/' + userInfo.HeadImg : require('../assets/imgs/bar1.jpg')" alt=""></p>
                <p class="text">{{item.UserID}}</p>
              </div>
              <div class="desc">
                <div class="block">
                  <el-rate
                    class="star"
                    disabled
                    v-model="item['Star']">
                  </el-rate>
                </div>
                <p class="text">{{item.ContentMsg}}</p>
              </div>
            </div>
          </li>
        </ul>
      </pull>
    </div>
  </div>
</template>

<script>
import pull from '@/base/scrollupAndDown'
import {mapState} from 'vuex'
import noResult from '@/base/no-result'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    my: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: [],
      pullUpLoad: false
    }
  },
  created () {
    this.init()
  },
  activated () { // 每次进来都会调用这个
    if (this.$route.params.refresh === 0) { // 设置的让强制刷新页面
      this.init()
    }
  },
  methods: {
    selectRate (item) {
      this.$alert(item.ContentMsg, '详细评论', {
        confirmButtonText: '确定',
        customClass: 'myConfirm'
      })
    },
    init () { // 获取初始值
      this.$axios.get(this.url).then(res => {
        if (res.data.Code === 1) {
          console.log(res)
          this.items = res.data.Data
        } else {
          console.log(res)
        }
      }).catch(res => {

      })
    },
    onPullingDown () { // 下拉刷新
      setTimeout(() => {
        this.init()
      }, 1000)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {
    pull,
    noResult
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

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
    padding 30px 0
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
    top 110px
    bottom 0px
    width 100%
    .pull
      ul
        padding-bottom 30px
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
            flex 1
            text-align left
            padding-left 50px
            .text
              padding-top 10px
              line-height 20px
              height 50px
              overflow hidden
              color $color-text-ll
</style>
