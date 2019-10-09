<template>
  <div class="foo">

  </div>
</template>

<script>
export default {
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) { // 这个是vue定义的数据预取函数，是在vue实例之前就执行，所以没有this
    return store.dispatch('fetchItem',route.params.id)
  },
  computed:{
    // 由于上面已经在vue实例前就已经通过asyncData函数预期过接口数据，下面可以直接在组建中使用这个更改后的vuex的state
    itme(){
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>

<style>

</style>
