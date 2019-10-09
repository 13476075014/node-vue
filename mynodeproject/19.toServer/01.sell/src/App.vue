

<template>
  <div id="app" class="app">
    <v_header :seller="seller"></v_header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to='{"path":"/goods"}'>
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to='{path:"/ratings"}'>
          评价
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to='{path:"/seller"}'>
          商家
        </router-link>
      </div>
    </div>

    <router-view :seller="seller" />
  </div>
</template>

<script>
import v_header from "./components/header/header.vue"
import {seller} from '@/common/js/builddata.js'

export default {
  name: 'App',
  data(){
    return {
      seller:{}
    }
  },
  created() {
    var _this = this;
    _this.seller = seller.data;
    /*this.$reqs.get('/api/seller').then( (result) => {
        _this.seller = result.data.data.data;
        //console.log( _this.seller)
    }).catch(function(ex){
      console.log(ex)
    })*/
  },
  components:{
    v_header
  }
}
</script>



<style lang="stylus" scoped>

/*@import "./common/stylus/mixin"*/

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  .tab
    background:white
    display: flex
    width:100%
    height:40px
    width:100%
    line-height: 40px
    border-bottom 1px solid rgba(7,17,27,0.1)
    .tab-item
      flex:1
      text-align: center
      & > a
        display block
        font-size 14px
        color rgb(77,85,93)
        &.router-link-active
          color rgb(240,20,20)



</style>
