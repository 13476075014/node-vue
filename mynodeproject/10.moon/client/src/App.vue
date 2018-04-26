<template>
  <div id="app">
   <onehead> </onehead>
   <onefoot></onefoot>
    <router-view/>
  </div>
</template>

<script>
import onehead from './components/head.vue' ;  //引入的头部组件
import onefoot from './components/foot.vue' ;  //引入的头部组件

export default {
  name: 'App',
  data(){
    return {

    }
  },
  components:{
    onehead:onehead,
    onefoot:onefoot
  }

}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
