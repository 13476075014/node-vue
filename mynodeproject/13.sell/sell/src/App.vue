<template>
  <div id="app" class="app">
    <v_header></v_header>
    <div class="tab">
    <router-link :to='{"path":"/goods"}'>
        <div class="tab-item">商品</div>
    </router-link>

    <router-link :to='{path:"/ratings"}'>
        <div class="tab-item">评价</div>
    </router-link>

    <router-link :to='{path:"/seller"}'>
        <div class="tab-item">商标</div>
    </router-link>

    </div>


    <router-view/>
  </div>
</template>

<script>
import v_header from "./components/header/header.vue"

export default {
  name: 'App',
  components:{
    v_header
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
  margin-top: 60px;
}

.app .tab{display: flex;width:100%;height:40px;width:100%;line-height: 40px;}
.app .tab .tab-item{flex:1;text-align: center;}
</style>
