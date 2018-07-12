<template>
  <div id="app" class="app">
    <v_header :seller="seller">

    </v_header>
    <div class="tab">
    <router-link :to='{"path":"/goods"}' style="width:33%;">
        <div class="tab-item">商品</div>
    </router-link>

    <router-link :to='{path:"/ratings"}' style="width:33%;">
        <div class="tab-item">评价</div>
    </router-link>

    <router-link :to='{path:"/seller"}' style="width:33%;">
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
  data(){
    return {
      seller:{}
    }
  },
  created() {
    var _this = this;
    this.$reqs.get('/api/seller').then( (result) => {
        _this.seller = result.data.data.data;
        //console.log( _this.seller)
    }).catch(function(ex){
      console.log(ex)
    })
  },
  components:{
    v_header
  }
}
</script>

<style>
body{margin:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.app .tab{background:white;display: flex;width:100%;height:40px;width:100%;line-height: 40px;}
.app .tab .tab-item{flex:1;text-align: center;}
</style>
