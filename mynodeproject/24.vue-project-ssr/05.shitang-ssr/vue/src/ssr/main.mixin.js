/* 处理mixin的 */

export const clientDataFetching = {
  beforeMount () { // 客户端有数据预期的话，要先取了
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.store,
        toute: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
}
