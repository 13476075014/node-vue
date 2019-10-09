<template>
  <div class="control">
    <div class="inner">
      <div class="count" ref="num1">
        <div class="countInner" v-for="(item,index) in count" :key="index" :class="'count' + index">
          <i class="el-icon-location-outline"></i>
          <div class="vc">
            <v-countup :start-value="item.start" :end-value="item.end"></v-countup>
            <p class="detail">people</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        count:[{start:0, end:90}, {start:0, end:90}, {start:0, end:90}, {start:0, end:90}]
      }
    },
    created () {
       // this._initCount(this.$refs.num1, 90)
    },
    methods:{

    }
  }
</script>

<style lang="stylus" scoped>
.count
  display flex
  justify-content space-between
  flex-flow row wrap
  .countInner
    flex 0 1 20%
    height 100px
    border-radius 7px
    border 1px solid rgb(233,233,233)
    text-align center
    display flex
    align-items center
    &.count0
      i
        background rgb(108,202,201)
    &.count1
      i
        background rgb(255,108,96)
    &.count2
      i
        background rgb(248,211,71)
    &.count3
      i
        background rgb(87,200,242)
    i
      flex 0 0 108px
      line-height 100px
      border-radius 7px 0 0 7px
      color white
      font-size 30px
    .vc
      flex 1
      font-weight 300
      color #c6cad6
      font-size 36px
      .detail
        font-weight 200
        font-size 15px

  @media screen and (max-width: 1000px) {
    .countInner{
      flex 0 0 45%
      margin-top 10px
      }
    .countInner i{
      flex 0 0 50px
      }
  }
</style>
