<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item style="height:auto!important;" v-for="(item,index) in result" :key="index">
      <img :src="item.src" alt="刷新看看">
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default{
  data () {
    return {
      result: [{'src': require('../assets/imgs/bg1.png')}, {'src': require('../assets/imgs/bg2.jpg')}, {'src': require('../assets/imgs/bg1.png')}]
    }
  }
}

</script>

<style lang="stylus" scoped>
.el-carousel__item h3
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
.el-carousel__item:nth-child(2n)
  background-color: #99a9bf;
.el-carousel__item:nth-child(2n+1)
  background-color: #d3dce6;
img
  width 100%
</style>
