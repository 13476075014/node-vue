<template>
  <div id="app">
    <div class="inner">
      <pull
        ref="scroll"
        :data="items"
        :pullDownRefresh="pullDownRefreshObj"
        @pullingDown="onPullingDown"
      >
        <ul>
          <li v-for="(item,index) in items" :key="index">{{item}}</li>
        </ul>
      </pull>
    </div>
  </div>
</template>

<script>
//import Pull from '@/lib/pulldownandup'
//import Pull from '@/lib/gw_pulldown'
//import Pull from '@/lib/pulldownAndUP2'
import Pull from '@/lib/base/base_scroll'

export default {
  name: 'app',
  mounted(){

  },
  data () {
    return {
      items:[1,2,3,4,5,6],
      pullDownRefreshObj:{
        threshold:90,
        stop:50,
        txt:"hh"
      }
    }
  },
  methods:{
    onPullingDown(){//下拉刷新
      setTimeout(() => {
        if(Math.random() < 0.5) { // 模拟还有数据
            this.items.push(1)
        }else{ //模拟没有数据
            this.$refs.scroll.forceUpdate()
        }
      },2000)

    }
  },
  components:{
    Pull
  }
}
</script>

<style lang="stylus" scoped>
#app
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background red
  .inner
    height 100%
</style>
