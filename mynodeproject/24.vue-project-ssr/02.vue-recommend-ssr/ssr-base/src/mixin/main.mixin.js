export const clientDataFetching = {
    beforeMount() { // 客户端数据预取，在视图渲染器前预取数据
        const { asyncData } = this.$options
        if (asyncData) { // asyncData 就是我们自定义的模板中数据预取的函数名
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.route
            })
        }
    },
    beforeRouteUpdate(to, form, next) { // 由于在相同路由下，但是参数不一样，让数据也能刷新写的这个方法
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }

    }
}