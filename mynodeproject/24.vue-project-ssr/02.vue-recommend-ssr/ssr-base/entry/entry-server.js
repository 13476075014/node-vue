// 这个文件是服务器端的入口文件
import { createApp } from '../src/app2'


// 向外暴露这个方法，来创建新的vue实例
export default context => {

    //考虑到路由异步等这里返回一个异步函数
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp() // const { app, router } 这个是es6的解构赋值的方法

        // 设置服务器端router的位置
        router.push(context.url)

        // 等到router将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
                // 如果匹配不到对应路由的组件，就返回404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map(component => {
                    if (component.asyncData) { // 如果有预取的数据在服务器端进行预取
                        return component.asyncData({
                            store,
                            route: router.currentRoute
                        })
                    }
                })).then(() => {
                    // 把异步完成的vuex的state的值，赋值给整个对外暴露函数的参数
                    context.state = store.state
                })
                //成功就对外暴露vue的实例app
            resolve(app)
        }, reject)
    })

}