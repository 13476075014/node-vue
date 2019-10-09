<template>
  <div>
    home
    <div>{{homeInfo}}</div>
  </div>
</template>

<script>
  export default{
    serverRequest(store){ // 让服务端请求数据
      return store.dispatch('getHomeInfo')
    },
    mounted(){

    },
    computed:{
      homeInfo(){
        return this.$store.state.homeInfo
      }
    }
  }
</script>

<style scoped>

</style>

